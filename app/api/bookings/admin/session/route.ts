import { cookies } from "next/headers";
import { bookingCookieName, bookingSecret, bookingSessionSeconds, createBookingSession, privateJson, readSmallJson, sameOrigin, secureEqual } from "@/lib/booking-security";
import { BookingRateLimitError, checkBookingRateLimit } from "@/lib/booking-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return privateJson({ error: "مصدر الطلب غير صالح." }, 403);
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    await checkBookingRateLimit("login", ip, 8, 60 * 60 * 1000);
    const body = await readSmallJson(request) as { key?: unknown };
    const secret = bookingSecret();
    if (typeof body?.key !== "string" || !secureEqual(body.key, secret)) return privateJson({ error: "مفتاح الدخول غير صحيح." }, 401);
    (await cookies()).set(bookingCookieName, createBookingSession(secret), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: bookingSessionSeconds,
    });
    return privateJson({ ok: true });
  } catch (error) {
    return privateJson({ error: error instanceof BookingRateLimitError ? "محاولات كثيرة. حاول لاحقًا." : "تعذر تسجيل الدخول الآن." }, error instanceof BookingRateLimitError ? 429 : 503);
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return privateJson({ error: "مصدر الطلب غير صالح." }, 403);
  (await cookies()).delete(bookingCookieName);
  return privateJson({ ok: true });
}
