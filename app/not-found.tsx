import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="not-found container"><span className="eyebrow">404</span><h1>الصفحة غير موجودة</h1><p>يمكنك العودة إلى الرئيسية أو التواصل مع فرع خميس مشيط مباشرة.</p><Link className="button button-dark" href="/">العودة للرئيسية</Link></main>;
}
