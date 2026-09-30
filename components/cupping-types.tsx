import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpLeft, Check, Circle, Droplet, MoveHorizontal } from "lucide-react";
import { getService } from "@/lib/services";

const groups = [
  {
    key: "wet", slug: "wet-cupping-khamis-mushait", label: "الحجامة الرطبة", icon: Droplet,
    tag: "شفط مع تشريط الجلد", description: "تختلف عن الطريقة الجافة بخروج الدم إلى الكأس، وتحتاج إلى تقييم ملاءمتها والعناية بمواضعها.",
    chips: ["تقييم قبل الجلسة", "عناية بعد الإجراء"],
    heading: "ما الذي يميز الحجامة الرطبة؟",
    detail: "تجمع الحجامة الرطبة بين الشفط بالكؤوس وتشريط الجلد وخروج الدم إلى الكأس. يبدأ اختيارها بمناقشة الحالة الصحية والأدوية مع الممارس، مع توضيح خطوات الإجراء وتعليمات العناية بمواضعه.",
    points: ["تتضمن تشريط الجلد، بخلاف الحجامة الجافة.", "تستلزم مناقشة الأدوية والتاريخ الصحي قبل الجلسة.", "اسأل عن أدوات الإجراء وتعليمات العناية بعده."],
  },
  {
    key: "dry", slug: "dry-cupping-khamis-mushait", label: "الحجامة الجافة", icon: Circle,
    tag: "كؤوس الهواء دون تشريط", description: "شفط موضعي بالكؤوس على الجلد دون تشريطه، مع تحديد مواضع التطبيق والمدة بحسب تقييم الممارس.",
    chips: ["دون تشريط", "شفط موضعي"],
    heading: "كيف تختلف الحجامة الجافة؟",
    detail: "تعتمد الحجامة الجافة، أو كؤوس الهواء، على وضع الكؤوس لإحداث شفط موضعي من دون تشريط الجلد. تُناقش مواضع التطبيق والمدة مع الممارس، وقد تظهر آثار مؤقتة على البشرة بعد إزالة الكؤوس.",
    points: ["لا تتضمن تشريط الجلد في الطريقة الجافة.", "تعتمد على شفط موضعي في المواضع المختارة.", "اذكر حساسية البشرة وأي تهيج أو مشكلة جلدية."],
  },
  {
    key: "moving", slug: "moving-cupping-khamis-mushait", label: "الحجامة المتزحلقة", icon: MoveHorizontal,
    tag: "حركة مدروسة للكأس", description: "تحريك الكأس فوق الجلد مع مادة تساعد على الانزلاق؛ وتُعرف أيضًا بالحجامة التدليكية.",
    chips: ["كأس متحرك", "تُعرف بالتدليكية"],
    heading: "ما فكرة الحجامة المتزحلقة؟",
    detail: "في الحجامة المتزحلقة يتحرك الكأس على الجلد بدل بقائه في موضع ثابت، مع استخدام مادة مناسبة تساعد على الانزلاق. يناقش الممارس منطقة التطبيق وشدة الشفط وحالة البشرة قبل الإجراء.",
    points: ["تتميز بحركة الكأس على المنطقة المحددة.", "اسأل عن المادة المستخدمة وأخبر المختص بأي حساسية.", "يحدد الممارس ملاءمتها وطريقتها بحسب حالتك."],
  },
];

export function CuppingTypes() {
  return (
    <div className="cupping-types">
      <div className="type-grid">
        {groups.map((group, index) => {
          const service = getService(group.slug)!;
          const Icon = group.icon;
          return <Link className={`type-card type-card-${group.key}`} href={`/services/${group.slug}`} key={group.key}>
            <div className="type-card-visual">
              <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 760px) 92vw, (max-width: 1024px) 46vw, 380px" className="cover-image" />
              <span className="type-card-number"><bdi dir="ltr">0{index + 1} / 03</bdi></span>
              <span className="type-card-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className="type-image-label">{service.imageCaption}</span>
            </div>
            <div className="type-card-body">
              <span className="type-tag">{group.tag}</span><h3>{group.label}</h3><p>{group.description}</p>
              <div className="type-chips">{group.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
              <span className="type-card-link">اكتشف {group.label}<span><ArrowUpLeft size={20} aria-hidden="true" /></span></span>
            </div>
          </Link>;
        })}
      </div>
      <div className="type-guide">
        <div className="type-guide-heading"><span className="eyebrow">الفرق ببساطة</span><h3>لكل طريقة <span>تفاصيلها.</span></h3><p>افتح النوع الذي يهمك، ثم تعرّف على تفاصيله في صفحته الخاصة.</p></div>
        <div className="type-accordions">
          {groups.map((group, index) => <details className={`type-detail type-detail-${group.key}`} name="cupping-type-guide" key={group.key} open={index === 0}>
            <summary><span className="type-detail-index">0{index + 1}</span><span className="type-detail-title">{group.label}<small>{group.tag}</small></span><ArrowDown className="type-detail-arrow" size={19} aria-hidden="true" /></summary>
            <div className="type-detail-content"><h4>{group.heading}</h4><p>{group.detail}</p><ul>{group.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul><Link className="text-link" href={`/services/${group.slug}`}>التفاصيل والأسئلة الشائعة <ArrowUpLeft size={17} aria-hidden="true" /></Link></div>
          </details>)}
        </div>
      </div>
    </div>
  );
}
