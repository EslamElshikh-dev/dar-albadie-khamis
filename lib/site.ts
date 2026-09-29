export const site = {
  name: "مركز دار البديع للحجامة",
  branch: "فرع خميس مشيط",
  legalName: "مركز دار البديع للحجامة ( فرع خميس مشيط )",
  phone: "+966559333985",
  displayPhone: "055 933 3985",
  address: "2395، حي النزهة، خميس مشيط 62465، المملكة العربية السعودية",
  shortAddress: "حي النزهة، خميس مشيط",
  whatsapp: "https://wa.me/966559333985",
  maps: "https://www.google.com/maps/place/%D9%85%D8%B1%D9%83%D8%B2+%D8%AF%D8%A7%D8%B1+%D8%A7%D9%84%D8%A8%D8%AF%D9%8A%D8%B9+%D9%84%D9%84%D8%AD%D8%AC%D8%A7%D9%85%D8%A9+(+%D9%81%D8%B1%D8%B9+%D8%AE%D9%85%D9%8A%D8%B3+%D9%85%D8%B4%D9%8A%D8%B7+)%E2%80%AD/@18.275752,42.7361859,17z/data=!4m6!3m5!1s0x15fb590e392b7fe3:0x615cc20b06d602ad!8m2!3d18.275752!4d42.7361859!16s%2Fg%2F11yqzv4qbj",
  latitude: 18.275752,
  longitude: 42.7361859,
  images: {
    facade: "/images/facade.webp",
    sections: "/images/sections.webp",
    room: "/images/room.webp",
    entrance: "/images/entrance.webp",
  },
} as const;

export const siteUrl = (process.env.SITE_URL || "https://dar-albadie-khamis.vercel.app").replace(/\/$/, "");

export const mapEmbedUrl = `https://maps.google.com/maps?q=${site.latitude}%2C${site.longitude}&z=16&output=embed`;

export const whatsappLink = (message?: string) =>
  message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: site.name,
  url: siteUrl,
  telephone: site.phone,
  image: Object.values(site.images).map((src) => `${siteUrl}${src}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: "2395، النزهة، AKPA7141",
    addressLocality: "خميس مشيط",
    addressRegion: "عسير",
    postalCode: "62465",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.latitude,
    longitude: site.longitude,
  },
  hasMap: site.maps,
  areaServed: { "@type": "City", name: "خميس مشيط" },
  availableLanguage: "ar-SA",
};
