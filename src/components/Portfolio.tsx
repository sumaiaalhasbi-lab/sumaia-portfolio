import { useRef, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg',
  '/images/social-2.jpg',
  '/images/social-3.jpg',
  '/images/social-4.jpg',
  '/images/social-5.jpg',
  '/images/social-6.jpg',
];

const REELS = [
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
  const [pausedVideos, setPausedVideos] = useState(false);
  const [pausedPosts, setPausedPosts] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const videosScrollRef = useRef<HTMLDivElement>(null);
  const postsScrollRef = useRef<HTMLDivElement>(null);

  const getInstaFrame = (code: string) => {
    const domain = 'www.' + 'instagram' + '.com';
    return 'https://' + domain + '/reel/' + code + '/embed/captioned/';
  };

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
    setPause: (v: boolean) => void
  ) => {
    setPause(true);
    if (ref.current) {
      const step = direction === 'right' ? 300 : -300;
      ref.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .track-x { display: flex; width: max-content; animation: scrollX 65s linear infinite; }
        .track-x:hover, .track-stop { animation-play-state: paused !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => { setTab('ai'); setPausedVideos(false); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button
            onClick={() => { setTab('script'); setPausedVideos(false); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div
          ref={videosScrollRef}
          dir="ltr"
          onMouseEnter={() => setPausedVideos(true)}
          onMouseLeave={() => setPausedVideos(false)}
          onTouchStart={() => setPausedVideos(true)}
          className="no-scrollbar overflow-x-auto py-2"
        >
          {tab === 'ai' ? (
            <div className={`track-x gap-4 ${pausedVideos ? 'track-stop' : ''}`}>
              {[...REELS, ...REELS].map((code, idx) => (
                <div
                  key={`${code}-${idx}`}
                  className="h-[515px] w-[270px] shrink-0 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-xl transition hover:border-[#f47b20]"
                >
                  <iframe
                    src={getInstaFrame(code)}
                    title={`Reel ${idx + 1}`}
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`track-x gap-4 ${pausedVideos ? 'track-stop' : ''}`}>
              {[...IMGS, ...IMGS].map((src, idx) => (
                <div key={idx} className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg">
                  <img src={src} alt="Script Video" className="h-full w-full object-cover" />
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

        {/* أسهم التنقل تحت شريط الفيديوهات */}
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTrack(videosScrollRef, 'left', setPausedVideos)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(videosScrollRef, 'right', setPausedVideos)}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* محتوى منشورات السوشيال ميديا */}
      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
        <div
          ref={postsScrollRef}
          dir="ltr"
          onMouseEnter={() => setPausedPosts(true)}
          onMouseLeave={() => setPausedPosts(false)}
          onTouchStart={() => setPausedPosts(true)}
          className="no-scrollbar overflow-x-auto py-2"
        >
          <div className={`track-x gap-4 ${pausedPosts ? 'track-stop' : ''}`}>
            {[...IMGS, ...IMGS, ...IMGS].map((src, i) => (
              <button key={i} type="button" onClick={() => setLightboxImg(src)} className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60">
                <img src={src} alt="Post" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        {/* أسهم التنقل تحت شريط المنشورات */}
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTrack(postsScrollRef, 'left', setPausedPosts)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(postsScrollRef, 'right', setPausedPosts)}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-md w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
