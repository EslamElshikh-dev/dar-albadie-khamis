import type { Metadata } from "next";
import { ArrowUpLeft } from "lucide-react";
import { Breadcrumbs, BookingCta } from "@/components/site-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "الأسئلة الشائعة عن الحجامة والفرع", description: "إجابات عملية عن موقع مركز دار البديع للحجامة في خميس مشيط، الحجز، أقسام الرجال والنساء والاستفسار قبل الجلسة.", alternates: { canonical: "/faq" } };

const questions = [
  { q: "أين يقع فرع دار البديع في خميس مشيط؟", a: "يقع الفرع في حي النزهة، 2395، خميس مشيط 62465. يمكنك فتح الموقع مباشرة عبر رابط خرائط Google في صفحة التواصل." },
  { q: "كيف أحجز موعدًا؟", a: "اتصل بالفرع على 055 933 3985 أو راسله على واتساب لتسأل عن المواعيد المتاحة وتؤكد موعد زيارتك." },
  { q: "هل يوجد قسم للرجال وآخر للنساء؟", a: "نعم، تظهر لوحات قسمي الرجال والنساء في الصور التي نشرها المركز لفرع خميس مشيط على خرائط Google. يمكن تأكيد تفاصيل القسم والموعد بالاتصال قبل الزيارة." },
  { q: "كم سعر جلسة الحجامة؟", a: "لم ننشر سعرًا ثابتًا؛ تواصل مع الفرع لمعرفة تفاصيل الخدمة والتكلفة الحالية قبل تأكيد الحجز." },
  { q: "هل يمكنني عمل الحجامة إذا كنت أتناول أدوية أو لدي حالة صحية؟", a: "ملاءمة الإجراء تختلف بحسب الحالة. أخبر الممارس المختص عن حالتك وأدويتك قبل الجلسة، واطلب تقييمه بدل الاعتماد على معلومات عامة في الموقع." },
  { q: "ما أوقات عمل المركز؟", a: "قد تتغير الساعات في المناسبات والأيام المختلفة. راجع ساعات العمل المعروضة حاليًا على ملف Google Maps، وتواصل مع الفرع لتأكيد موعدك قبل الحضور." },
  { q: "هل يمكن إجراء الحجامة في المنزل؟", a: "المعلومات المتاحة لهذا الفرع تخص الخدمة داخل المركز. تواصل معه مباشرة إن أردت السؤال عن أي خيارات أخرى؛ لا يعرض هذا الموقع خدمة منزلية." },
];

export default function FAQ() {
  return <main id="main"><section className="page-hero simple-hero"><div className="container"><Breadcrumbs items={[{ label: "الأسئلة الشائعة" }]} /><span className="eyebrow light-eyebrow">إجابات سريعة</span><h1>استفسارك <span>له مكان.</span></h1><p>أهم الأسئلة العملية عن الحجز والموقع والأقسام قبل زيارة فرع خميس مشيط.</p></div></section><section className="section faq-page"><div className="container faq-page-grid"><div className="faq-intro"><span className="eyebrow">اسأل براحتك</span><h2>معلومات تساعدك <span>تبدأ صح.</span></h2><p>إن لم تجد إجابة سؤالك هنا، فريق الفرع متاح عبر الاتصال أو واتساب.</p><a className="text-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">تواصل مع المركز <ArrowUpLeft size={18} aria-hidden="true" /></a></div><div className="faq-list">{questions.map(({ q, a }, index) => <details key={q} open={index === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section><BookingCta /></main>;
}
