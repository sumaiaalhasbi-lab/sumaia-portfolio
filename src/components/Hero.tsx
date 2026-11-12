import { useEffect, useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WhatsAppButton } from '@/components/ui/ContactButtons';
import { WhatsAppIcon, LinkedInIcon } from '@/components/icons/BrandIcons';
import { WHATSAPP_URL, LINKEDIN_URL } from '@/data/links';

const PROFILE_PHOTO = '/Upright_Niqab_Portrait_in_Soft_Bokeh.png';

const TYPING_WORDS_AR = [
  'لإدارة المحتوى التسويقي؟',
  'لإدارة حسابات التواصل الاجتماعي؟',
  'لرفع ووصف منتجات المتاجر الإلكترونية؟',
  'لإنتاج فيديوهات الذكاء الاصطناعي؟',
  'لصياغة محتوى الحملات الإبداعية؟',
];

const TYPING_WORDS_EN = [
  'to manage your marketing content?',
  'to manage your social media accounts?',
  'to write & upload e-commerce products?',
  'to produce AI advertising videos?',
  'to craft creative campaign copy?',
];

export default function Hero() {
  const { lang, t } = useApp();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  const words = lang === 'ar' ? TYPING_WORDS_AR : TYPING_WORDS_EN;

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (phase === 'pausing') {
      const pauseTimer = setTimeout(() => setPhase('deleting'), 900);
      return () => clearTimeout(pauseTimer);
    }

    const speed = phase === 'deleting' ? 22 : 40;
    const timer = setTimeout(() => {
      if (phase === 'typing') {
        const next = currentWord.slice(0, displayedText.length + 1);
        setDisplayedText(next);
        if (next.length >= currentWord.length) {
          setPhase('pausing');
        }
      } else {
        const next = currentWord.slice(0, Math.max(0, displayedText.length - 1));
        setDisplayedText(next);
        if (next.length === 0) {
          setWordIndex((prev) => (prev + 1) % words.length);
          setPhase('typing');
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, phase, wordIndex, words]);

  useEffect(() => {
    setDisplayedText('');
    setPhase('typing');
    setWordIndex(0);
  }, [lang]);

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 left-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-12">
        <div className="order-1 flex flex-col gap-6 animate-fade-up">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-ink-light dark:text-white">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {t('متاحة للعمل عن بُعد', 'Available for Remote Work')}
          </span>

          <h1 className="text-[22px] font-bold leading-[1.5] tracking-tight sm:text-[28px] sm:leading-[1.45]">
            <span className="block text-ink-light dark:text-white">
              {t('تبحث عن شريك محترف', 'Looking for a professional partner')}
            </span>
            <span className="mt-2 block min-h-[1.6em]" style={{ color: '#f47b20' }}>
              {displayedText}
              <span className="ms-0.5 inline-block animate-pulse font-normal text-ink-light dark:text-white">|</span>
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
            {t(
              'أساعدك في بناء حضور رقمي قوي لعلامتك التجارية من خلال كتابة المحتوى الإعلاني والتسويقي لمنصات التواصل الاجتماعي، وإعداد الخطط التحريرية للحملات، وصياغة محتوى ووصف منتجات المتاجر الإلكترونية بأسلوب بيعي متوافق مع محركات البحث والذكاء الاصطناعي.',
              'I help you build a strong digital presence for your brand through advertising and marketing content for social platforms, editorial plans for campaigns, and e-commerce product copy optimized for search engines and AI.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <WhatsAppButton variant="solid" />
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent"
            >
              <Sparkles className="h-4 w-4" />
              {t('استعرض خدماتي', 'Explore My Services')}
            </a>
          </div>
        </div>

        <div className="order-2 flex justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-2xl" />

            <div className="relative rounded-[24px] border border-accent/30 bg-card-light dark:bg-card-dark p-6 shadow-2xl shadow-accent/10 glow-soft">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl blur-md" style={{ backgroundColor: 'rgba(244, 123, 32, 0.4)' }} />
                  <img
                    src={PROFILE_PHOTO}
                    alt="Sumaia Al-Hasbi"
                    className="relative rounded-2xl object-cover object-top"
                    style={{ width: '100px', height: '125px', boxShadow: '0 0 0 2px #f47b20' }}
                  />
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-ink-light dark:text-ink-dark">
                  {t('سمية الحاصبي', 'Sumaia Al-Hasbi')}
                </h2>
                <p className="text-xs text-ink-light/50 dark:text-ink-dark/50" dir="ltr">Sumaia Al-Hasbi</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-accent">
                  {t('متاحة للتعاقد الشهري والمشاريع', 'Available for Monthly & Project Work')}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  { ar: 'كتابة المحتوى التسويقي والإعلاني للمنصات', en: 'Marketing & advertising content for platforms' },
                  {
                    ar: <>كتابة وصف المنتجات المتوافق مع <span dir="ltr">(SEO / GEO / AEO)</span> وإدارة المتاجر</>,
                    en: <>Product descriptions aligned with <span dir="ltr">(SEO / GEO / AEO)</span> & store management</>,
                  },
                  {
                    ar: <>صناعة فيديوهات الذكاء الاصطناعي بأسلوب إعلاني وكذلك <span dir="ltr">UGC</span></>,
                    en: <>AI video creation in an advertising style and <span dir="ltr">UGC</span></>,
                  },
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-light/80 dark:text-ink-dark/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{lang === 'ar' ? b.ar : b.en}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-center gap-3 border-t border-accent/15 pt-5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white hover:scale-105"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white hover:scale-105"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
