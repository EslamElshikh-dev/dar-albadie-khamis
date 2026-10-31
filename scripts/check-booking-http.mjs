import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { randomUUID } from "node:crypto";
import { bookingDateRange } from "../lib/booking.ts";

const probe = createServer();
await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const base = `http://127.0.0.1:${port}`;
const env = { ...process.env };
delete env.BLOB_READ_WRITE_TOKEN;
delete env.BOOKING_ADMIN_KEY;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { env, stdio: ["ignore", "pipe", "pipe"] });
let logs = "";
server.stdout.on("data", (chunk) => { logs += chunk; });
server.stderr.on("data", (chunk) => { logs += chunk; });

async function call(path, { method = "GET", body, origin = true } = {}) {
  return fetch(`${base}${path}`, { method, headers: { "Content-Type": "application/json", ...(origin ? { Origin: base } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await call("/booking"); if (response.ok) { ready = true; break; } } catch { /* Local server is starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  assert.ok(ready, logs);
  const page = await (await call("/booking")).text();
  assert.equal((page.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(page.includes('name="phone"') && page.includes('name="consent"'));
  assert.ok(page.includes('rel="canonical" href="https://dar-albadie-khamis.vercel.app/booking"'));
  console.log("PASS: server-rendered booking form and canonical");
  const admin = await (await call("/booking/manage")).text();
  assert.ok(/name="robots" content="[^"]*noindex/.test(admin));
  assert.ok(!admin.includes("BOOKING_ADMIN_KEY") && !admin.includes("booking-requests/"));
  console.log("PASS: private management page and no secret disclosure");
  for (const [path, method, body, origin, expected] of [
    ["/api/bookings", "GET", undefined, true, 405],
    ["/api/bookings", "POST", {}, false, 403],
    ["/api/bookings", "POST", {}, true, 400],
    ["/api/bookings/admin", "GET", undefined, true, 401],
    ["/api/bookings/admin", "PATCH", { id: randomUUID(), status: "confirmed" }, true, 401],
  ]) {
    const response = await call(path, { method, body, origin });
    assert.equal(response.status, expected, `${method} ${path}: ${await response.text()}`);
    console.log(`PASS: ${method} ${path} returns ${expected}`);
  }
  const date = new Date(`${bookingDateRange().min}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  if (date.getUTCDay() === 5) date.setUTCDate(date.getUTCDate() + 1);
  const response = await call("/api/bookings", { method: "POST", body: { idempotencyKey: randomUUID(), name: "اختبار تقني", phone: "0559333985", section: "men", service: "dry", date: date.toISOString().slice(0, 10), period: "morning", consent: true, website: "" } });
  assert.equal(response.status, 503);
  assert.ok(!(await response.json()).reference);
  console.log("PASS: unavailable storage cannot produce a false booking receipt");
  console.log("HTTP checks: 8 passed");
} finally {
  server.kill("SIGTERM");
}
