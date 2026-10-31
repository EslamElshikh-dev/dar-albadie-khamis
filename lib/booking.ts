export const bookingServices = [
  { value: "wet", label: "الحجامة الرطبة" },
  { value: "dry", label: "الحجامة الجافة — كؤوس الهواء" },
  { value: "moving", label: "الحجامة المتزحلقة — التدليكية" },
  { value: "therapeutic", label: "الحجامة العلاجية" },
  { value: "head-face", label: "حجامة الرأس والوجه" },
  { value: "seniors", label: "حجامة كبار السن" },
  { value: "guidance", label: "أرغب في الاستفسار عن النوع المناسب" },
] as const;

export const bookingPeriods = [
  { value: "morning", label: "صباحية", hours: "8 صباحًا – 12 ظهرًا", closesAt: 12 },
  { value: "evening", label: "مسائية", hours: "4 عصرًا – 8 مساءً", closesAt: 20 },
] as const;

export const bookingStatuses = {
  new: "طلب جديد",
  contacted: "جارٍ التواصل",
  confirmed: "تم تأكيد الموعد",
  cancelled: "ملغي",
} as const;

export type BookingStatus = keyof typeof bookingStatuses;
export type BookingInput = {
  idempotencyKey: string;
  name: string;
  phone: string;
  section: "men" | "women";
  service: (typeof bookingServices)[number]["value"];
  date: string;
  period: (typeof bookingPeriods)[number]["value"];
  source: "google_business" | "website";
};

export type BookingRecord = BookingInput & {
  reference: string;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
};

export const isBookingId = (value: unknown): value is string =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export function riyadhDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"].map((key) => parts.find((part) => part.type === key)?.value).join("-");
}

export function bookingDateRange(now = new Date()) {
  const min = riyadhDate(now);
  const last = new Date(`${min}T12:00:00Z`);
  last.setUTCDate(last.getUTCDate() + 30);
  return { min, max: last.toISOString().slice(0, 10) };
}

export function normalizeSaudiPhone(input: string) {
  let phone = input.replace(/[٠-٩]/g, (n) => String("٠١٢٣٤٥٦٧٨٩".indexOf(n)))
    .replace(/[۰-۹]/g, (n) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(n)))
    .replace(/[\s()+-]/g, "");
  if (phone.startsWith("00966")) phone = phone.slice(2);
  if (/^05\d{8}$/.test(phone)) phone = `966${phone.slice(1)}`;
  if (/^5\d{8}$/.test(phone)) phone = `966${phone}`;
  return /^9665\d{8}$/.test(phone) ? `+${phone}` : null;
}

export function validateBooking(body: unknown, now = new Date()):
  { ok: true; value: BookingInput } | { ok: false; errors: Record<string, string> } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, errors: { form: "تحقق من بيانات الطلب ثم أعد المحاولة." } };
  const input = body as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const phone = typeof input.phone === "string" ? normalizeSaudiPhone(input.phone) : null;
  if (name.length < 2 || name.length > 80 || /[<>\x00-\x1f\x7f]/.test(name)) errors.name = "اكتب اسمًا من حرفين إلى 80 حرفًا.";
  if (!phone) errors.phone = "اكتب رقم جوال سعودي صحيحًا، مثل 05xxxxxxxx.";
  if (input.section !== "men" && input.section !== "women") errors.section = "اختر القسم المطلوب.";
  if (!bookingServices.some((service) => service.value === input.service)) errors.service = "اختر الخدمة أو خيار الاستفسار عن النوع.";
  if (!bookingPeriods.some((period) => period.value === input.period)) errors.period = "اختر الفترة المفضلة.";
  const range = bookingDateRange(now);
  const date = typeof input.date === "string" ? input.date : "";
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T12:00:00Z`) : null;
  if (!parsedDate || Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date || date < range.min || date > range.max) {
    errors.date = "اختر تاريخًا من اليوم وحتى 30 يومًا قادمة.";
  } else if (parsedDate.getUTCDay() === 5) {
    errors.date = "الجمعة مغلق. اختر يومًا من السبت إلى الخميس.";
  } else if (date === range.min) {
    const hour = Number(new Intl.DateTimeFormat("en", { timeZone: "Asia/Riyadh", hour: "numeric", hourCycle: "h23" }).format(now));
    const period = bookingPeriods.find((item) => item.value === input.period);
    if (period && hour >= period.closesAt) errors.period = "انتهت هذه الفترة اليوم. اختر فترة لاحقة أو يومًا آخر.";
  }
  if (input.consent !== true) errors.consent = "يرجى الموافقة على استخدام بيانات التواصل لمتابعة طلبك.";
  if (!isBookingId(input.idempotencyKey)) errors.form = "حدّث الصفحة ثم أعد إرسال الطلب.";
  if (typeof input.website !== "string" || input.website.length !== 0) errors.form = "تعذر إرسال الطلب. اتصل بالفرع للمساعدة.";
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: {
    idempotencyKey: input.idempotencyKey as string,
    name, phone: phone!, section: input.section as BookingInput["section"],
    service: input.service as BookingInput["service"], date,
    period: input.period as BookingInput["period"],
    source: input.source === "google_business" ? "google_business" : "website",
  } };
}

export function bookingReference(input: BookingInput) {
  return `DB-${input.date.replaceAll("-", "")}-${input.idempotencyKey.slice(0, 8).toUpperCase()}`;
}
