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

const ALL_POST_CANDIDATES = Array.from({ length: 45 }, (_, i) => [
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
  const [reelsList, setReelsList] = useState(INITIAL_REELS);
  const [scriptList, setScriptList] = useState(IMGS);
  const [postsList, setPostsList] = useState(ALL_POST_CANDIDATES);

  const [hoverVideos, setHoverVideos] = useState(false);
  const [lockedVideos, setLockedVideos] = useState(false);
  const [activeReelCode, setActiveReelCode] = useState<string | null>(null);

  const [hoverPosts, setHoverPosts] = useState(false);
  const [lockedPosts, setLockedPosts] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getInstaFrame = (code: string) => {
    const domain = 'www.' + 'instagram' + '.com';
    return 'https://' + domain + '/reel/' + code + '/embed/captioned/';
  };

  useEffect(() => {
    const onBlur = () => {
      const el = document.activeElement;
      if (el && el.tagName === 'IFRAME') {
        const codeAttr = el.getAttribute('data-reel-code');
        if (codeAttr) {
          setLockedVideos(true);
          setActiveReelCode(codeAttr);
        }
      }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  const rotateVideos = (dir: 'left' | 'right') => {
    setLockedVideos(true);
    if (tab === 'ai') {
      setReelsList((prev) => {
        const first = prev.at(0);
        const last = prev.at(-1);
        if (!first || !last) return prev;
        return dir === 'right' ? [...prev.slice(1), first] : [last, ...prev.slice(0, -1)];
      });
    } else {
      setScriptList((prev) => {
        const first = prev.at(0);
        const last = prev.at(-1);
        if (!first || !last) return prev;
        return dir === 'right' ? [...prev.slice(1), first] : [last, ...prev.slice(0, -1)];
      });
    }
  };

  const rotatePosts = (dir: 'left' | 'right') => {
    setLockedPosts(true);
    setPostsList((prev) =>
      dir === 'right'
        ? [...prev.slice(3), ...prev.slice(0, 3)]
        : [...prev.slice(-3), ...prev.slice(0, -3)]
    );
  };
  const isVideosStopped = hoverVideos || lockedVideos;
  const isPostsStopped = hoverPosts || lockedPosts || Boolean(lightboxImg);

  const displayReels = lockedVideos ? reelsList : [...reelsList, ...reelsList];
  const displayScripts = lockedVideos ? scriptList : [...scriptList, ...scriptList];
  const displayPosts = lockedPosts ? postsList : [...postsList, ...postsList];

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes scrollLoop { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .track-videos { display: flex; width: max-content; animation: scrollLoop 60s linear infinite; }
        .track-posts { display: flex; width: max-content; animation: scrollLoop 150s linear infinite; }
        .track-stopped { animation: none !important; transform: translateX(0) !important; }
        .track-paused { animation-play-state: paused !important; }
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
              onClick={() => { setLockedVideos(false); setActiveReelCode(null); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent transition hover:bg-accent hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5" />
              {t('إعادة تحريك الشريط', 'Resume Auto-Scroll')}
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => { setTab('ai'); setLockedVideos(false); setActiveReelCode(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button
            onClick={() => { setTab('script'); setLockedVideos(false); setActiveReelCode(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}
          >
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div
          dir="ltr"
          onMouseEnter={() => setHoverVideos(true)}
          onMouseLeave={() => setHoverVideos(false)}
          className="overflow-hidden py-2"
        >
          {tab === 'ai' ? (
            <div
              className={`track-videos gap-4 ${
                lockedVideos ? 'track-stopped' : isVideosStopped ? 'track-paused' : ''
              }`}
            >
              {displayReels.map((item, idx) => {
                const frameKey =
                  activeReelCode !== null && activeReelCode !== item.code
                    ? `${item.code}-${idx}-reset-${activeReelCode}`
                    : `${item.code}-${idx}`;
                return (
                  <div
                    key={frameKey}
                    className={`flex w-[270px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl transition ${
                      activeReelCode === item.code ? 'border-2 border-[#f47b20] ring-2 ring-[#f47b20]/40' : 'border-accent/30 hover:border-[#f47b20]'
                    }`}
                  >
                    <div className="h-[485px] w-full overflow-hidden">
                      <iframe
                        data-reel-code={item.code}
                        src={getInstaFrame(item.code)}
                        title={`Reel ${idx + 1}`}
                        className="h-full w-full border-0"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center gap-1.5 border-t border-neutral-200 bg-[#121215] px-3.5 py-2 text-xs font-bold text-white">
                      <Eye className="h-4 w-4 text-white/90" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`track-videos gap-4 ${
                lockedVideos ? 'track-stopped' : isVideosStopped ? 'track-paused' : ''
              }`}
            >
              {displayScripts.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => { setLockedVideos(true); setActiveReelCode(src); }}
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

        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => rotateVideos('left')}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => rotateVideos('right')}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* محتوى منشورات السوشيال ميديا */}
      <div id="posts">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
          {lockedPosts && (
            <button
              type="button"
              onClick={() => setLockedPosts(false)}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent transition hover:bg-accent hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5" />
              {t('إعادة تحريك الشريط', 'Resume Auto-Scroll')}
            </button>
          )}
        </div>

        <div
          dir="ltr"
          onMouseEnter={() => setHoverPosts(true)}
          onMouseLeave={() => setHoverPosts(false)}
          className="overflow-hidden py-2"
        >
          <div
            className={`track-posts gap-4 ${
              lockedPosts ? 'track-stopped' : isPostsStopped ? 'track-paused' : ''
            }`}
          >
            {displayPosts.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setLightboxImg(src)}
                className="group relative h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60"
              >
                <img
                  src={src}
                  alt={`Post ${i + 1}`}
                  onError={(e) => {
                    const btn = e.currentTarget.parentElement;
                    if (btn) btn.style.display = 'none';
                  }}
                  className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

