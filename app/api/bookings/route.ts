import { validateBooking } from "@/lib/booking";
import { bookingSecret, privateJson, readSmallJson, sameOrigin } from "@/lib/booking-security";
import { BookingConflictError, BookingRateLimitError, checkBookingRateLimit, findBooking, saveBooking } from "@/lib/booking-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return privateJson({ error: "تعذر التحقق من مصدر الطلب." }, 403);
  let body: unknown;
  try { body = await readSmallJson(request); }
  catch { return privateJson({ error: "تحقق من بيانات النموذج ثم أعد المحاولة." }, 400); }
  const result = validateBooking(body);
  if (!result.ok) return privateJson({ errors: result.errors }, 400);
  try {
    bookingSecret();
    const existing = await findBooking(result.value);
    if (existing) return privateJson({ reference: existing.reference });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    await checkBookingRateLimit("submission", ip, 5, 60 * 60 * 1000);
    await checkBookingRateLimit("phone", result.value.phone, 3, 24 * 60 * 60 * 1000);
    const saved = await saveBooking(result.value);
    return privateJson({ reference: saved.reference }, 201);
  } catch (error) {
    if (error instanceof BookingRateLimitError) return privateJson({ error: "وصلت إلى حد المحاولات. يُرجى الاتصال بالفرع أو المحاولة لاحقًا." }, 429, { "Retry-After": "3600" });
    if (error instanceof BookingConflictError) return privateJson({ error: "هذا الطلب مسجل ببيانات أخرى. حدّث الصفحة لبدء طلب جديد." }, 409);
    return privateJson({ error: "لم يتم تأكيد تسجيل الطلب. أعد المحاولة أو اتصل بالفرع على 055 933 3985." }, 503);
  }
}
