import { useEffect, useState } from 'react';
import { Sparkles, PenTool, Users, ShoppingBag, Video, TrendingUp } from 'lucide-react';
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
        {/* القسم النصي */}
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

        {/* القسم البصري: دوائر متوهجة خلف صورتك مباشرة بنفس إخراج الصورة المرجعية */}
        <div className="order-2 relative flex items-center justify-center animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="relative flex h-[400px] w-full max-w-[480px] items-end justify-center sm:h-[450px]">
            {/* الإضاءة الخلفية الدائرية المتدرجة */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-80"
              style={{
                background: 'radial-gradient(circle, rgba(244,123,32,0.5) 0%, rgba(244,123,32,0.15) 45%, transparent 72%)',
              }}
            />

            {/* الدائرة الخلفية المتوهجة 1 (يمين - رسم بياني لنمو المبيعات والأرباح) */}
            <div
              style={{
                background: 'radial-gradient(circle, rgba(244,123,32,0.35) 0%, rgba(244,123,32,0.06) 70%)',
                boxShadow: '0 0 35px rgba(244,123,32,0.35), inset 0 0 20px rgba(244,123,32,0.3)',
              }}
              className="animate-float absolute top-14 right-2 sm:right-4 grid h-28 w-28 sm:h-32 sm:w-32 place-items-center rounded-full border-2 border-[#f47b20]/60 backdrop-blur-sm"
            >
              <TrendingUp className="h-12 w-12 sm:h-14 sm:w-14 text-[#f47b20] drop-shadow-[0_0_12px_rgba(244,123,32,0.8)]" />
            </div>

            {/* الدائرة الخلفية المتوهجة 2 (يسار علوي - الجمهور والعملاء والوصول) */}
            <div
              style={{
                animationDelay: '1.2s',
                background: 'radial-gradient(circle, rgba(244,123,32,0.35) 0%, rgba(244,123,32,0.06) 70%)',
                boxShadow: '0 0 35px rgba(244,123,32,0.35), inset 0 0 20px rgba(244,123,32,0.3)',
              }}
              className="animate-float absolute top-8 left-4 sm:left-6 grid h-28 w-28 sm:h-32 sm:w-32 place-items-center rounded-full border-2 border-[#f47b20]/60 backdrop-blur-sm"
            >
              <Users className="h-12 w-12 sm:h-14 sm:w-14 text-[#f47b20] drop-shadow-[0_0_12px_rgba(244,123,32,0.8)]" />
            </div>

            {/* الدائرة الخلفية المتوهجة 3 (أسفل يمين - كتابة المحتوى الإبداعي) */}
            <div
              style={{
                animationDelay: '1.8s',
                background: 'radial-gradient(circle, rgba(244,123,32,0.3) 0%, rgba(244,123,32,0.05) 70%)',
                boxShadow: '0 0 30px rgba(244,123,32,0.3), inset 0 0 15px rgba(244,123,32,0.25)',
              }}
              className="animate-float absolute bottom-12 right-4 sm:right-6 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full border-2 border-[#f47b20]/50 backdrop-blur-sm"
            >
              <PenTool className="h-10 w-10 sm:h-12 sm:w-12 text-[#f47b20] drop-shadow-[0_0_10px_rgba(244,123,32,0.8)]" />
            </div>

            {/* الدائرة الخلفية المتوهجة 4 (أسفل يسار - المتاجر الإلكترونية وفيديوهات AI) */}
            <div
              style={{
                animationDelay: '0.7s',
                background: 'radial-gradient(circle, rgba(244,123,32,0.3) 0%, rgba(244,123,32,0.05) 70%)',
                boxShadow: '0 0 30px rgba(244,123,32,0.3), inset 0 0 15px rgba(244,123,32,0.25)',
              }}
              className="animate-float absolute bottom-10 left-4 sm:left-6 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full border-2 border-[#f47b20]/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5 text-[#f47b20] drop-shadow-[0_0_10px_rgba(244,123,32,0.8)]">
                <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9" />
                <Video className="h-8 w-8 sm:h-9 sm:w-9" />
              </div>
            </div>

            {/* صورتك الشخصية المفرغة في المقدمة ومندمجة بسلاسة من الأسفل */}
            <img
              src={PROFILE_PHOTO}
              alt="Sumaia Al-Hasbi"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
              className="relative z-10 h-[360px] w-auto object-contain object-bottom drop-shadow-[0_0_30px_rgba(244,123,32,0.45)] sm:h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
