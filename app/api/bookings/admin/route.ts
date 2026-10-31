import { cookies } from "next/headers";
import { bookingStatuses, isBookingId, type BookingStatus } from "@/lib/booking";
import { bookingCookieName, bookingSecret, privateJson, readSmallJson, sameOrigin, verifyBookingSession } from "@/lib/booking-security";
import { listBookings, updateBookingStatus } from "@/lib/booking-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authenticated() {
  try { return verifyBookingSession((await cookies()).get(bookingCookieName)?.value, bookingSecret()); }
  catch { return false; }
}

export async function GET(request: Request) {
  if (!await authenticated()) return privateJson({ error: "يرجى تسجيل الدخول." }, 401);
  const cursor = new URL(request.url).searchParams.get("cursor") || undefined;
  if (cursor && cursor.length > 1000) return privateJson({ error: "صفحة غير صالحة." }, 400);
  try { return privateJson(await listBookings(cursor)); }
  catch { return privateJson({ error: "تعذر تحميل الطلبات. أعد المحاولة." }, 503); }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return privateJson({ error: "مصدر الطلب غير صالح." }, 403);
  if (!await authenticated()) return privateJson({ error: "يرجى تسجيل الدخول." }, 401);
  let body: { id?: unknown; status?: unknown };
  try { body = await readSmallJson(request) as typeof body; }
  catch { return privateJson({ error: "بيانات غير صالحة." }, 400); }
  if (!body || !isBookingId(body.id) || typeof body.status !== "string" || !Object.hasOwn(bookingStatuses, body.status)) return privateJson({ error: "تحقق من الطلب والحالة." }, 400);
  try {
    const booking = await updateBookingStatus(body.id, body.status as BookingStatus);
    return booking ? privateJson({ booking }) : privateJson({ error: "الطلب غير موجود." }, 404);
  } catch { return privateJson({ error: "تعذر حفظ الحالة. أعد المحاولة." }, 503); }
}
