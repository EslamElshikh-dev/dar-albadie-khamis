export const site = {
  name: "مركز دار البديع للحجامة",
  branch: "فرع محايل عسير",
  legalName: "مركز دار البديع للحجامة (فرع محايل عسير)",
  phone: "+966539833342",
  displayPhone: "053 983 3342",
  address: "محايل عسير 63412، منطقة عسير، المملكة العربية السعودية",
  shortAddress: "محايل عسير",
  // Enable WhatsApp after the branch confirms its number.
  whatsapp: null as string | null,
  maps: "https://maps.app.goo.gl/6DrSea32u3SDrAAk8?g_st=ac",
  placeId: "ChIJU_rIYACF5BURq4t_AClEFaE",
  latitude: 18.5128948,
  longitude: 42.0654819,
  images: {
    facade: "/images/muhayil-facade.webp",
    emblem: "/images/brand-emblem.webp",
  },
} as const;

export const siteUrl = (process.env.SITE_URL || "https://dar-albadie-muhayil.vercel.app").replace(/\/$/, "");

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
    addressLocality: "محايل عسير",
    addressRegion: "عسير",
    postalCode: "63412",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.latitude,
    longitude: site.longitude,
  },
  hasMap: site.maps,
  areaServed: { "@type": "City", name: "محايل عسير" },
  availableLanguage: "ar-SA",
};

