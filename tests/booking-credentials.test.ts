import test from "node:test";
import assert from "node:assert/strict";
import { hashBookingPassword, verifyBookingCredentials } from "../lib/booking-credentials.ts";

const password = "example-test-only-48!";

test("username and password must both match", async () => {
  const credentials = { username: "Admin", passwordHash: await hashBookingPassword(password) };
  assert.equal(await verifyBookingCredentials("Admin", password, credentials), true);
  assert.equal(await verifyBookingCredentials("OtherUser", password, credentials), false);
  assert.equal(await verifyBookingCredentials("Admin", "incorrect-password", credentials), false);
  assert.equal(await verifyBookingCredentials(undefined, password, credentials), false);
});

test("identical passwords receive independent salted hashes", async () => {
  const first = await hashBookingPassword(password);
  const second = await hashBookingPassword(password);
  assert.notEqual(first, second);
  assert.match(first, /^scrypt:v1:[0-9a-f]{32}:[0-9a-f]{128}$/);
  assert.ok(!first.includes(password));
  assert.equal(await verifyBookingCredentials("Admin", password, { username: "Admin", passwordHash: first }), true);
  assert.equal(await verifyBookingCredentials("Admin", password, { username: "Admin", passwordHash: second }), true);
});

test("invalid inputs and missing configuration cannot authenticate", async () => {
  const credentials = { username: "Admin", passwordHash: await hashBookingPassword(password) };
  assert.equal(await verifyBookingCredentials({ key: "old-key" }, undefined, credentials), false);
  assert.equal(await verifyBookingCredentials("Admin", "x".repeat(513), credentials), false);
  await assert.rejects(verifyBookingCredentials("Admin", password, { username: "", passwordHash: "" }));
  await assert.rejects(verifyBookingCredentials("Admin", password, { username: "Admin", passwordHash: "malformed" }));
});
