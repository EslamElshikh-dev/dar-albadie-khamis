import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, MapPin, Menu, Phone, ArrowLeft } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { AnnouncementTicker } from "./announcement-ticker";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

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
          <span className="brand-copy"><strong>دار البديع</strong><small>للحجامة · خميس مشيط</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
        <a className="header-cta" href={whatsappLink("السلام عليكم، أرغب في الاستفسار عن موعد في فرع خميس مشيط.")} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon width={20} height={20} /> احجز موعدك
        </a>
        <details className="mobile-nav">
          <summary aria-label="فتح قائمة التنقل"><Menu size={25} aria-hidden="true" /><span>القائمة</span></summary>
          <nav aria-label="التنقل للجوال">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowUpLeft size={16} aria-hidden="true" /></Link>)}</nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <div className="brand footer-brand"><BrandMark /><span className="brand-copy"><strong>دار البديع</strong><small>للحجامة · خميس مشيط</small></span></div>
          <p>تعرّف على فرع خميس مشيط وخدمات الحجامة وأقسام المركز، ثم تواصل معنا لتأكيد تفاصيل زيارتك.</p>
          <a className="footer-address" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /><span>{site.shortAddress}</span><ArrowUpLeft size={16} aria-hidden="true" /></a>
        </div>
        <nav className="footer-links" aria-label="روابط الموقع"><h2>تصفّح الموقع</h2>{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
        <nav className="footer-links" aria-label="الخدمات والأقسام"><h2>الأنواع والأقسام</h2>{services.filter((service) => service.category !== "overview").map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.shortTitle}</Link>)}</nav>
        <div className="footer-contact"><span className="footer-contact-kicker">تواصل مع فرع خميس مشيط</span><h2>جاهزين لاستفسارك</h2><p>اسأل عن الخدمة والمواعيد المتاحة قبل الحضور.</p><a className="footer-phone" href={`tel:${site.phone}`} aria-label={`اتصل بالمركز على ${site.displayPhone}`}><Phone size={18} aria-hidden="true" /><bdi dir="ltr">{site.displayPhone}</bdi></a><a className="footer-whatsapp" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={18} height={18} /> تواصل عبر واتساب <ArrowUpLeft size={16} aria-hidden="true" /></a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} مركز دار البديع للحجامة · فرع خميس مشيط</span><span className="developer-credit">تصميم وتطوير <strong>المهندس إسلام الشيخ</strong></span></div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="طرق التواصل السريعة">
      <a className="floating-whatsapp" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="التواصل عبر واتساب"><WhatsAppIcon width={27} height={27} /></a>
      <a className="floating-phone" href={`tel:${site.phone}`} aria-label="الاتصال بمركز دار البديع"><Phone size={23} aria-hidden="true" /></a>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link>{items.map((item) => <span key={item.label} className="crumb"><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function BookingCta({ heading = "جاهز تستفسر عن موعدك؟", copy = "تواصل مع فرع خميس مشيط مباشرة، وخذ التفاصيل التي تحتاجها قبل الزيارة." }: { heading?: string; copy?: string }) {
  return <section className="booking-cta"><div className="container booking-inner"><div><span className="eyebrow light-eyebrow">التواصل المباشر</span><h2>{heading}</h2><p>{copy}</p></div><div className="booking-buttons"><a className="button button-cream" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21} /> احجز عبر واتساب <ArrowLeft size={18} aria-hidden="true" /></a><a className="button button-outline-light" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /> اتصل بالمركز</a></div></div></section>;
}
