import { Pause, Play, Sparkles } from "lucide-react";

const announcements = [
  "مركز دار البديع للطب البديل فرع خميس مشيط",
  "مجموعة مراكز دار البديع للطب البديل والحجامة",
  "خبرة أكثر من 9 سنوات",
  "أول مركز مرخص من المركز الوطني للطب البديل والتكميلي في المنطقة الجنوبية",
];

export function AnnouncementTicker() {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="announcement-badge" aria-hidden="true"><Sparkles size={15} /> دار البديع</span>
        <input className="announcement-toggle" type="checkbox" id="announcement-paused" aria-label="إيقاف حركة الشريط" />
        <label className="announcement-control" htmlFor="announcement-paused" title="إيقاف حركة الشريط أو تشغيلها">
          <Pause className="ticker-pause" size={14} aria-hidden="true" />
          <Play className="ticker-play" size={14} aria-hidden="true" />
        </label>
        <p className="visually-hidden">{announcements.join(" | ")}</p>
        <div className="announcement-window" tabIndex={0} role="region" aria-label="أخبار المركز؛ مرّر لقراءة الشريط عند تقليل الحركة">
          <div className="announcement-track" aria-hidden="true">
            {[0, 1].map((copy) => <div className="announcement-group" key={copy}>
              {announcements.map((message) => <span className="announcement-item" dir="rtl" key={message}>{message}<span className="announcement-divider" aria-hidden="true">✦</span></span>)}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
