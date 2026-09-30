import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpLeft, MapPin } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { serviceAudiences, serviceMethods, services } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "خدمات وأنواع الحجامة في خميس مشيط",
  description: "دليل خدمات الحجامة في فرع دار البديع بحي النزهة: الجافة والمتزحلقة والعلاجية والرأس والوجه، وخدمات الرجال والنساء وكبار السن.",
  alternates: { canonical: "/services" },
  openGraph: { title: "أنواع الحجامة في مركز دار البديع | خميس مشيط", description: "اختر الخدمة واقرأ تفاصيلها وأسئلتها قبل التواصل مع الفرع.", url: "/services", images: [{ url: "/images/cupping-cups.webp", alt: "صورة توضيحية لكؤوس الحجامة" }] },
};

export default function Services() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدمات الحجامة في مركز دار البديع بخميس مشيط",
    itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.shortTitle, url: `${siteUrl}/services/${service.slug}` })),
  };
  return <main id="main">
    <section className="page-hero services-hub-hero"><div className="container">
      <Breadcrumbs items={[{ label: "الخدمات" }]} />
      <div className="hub-hero-grid"><div><span className="eyebrow light-eyebrow">دليل الخدمات · {site.branch}</span><h1>لكل جلسة <span>حكاية واضحة.</span></h1><p>تعرّف على طرق الحجامة والخدمات المدرجة للفرع، واقرأ ما يهمك قبل الاتصال. يوضح الممارس الطريقة المناسبة وتفاصيلها بعد معرفة حالتك الصحية.</p><div className="hub-hero-links"><a className="button button-cream" href="#methods">استكشف الطرق <ArrowLeft size={18} aria-hidden="true" /></a><a className="button button-outline-light" href="#audiences">الأقسام والخدمات</a></div></div><figure className="hub-hero-image"><Image src="/images/cupping-cups.webp" alt="صورة توضيحية لكؤوس الحجامة وليست من داخل الفرع" fill priority sizes="(max-width: 760px) 92vw, 38vw" className="cover-image" /><figcaption>صورة توضيحية للأدوات</figcaption></figure></div>
    </div></section>

    <section className="section service-catalog" id="methods"><div className="container">
      <div className="catalog-heading"><div><span className="eyebrow">01 / طرق وأسماء الخدمات</span><h2>اختر ما تريد <span>أن تعرفه.</span></h2></div><p>تختلف طريقة التطبيق من خدمة لأخرى. تعرض الصفحات الفكرة والأسئلة المناسبة قبل الحجز دون افتراض نتيجة علاجية.</p></div>
      <div className="catalog-grid">{serviceMethods.map((service, index) => <Link className="catalog-card" href={`/services/${service.slug}`} key={service.slug}><div className="catalog-image"><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 680px) 90vw, (max-width: 1024px) 45vw, 31vw" className="cover-image" /><span>{service.imageCaption}</span></div><div className="catalog-copy"><span className="catalog-count"><bdi dir="ltr">0{index + 1} / 0{serviceMethods.length}</bdi></span><small>{service.eyebrow}</small><h3>{service.shortTitle}</h3><p>{service.intro}</p><span className="catalog-link">اقرأ دليل الخدمة <ArrowUpLeft size={18} aria-hidden="true" /></span></div></Link>)}</div>
    </div></section>

    <section className="section audience-section" id="audiences"><div className="container"><div className="catalog-heading"><div><span className="eyebrow">02 / الأقسام والخدمات الموجهة</span><h2>زيارة تناسب <span>استفسارك.</span></h2></div><p>تعرف على الأقسام الظاهرة في الفرع والخدمة المدرجة لكبار السن، ثم أكد ترتيبات الموعد مع المركز.</p></div><div className="audience-grid">{serviceAudiences.map((service, index) => <Link href={`/services/${service.slug}`} key={service.slug} className="audience-card"><span className="audience-number">0{index + 1}</span><div><span className="eyebrow">{service.eyebrow}</span><h3>{service.shortTitle}</h3><p>{service.description}</p></div><ArrowUpLeft size={23} aria-hidden="true" /></Link>)}</div></div></section>

    <section className="section hub-note"><div className="container hub-note-grid"><span className="hub-note-mark" aria-hidden="true">؟</span><div><span className="eyebrow light-eyebrow">لم تجد الاسم المناسب؟</span><h2>ابدأ من دليل الحجامة العام.</h2><p>إذا لم تكن متأكدًا من الفرق بين الأنواع، ابدأ بصفحة الخدمة الرئيسية ثم اسأل الفرع عن طريقة الجلسة وتكلفتها وملاءمتها لك.</p></div><Link className="button button-cream" href="/services/hijama-khamis-mushait">دليل الحجامة <ArrowLeft size={18} aria-hidden="true" /></Link></div></section>
    <section className="section hub-location"><div className="container hub-location-inner"><div><span className="eyebrow">دار البديع · خميس مشيط</span><h2>قريب منك في حي النزهة.</h2><p>يمكنك تأكيد الموعد عبر الهاتف أو واتساب ثم فتح الاتجاهات إلى الفرع.</p></div><a className="button button-dark" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> موقع المركز <ArrowUpLeft size={17} aria-hidden="true" /></a></div></section>
    <BookingCta heading="اسأل عن الجلسة المناسبة لك" copy="تواصل مع فرع خميس مشيط لتأكيد طريقة الخدمة والموعد والتكلفة قبل الحضور." />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </main>;
}
