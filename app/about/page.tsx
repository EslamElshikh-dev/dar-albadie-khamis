import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, MapPin, Phone, UsersRound } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "عن المركز وفرع خميس مشيط", description: "تعرف على فرع مركز دار البديع للحجامة في حي النزهة بخميس مشيط، أقسامه، موقعه وطرق التواصل المباشر.", alternates: { canonical: "/about" } };

export default function About() {
  return <main id="main"><section className="page-hero simple-hero"><div className="container"><Breadcrumbs items={[{ label: "عن المركز" }]} /><span className="eyebrow light-eyebrow">عن فرع خميس مشيط</span><h1>دار البديع؛ <span>مكان تعرفه قبل ما توصله.</span></h1><p>صفحة مختصرة عن الفرع وموقعه وما يظهر في ملفه التجاري، لتكون تفاصيل الزيارة واضحة من البداية.</p></div></section>
    <section className="section about-section"><div className="container about-grid"><div className="about-photo"><Image src={site.images.sections} alt="لوحات توجيه قسمي الرجال والنساء داخل المركز" fill priority sizes="(max-width: 760px) 90vw, 46vw" className="cover-image" /></div><div className="about-copy"><span className="eyebrow">فرع خميس مشيط</span><h2>الحجامة مع <span>سهولة الوصول والتواصل.</span></h2><p>يقع فرع مركز دار البديع للحجامة في حي النزهة، خميس مشيط. تظهر الصور التي نشرها المركز في ملفه على Google Maps مدخل المبنى، غرفة خدمة، ولوحات توجه إلى قسمي الرجال والنساء.</p><p>يمكنك الاستفسار عن المواعيد وتفاصيل الجلسة عبر الهاتف أو واتساب، واستخدام رابط الاتجاهات للوصول إلى الموقع. إذا كانت لديك ظروف صحية أو تتناول أدوية، ناقش ذلك مع الممارس المختص قبل الإجراء.</p><div className="about-points"><div><MapPin size={22} /><span>حي النزهة، خميس مشيط</span></div><div><UsersRound size={22} /><span>قسم للرجال وقسم للنساء</span></div><div><Phone size={22} /><span>تواصل مباشر مع الفرع</span></div></div><Link className="text-link" href="/contact">الوصول إلى المركز <ArrowUpLeft size={18} aria-hidden="true" /></Link></div></div></section><BookingCta /></main>;
}
