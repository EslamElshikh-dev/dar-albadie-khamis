import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const bookingCookieName = "dar_booking_session";
export const bookingSessionSeconds = 60 * 60 * 8;

export function bookingSecret() {
  const key = process.env.BOOKING_ADMIN_KEY;
  if (!key || key.length < 32) throw new Error("Booking administration is not configured");
  return key;
}

export function secureEqual(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function createBookingSession(secret: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ expires: now + bookingSessionSeconds * 1000, nonce: randomBytes(16).toString("hex") })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(`session:${payload}`).digest("base64url")}`;
}

export function verifyBookingSession(value: string | undefined, secret: string, now = Date.now()) {
  if (!value || value.length > 600) return false;
  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra) return false;
  const expected = createHmac("sha256", secret).update(`session:${payload}`).digest("base64url");
  if (!secureEqual(signature, expected)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expires?: unknown; nonce?: unknown };
    return typeof data.expires === "number" && data.expires > now && data.expires <= now + bookingSessionSeconds * 1000 && typeof data.nonce === "string";
  } catch { return false; }
}

export function privateFingerprint(value: string, secret: string) {
  return createHmac("sha256", secret).update(`limit:${value}`).digest("hex");
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const target = new URL(request.url);
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || target.protocol.slice(0, -1);
    if (protocol !== "http" && protocol !== "https") return false;
    const host = request.headers.get("host") || target.host;
    return origin === new URL(`${protocol}://${host}`).origin;
  } catch { return false; }
}

export function privateJson(value: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(value, { status, headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", ...headers } });
}

export async function readSmallJson(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("Invalid content type");
  if (Number(request.headers.get("content-length") || 0) > 4096) throw new Error("Body too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    size += chunk.value.byteLength;
    if (size > 4096) { await reader.cancel(); throw new Error("Body too large"); }
    chunks.push(chunk.value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}
