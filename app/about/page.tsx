import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Clock3, MapPin, UsersRound } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { site, branches } from "@/lib/site";

export const metadata: Metadata = {
  title: "عن دار البديع للحجامة وفروعه",
  description: "تعرف على مركز دار البديع للحجامة، بخبرة تزيد على ٩ سنوات و٣ فروع في أبها وخميس مشيط ومحايل عسير، وأقسام مخصصة للرجال والنساء.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main id="main">
      <section className="page-hero simple-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "عن المركز" }]} />
          <span className="eyebrow light-eyebrow">عن مركز دار البديع للحجامة</span>
          <h1>دار البديع؛ <span>خبرة تزيد على ٩ سنوات في الحجامة.</span></h1>
          <p>ثلاثة فروع في أبها وخميس مشيط ومحايل عسير، ومختصون للرجال والنساء يتمتعون بكفاءة عالية وخبرة في مجال الحجامة.</p>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-photo">
            <Image src={site.images.facade} alt="واجهة فرع أبها لمركز دار البديع للحجامة" fill priority sizes="(max-width: 760px) 90vw, 46vw" className="cover-image" />
          </div>
          <div className="about-copy">
            <span className="eyebrow">خبرة المركز وفروعه</span>
            <h2>من أبها، <span>إلى خميس مشيط ومحايل عسير.</span></h2>
            <p>مركز دار البديع للحجامة هو أول مركز مرخص من المركز الوطني للطب البديل والتكميلي في أبها. بخبرة تزيد على ٩ سنوات في مجال الحجامة، يضم المركز مختصين للرجال والنساء يتمتعون بكفاءة عالية وخبرة في تقديم خدمات الحجامة.</p>
            <p>تتوزع فروع المركز الثلاثة بين أبها وخميس مشيط ومحايل عسير. يعرّفك هذا الموقع بفرع أبها على شارع البديع الرئيسي، وأقسامه وخدماته وطرق الحجز والتواصل معه.</p>
            <div className="about-points">
              <div><Clock3 size={22} aria-hidden="true" /><span>خبرة تزيد على ٩ سنوات</span></div>
              <div><MapPin size={22} aria-hidden="true" /><span>٣ فروع في منطقة عسير</span></div>
              <div><UsersRound size={22} aria-hidden="true" /><span>مختصون للرجال والنساء</span></div>
            </div>
            <Link className="text-link" href="/contact">الوصول إلى فرع أبها <ArrowUpLeft size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section journey-section" aria-labelledby="branches-title">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">فروع دار البديع</span><h2 id="branches-title">٣ فروع، <span>بخبرة تجمعنا.</span></h2></div>
            <p>اختر الفرع المناسب لك، واستكشف خدماته وموقعه وطرق التواصل معه.</p>
          </div>
          <div className="journey-grid">
            {branches.map((branch, index) => (
              <article key={branch.name}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{branch.name}</h3>
                <p>{branch.description}</p>
                {branch.isCurrent
                  ? <Link className="text-link" href={branch.href}>الموقع والتواصل <ArrowUpLeft size={18} aria-hidden="true" /></Link>
                  : <a className="text-link" href={branch.href} target="_blank" rel="noopener noreferrer" aria-label={`زيارة موقع دار البديع — فرع ${branch.name}`}>زيارة موقع الفرع <ArrowUpLeft size={18} aria-hidden="true" /></a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingCta />
    </main>
  );
}

