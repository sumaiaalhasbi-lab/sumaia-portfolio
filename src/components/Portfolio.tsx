import { useEffect, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg',
  '/images/social-2.jpg',
  '/images/social-3.jpg',
  '/images/social-4.jpg',
  '/images/social-5.jpg',
  '/images/social-6.jpg',
];

const EXACT_POSTS = [
  '/images/post (1).jpeg', '/images/post (1).jpg', '/images/post (1).png',
  '/images/post (2).jpeg', '/images/post (2).jpg', '/images/post (2).png',
  '/images/post (3).jpg', '/images/post (3).png',
  '/images/post (4).jpg', '/images/post (4).png',
  '/images/post (5).jpg', '/images/post (5).png',
  '/images/post (6).jpg', '/images/post (6).png',
  '/images/post (7).jpg', '/images/post (7).png',
  '/images/post (8).jpg', '/images/post (8).png',
  '/images/post (9).jpg', '/images/post (9).png',
  '/images/post (10).jpg', '/images/post (10).png',
  '/images/post (11).jpg', '/images/post (11).png',
  '/images/post (12).jpg', '/images/post (12).png',
  '/images/post (13).jpg', '/images/post (14).jpg', '/images/post (15).jpg',
  '/images/post (16).jpg', '/images/post (17).jpg', '/images/post (18).jpg',
  '/images/post (19).jpg', '/images/post (20).jpg', '/images/post (21).jpg',
  '/images/post (22).jpg', '/images/post (23).jpg', '/images/post (24).jpg',
  '/images/post (25).jpg', '/images/post (26).jpg', '/images/post (27).jpg',
  '/images/post (28).jpg', '/images/post (29).jpg', '/images/post (30).jpg',
  '/images/post (31).jpg', '/images/post (32).jpg', '/images/post (33).jpg',
  '/images/post (34).jpg', '/images/post (35).jpg', '/images/post (36).jpg',
  '/images/post (37).jpg', '/images/post (38).jpg', '/images/post (39).jpg',
  '/images/post (40).jpg', '/images/post (41).jpg',
];

const INITIAL_REELS = [
  'DebbA_0tDv7',
  'DfSMTJbt4-X',
  'DfILeBKN6_2',
  'DfUQAh1Nq8N',
  'De9mdqINvBp',
  'De6hCFCN0b1',
  'Deyr9n7NZO9',
  'DewEI_rtpHt',
  'DeeMh8htqQA',
  'DeLkQ2rtWQd',
  'DePYchot5j2',
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [reels, setReels] = useState(INITIAL_REELS);
  const [scripts, setScripts] = useState(IMGS);
  const [posts, setPosts] = useState(EXACT_POSTS);

  const [hoverV, setHoverV] = useState(false);
  const [lockV, setLockV] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const [hoverP, setHoverP] = useState(false);
  const [lockP, setLockP] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getInstaUrl = (c: string) => {
    const host = 'www.' + 'instagram' + '.com';
    return 'https://' + host + '/reel/' + c + '/embed/';
  };

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
      dir === 'right' ? [...p.slice(4), ...p.slice(0, 4)] : [...p.slice(-4), ...p.slice(0, -4)]
    );
  };
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .run-v { display: flex; width: max-content; animation: loopX 55s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 120s linear infinite; }
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

      {/* إدارة حسابات السوشيال ميديا */}
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

      {/* فيديوهاتي */}
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
              {reels.map((code, idx) => (
                <div
                  key={activeCode && activeCode !== code ? `${code}-${idx}-${activeCode}` : `${code}-${idx}`}
                  className={`h-[520px] w-[275px] shrink-0 overflow-hidden rounded-2xl border bg-white shadow-xl ${
                    activeCode === code ? 'border-2 border-[#f47b20]' : 'border-accent/30'
                  }`}
                >
                  <iframe
                    data-code={code}
                    src={getInstaUrl(code)}
                    title={`Reel ${idx + 1}`}
                    loading="lazy"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`run-v gap-4 ${lockV ? 'stop-all' : hoverV ? 'pause-hover' : ''}`}>
              {[...scripts, ...scripts].map((src, idx) => (
                <div key={idx} onClick={() => { setLockV(true); setActiveCode(src); }} className="group relative aspect-[9/16] w-[210px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg">
                  <img src={src} alt="Script" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg">
                      <Play className="h-6 w-6 fill-white ms-0.5" />
                    </span>
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

      {/* محتوى منشورات السوشيال ميديا */}
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
            {posts.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setLightboxImg(src)}
                className="group relative h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60"
              >
                <img
                  src={src}
                  alt={`Post ${i + 1}`}
                  className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                />
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
