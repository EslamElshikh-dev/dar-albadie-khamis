import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck2, Clock3, MapPin, Phone, ArrowUpLeft } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { Breadcrumbs } from "@/components/site-shell";
import { bookingDateRange } from "@/lib/booking";
import { site, siteUrl } from "@/lib/site";
import "./booking.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "طلب موعد حجامة | فرع خميس مشيط",
  description: "أرسل طلب موعد في مركز دار البديع للحجامة بحي النزهة، خميس مشيط. اختر القسم والخدمة واليوم والفترة المفضلة، ويؤكد الفرع التفاصيل معك قبل الزيارة.",
  alternates: { canonical: "/booking" },
  openGraph: { title: "رتّب موعد زيارتك | دار البديع — خميس مشيط", description: "نموذج طلب موعد مباشر لفرع حي النزهة، للرجال والنساء.", url: `${siteUrl}/booking` },
};

export default function BookingPage() {
  const range = bookingDateRange();
  return <main id="main" className="appointment-page">
    <section className="appointment-hero"><div className="container"><Breadcrumbs items={[{ label: "طلب موعد" }]} /><div className="appointment-hero-content"><div><span className="eyebrow">دار البديع · فرع خميس مشيط</span><h1>موعدك، <span>بخطوة واضحة.</span></h1><p>اختر الخدمة والقسم والفترة التي تفضّلها، وأرسل طلبك من هنا. يؤكد الفرع تفاصيل زيارتك معك.</p></div><span className="appointment-hero-seal"><CalendarCheck2 size={31} aria-hidden="true" /><span>طلب مباشر<strong>لفرع حي النزهة</strong></span></span></div></div></section>
    <section className="appointment-content"><div className="container appointment-grid"><BookingForm minDate={range.min} maxDate={range.max} /><aside className="appointment-aside" aria-label="معلومات الزيارة">
      <div className="appointment-branch-photo"><Image src={site.images.room} alt="من داخل فرع مركز دار البديع للحجامة بخميس مشيط" width={750} height={900} sizes="(max-width: 900px) 90vw, 380px" /><span>من داخل الفرع</span></div>
      <div className="appointment-branch-info"><span className="eyebrow">نستقبلك في</span><h2>فرع خميس مشيط</h2><p><MapPin size={18} aria-hidden="true" /> {site.shortAddress}</p><a className="appointment-map-link" href={site.maps} target="_blank" rel="noopener noreferrer">عرض الموقع والاتجاهات <ArrowUpLeft size={17} aria-hidden="true" /></a><div className="appointment-hours"><h3><Clock3 size={18} aria-hidden="true" /> مواعيد الفرع</h3><p>من السبت إلى الخميس</p><div><span>صباحًا</span><strong>8:00 – 12:00</strong></div><div><span>مساءً</span><strong>4:00 – 8:00</strong></div><small>الجمعة مغلق · جميع المواعيد بتوقيت السعودية</small></div><a className="appointment-direct-phone" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /><bdi>{site.displayPhone}</bdi></a></div>
      <div className="appointment-next-step"><span>بعد إرسال الطلب</span><ol><li>يظهر رقم مرجعي لطلبك.</li><li>يراجع الفرع المواعيد وتفاصيل الخدمة.</li><li>تتأكد الزيارة بعد تأكيد الموعد مع المركز.</li></ol></div>
    </aside></div></section>
  </main>;
}
