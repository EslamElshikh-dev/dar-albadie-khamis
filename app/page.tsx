import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, ArrowDown, Clock3, HeartHandshake, MapPin, Phone, ShieldCheck, Droplet, UsersRound, Navigation } from "lucide-react";
import { BookingCta } from "@/components/site-shell";
import { ContactIcon } from "@/components/icons";
import { CuppingTypes } from "@/components/cupping-types";
import { SectionGuide } from "@/components/section-guide";
import { mapEmbedUrl, site, contactHref } from "@/lib/site";

const visitPaths = [
  { href: "/services", title: "أنواع الحجامة", copy: "تعرّف على الطرق والفرق بينها", icon: Droplet },
  { href: "/services/hijama-men", title: "قسم الرجال", copy: "تفاصيل القسم والحجز", icon: UsersRound },
  { href: "/services/hijama-women", title: "قسم النساء", copy: "رتّبي تفاصيل زيارتك", icon: HeartHandshake },
  { href: "/contact", title: "الوصول للفرع", copy: "الموقع وطرق التواصل", icon: Navigation },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> مركز دار البديع <span className="kicker-separator" /> فرع محايل عسير</div>
            <h1>الحجامة في محايل، <em>بداية مطمئنة لزيارتك.</em></h1>
            <p>في محايل عسير، مكان واضح الوصول، وقسمان مخصصان للرجال والنساء. تعرّف على الفرع وتواصل مباشرة لتسأل عن الخدمة والموعد المناسب لك.</p>
            <div className="hero-actions">
              <a className="button button-cream" href={contactHref("السلام عليكم، أود الاستفسار عن الحجامة في فرع محايل عسير والمواعيد المتاحة.")}><ContactIcon width={21} height={21} /> استفسر واحجز <ArrowLeft size={19} aria-hidden="true" /></a>
              <a className="button button-outline-light" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /> موقع المركز</a>
            </div>
            <div className="hero-proof" aria-label="خبرة المركز وفروعه">
              <div><strong><bdi dir="ltr">٩+</bdi></strong><span>سنوات في الحجامة</span></div>
              <div><strong>٣</strong><span>فروع في عسير</span></div>
              <div><strong className="hero-proof-audience">رجال ونساء</strong><span>أقسام مخصصة</span></div>
            </div>
            <a className="hero-discover" href="#visit-paths"><span><ArrowDown size={17} aria-hidden="true" /></span> اكتشف طريق زيارتك</a>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="hero-image-frame"><Image src={site.images.facade} alt="واجهة مركز دار البديع للحجامة في محايل عسير، مع مدخل الفرع" fill priority fetchPriority="high" sizes="(max-width: 760px) 88vw, 520px" className="cover-image hero-image" /></div>
            <Link className="hero-facade-card" href="/contact"><span className="hero-facade-photo muhayil-direction-mark"><MapPin size={40} strokeWidth={1.2} aria-hidden="true" /></span><span className="hero-facade-copy"><strong>الوصول لمحايل عسير</strong><ArrowUpLeft size={15} aria-hidden="true" /></span></Link>
            <div className="hero-image-stamp"><Image src="/images/brand-emblem.webp" alt="" width={76} height={76} /><span><small>مركز دار البديع</small><strong>محايل عسير</strong></span></div>
            <div className="hero-side-label">دار البديع · محايل عسير</div>
            <div className="hero-visual-caption"><span>واجهة فرع محايل عسير</span><strong>تفاصيل أقرب لك.</strong></div>
            <div className="hero-visual-line" aria-hidden="true" />
          </div>
        </div>
        <div className="container hero-facts"><span><MapPin size={19} aria-hidden="true" /> محايل عسير</span><span><HeartHandshake size={19} aria-hidden="true" /> قسم للرجال وقسم للنساء</span><span><Phone size={18} aria-hidden="true" /> اتصال مباشر للحجز</span></div>
      </section>

      <nav className="container visit-paths" id="visit-paths" aria-label="اختر مسار زيارتك">
        <div className="visit-paths-heading"><span>خطوتك الأولى</span><strong>ابدأ من هنا.</strong></div>
        <div className="visit-paths-grid">{visitPaths.map((path) => {
          const Icon = path.icon;
          return <Link href={path.href} key={path.href}><span className="visit-path-icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span><span className="visit-path-copy"><strong>{path.title}</strong><small>{path.copy}</small></span><ArrowUpLeft className="visit-path-arrow" size={16} aria-hidden="true" /></Link>;
        })}</div>
      </nav>

      <SectionGuide />

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">ثلاث مجموعات رئيسية</span><h2>أنواع الحجامة، <span>بتفاصيل أوضح.</span></h2></div><p>الرطبة والجافة والمتزحلقة؛ تعرف على فكرة كل طريقة والفرق بينها، ثم استكشف صفحتها واسأل الممارس عن ملاءمتها لك.</p></div>
          <CuppingTypes />
          <div className="services-more"><Link className="button button-outline-dark" href="/services">جميع الأنواع والأقسام <ArrowUpLeft size={18} aria-hidden="true" /></Link><span>تعرّف على الأنواع وأكد تفاصيل الخدمة مع الفرع</span></div>
        </div>
      </section>

      <section className="section care-section" id="center">
        <div className="container care-grid">
          <div className="care-photo muhayil-brand-story"><div className="muhayil-story-orbit" aria-hidden="true" /><Image src={site.images.emblem} alt="شعار مركز دار البديع للحجامة" width={240} height={240} sizes="(max-width: 760px) 190px, 240px" /><span className="eyebrow">دار البديع في عسير</span><strong>دار البديع</strong><p>خبرة تزيد على ٩ سنوات<br />وثلاثة فروع في عسير.</p><span className="muhayil-story-location"><MapPin size={16} aria-hidden="true" /> دار البديع · فرع محايل عسير</span></div>
          <div className="care-copy"><span className="eyebrow">دار البديع للحجامة</span><h2>خبرة تجمعنا، <span>وتفاصيل تهمك.</span></h2><p>بخبرة تزيد على ٩ سنوات وثلاثة فروع في أبها وخميس مشيط ومحايل عسير، نعرّفك هنا بفرع محايل عسير وأقسامه. اعرف المكان، وتواصل مع المختص لتناقش تفاصيل الجلسة وما يناسب حالتك قبل الزيارة.</p>
            <div className="care-list"><div><span className="care-icon"><MapPin size={23} /></span><div><h3>موقع محدد</h3><p>رابط مباشر للفرع في محايل عسير، مع الاتجاهات على خرائط Google.</p></div></div><div><span className="care-icon"><Clock3 size={23} /></span><div><h3>موعد يناسبك</h3><p>تواصل مع الفرع لتأكيد المواعيد المتاحة قبل الحضور.</p></div></div><div><span className="care-icon"><ShieldCheck size={23} /></span><div><h3>استفسار قبل الجلسة</h3><p>اسأل عن تفاصيل الخدمة وشارك أي معلومات صحية مهمة مع المختص.</p></div></div></div>
            <Link href="/about" className="text-link">تعرف على المركز <ArrowUpLeft size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section journey-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">خطوتك القادمة</span><h2>من الاستفسار <span>إلى الوصول.</span></h2></div><p>ثلاث خطوات بسيطة تساعدك ترتّب زيارتك للفرع.</p></div><div className="journey-grid"><article><span>01</span><h3>تواصل مع المركز</h3><p>اتصل بالمركز، واذكر أنك تستفسر عن فرع محايل عسير.</p></article><article><span>02</span><h3>أكد تفاصيل موعدك</h3><p>اسأل عن التوقيت وتفاصيل الجلسة والتكلفة قبل تأكيد الحجز.</p></article><article><span>03</span><h3>توجّه إلى الفرع</h3><p>استخدم موقع Google Maps للوصول إلى محايل عسير بسهولة.</p></article></div></div></section>

      <section className="section gallery-section" id="gallery"><div className="container"><div className="section-heading"><div><span className="eyebrow">واجهة فرع محايل عسير</span><h2>اعرف المكان <span>قبل ما تزوره.</span></h2></div><p>صورة الواجهة من ملف فرع محايل عسير على خرائط Google، لتتعرف على المدخل قبل الوصول.</p></div><div className="muhayil-gallery-grid"><figure className="muhayil-gallery-photo"><Image src={site.images.facade} alt="واجهة فرع محايل عسير لمركز دار البديع للحجامة وقت المساء" fill sizes="(max-width: 760px) 92vw, 66vw" className="cover-image" /><figcaption><MapPin size={16} aria-hidden="true" /> دار البديع · فرع محايل عسير</figcaption></figure><div className="muhayil-gallery-note"><span className="eyebrow">وجهتك واضحة</span><h3>وجهتك في <span>محايل عسير.</span></h3><p>افتح الاتجاهات إلى الفرع، واتصل لتأكيد موعدك قبل ما تتحرك.</p><div className="muhayil-gallery-address"><MapPin size={21} aria-hidden="true" /><span>{site.address}</span></div><a className="button button-dark" href={site.maps} target="_blank" rel="noopener noreferrer">موقع فرع محايل عسير <ArrowUpLeft size={17} aria-hidden="true" /></a><a className="text-link" href={contactHref()}><Phone size={17} aria-hidden="true" /><bdi dir="ltr">{site.displayPhone}</bdi></a></div></div></div></section>

      <section className="section questions-teaser"><div className="container question-panel"><div className="question-decoration" aria-hidden="true">؟</div><div><span className="eyebrow">أسئلة تتكرر</span><h2>قبل الحجز، <span>خذ إجابتك.</span></h2><p>وين المركز؟ كيف أحجز؟ وهل يوجد قسم للنساء؟ جمعنا الأسئلة العملية في صفحة واحدة.</p></div><Link className="button button-dark" href="/faq">الأسئلة الشائعة <ArrowLeft size={18} aria-hidden="true" /></Link></div></section>

      <section className="section location-section" id="location" aria-labelledby="location-title">
        <div className="container location-grid">
          <div className="location-copy">
            <span className="eyebrow">الوصول إلى الفرع</span>
            <h2 id="location-title">دار البديع، <span>على الخريطة.</span></h2>
            <p>زورنا في محايل عسير. تقدر تتصفح موقع الفرع هنا، وتفتح الاتجاهات مباشرة قبل ما تتحرك.</p>
            <div className="location-address"><span className="location-address-icon"><MapPin size={24} aria-hidden="true" /></span><div><small>عنوان الفرع</small><strong>{site.address}</strong></div></div>
            <div className="location-actions"><a className="button button-dark" href={site.maps} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /> افتح الاتجاهات <ArrowUpLeft size={18} aria-hidden="true" /></a><a className="location-call" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /> اتصل قبل الزيارة</a></div>
          </div>
          <div className="location-map"><iframe title="خريطة مركز دار البديع للحجامة، فرع محايل عسير" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="location-map-caption"><span><MapPin size={17} aria-hidden="true" /> دار البديع · فرع محايل عسير</span><a href={site.maps} target="_blank" rel="noopener noreferrer">عرض في خرائط Google <ArrowUpLeft size={16} aria-hidden="true" /></a></div></div>
        </div>
      </section>
      <BookingCta />
    </main>
  );
}

