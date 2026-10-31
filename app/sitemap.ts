import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/about", "/contact", "/faq", "/booking", ...services.map(({ slug }) => `/services/${slug}`)];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(path === "/booking" || path === "/" || path === "/faq" ? "2026-10-31" : path === "/about" || path === "/services" ? "2026-10-12" : "2026-09-30"), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : path === "/services" || path === "/booking" ? 0.9 : path.startsWith("/services/") ? 0.8 : 0.6 }));
}

