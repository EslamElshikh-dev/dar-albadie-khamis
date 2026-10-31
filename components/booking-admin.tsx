"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarCheck2, LoaderCircle, LogOut, Phone, RefreshCw } from "lucide-react";
import { bookingPeriods, bookingServices, bookingStatuses, type BookingRecord, type BookingStatus } from "@/lib/booking";

export function BookingAdmin({ authenticated }: { authenticated: boolean }) {
  const [signedIn, setSignedIn] = useState(authenticated);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [saving, setSaving] = useState("");

  async function load(next?: string) {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/bookings/admin${next ? `?cursor=${encodeURIComponent(next)}` : ""}`, { cache: "no-store" });
      const result = await response.json();
      if (response.status === 401) { setSignedIn(false); setBookings([]); return; }
      if (!response.ok) throw new Error(result.error || "تعذر تحميل الطلبات.");
      setBookings((current) => next ? [...current, ...result.bookings] : result.bookings);
      setCursor(result.cursor);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "تحقق من الاتصال."); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (signedIn) void load(); }, [signedIn]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/bookings/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: new FormData(form).get("key") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "تعذر تسجيل الدخول.");
      form.reset(); setSignedIn(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "تحقق من الاتصال."); }
    finally { setLoading(false); }
  }

  async function update(id: string, status: BookingStatus) {
    if (saving) return;
    setSaving(id); setError("");
    try {
      const response = await fetch("/api/bookings/admin", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
      const result = await response.json();
      if (response.status === 401) { setSignedIn(false); setBookings([]); return; }
      if (!response.ok) throw new Error(result.error || "تعذر تحديث الحالة.");
      setBookings((current) => current.map((item) => item.idempotencyKey === id ? result.booking : item));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "تحقق من الاتصال."); }
    finally { setSaving(""); }
  }

  async function logout() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/bookings/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error("تعذر تسجيل الخروج. أعد المحاولة.");
      setSignedIn(false); setBookings([]); setCursor(null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "تحقق من الاتصال."); }
    finally { setLoading(false); }
  }

  if (!signedIn) return <section className="appointment-admin-login"><CalendarCheck2 size={32} aria-hidden="true" /><h1>متابعة طلبات المواعيد</h1><p>فرع دار البديع للحجامة · خميس مشيط</p><form onSubmit={login}><label htmlFor="admin-key">مفتاح دخول الإدارة</label><input id="admin-key" name="key" type="password" autoComplete="current-password" required maxLength={200} /><button className="button button-dark" disabled={loading}>{loading ? "جارٍ الدخول…" : "دخول الإدارة"}</button></form>{error && <p role="alert" className="appointment-form-error">{error}</p>}</section>;

  const visible = bookings.filter((item) => filter === "all" || item.status === filter);
  return <section className="appointment-admin-dashboard"><div className="appointment-admin-heading"><div><span className="eyebrow">خميس مشيط · لوحة المواعيد</span><h1>طلبات الزيارة</h1><p>راجع الطلب وتواصل مع العميل لتأكيد الموعد والتكلفة، ثم حدّث حالته.</p></div><div className="appointment-admin-tools"><button onClick={() => void load()} disabled={loading} className="button button-outline-dark"><RefreshCw size={17} aria-hidden="true" /> تحديث</button><button onClick={() => void logout()} disabled={loading} className="button button-outline-dark"><LogOut size={17} aria-hidden="true" /> خروج</button></div></div>
    <div className="appointment-admin-filters" aria-label="تصفية الطلبات"><button aria-pressed={filter === "all"} onClick={() => setFilter("all")}>الكل <span>{bookings.length}</span></button>{Object.entries(bookingStatuses).map(([value, label]) => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label} <span>{bookings.filter((item) => item.status === value).length}</span></button>)}</div>
    {error && <p role="alert" className="appointment-form-error">{error}</p>}
    {loading && <p className="appointment-loading" role="status"><LoaderCircle size={19} className="appointment-spinner" aria-hidden="true" /> جارٍ تحميل الطلبات…</p>}
    {!loading && visible.length === 0 && <div className="appointment-admin-empty">{bookings.length === 0 ? "ستظهر طلبات المواعيد الجديدة هنا بعد إرسالها من صفحة الحجز." : "لا توجد طلبات بهذه الحالة."}</div>}
    <div className="appointment-admin-list">{visible.map((item) => <article key={item.idempotencyKey} className="appointment-admin-card"><div className="appointment-admin-card-top"><strong>{item.name}</strong><span dir="ltr">{item.reference}</span></div><dl><div><dt>الخدمة</dt><dd>{bookingServices.find((service) => service.value === item.service)?.label}</dd></div><div><dt>القسم</dt><dd>{item.section === "men" ? "الرجال" : "النساء"}</dd></div><div><dt>اليوم المفضّل</dt><dd>{new Intl.DateTimeFormat("ar-SA", { calendar: "gregory", dateStyle: "full" }).format(new Date(`${item.date}T12:00:00Z`))}</dd></div><div><dt>الفترة المفضّلة</dt><dd>{bookingPeriods.find((period) => period.value === item.period)?.hours}</dd></div><div><dt>تاريخ الطلب</dt><dd>{new Intl.DateTimeFormat("ar-SA", { calendar: "gregory", timeZone: "Asia/Riyadh", dateStyle: "short", timeStyle: "short" }).format(new Date(item.createdAt))}</dd></div></dl><div className="appointment-admin-card-actions"><a className="button button-outline-dark" href={`tel:${item.phone}`}><Phone size={16} aria-hidden="true" /><bdi>{item.phone}</bdi></a><label>حالة الطلب<select value={item.status} disabled={!!saving} onChange={(event) => void update(item.idempotencyKey, event.target.value as BookingStatus)}>{Object.entries(bookingStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div></article>)}</div>
    {cursor && <button disabled={loading} className="button button-outline-dark" onClick={() => void load(cursor)}>تحميل المزيد من الطلبات</button>}
  </section>;
}
