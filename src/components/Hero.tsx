import { useEffect, useState } from 'react';
import { Sparkles, PenTool, ShoppingBag, Video, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WhatsAppButton } from '@/components/ui/ContactButtons';

const PROFILE_PHOTO = '/images/sumaia-cutout.png';

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
    <section id="home" className="relative overflow-hidden pt-28 pb-14 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute top-32 left-10 h-96 w-96 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-10">
        <div className="order-1 flex flex-col gap-6 animate-fade-up">
          <span
            style={{
              backgroundColor: 'rgba(244, 123, 32, 0.14)',
              borderColor: '#f47b20',
              boxShadow: '0 4px 20px rgba(244, 123, 32, 0.25)',
            }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-bold text-ink-light dark:text-white"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
            {t('متاحة للعمل عن بُعد', 'Available for Remote Work')}
          </span>

          <h1 className="text-[24px] font-bold leading-[1.45] tracking-tight sm:text-[32px] sm:leading-[1.4]">
            <span className="block text-ink-light dark:text-white">
              {t('تبحث عن شريك محترف', 'Looking for a professional partner')}
            </span>
            <span className="mt-2 block min-h-[1.6em]" style={{ color: '#f47b20' }}>
              {displayedText}
              <span className="ms-0.5 inline-block animate-pulse font-normal text-ink-light dark:text-white">|</span>
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
            {t(
              'أساعدك في بناء حضور رقمي قوي لعلامتك التجارية من خلال كتابة المحتوى الإعلاني والتسويقي لمنصات التواصل الاجتماعي، وإعداد الخطط التحريرية للحملات، وصياغة محتوى ووصف منتجات المتاجر الإلكترونية بأسلوب بيعي متوافق مع محركات البحث والذكاء الاصطناعي.',
              'I help you build a strong digital presence for your brand through advertising and marketing content for social platforms, editorial plans for campaigns, and e-commerce product copy optimized for search engines and AI.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <WhatsAppButton variant="solid" />
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/60 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent"
            >
              <Sparkles className="h-4 w-4" />
              {t('استعرض خدماتي', 'Explore My Services')}
            </a>
          </div>
        </div>

        <div className="order-2 relative flex items-center justify-center animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="relative flex h-[380px] w-full max-w-[450px] items-end justify-center sm:h-[420px]">
            {/* إضاءة خلفية ناعمة */}
            <div
              className="pointer-events-none absolute top-4 h-[290px] w-[290px] rounded-full blur-3xl opacity-65 sm:h-[330px] sm:w-[330px]"
              style={{
                background: 'radial-gradient(circle, rgba(244,123,32,0.45) 0%, rgba(244,123,32,0.12) 55%, transparent 75%)',
              }}
            />

            {/* نصف دائرة متوهجة تبدأ من الأعلى وتتلاشى بنعومة عند الكتفين */}
            <div
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 68%)',
                maskImage: 'linear-gradient(to bottom, black 35%, transparent 68%)',
              }}
              className="pointer-events-none absolute top-8 h-[300px] w-[300px] rounded-full border-2 border-[#f47b20]/45 bg-[#f47b20]/[0.04] sm:h-[330px] sm:w-[330px]"
            />

            <div
              style={{
                background: 'rgba(15, 15, 18, 0.85)',
                boxShadow: '0 8px 25px rgba(244, 123, 32, 0.25)',
              }}
              className="animate-float absolute top-14 right-2 z-20 flex items-center gap-2 rounded-2xl border border-[#f47b20]/40 px-3.5 py-2.5 backdrop-blur-md sm:right-4"
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f47b20]/20 text-[#f47b20]">
                <TrendingUp className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-white">{t('نمو المبيعات', 'Sales Growth')}</span>
            </div>

            <div
              style={{
                animationDelay: '1.1s',
                background: 'rgba(15, 15, 18, 0.85)',
                boxShadow: '0 8px 25px rgba(244, 123, 32, 0.25)',
              }}
              className="animate-float absolute top-10 left-2 z-20 flex items-center gap-2 rounded-2xl border border-[#f47b20]/40 px-3.5 py-2.5 backdrop-blur-md sm:left-4"
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f47b20]/20 text-[#f47b20]">
                <PenTool className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-white">{t('محتوى إبداعي', 'Creative Copy')}</span>
            </div>

            <div
              style={{
                animationDelay: '1.8s',
                background: 'rgba(15, 15, 18, 0.85)',
                boxShadow: '0 8px 25px rgba(244, 123, 32, 0.25)',
              }}
              className="animate-float absolute bottom-28 left-0 z-20 flex items-center gap-2 rounded-2xl border border-[#f47b20]/40 px-3.5 py-2.5 backdrop-blur-md sm:left-2"
            >
              <span className="flex items-center gap-1 text-[#f47b20]">
                <ShoppingBag className="h-4 w-4" />
                <Video className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-white">{t('متاجر & AI', 'Stores & AI')}</span>
            </div>

            <img
              src={PROFILE_PHOTO}
              alt="Sumaia Al-Hasbi"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 62% 58% at 50% 38%, black 42%, rgba(0,0,0,0.35) 65%, transparent 88%)',
                maskImage:
                  'radial-gradient(ellipse 62% 58% at 50% 38%, black 42%, rgba(0,0,0,0.35) 65%, transparent 88%)',
              }}
              className="relative z-10 h-[340px] w-auto object-contain object-bottom sm:h-[390px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
