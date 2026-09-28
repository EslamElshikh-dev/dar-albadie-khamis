import Link from "next/link";
import { ArrowUpLeft, MapPin, Menu, Phone, ArrowLeft, Instagram } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/services/hijama-khamis-mushait", label: "الحجامة" },
  { href: "/about", label: "عن المركز" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "الموقع والتواصل" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="topline">
        <div className="container topline-inner">
          <span><MapPin size={14} aria-hidden="true" /> فرع خميس مشيط · حي النزهة</span>
          <a href={`tel:${site.phone}`}><Phone size={14} aria-hidden="true" /> {site.displayPhone}</a>
        </div>
      </div>
      <div className="container header-main">
        <Link className="brand" href="/" aria-label="دار البديع للحجامة — الرئيسية">
          <span className="brand-symbol" aria-hidden="true">د</span>
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
          <div className="brand footer-brand"><span className="brand-symbol" aria-hidden="true">د</span><span className="brand-copy"><strong>دار البديع</strong><small>للحجامة · خميس مشيط</small></span></div>
          <p>معلومات واضحة عن الحجامة وفرع خميس مشيط، وخطوة مباشرة للتواصل قبل زيارتك.</p>
          <a className="text-link light" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> {site.shortAddress} <ArrowUpLeft size={16} aria-hidden="true" /></a>
        </div>
        <div className="footer-links"><h2>تصفّح الموقع</h2>{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div>
        <div className="footer-links"><h2>الأقسام والخدمات</h2>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.shortTitle}</Link>)}</div>
        <div className="footer-contact"><h2>تواصل مع الفرع</h2><p>حي النزهة، خميس مشيط 62465</p><a href={`tel:${site.phone}`} dir="ltr">{site.displayPhone}</a><a className="footer-whatsapp" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={18} height={18} /> تواصل عبر واتساب</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} مركز دار البديع للحجامة · فرع خميس مشيط</span><span>تصميم وتطوير: <strong>المهندس إسلام الشيخ</strong></span></div>
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
