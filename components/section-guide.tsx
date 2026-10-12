"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, Compass } from "lucide-react";

const sections = [
  { id: "services", label: "أنواع الحجامة" },
  { id: "center", label: "عن المركز" },
  { id: "gallery", label: "واجهة الفرع" },
  { id: "location", label: "الموقع" },
];

export function SectionGuide() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const current = sections.find((section) => visible.has(section.id));
      if (current) setActive(current.id);
    }, { rootMargin: "-180px 0px -24px 0px", threshold: 0 });

    for (const section of sections) {
      const target = document.getElementById(section.id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-guide container" aria-label="التنقل بين أقسام الصفحة الرئيسية">
      <span className="section-guide-label"><Compass size={18} strokeWidth={1.6} aria-hidden="true" /> اكتشف دار البديع</span>
      <div className="section-guide-links">
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={() => setActive(section.id)}>
            <span aria-hidden="true">0{index + 1}</span>{section.label}<ArrowDownRight size={13} aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
