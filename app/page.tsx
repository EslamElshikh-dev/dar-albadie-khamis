import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Clock3, HeartHandshake, MapPin, Phone, ShieldCheck } from "lucide-react";
import { BookingCta } from "@/components/site-shell";
import { WhatsAppIcon } from "@/components/icons";
import { CuppingTypes } from "@/components/cupping-types";
import { mapEmbedUrl, site, whatsappLink } from "@/lib/site";

const photos = [
  { src: site.images.facade, alt: "واجهة المبنى الذي يقع فيه مركز دار البديع في خميس مشيط", caption: "واجهة الموقع" },
  { src: site.images.sections, alt: "مدخل الأقسام المخصصة للرجال والنساء داخل المركز", caption: "مدخل الأقسام" },
  { src: site.images.room, alt: "إحدى غرف الخدمة في المركز", caption: "من داخل المركز" },
  { src: site.images.entrance, alt: "مدخل المبنى المؤدي إلى المركز", caption: "الوصول للفرع" },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> مركز دار البديع <span className="kicker-separator" /> فرع خميس مشيط</div>
            <h1>الحجامة في خميس مشيط، <em>بداية مطمئنة لزيارتك.</em></h1>
            <p>في حي النزهة، مكان واضح الوصول، وقسمان مخصصان للرجال والنساء. تعرّف على الفرع وتواصل مباشرة لتسأل عن الخدمة والموعد المناسب لك.</p>
            <div className="hero-actions">
              <a className="button button-cream" href={whatsappLink("السلام عليكم، أود الاستفسار عن الحجامة في فرع خميس مشيط والمواعيد المتاحة.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21} /> استفسر واحجز <ArrowLeft size={19} aria-hidden="true" /></a>
              <a className="button button-outline-light" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /> موقع المركز</a>
            </div>
            <div className="hero-note"><span className="note-line" /> صورة المكان ومعلوماته أمامك قبل الحجز</div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame"><Image src={site.images.facade} alt="واجهة المبنى الذي يقع فيه مركز دار البديع للحجامة في خميس مشيط" fill priority fetchPriority="high" sizes="(max-width: 760px) 88vw, 520px" className="cover-image hero-image" /></div>
            <div className="hero-image-stamp"><Image src="/images/brand-emblem.webp" alt="" width={58} height={58} /><span><small>مركز دار البديع</small><strong>خميس مشيط</strong></span></div>
            <div className="hero-side-label">صورة حقيقية من ملف المركز</div>
            <div className="hero-visual-line" aria-hidden="true" />
          </div>
        </div>
        <div className="container hero-facts"><span><MapPin size={19} aria-hidden="true" /> حي النزهة، خميس مشيط</span><span><HeartHandshake size={19} aria-hidden="true" /> قسم للرجال وقسم للنساء</span><span><Phone size={18} aria-hidden="true" /> اتصال وواتساب للحجز</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">ثلاث مجموعات رئيسية</span><h2>أنواع الحجامة، <span>بتفاصيل أوضح.</span></h2></div><p>الرطبة والجافة والمتزحلقة؛ تعرف على فكرة كل طريقة والفرق بينها، ثم استكشف صفحتها واسأل الممارس عن ملاءمتها لك.</p></div>
          <CuppingTypes />
          <div className="services-more"><Link className="button button-outline-dark" href="/services">جميع الأنواع والأقسام <ArrowUpLeft size={18} aria-hidden="true" /></Link><span>دليل واضح لكل خدمة مدرجة في الفرع</span></div>
        </div>
      </section>

      <section className="section care-section">
        <div className="container care-grid">
          <div className="care-photo"><Image src={site.images.room} alt="غرفة خدمة من صور مركز دار البديع للحجامة" fill sizes="(max-width: 760px) 92vw, 47vw" className="cover-image" /><span className="photo-caption">من داخل فرع خميس مشيط</span></div>
          <div className="care-copy"><span className="eyebrow">قبل الزيارة</span><h2>كل ما تحتاجه، <span>في مكان واحد.</span></h2><p>القرار يبدأ بمعلومة واضحة. اعرف موقع المركز، اسأل عن الجلسة والتوقيت، وناقش أي ظروف صحية تخصك مع الممارس قبل الإجراء.</p>
            <div className="care-list"><div><span className="care-icon"><MapPin size={23} /></span><div><h3>موقع محدد</h3><p>رابط مباشر للفرع في حي النزهة، مع الاتجاهات على خرائط Google.</p></div></div><div><span className="care-icon"><Clock3 size={23} /></span><div><h3>موعد يناسبك</h3><p>تواصل مع الفرع لتأكيد المواعيد المتاحة قبل الحضور.</p></div></div><div><span className="care-icon"><ShieldCheck size={23} /></span><div><h3>استفسار قبل الجلسة</h3><p>اسأل عن تفاصيل الخدمة وشارك أي معلومات صحية مهمة مع المختص.</p></div></div></div>
            <Link href="/about" className="text-link">تعرف على المركز <ArrowUpLeft size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section journey-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">خطوتك القادمة</span><h2>من الاستفسار <span>إلى الوصول.</span></h2></div><p>ثلاث خطوات بسيطة تساعدك ترتّب زيارتك للفرع.</p></div><div className="journey-grid"><article><span>01</span><h3>تواصل مع المركز</h3><p>اتصل أو أرسل رسالة واتساب، واذكر أنك تستفسر عن فرع خميس مشيط.</p></article><article><span>02</span><h3>أكد تفاصيل موعدك</h3><p>اسأل عن التوقيت وتفاصيل الجلسة والتكلفة قبل تأكيد الحجز.</p></article><article><span>03</span><h3>توجّه إلى الفرع</h3><p>استخدم موقع Google Maps للوصول إلى حي النزهة بسهولة.</p></article></div></div></section>

      <section className="section gallery-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">صور المكان</span><h2>شوف الفرع <span>قبل ما تزوره.</span></h2></div><p>صور حقيقية منشورة من المركز على ملفه التجاري، تعرض الواجهة وبعض المساحات الداخلية.</p></div><div className="gallery-grid">{photos.map((photo, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 680px) 94vw, 34vw" className="cover-image" /><figcaption>{photo.caption}</figcaption></figure>)}</div><a className="text-link" href={site.maps} target="_blank" rel="noopener noreferrer">شاهد ملف المركز على الخرائط <ArrowUpLeft size={18} aria-hidden="true" /></a></div></section>

      <section className="section questions-teaser"><div className="container question-panel"><div className="question-decoration" aria-hidden="true">؟</div><div><span className="eyebrow">أسئلة تتكرر</span><h2>قبل الحجز، <span>خذ إجابتك.</span></h2><p>وين المركز؟ كيف أحجز؟ وهل يوجد قسم للنساء؟ جمعنا الأسئلة العملية في صفحة واحدة.</p></div><Link className="button button-dark" href="/faq">الأسئلة الشائعة <ArrowLeft size={18} aria-hidden="true" /></Link></div></section>

      <section className="section location-section" id="location" aria-labelledby="location-title">
        <div className="container location-grid">
          <div className="location-copy">
            <span className="eyebrow">الوصول إلى الفرع</span>
            <h2 id="location-title">دار البديع، <span>على الخريطة.</span></h2>
            <p>زورنا في حي النزهة بخميس مشيط. تقدر تتصفح موقع الفرع هنا، وتفتح الاتجاهات مباشرة قبل ما تتحرك.</p>
            <div className="location-address"><span className="location-address-icon"><MapPin size={24} aria-hidden="true" /></span><div><small>عنوان الفرع</small><strong>{site.address}</strong></div></div>
            <div className="location-actions"><a className="button button-dark" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /> افتح الاتجاهات <ArrowUpLeft size={18} aria-hidden="true" /></a><a className="location-call" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /> اتصل قبل الزيارة</a></div>
          </div>
          <div className="location-map"><iframe title="خريطة مركز دار البديع للحجامة، فرع خميس مشيط" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="location-map-caption"><span><MapPin size={17} aria-hidden="true" /> فرع خميس مشيط · حي النزهة</span><a href={site.maps} target="_blank" rel="noopener noreferrer">عرض في خرائط Google <ArrowUpLeft size={16} aria-hidden="true" /></a></div></div>
        </div>
      </section>
      <BookingCta />
    </main>
  );
}
