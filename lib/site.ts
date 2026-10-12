export const site = {
  name: "مركز دار البديع للحجامة",
  branch: "فرع أبها",
  legalName: "مركز دار البديع للحجامة (فرع أبها)",
  phone: "+966172312916",
  displayPhone: "017 231 2916",
  address: "شارع البديع الرئيسي، أبها 61461، المملكة العربية السعودية",
  shortAddress: "شارع البديع الرئيسي، أبها",
  // Enable WhatsApp after the branch confirms its number.
  whatsapp: null as string | null,
  maps: "https://maps.app.goo.gl/KTxDgjh4C1CDJ1EK9?g_st=ac",
  placeId: "ChIJ8bzYugGr_BURYikT-ULH14g",
  latitude: 18.2242386,
  longitude: 42.5870234,
  images: {
    facade: "/images/abha-facade.webp",
    emblem: "/images/brand-emblem.webp",
  },
} as const;

export const siteUrl = (process.env.SITE_URL || "https://dar-albadie-abha.vercel.app").replace(/\/$/, "");

export const mapEmbedUrl = `https://maps.google.com/maps?q=${site.latitude}%2C${site.longitude}&z=17&output=embed`;

export const contactHref = (message?: string) => {
  if (!site.whatsapp) return `tel:${site.phone}`;
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
};

export const contactLabel = site.whatsapp ? "احجز عبر واتساب" : "احجز بالاتصال";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: site.legalName,
  url: siteUrl,
  telephone: site.phone,
  logo: `${siteUrl}${site.images.emblem}`,
  image: [`${siteUrl}${site.images.facade}`],
  address: {
    "@type": "PostalAddress",
    streetAddress: "شارع البديع الرئيسي",
    addressLocality: "أبها",
    addressRegion: "عسير",
    postalCode: "61461",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.latitude,
    longitude: site.longitude,
  },
  hasMap: site.maps,
  areaServed: { "@type": "City", name: "أبها" },
  availableLanguage: "ar-SA",
};

