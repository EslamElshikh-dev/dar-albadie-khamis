import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", "/faq", ...services.map(({ slug }) => `/services/${slug}`)];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date("2026-09-28"), changeFrequency: path ? "monthly" : "weekly", priority: path === "" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6 }));
}
