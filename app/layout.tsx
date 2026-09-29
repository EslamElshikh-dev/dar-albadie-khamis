import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, FloatingActions } from "@/components/site-shell";
import { localBusinessSchema, site, siteUrl } from "@/lib/site";
import "@fontsource-variable/noto-kufi-arabic/wght.css";
import "@fontsource-variable/noto-sans-arabic/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "مركز دار البديع للحجامة | خميس مشيط", template: "%s | دار البديع للحجامة" },
  description: "مركز دار البديع للحجامة في حي النزهة بخميس مشيط. تعرّف على الخدمة وقسمي الرجال والنساء، واحجز مباشرة عبر واتساب أو الهاتف.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: site.name,
    title: "مركز دار البديع للحجامة | فرع خميس مشيط",
    description: "تعرف على المركز، الأقسام، الموقع وطرق الحجز المباشر في حي النزهة، خميس مشيط.",
    images: [{ url: site.images.facade, width: 750, height: 1184, alt: "واجهة فرع مركز دار البديع للحجامة في خميس مشيط" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#103a34" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingActions />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
