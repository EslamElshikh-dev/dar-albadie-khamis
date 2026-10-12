import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, FloatingActions } from "@/components/site-shell";
import { SiteMotion } from "@/components/site-motion";
import { localBusinessSchema, site, siteUrl } from "@/lib/site";
import "@fontsource-variable/noto-kufi-arabic/wght.css";
import "@fontsource-variable/noto-sans-arabic/wght.css";
import "./globals.css";
import "./experience.css";
import "./branch-theme.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "مركز دار البديع للحجامة | أبها", template: "%s | دار البديع للحجامة" },
  description: "مركز دار البديع للحجامة على شارع البديع الرئيسي بأبها. تعرّف على الخدمة وقسمي الرجال والنساء، واحجز مباشرة عبر الهاتف.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: site.name,
    title: "مركز دار البديع للحجامة | فرع أبها",
    description: "تعرف على المركز، الأقسام، الموقع وطرق الحجز المباشر على شارع البديع الرئيسي، أبها.",
    images: [{ url: site.images.facade, width: 1200, height: 900, alt: "واجهة فرع مركز دار البديع للحجامة في أبها" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#123e40" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body data-branch="abha">
        <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingActions />
        <SiteMotion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}

