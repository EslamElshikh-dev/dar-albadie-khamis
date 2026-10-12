"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpLeft, MapPin, Menu } from "lucide-react";
import { WhatsAppIcon } from "./icons";

type NavItem = { href: string; label: string };

export function SiteNavigation({ items, bookingUrl }: { items: NavItem[]; bookingUrl: string }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    menu.open = false;

    function closeOutside(event: PointerEvent) {
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  }

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  function current(href: string) {
    return pathname === href ? "page" as const : isActive(href) ? "location" as const : undefined;
  }

  return (
    <>
      <nav className="desktop-nav" aria-label="التنقل الرئيسي">
        {items.map((item) => <Link href={item.href} key={item.href} data-active={isActive(item.href) || undefined} aria-current={current(item.href)}>{item.label}</Link>)}
      </nav>
      <details className="mobile-nav" ref={menuRef} onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuRef.current?.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label="قائمة الموقع"><Menu size={23} aria-hidden="true" /><span>القائمة</span></summary>
        <div className="mobile-nav-panel">
          <div className="mobile-nav-heading"><span>دليل زيارتك</span><strong>دار البديع · خميس مشيط</strong></div>
          <nav aria-label="التنقل للجوال">
            {items.map((item, index) => <Link href={item.href} key={item.href} data-active={isActive(item.href) || undefined} aria-current={current(item.href)} onClick={closeMenu}><span><small aria-hidden="true">0{index + 1}</small>{item.label}</span><ArrowUpLeft size={17} aria-hidden="true" /></Link>)}
          </nav>
          <div className="mobile-nav-actions">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}><WhatsAppIcon width={18} height={18} /> احجز عبر واتساب</a>
            <Link href="/contact" onClick={closeMenu}><MapPin size={17} aria-hidden="true" /> موقع الفرع</Link>
          </div>
        </div>
      </details>
    </>
  );
}
