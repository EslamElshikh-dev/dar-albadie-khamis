import type { Metadata } from "next";
import { ArrowUpLeft, MapPin, Phone, Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/site-shell";
import { ContactIcon } from "@/components/icons";
import { mapEmbedUrl, site, contactHref } from "@/lib/site";

export const metadata: Metadata = { title: "الموقع والتواصل | فرع محايل عسير", description: "عنوان ورقم مركز دار البديع للحجامة في محايل عسير، ورابط الحجز عبر الهاتف والاتجاهات على خرائط Google.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return <main id="main"><section className="page-hero simple-hero"><div className="container"><Breadcrumbs items={[{ label: "الموقع والتواصل" }]} /><span className="eyebrow light-eyebrow">أقرب مما تتصور</span><h1>مكانك معروف، <span>وخطوتك بسيطة.</span></h1><p>اختر الطريقة المناسبة للتواصل، أو افتح اتجاهات المركز على خرائط Google.</p></div></section>
    <section className="section contact-section"><div className="container contact-grid"><div className="contact-details"><span className="eyebrow">فرع محايل عسير</span><h2>نحن في <span>محايل عسير.</span></h2><div className="contact-info"><div><span className="contact-icon"><MapPin size={24} /></span><div><h3>العنوان</h3><p>{site.address}</p><a href={site.maps} target="_blank" rel="noopener noreferrer">فتح الاتجاهات <ArrowUpLeft size={16} /></a></div></div><div><span className="contact-icon"><Phone size={24} /></span><div><h3>الهاتف</h3><a href={`tel:${site.phone}`} dir="ltr">{site.displayPhone}</a></div></div><div><span className="contact-icon"><Clock3 size={24} /></span><div><h3>أوقات الزيارة</h3><p>تحقق من ساعات العمل الحالية عبر <a href={site.maps} target="_blank" rel="noopener noreferrer">ملف Google Maps</a>، وتواصل قبل الحضور لتأكيد موعدك.</p></div></div></div><div className="contact-actions"><a className="button button-dark" href={contactHref()}><ContactIcon width={21} height={21} /> اتصل بالفرع</a><a className="button button-outline-dark" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> افتح الاتجاهات</a></div></div><div className="map-wrap"><iframe title="خريطة فرع مركز دار البديع للحجامة في محايل عسير" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="map-caption"><MapPin size={18} /><span>دار البديع · فرع محايل عسير</span><a href={site.maps} target="_blank" rel="noopener noreferrer" aria-label="فتح الخريطة في Google Maps"><ArrowUpLeft size={18} /></a></div></div></div></section></main>;
}

