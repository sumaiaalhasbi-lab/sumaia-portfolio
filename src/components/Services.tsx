import { useState } from 'react';
import { PenLine, ShoppingCart, Video, ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WhatsAppButton } from '@/components/ui/ContactButtons';
import {
  InstagramIcon,
  TikTokIcon,
  SnapchatIcon,
  FacebookIcon,
} from '@/components/icons/BrandIcons';

type PlatformKey = 'instagram' | 'tiktok' | 'snapchat' | 'facebook';

const PILLARS = [
  {
    icon: PenLine,
    ar: {
      title: 'كتابة المحتوى الإعلاني والتسويقي',
      points: ['صياغة المحتوى الإعلاني', 'إعداد الأفكار الإبداعية للحملات التسويقية', 'إعداد الخطط التحريرية وتقويم المحتوى'],
    },
    en: {
      title: 'Advertising & Marketing Content',
      points: ['Advertising copywriting', 'Creative ideas for campaigns', 'Editorial plans & content calendars'],
    },
  },
  {
    icon: ShoppingCart,
    ar: {
      title: (
        <>
          محتوى المتاجر الإلكترونية <span dir="ltr">SEO / GEO / AEO</span>
        </>
      ),
      points: ['كتابة محتوى المتاجر الإلكترونية وإدخال البيانات والصور', 'صياغة وصف المنتجات المتوافق مع محركات البحث التقليدية والذكية'],
    },
    en: {
      title: (
        <>
          E-commerce Content <span dir="ltr">SEO / GEO / AEO</span>
        </>
      ),
      points: ['E-commerce content, data entry & images', 'Product descriptions for traditional & AI search engines'],
    },
  },
  {
    icon: Video,
    ar: {
      title: 'إدارة حسابات التواصل الاجتماعي وصناعة الفيديو',
      points: ['إدارة حسابات المنصات وتنسيق النشر والتقارير', 'كتابة سيناريوهات وصناعة فيديوهات الذكاء الاصطناعي بأسلوب إعلاني وفيديوهات الـ UGC'],
    },
    en: {
      title: 'Social Media Management & Video',
      points: ['Account management, scheduling & reports', 'AI video scripts & UGC-style advertising videos'],
    },
  },
];

const PLATFORMS: {
  key: PlatformKey;
  Icon: typeof InstagramIcon;
  ar: { name: string; title: string };
  en: { name: string; title: string };
}[] = [
  { key: 'instagram', Icon: InstagramIcon, ar: { name: 'إنستغرام', title: 'خدمات إنستغرام' }, en: { name: 'Instagram', title: 'Instagram Services' } },
  { key: 'tiktok', Icon: TikTokIcon, ar: { name: 'تيك توك', title: 'خدمات تيك توك' }, en: { name: 'TikTok', title: 'TikTok Services' } },
  { key: 'snapchat', Icon: SnapchatIcon, ar: { name: 'سناب شات', title: 'خدمات سناب شات' }, en: { name: 'Snapchat', title: 'Snapchat Services' } },
  { key: 'facebook', Icon: FacebookIcon, ar: { name: 'فيسبوك', title: 'خدمات فيسبوك' }, en: { name: 'Facebook', title: 'Facebook Services' } },
];

function platformServices(key: PlatformKey, lang: 'ar' | 'en') {
  const base = {
    ar: ['كتابة المحتوى', 'الخطط التحريرية', 'النشر والتقارير', 'سكربتات فيديو AI/UGC'],
    en: ['Content Writing', 'Editorial Plans', 'Posting & Reports', 'AI/UGC Video Scripts'],
  };
  const list = lang === 'ar' ? base.ar : base.en;
  if (key === 'instagram' || key === 'facebook') {
    list.push(lang === 'ar' ? 'إعلانات مدفوعة مستهدفة' : 'Targeted Paid Ads');
  } else {
    list.push(lang === 'ar' ? 'استراتيجية نمو المنصة' : 'Platform Growth Strategy');
  }
  return list;
}

export default function Services() {
  const { lang, t } = useApp();
  const [active, setActive] = useState<PlatformKey | null>(null);
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const activePlatform = PLATFORMS.find((p) => p.key === active);

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      {/* Heading */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
          {t('خدماتي', 'My Services')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('خدمات تصنع حضوراً رقمياً يتصدر ويبيع', 'Services that build a presence that ranks and sells')}
        </h2>
      </div>

      {/* Part A: 3 pillars */}
      <div className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          const data = lang === 'ar' ? p.ar : p.en;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark p-6 transition hover:border-accent/50 hover:-translate-y-1 hover:glow-soft"
            >
              <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-ink-light dark:text-ink-dark">{data.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {data.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-ink-light/70 dark:text-ink-dark/70">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Part B: Social platforms */}
      <div className="mt-12">
        <h3 className="mb-6 text-center text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('خدمات السوشيال ميديا', 'Social Media Services')}
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p) => {
            const data = lang === 'ar' ? p.ar : p.en;
            const Icon = p.Icon;
            return (
              <div
                key={p.key}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark p-6 text-center transition hover:border-accent/50 hover:-translate-y-1"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h4 className="text-sm font-bold text-ink-light dark:text-ink-dark">{data.title}</h4>
                <button
                  onClick={() => setActive(p.key)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition hover:bg-accent-soft"
                >
                  {t('شوف كل الخدمات', 'See All Services')} <Arrow className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activePlatform && (
        <PlatformModal
          platform={activePlatform}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}

function PlatformModal({
  platform,
  onClose,
}: {
  platform: (typeof PLATFORMS)[number];
  onClose: () => void;
}) {
  const { lang, t } = useApp();
  const Icon = platform.Icon;
  const data = lang === 'ar' ? platform.ar : platform.en;
  const services = platformServices(platform.key, lang);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-up" />
      <div
        className="relative w-full max-w-md rounded-3xl border border-accent/30 bg-bg-light dark:bg-bg-dark p-7 shadow-2xl shadow-accent/20 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-accent transition hover:bg-accent/15"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent">
            <Icon className="h-8 w-8" />
          </span>
          <h3 className="mt-4 text-lg font-extrabold text-ink-light dark:text-ink-dark">{data.title}</h3>
        </div>

        <ul className="mt-6 space-y-3">
          {services.map((s, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl border border-accent/15 bg-card-light dark:bg-card-dark px-4 py-3 text-sm font-semibold text-ink-light/80 dark:text-ink-dark/80"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" />
              </span>
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <WhatsAppButton
            variant="solid"
            label={t('اسأل عن هذه الخدمات', 'Ask About These Services')}
          />
        </div>
      </div>
    </div>
  );
}
