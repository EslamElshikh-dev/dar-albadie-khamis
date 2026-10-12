import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, ArrowUp, MapPin, Phone, ArrowLeft, Layers3 } from "lucide-react";
import { ContactIcon } from "./icons";
import { AnnouncementTicker } from "./announcement-ticker";
import { DeveloperSignature } from "./developer-signature";
import { SiteNavigation } from "./site-navigation";
import { services } from "@/lib/services";
import { site, contactHref, contactLabel } from "@/lib/site";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/about", label: "عن المركز" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "الموقع والتواصل" },
];

function BrandMark({ eager = false }: { eager?: boolean }) {
  return <span className="brand-symbol" aria-hidden="true"><Image src="/images/brand-emblem.webp" alt="" width={60} height={60} loading={eager ? "eager" : "lazy"} /></span>;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <AnnouncementTicker />
      <div className="container header-main">
        <Link className="brand" href="/" aria-label="دار البديع للحجامة — الرئيسية">
          <BrandMark eager />
          <span className="brand-copy"><strong>دار البديع</strong><small>للحجامة · أبها</small></span>
        </Link>
        <SiteNavigation items={links} bookingUrl={contactHref()} />
        <a className="header-cta" href={contactHref("السلام عليكم، أرغب في الاستفسار عن موعد في فرع أبها.")}>
          <ContactIcon width={20} height={20} /> احجز موعدك
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-lead"><div><span className="eyebrow">دار البديع · فرع أبها</span><h2>دليل زيارتك، <span>من هنا.</span></h2></div><a className="footer-back-top" href="#main">العودة للأعلى <ArrowUp size={17} aria-hidden="true" /></a></div>
      <div className="container footer-top">
        <div className="footer-intro">
          <div className="brand footer-brand"><BrandMark /><span className="brand-copy"><strong>دار البديع</strong><small>للحجامة · أبها</small></span></div>
          <p>تعرّف على فرع أبها وخدمات الحجامة وأقسام المركز، ثم تواصل معنا لتأكيد تفاصيل زيارتك.</p>
          <a className="footer-address" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /><span>{site.shortAddress}</span><ArrowUpLeft size={16} aria-hidden="true" /></a>
        </div>
        <nav className="footer-links" aria-label="روابط الموقع"><h2>تصفّح الموقع</h2>{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
        <nav className="footer-links" aria-label="الخدمات والأقسام"><h2>الأنواع والأقسام</h2>{services.filter((service) => service.category !== "overview").map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.shortTitle}</Link>)}</nav>
        <div className="footer-contact"><span className="footer-contact-kicker">تواصل مع فرع أبها</span><h2>جاهزين لاستفسارك</h2><p>اسأل عن الخدمة والمواعيد المتاحة قبل الحضور.</p><a className="footer-phone" href={`tel:${site.phone}`} aria-label={`اتصل بالمركز على ${site.displayPhone}`}><Phone size={18} aria-hidden="true" /><bdi dir="ltr">{site.displayPhone}</bdi></a><a className="footer-whatsapp" href={contactHref()} aria-label="الحجز والتواصل مع فرع دار البديع بأبها"><ContactIcon width={22} height={22} /> {contactLabel} <ArrowUpLeft size={16} aria-hidden="true" /></a></div>
      </div>
      <div className="container footer-bottom"><p className="footer-rights">© {new Date().getFullYear()} دار البديع للحجامة<span>جميع الحقوق محفوظة.</span></p><DeveloperSignature /></div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <>
      <div className="floating-actions" aria-label="طرق التواصل السريعة">
        <a className="floating-whatsapp" href={contactHref()} aria-label="التواصل عبر الهاتف"><ContactIcon width={29} height={29} /><span className="floating-action-label">الهاتف</span></a>
        <a className="floating-phone" href={site.maps} target="_blank" rel="noopener noreferrer" aria-label="اتجاهات فرع أبها على خرائط Google"><MapPin size={23} aria-hidden="true" /></a>
      </div>
      <nav className="mobile-quick-actions" aria-label="الوصول السريع للخدمات والتواصل">
        <Link href="/services"><Layers3 size={20} aria-hidden="true" /><span>الخدمات</span></Link>
        <Link href="/contact"><MapPin size={20} aria-hidden="true" /><span>الموقع</span></Link>
        <a href={`tel:${site.phone}`}><Phone size={20} aria-hidden="true" /><span>اتصل بنا</span></a>
        <a className="quick-whatsapp" href={site.maps} target="_blank" rel="noopener noreferrer" aria-label="فتح اتجاهات فرع أبها"><MapPin size={24} aria-hidden="true" /><span>الاتجاهات</span></a>
      </nav>
    </>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link>{items.map((item) => <span key={item.label} className="crumb"><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function BookingCta({ heading = "جاهز تستفسر عن موعدك؟", copy = "تواصل مع فرع أبها مباشرة، وخذ التفاصيل التي تحتاجها قبل الزيارة." }: { heading?: string; copy?: string }) {
  return <section className="booking-cta"><div className="container booking-inner"><div><span className="eyebrow light-eyebrow">التواصل المباشر</span><h2>{heading}</h2><p>{copy}</p></div><div className="booking-buttons"><a className="button button-whatsapp" href={contactHref()}><ContactIcon width={24} height={24} /> {contactLabel} <ArrowLeft size={18} aria-hidden="true" /></a><a className="button button-outline-light" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> افتح الاتجاهات</a></div></div></section>;
}

