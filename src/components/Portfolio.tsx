import { useEffect, useRef, useState } from 'react';
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

const REELS = [
  { code: 'DebbA_0tDv7', views: '12.4K' },
  { code: 'DfSMTJbt4-X', views: '' },
  { code: 'DfILeBKN6_2', views: '' },
  { code: 'DfUQAh1Nq8N', views: '' },
  { code: 'De9mdqINvBp', views: '' },
  { code: 'De6hCFCN0b1', views: '' },
  { code: 'Deyr9n7NZO9', views: '' },
  { code: 'DewEI_rtpHt', views: '' },
  { code: 'DeeMh8htqQA', views: '' },
  { code: 'DeLkQ2rtWQd', views: '' },
  { code: 'DePYchot5j2', views: '' },
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [hoverVideos, setHoverVideos] = useState(false);
  const [lockedVideos, setLockedVideos] = useState(false);
  const [activeReelIdx, setActiveReelIdx] = useState<number | null>(null);

  const [hoverPosts, setHoverPosts] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const videosScrollRef = useRef<HTMLDivElement>(null);
  const postsScrollRef = useRef<HTMLDivElement>(null);

  const loopReels = [...REELS, ...REELS, ...REELS];
  const loopPosts = [...IMGS, ...IMGS, ...IMGS, ...IMGS];

  const getInstaFrame = (code: string) => {
    const domain = 'www.' + 'instagram' + '.com';
    return 'https://' + domain + '/reel/' + code + '/embed/captioned/';
  };

  // اكتشاف النقر داخل مشغل إنستغرام لإيقاف الشريط وإغلاق أي فيديو آخر يعمل في نفس الوقت
  useEffect(() => {
    const onBlur = () => {
      const el = document.activeElement;
      if (el && el.tagName === 'IFRAME') {
        const idxAttr = el.getAttribute('data-reel-idx');
        if (idxAttr !== null) {
          setLockedVideos(true);
          setActiveReelIdx(Number(idxAttr));
        }
      }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  const handleInfiniteScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: 'left' | 'right',
    lockFn?: (v: boolean) => void
  ) => {
    if (lockFn) lockFn(true);
    const el = ref.current;
    if (!el) return;

    const third = el.scrollWidth / 3;
    if (dir === 'right' && el.scrollLeft + el.clientWidth >= el.scrollWidth - 320) {
      el.scrollLeft -= third;
    } else if (dir === 'left' && el.scrollLeft <= 320) {
      el.scrollLeft += third;
    }
    el.scrollBy({ left: dir === 'right' ? 290 : -290, behavior: 'smooth' });
  };
  const isVideosStopped = hoverVideos || lockedVideos;
  const isPostsStopped = hoverPosts || Boolean(lightboxImg);

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes scrollLoop { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .track-loop { display: flex; width: max-content; animation: scrollLoop 60s linear infinite; }
        .track-stopped { animation-play-state: paused !important; }
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
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
          {lockedVideos && (
            <button
              type="button"
              onClick={() => { setLockedVideos(false); setActiveReelIdx(null); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent transition hover:bg-accent hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5" />
              {t('إعادة تحريك الشريط', 'Resume Auto-Scroll')}
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => { setTab('ai'); setLockedVideos(false); setActiveReelIdx(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button
            onClick={() => { setTab('script'); setLockedVideos(false); setActiveReelIdx(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div
          ref={videosScrollRef}
          dir="ltr"
          onMouseEnter={() => setHoverVideos(true)}
          onMouseLeave={() => setHoverVideos(false)}
          className="no-scrollbar overflow-x-auto py-2"
        >
          {tab === 'ai' ? (
            <div className={`track-loop gap-4 ${isVideosStopped ? 'track-stopped' : ''}`}>
              {loopReels.map((item, idx) => {
                // إعادة تحميل الإطارات غير النشطة لإيقاف أي فيديو آخر فوراً
                const frameKey =
                  activeReelIdx !== null && activeReelIdx !== idx
                    ? `${item.code}-${idx}-reset-${activeReelIdx}`
                    : `${item.code}-${idx}`;
                return (
                  <div
                    key={frameKey}
                    className={`flex w-[270px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl transition ${
                      activeReelIdx === idx ? 'border-2 border-[#f47b20] ring-2 ring-[#f47b20]/40' : 'border-accent/30 hover:border-[#f47b20]'
                    }`}
                  >
                    <div className="h-[485px] w-full overflow-hidden">
                      <iframe
                        data-reel-idx={idx}
                        src={getInstaFrame(item.code)}
                        title={`Reel ${idx + 1}`}
                        className="h-full w-full border-0"
                        allowFullScreen
                      />
                    </div>
                    {item.views && (
                      <div className="flex items-center gap-1.5 border-t border-neutral-200 bg-[#121215] px-3.5 py-2 text-xs font-bold text-white">
                        <Eye className="h-4 w-4 text-white/90" />
                        <span>{item.views}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`track-loop gap-4 ${isVideosStopped ? 'track-stopped' : ''}`}>
              {loopPosts.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => { setLockedVideos(true); setActiveReelIdx(idx); }}
                  className="group relative aspect-[9/16] w-[210px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg"
                >
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

        {/* أسهم التنقل اللانهائية للفيديوهات */}
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleInfiniteScroll(videosScrollRef, 'left', setLockedVideos)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleInfiniteScroll(videosScrollRef, 'right', setLockedVideos)}
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
          onMouseEnter={() => setHoverPosts(true)}
          onMouseLeave={() => setHoverPosts(false)}
          className="no-scrollbar overflow-x-auto py-2"
        >
          <div className={`track-loop gap-4 ${isPostsStopped ? 'track-stopped' : ''}`}>
            {loopPosts.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxImg(src)}
                className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60"
              >
                <img src={src} alt="Post" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        {/* أسهم التنقل اللانهائية للمنشورات */}
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleInfiniteScroll(postsScrollRef, 'left')}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleInfiniteScroll(postsScrollRef, 'right')}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* نافذة معاينة الصورة (توقف الشريط تلقائياً أثناء الفتح وتعيده عند الإغلاق) */}
      {lightboxImg && (
