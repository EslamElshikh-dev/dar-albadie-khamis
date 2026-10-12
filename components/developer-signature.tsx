import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function DeveloperSignature() {
  return (
    <a className="developer-signature" href="https://eslam-elshikh.com" target="_blank" rel="noopener noreferrer" aria-label="موقع المهندس إسلام الشيخ، تصميم وتطوير، يفتح في تبويب جديد">
      <span className="studio-code-mark" aria-hidden="true"><Image src="/images/eslam-elshikh-mark.webp" alt="" width={32} height={32} unoptimized /></span>
      <span className="signature-copy">تصميم وتطوير<strong>المهندس إسلام الشيخ</strong></span>
      <ExternalLink className="signature-link-icon" size={14} strokeWidth={1.4} aria-hidden="true" />
    </a>
  );
}
