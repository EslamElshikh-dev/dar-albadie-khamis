import test from "node:test";
import assert from "node:assert/strict";
import { bookingDateRange, normalizeSaudiPhone, riyadhDate, validateBooking } from "../lib/booking.ts";
import { createBookingSession, privateFingerprint, readSmallJson, sameOrigin, verifyBookingSession } from "../lib/booking-security.ts";

const now = new Date("2026-10-31T10:00:00Z");
const valid = { idempotencyKey: "12345678-1234-4123-8123-123456789012", name: "عميل تجريبي", phone: "0559333985", section: "men", service: "dry", date: "2026-11-01", period: "morning", consent: true, website: "" };

test("accepts a booking request and normalizes the mobile number", () => {
  const result = validateBooking(valid, now);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.phone, "+966559333985");
});

test("uses the Saudi date across UTC midnight boundaries", () => {
  assert.equal(riyadhDate(new Date("2026-10-31T22:10:00Z")), "2026-11-01");
  assert.deepEqual(bookingDateRange(now), { min: "2026-10-31", max: "2026-11-30" });
});

test("normalizes Arabic and international mobile formats and rejects invalid numbers", () => {
  for (const phone of ["٠٥٥٩٣٣٣٩٨٥", "+966 55 933 3985", "00966559333985", "559333985"]) assert.equal(normalizeSaudiPhone(phone), "+966559333985");
  for (const phone of ["0172312916", "12345", "9665593333985", "05abc333985"]) assert.equal(normalizeSaudiPhone(phone), null);
});

for (const [label, patch, field] of [
  ["Friday", { date: "2026-11-06" }, "date"],
  ["a past date", { date: "2026-10-30" }, "date"],
  ["a date beyond the request window", { date: "2026-12-01" }, "date"],
  ["an impossible calendar date", { date: "2026-11-31" }, "date"],
  ["an elapsed period today", { date: "2026-10-31", period: "morning" }, "period"],
  ["an unknown service", { service: "detox" }, "service"],
  ["a missing section", { section: "" }, "section"],
  ["missing consent", { consent: false }, "consent"],
  ["an invalid request identifier", { idempotencyKey: "arbitrary" }, "form"],
  ["a filled honeypot", { website: "spam" }, "form"],
  ["HTML in the contact name", { name: "<script>alert(1)</script>" }, "name"],
] as const) test(`rejects ${label}`, () => {
  const result = validateBooking({ ...valid, ...patch }, now);
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.errors[field]);
});

test("allows the future evening period today", () => assert.equal(validateBooking({ ...valid, date: "2026-10-31", period: "evening" }, now).ok, true));

test("signed admin sessions reject tampering, expiry and a different secret", () => {
  const secret = "test-key-".repeat(8);
  const token = createBookingSession(secret, now.valueOf());
  assert.equal(verifyBookingSession(token, secret, now.valueOf() + 1000), true);
  assert.equal(verifyBookingSession(`${token}x`, secret, now.valueOf()), false);
  assert.equal(verifyBookingSession(token, "different-secret", now.valueOf()), false);
  assert.equal(verifyBookingSession(token, secret, now.valueOf() + 9 * 3600 * 1000), false);
  assert.equal(verifyBookingSession(undefined, secret, now.valueOf()), false);
});

test("rate limit fingerprints do not contain raw personal data", () => {
  const value = privateFingerprint("+966559333985", "test-secret");
  assert.match(value, /^[a-f0-9]{64}$/);
  assert.notEqual(value, privateFingerprint("+966559333985", "another-secret"));
});

test("mutation requests require the site's exact origin", () => {
  const url = "https://dar-albadie-khamis.vercel.app/api/bookings";
  assert.equal(sameOrigin(new Request(url, { headers: { origin: "https://dar-albadie-khamis.vercel.app" } })), true);
  assert.equal(sameOrigin(new Request(url, { headers: { origin: "https://example.com" } })), false);
  assert.equal(sameOrigin(new Request(url)), false);
});

test("origin validation supports the host preserved by the Next.js reverse proxy", () => {
  const request = new Request("http://localhost:3089/api/bookings", { headers: { host: "127.0.0.1:3089", origin: "http://127.0.0.1:3089" } });
  assert.equal(sameOrigin(request), true);
  const deployed = new Request("http://localhost:3000/api/bookings", { headers: { host: "dar-albadie-khamis.vercel.app", "x-forwarded-proto": "https", origin: "https://dar-albadie-khamis.vercel.app" } });
  assert.equal(sameOrigin(deployed), true);
  const attacker = new Request("http://localhost:3000/api/bookings", { headers: { host: "dar-albadie-khamis.vercel.app", "x-forwarded-proto": "https", origin: "https://dar-albadie-khamis.vercel.app.attacker.example" } });
  assert.equal(sameOrigin(attacker), false);
});

test("rejects oversized or incorrectly encoded request bodies", async () => {
  const url = "https://dar-albadie-khamis.vercel.app/api/bookings";
  await assert.rejects(readSmallJson(new Request(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "x".repeat(5000) }) })));
  await assert.rejects(readSmallJson(new Request(url, { method: "POST", headers: { "Content-Type": "text/plain" }, body: "{}" })));
  assert.deepEqual(await readSmallJson(new Request(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })), {});
});
