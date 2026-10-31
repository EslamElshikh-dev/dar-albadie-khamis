"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CalendarCheck2, Check, CheckCircle2, Clock3, LoaderCircle, MapPin, Phone, ShieldCheck } from "lucide-react";
import { bookingPeriods, bookingServices, validateBooking, type BookingInput } from "@/lib/booking";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function BookingForm({ minDate, maxDate }: { minDate: string; maxDate: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState<{ reference: string; input: BookingInput } | null>(null);
  const [date, setDate] = useState("");
  const [section, setSection] = useState("");
  const [period, setPeriod] = useState("");
  const id = useRef("");
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (receipt) resultHeading.current?.focus(); }, [receipt]);

  function error(field: string) {
    return errors[field] ? <span id={`error-${field}`} className="appointment-error">{errors[field]}</span> : null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    id.current ||= crypto.randomUUID();
    const payload = {
      idempotencyKey: id.current, name: String(form.get("name") || ""), phone: String(form.get("phone") || ""),
      section: form.get("section"), service: form.get("service"), date: form.get("date"), period: form.get("period"),
      consent: form.get("consent") === "on", website: String(form.get("website") || ""),
      source: new URLSearchParams(window.location.search).get("utm_source") === "google" ? "google_business" : "website",
    };
    const validation = validateBooking(payload);
    if (!validation.ok) {
      setErrors(validation.errors);
      const first = Object.keys(validation.errors)[0];
      if (first !== "form") event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setPending(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
      const result = await response.json() as { reference?: string; errors?: Record<string, string>; error?: string };
      if (!response.ok || !result.reference) {
        setErrors(result.errors || { form: result.error || "تعذر إرسال الطلب. أعد المحاولة أو اتصل بالفرع." });
        return;
      }
      setReceipt({ reference: result.reference, input: validation.value });
    } catch {
      setErrors({ form: "لم نتمكن من تأكيد تسجيل الطلب. تحقق من الاتصال وأعد المحاولة؛ يُستخدم نفس رقم الطلب لمنع التكرار." });
    } finally { window.clearTimeout(timer); setPending(false); }
  }

  if (receipt) {
    const day = new Intl.DateTimeFormat("ar-SA", { calendar: "gregory", dateStyle: "full" }).format(new Date(`${receipt.input.date}T12:00:00Z`));
    const service = bookingServices.find((item) => item.value === receipt.input.service)?.label;
    return <section className="appointment-receipt" aria-label="نتيجة طلب الموعد">
      <span className="appointment-success-icon"><CheckCircle2 size={34} aria-hidden="true" /></span>
      <span className="eyebrow">وصل طلبك</span>
      <h2 ref={resultHeading} tabIndex={-1}>تم تسجيل <span>طلب موعدك.</span></h2>
      <p>يؤكد الفرع توفر الموعد وتفاصيل الخدمة والتكلفة معك قبل الزيارة.</p>
      <div className="appointment-reference"><span>رقم الطلب — احتفظ به للمتابعة</span><strong dir="ltr">{receipt.reference}</strong></div>
      <dl className="appointment-receipt-details"><div><dt>القسم</dt><dd>{receipt.input.section === "men" ? "قسم الرجال" : "قسم النساء"}</dd></div><div><dt>الخدمة</dt><dd>{service}</dd></div><div><dt>اليوم المفضّل</dt><dd>{day}</dd></div><div><dt>الفترة المفضّلة</dt><dd>{bookingPeriods.find((item) => item.value === receipt.input.period)?.hours}</dd></div><div><dt>الحالة</dt><dd><span className="appointment-status">بانتظار تأكيد الفرع</span></dd></div></dl>
      <div className="appointment-receipt-actions"><a className="button button-dark" href={whatsappLink(`السلام عليكم، أود متابعة طلب الموعد رقم ${receipt.reference} في فرع خميس مشيط.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21} /> متابعة الطلب مع الفرع</a><a className="button button-outline-dark" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> موقع المركز</a></div>
    </section>;
  }

  return <form className="appointment-form" onSubmit={submit} noValidate onChange={() => { id.current = ""; if (Object.keys(errors).length) setErrors({}); }} aria-busy={pending}>
    <div className="appointment-form-heading"><span className="appointment-form-symbol"><CalendarCheck2 size={25} aria-hidden="true" /></span><div><h2>رتّب زيارتك</h2><p>اختر تفضيلاتك، وأرسل طلب الموعد مباشرة.</p></div></div>
    <fieldset disabled={pending} className="appointment-main-fields">
      <fieldset className="appointment-fieldset"><legend><span>01</span> الخدمة والقسم</legend>
        <div className="appointment-field"><label htmlFor="booking-service">الخدمة المطلوبة <span aria-hidden="true">*</span></label><select id="booking-service" name="service" defaultValue="" required aria-invalid={!!errors.service} aria-describedby={errors.service ? "error-service" : undefined}><option value="" disabled>اختر الخدمة</option>{bookingServices.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>{error("service")}</div>
        <div className="appointment-field"><span id="booking-section-label" className="appointment-label">القسم المطلوب <span aria-hidden="true">*</span></span><div className="appointment-options" role="radiogroup" aria-labelledby="booking-section-label" aria-invalid={!!errors.section} aria-describedby={errors.section ? "error-section" : undefined}>{[{ value: "men", label: "قسم الرجال" }, { value: "women", label: "قسم النساء" }].map((item) => <label className="appointment-option" key={item.value}><input type="radio" name="section" value={item.value} checked={section === item.value} onChange={() => setSection(item.value)} required /><span>{item.label}<Check size={17} aria-hidden="true" /></span></label>)}</div>{error("section")}</div>
      </fieldset>
      <fieldset className="appointment-fieldset"><legend><span>02</span> اليوم والفترة المفضّلة</legend>
        <div className="appointment-field"><label htmlFor="booking-date">اليوم المفضّل <span aria-hidden="true">*</span></label><input id="booking-date" name="date" type="date" min={minDate} max={maxDate} value={date} onChange={(event) => setDate(event.target.value)} required aria-invalid={!!errors.date} aria-describedby={errors.date ? "error-date date-help" : "date-help"} /><small id="date-help">من السبت إلى الخميس، خلال 30 يومًا. الجمعة مغلق.</small>{error("date")}</div>
        <div className="appointment-field"><span id="booking-period-label" className="appointment-label">الفترة المفضّلة <span aria-hidden="true">*</span></span><div className="appointment-options appointment-periods" role="radiogroup" aria-labelledby="booking-period-label" aria-invalid={!!errors.period} aria-describedby={errors.period ? "error-period" : undefined}>{bookingPeriods.map((item) => <label className="appointment-option" key={item.value}><input type="radio" name="period" value={item.value} checked={period === item.value} onChange={() => setPeriod(item.value)} required /><span><b>{item.label}</b><small>{item.hours}</small><Check size={17} aria-hidden="true" /></span></label>)}</div>{error("period")}</div>
      </fieldset>
      <fieldset className="appointment-fieldset"><legend><span>03</span> بيانات التواصل</legend><div className="appointment-contact-fields">
        <div className="appointment-field"><label htmlFor="booking-name">الاسم <span aria-hidden="true">*</span></label><input id="booking-name" name="name" autoComplete="name" maxLength={80} placeholder="اكتب اسمك" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} />{error("name")}</div>
        <div className="appointment-field"><label htmlFor="booking-phone">رقم الجوال <span aria-hidden="true">*</span></label><input id="booking-phone" name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" maxLength={22} placeholder="05xxxxxxxx" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "error-phone" : undefined} />{error("phone")}</div></div>
        <div className="appointment-honeypot" aria-hidden="true"><label htmlFor="booking-website">الموقع الإلكتروني</label><input id="booking-website" name="website" autoComplete="off" tabIndex={-1} /></div>
        <label className="appointment-consent"><input name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "error-consent" : undefined} /><span>أوافق على استخدام اسمي ورقم جوالي للتواصل بشأن طلب الموعد لدى فرع خميس مشيط.</span></label>{error("consent")}
      </fieldset>
      <div className="appointment-before-submit"><Clock3 size={19} aria-hidden="true" /><p>اختيار اليوم والفترة يعبّر عن تفضيلك. يؤكد المركز التوفر والموعد والتكلفة معك قبل الحضور.</p></div>
      {errors.form && <p className="appointment-form-error" role="alert">{errors.form}</p>}
      <button className="button button-dark appointment-submit" type="submit" disabled={pending}>{pending ? <><LoaderCircle size={21} className="appointment-spinner" aria-hidden="true" /> جارٍ تسجيل الطلب…</> : <>إرسال طلب الموعد <ArrowLeft size={20} aria-hidden="true" /></>}</button>
      <p className="appointment-data-note"><ShieldCheck size={16} aria-hidden="true" /> نموذج المواعيد مخصص لبيانات التواصل، وتُناقش المعلومات الصحية مباشرة مع الممارس.</p>
    </fieldset>
    <noscript><p className="appointment-form-error">يحتاج النموذج إلى JavaScript للإرسال. يمكنك الاتصال بالمركز على <a href={`tel:${site.phone}`}>{site.displayPhone}</a> لترتيب موعدك.</p></noscript>
    <div className="appointment-form-footer"><span>تفضّل الاستفسار أولًا؟</span><a href={`tel:${site.phone}`}><Phone size={17} aria-hidden="true" /> اتصل بالفرع</a></div>
  </form>;
}
