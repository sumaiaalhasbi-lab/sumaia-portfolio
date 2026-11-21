import { useEffect, useRef, useState } from 'react';
import { Award, Briefcase, ShoppingCart, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Ticker() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const resumeTimer = useRef<number | null>(null);
  const [, forceRender] = useState(0);

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
      if (!pausedRef.current && !isDragging.current && el) {
        el.scrollLeft += 1;
        const third = el.scrollWidth / 3;
        if (third > 0 && el.scrollLeft >= third * 2) {
          el.scrollLeft -= third;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pauseAuto = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    pausedRef.current = true;
    forceRender((n) => n + 1);
  };

  const resumeLater = (delay = 2500) => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
      forceRender((n) => n + 1);
    }, delay);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    pauseAuto();
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
    if (isDragging.current) {
      isDragging.current = false;
      resumeLater(2000);
    }
  };

  return (
    <div dir="ltr" className="border-y border-accent/20 bg-card-light/80 dark:bg-[#0d0d10] py-4 select-none">
      <div
        ref={trackRef}
        dir="ltr"
        onMouseEnter={pauseAuto}
        onMouseLeave={() => { isDragging.current = false; resumeLater(500); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onTouchStart={pauseAuto}
        onTouchEnd={() => resumeLater(2500)}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        className="no-scrollbar flex overflow-x-auto cursor-grab active:cursor-grabbing"
      >
        <div className="flex w-max items-center gap-6 px-4">
          {[...items, ...items, ...items].map((item, idx) => {
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
export function About() {
  const { t } = useApp();
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-16 sm:py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
        {t('من أنا', 'About Me')}
      </span>
      <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
        {t('سمية الحاصبي — شريكك الإبداعي في صناعة المحتوى والتسويق الرقمي', 'Sumaia Al-Hasbi — Your Creative Partner in Content & Digital Marketing')}
      </h2>
      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-ink-light/80 dark:text-ink-dark/80 sm:text-lg">
        {t(
          'كاتبة محتوى تسويقي وإعلاني بخبرة تتجاوز 4 سنوات في السوق الخليجي، متخصصة في إدارة حسابات السوشيال ميديا، تخطيط الحملات الإعلانية، كتابة وصف منتجات المتاجر الإلكترونية (SEO & GEO)، وإنتاج الفيديوهات الإعلانية بالذكاء الاصطناعي (AI & UGC) لتحويل الزوار إلى عملاء دائمين.',
          'Marketing and advertising copywriter with +4 years of experience in the Gulf market, specializing in social media management, ad campaign planning, e-commerce product descriptions (SEO & GEO), and AI & UGC video production to turn visitors into loyal customers.'
        )}
      </p>
    </section>
  );
}
