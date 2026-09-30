import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, Check, MapPin, Phone } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { WhatsAppIcon } from "@/components/icons";
import { getService, services } from "@/lib/services";
import { site, siteUrl, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${service.title} | دار البديع`, description: service.description, url: `/services/${slug}`, images: [{ url: service.image, alt: service.imageAlt }] },
  };
}

export default async function Service({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== slug && item.category === service.category).slice(0, 3);
  const schema = [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}/services/${slug}#service`, name: service.title, description: service.description, serviceType: service.shortTitle, provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "City", name: "خميس مشيط" }, url: `${siteUrl}/services/${slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "الخدمات", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${slug}` },
    ] },
  ];

  return <main id="main">
    <section className="page-hero service-hero">
      <div className="container">
        <Breadcrumbs items={[{ label: "الخدمات", href: "/services" }, { label: service.shortTitle }]} />
        <div className="page-hero-grid">
          <div className="service-hero-copy">
            <span className="eyebrow light-eyebrow">{service.eyebrow} · {site.branch}</span>
            <h1>{service.title}</h1>
            <p>{service.intro}</p>
            <div className="hero-actions">
              <a className="button button-cream" href={whatsappLink(`السلام عليكم، أود الاستفسار عن ${service.shortTitle} في فرع خميس مشيط.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21} /> استفسر عن موعد <ArrowLeft size={18} aria-hidden="true" /></a>
              <a className="button button-outline-light" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /> اتصال مباشر</a>
            </div>
            <div className="service-hero-foot"><span>01</span><span>تعريف واضح · أسئلة قبل الحجز · موقع الفرع</span></div>
          </div>
          <figure className="service-visual">
            <div className="service-visual-frame"><Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 760px) 92vw, 43vw" className="cover-image" /></div>
            <figcaption>{service.imageCaption}</figcaption>
            <span className="service-visual-orbit" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>

    <section className="section service-explainer">
      <div className="container explainer-grid">
        <div className="explainer-index"><span className="eyebrow">عن الخدمة</span><strong>01 / الفكرة</strong><span className="explainer-rule" /></div>
        <div className="explainer-copy"><h2>{service.overview.heading}</h2>{service.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="text-link" href="/services">تعرّف على بقية الخدمات <ArrowUpLeft size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="section service-details">
      <div className="container">
        <div className="section-heading"><div><span className="eyebrow">خطوة بخطوة</span><h2>قبل الجلسة، <span>اعرف التفاصيل.</span></h2></div><p>استفسارات عملية تساعدك في الحديث مع المركز. يوضح المختص ملاءمة الإجراء وطريقته لحالتك.</p></div>
        <div className="detail-grid">{service.details.map((detail, index) => <article key={detail.title}><span>0{index + 1}</span><h3>{detail.title}</h3><p>{detail.body}</p></article>)}</div>
      </div>
    </section>

    <section className="section service-preparation">
      <div className="container prep-grid">
        <div><span className="eyebrow light-eyebrow">قبل الزيارة</span><h2>أسئلة صغيرة،<br /><span>قرار أوضح.</span></h2><p>يمكنك حفظ هذه النقاط وطرحها عند الاتصال أو عبر واتساب، ثم تأكيد الموعد والتكلفة مباشرة مع الفرع.</p><a className="button button-cream" href={whatsappLink(`السلام عليكم، أود معرفة تفاصيل ${service.shortTitle} ومواعيد فرع خميس مشيط.`)} target="_blank" rel="noopener noreferrer">اسأل عبر واتساب <ArrowLeft size={18} aria-hidden="true" /></a></div>
        <ol>{service.preparation.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p><Check size={19} aria-hidden="true" /></li>)}</ol>
      </div>
    </section>

    <section className="section local-band"><div className="container local-grid"><div><span className="eyebrow">فرع خميس مشيط</span><h2>الوجهة: <span>حي النزهة.</span></h2><p>يمكنك فتح الاتجاهات مباشرة قبل التوجه إلى المركز. تأكد من موعدك وتفاصيل الجلسة مع الفرع أولًا.</p><a className="text-link" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> افتح الاتجاهات <ArrowUpLeft size={17} aria-hidden="true" /></a></div><div className="local-image"><Image src={site.images.facade} alt="واجهة المبنى في حي النزهة الذي يقع فيه المركز" fill sizes="(max-width: 760px) 92vw, 34vw" className="cover-image" /></div></div></section>

    <section className="section faq-section"><div className="container compact-container"><span className="eyebrow">أسئلة حول الخدمة</span><h2>إجابات قبل الحجز.</h2><div className="faq-list">{service.questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><p className="service-source">للتعرف على الحجامة وحدود الأبحاث حولها: <a href="https://www.nccih.nih.gov/health/cupping" target="_blank" rel="noopener noreferrer">المركز الوطني الأمريكي للصحة التكميلية والتكاملية <ArrowUpLeft size={14} aria-hidden="true" /></a></p></div></section>

    <section className="section related-section"><div className="container"><div className="related-heading"><div><span className="eyebrow">استكشف أيضًا</span><h2>صفحات قد تهمك.</h2></div><Link className="text-link" href="/services">جميع الخدمات <ArrowUpLeft size={17} aria-hidden="true" /></Link></div><div className="related-grid">{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span>{item.shortTitle}<small>{item.eyebrow}</small></span><ArrowUpLeft size={20} aria-hidden="true" /></Link>)}</div></div></section>
    <BookingCta heading="تواصل مع فرع خميس مشيط" copy="اسأل عن طريقة الجلسة والتكلفة والمواعيد المتاحة قبل زيارتك." />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </main>;
}
