"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-heading, .type-card, .care-grid > div, .journey-grid article, .gallery-item, .about-grid > div, .catalog-card, .audience-card, .detail-grid article, .location-grid > div",
    ));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight - 20) continue;
      element.dataset.reveal = "pending";
      observer.observe(element);
    }

    function showAll() {
      observer.disconnect();
      for (const element of elements) delete element.dataset.reveal;
    }
    function onPreferenceChange() {
      if (preference.matches) showAll();
    }
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      preference.removeEventListener("change", onPreferenceChange);
      showAll();
    };
  }, [pathname]);

  return null;
}
