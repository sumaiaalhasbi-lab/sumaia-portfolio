import { useEffect, useRef, useState } from 'react';
import { Award, Briefcase, ShoppingCart, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Ticker() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const items = [
    {
      icon: Award,
      title: t('+4 سنوات خبرة', '+4 Years Experience'),
      sub: t('في السوق الخليجي - كتابة المحتوى، والتسويق وإدارة حسابات التواصل والمتاجر', 'In the Gulf market - Content writing, marketing & social/store management'),
    },
    {
      icon: Briefcase,
      title: t('نموذج عمل مرن', 'Flexible Work Model'),
      sub: t('توظيف شهري، عن بُعد • تنفيذ مشاريع مستقلة', 'Monthly remote hiring • Freelance project execution'),
    },
    {
      icon: ShoppingCart,
      title: t('إدارة متكاملة للمتاجر الإلكترونية و SEO', 'Full E-commerce & SEO Management'),
      sub: t('محتوى بيعي • إدخال بيانات • صور • تحسين الظهور (AEO / GEO)', 'Sales copy • Data entry • Images • Search visibility (AEO / GEO)'),
    },
    {
      icon: Sparkles,
      title: t('صناعة محتوى إعلاني بالذكاء الاصطناعي AI', 'AI Advertising Content Creation'),
      sub: t('فيديوهات إعلانية احترافية وكتابة سكربتات بيعية مقنعة', 'Professional ad videos & persuasive sales scripts'),
    },
  ];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;

    const tick = () => {
      if (!paused && !isDragging.current && el) {
        el.scrollLeft += 0.8;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    setPaused(true);
    startX.current = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!isDragging.current || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollStart.current - (x - startX.current);
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="border-y border-accent/20 bg-card-light/80 dark:bg-[#0d0d10] py-4 select-none">
      <div
        ref={trackRef}
        dir="ltr"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { isDragging.current = false; setPaused(false); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
        className="no-scrollbar flex overflow-x-auto cursor-grab active:cursor-grabbing"
      >
        <div className="flex w-max items-center gap-6 px-4">
          {[...items, ...items].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} dir="rtl" className="flex shrink-0 items-center gap-3.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#f47b20]/30 bg-[#f47b20]/10 text-[#f47b20]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-ink-light dark:text-white">{item.title}</div>
                  <div className="text-xs text-ink-light/70 dark:text-white/65">{item.sub}</div>
                </div>
                <span className="mr-4 h-2 w-2 rounded-full bg-[#f47b20]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
