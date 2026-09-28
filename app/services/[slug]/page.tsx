import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, MapPin, Phone } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { WhatsAppIcon } from "@/components/icons";
import { getService, services } from "@/lib/services";
import { site, siteUrl, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${service.title} | دار البديع`, description: service.description, images: [{ url: service.image, alt: service.imageAlt }] },
  };
}

export default async function Service({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== slug);
  const schema = [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}/services/${slug}#service`, name: service.title, description: service.description, serviceType: "الحجامة", provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "City", name: "خميس مشيط" }, url: `${siteUrl}/services/${slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl }, { "@type": "ListItem", position: 2, name: service.title, item: `${siteUrl}/services/${slug}` }] },
  ];
  return <main id="main">
    <section className="page-hero service-hero"><div className="container"><Breadcrumbs items={[{ label: service.title }]} /><div className="page-hero-grid"><div><span className="eyebrow light-eyebrow">{service.eyebrow} · {site.branch}</span><h1>{service.title}</h1><p>{service.intro}</p><div className="hero-actions"><a className="button button-cream" href={whatsappLink(`السلام عليكم، أود الاستفسار عن ${service.shortTitle} في فرع خميس مشيط.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21} /> استفسر عن موعد <ArrowLeft size={18} aria-hidden="true" /></a><a className="button button-outline-light" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /> اتصال مباشر</a></div></div><div className="page-hero-photo"><Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 760px) 92vw, 43vw" className="cover-image" /></div></div></div></section>
    <section className="section service-details"><div className="container"><div className="section-heading"><div><span className="eyebrow">تفاصيل تساعدك</span><h2>خطوات واضحة <span>لزيارتك.</span></h2></div><p>المعلومات التالية تسهّل التواصل والتنظيم؛ تفاصيل الجلسة وملاءمتها يوضحها لك المختص في المركز.</p></div><div className="detail-grid">{service.details.map((detail, index) => <article key={detail.title}><span>0{index + 1}</span><h3>{detail.title}</h3><p>{detail.body}</p></article>)}</div></div></section>
    <section className="section local-band"><div className="container local-grid"><div><span className="eyebrow">فرع خميس مشيط</span><h2>الوجهة: <span>حي النزهة.</span></h2><p>المركز في خميس مشيط، ويمكنك فتح الاتجاهات مباشرة على خرائط Google قبل التوجه للفرع.</p><a className="text-link" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> افتح الاتجاهات <ArrowUpLeft size={17} aria-hidden="true" /></a></div><div className="local-image"><Image src={site.images.facade} alt="واجهة المبنى في حي النزهة الذي يقع فيه المركز" fill sizes="(max-width: 760px) 92vw, 34vw" className="cover-image" /></div></div></section>
    <section className="section faq-section"><div className="container compact-container"><span className="eyebrow">أسئلة حول الخدمة</span><h2>أشياء قد تود معرفتها.</h2><div className="faq-list">{service.questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><Link className="text-link" href="/faq">كل الأسئلة الشائعة <ArrowUpLeft size={17} aria-hidden="true" /></Link></div></section>
    <section className="section related-section"><div className="container"><span className="eyebrow">استكشف أيضًا</span><h2>صفحات قد تهمك.</h2><div className="related-grid">{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}>{item.shortTitle}<ArrowUpLeft size={20} aria-hidden="true" /></Link>)}</div></div></section>
    <BookingCta heading="تواصل مع فرع خميس مشيط" copy="اسأل عن الخدمة والتكلفة والمواعيد المتاحة قبل زيارتك." />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </main>;
}
