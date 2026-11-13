import { useEffect, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Eye, RotateCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg',
  '/images/social-2.jpg',
  '/images/social-3.jpg',
  '/images/social-4.jpg',
  '/images/social-5.jpg',
  '/images/social-6.jpg',
];

const POST_CANDIDATES = Array.from({ length: 45 }, (_, i) => [
  `/images/post (${i + 1}).jpg`,
  `/images/post (${i + 1}).png`,
  `/images/post (${i + 1}).jpeg`,
]).flat();

const INITIAL_REELS = [
  { code: 'DebbA_0tDv7', views: '12.4K' },
  { code: 'DfSMTJbt4-X', views: '18.2K' },
  { code: 'DfILeBKN6_2', views: '9.8K' },
  { code: 'DfUQAh1Nq8N', views: '15.1K' },
  { code: 'De9mdqINvBp', views: '11.5K' },
  { code: 'De6hCFCN0b1', views: '14.3K' },
  { code: 'Deyr9n7NZO9', views: '8.9K' },
  { code: 'DewEI_rtpHt', views: '16.7K' },
  { code: 'DeeMh8htqQA', views: '10.2K' },
  { code: 'DeLkQ2rtWQd', views: '13.6K' },
  { code: 'DePYchot5j2', views: '19.4K' },
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [reels, setReels] = useState(INITIAL_REELS);
  const [scripts, setScripts] = useState(IMGS);
  const [posts, setPosts] = useState(POST_CANDIDATES);

  const [hoverV, setHoverV] = useState(false);
  const [lockV, setLockV] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const [hoverP, setHoverP] = useState(false);
  const [lockP, setLockP] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getInstaUrl = (c: string) =>
    ['https:', '', '://instagram.com', 'reel', c, 'embed', 'captioned', ''].join('/');

  useEffect(() => {
    const onBlur = () => {
      const code = document.activeElement?.getAttribute('data-code');
      if (code) {
        setLockV(true);
        setActiveCode(code);
      }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  const stepVideos = (dir: 'left' | 'right') => {
    setLockV(true);
    if (tab === 'ai') {
      setReels((p) =>
        dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]
      );
    } else {
      setScripts((p) =>
        dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]
      );
    }
  };

  const stepPosts = (dir: 'left' | 'right') => {
    setLockP(true);
    setPosts((p) =>
      dir === 'right' ? [...p.slice(3), ...p.slice(0, 3)] : [...p.slice(-3), ...p.slice(0, -3)]
    );
  };
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .run-v { display: flex; width: max-content; animation: loopX 60s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 140s linear infinite; }
        .stop-all { animation: none !important; transform: translateX(0) !important; }
        .pause-hover { animation-play-state: paused !important; }
      `}</style>

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
          {t('أعمالي', 'Portfolio')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('مشاريع وأعمال تثبت النتائج', 'Projects that prove results')}
        </h2>
      </div>

      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {IMGS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-accent/25 bg-card-light dark:bg-card-dark shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.03] hover:border-[#f47b20]">
              <div className="aspect-[9/16] overflow-hidden">
                <img src={src} alt={`Account ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="videos" className="mb-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
          {lockV && (
            <button type="button" onClick={() => { setLockV(false); setActiveCode(null); }} className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent hover:text-white">
              <RotateCw className="h-3.5 w-3.5" /> {t('إعادة تحريك الشريط', 'Resume')}
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          <button onClick={() => { setTab('ai'); setLockV(false); setActiveCode(null); }} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}>
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button onClick={() => { setTab('script'); setLockV(false); setActiveCode(null); }} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}>
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div dir="ltr" onMouseEnter={() => setHoverV(true)} onMouseLeave={() => setHoverV(false)} className="overflow-hidden py-2">
          {tab === 'ai' ? (
            <div className={`run-v gap-4 ${lockV ? 'stop-all' : hoverV ? 'pause-hover' : ''}`}>
              {(lockV ? reels : [...reels, ...reels]).map((item, idx) => (
                <div key={activeCode && activeCode !== item.code ? `${item.code}-${idx}-${activeCode}` : `${item.code}-${idx}`} className={`flex w-[270px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl ${activeCode === item.code ? 'border-2 border-[#f47b20]' : 'border-accent/30'}`}>
                  <div className="h-[485px] w-full overflow-hidden">
                    <iframe data-code={item.code} src={getInstaUrl(item.code)} title={`Reel ${idx + 1}`} className="h-full w-full border-0" allowFullScreen />
                  </div>
                  <div className="flex items-center gap-1.5 border-t border-neutral-200 bg-[#121215] px-3.5 py-2 text-xs font-bold text-white">
                    <Eye className="h-4 w-4 text-white/90" />
                    <span>{item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`run-v gap-4 ${lockV ? 'stop-all' : hoverV ? 'pause-hover' : ''}`}>
              {(lockV ? scripts : [...scripts, ...scripts]).map((src, idx) => (
                <div key={idx} onClick={() => { setLockV(true); setActiveCode(src); }} className="group relative aspect-[9/16] w-[210px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg">
                  <img src={src} alt="Script" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg"><Play className="h-6 w-6 fill-white ms-0.5" /></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button type="button" onClick={() => stepVideos('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepVideos('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div id="posts">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
          {lockP && (
            <button type="button" onClick={() => setLockP(false)} className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent hover:text-white">
              <RotateCw className="h-3.5 w-3.5" /> {t('إعادة تحريك الشريط', 'Resume')}
            </button>
          )}
        </div>

        <div dir="ltr" onMouseEnter={() => setHoverP(true)} onMouseLeave={() => setHoverP(false)} className="overflow-hidden py-2">
          <div className={`run-p gap-4 ${lockP ? 'stop-all' : hoverP || lightboxImg ? 'pause-hover' : ''}`}>
            {(lockP ? posts : [...posts, ...posts]).map((src, i) => (
              <button key={`${src}-${i}`} type="button" onClick={() => setLightboxImg(src)} className="group relative h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60">
                <img src={src} alt={`Post ${i + 1}`} onError={(e) => { if (e.currentTarget.parentElement) e.currentTarget.parentElement.style.display = 'none'; }} className="h-full w-auto object-contain transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button type="button" onClick={() => stepPosts('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepPosts('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
            <div className="max-h-[80vh] mx-auto overflow-hidden rounded-2xl flex justify-center">
              <img src={lightboxImg} alt="Preview" className="max-h-[80vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
