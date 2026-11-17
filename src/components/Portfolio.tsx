import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, ExternalLink, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg', '/images/social-2.jpg', '/images/social-3.jpg',
  '/images/social-4.jpg', '/images/social-5.jpg', '/images/social-6.jpg',
];

const POST_MODULES = import.meta.glob('../assets/posts/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});
const POST_URLS = Object.values(POST_MODULES) as string[];

const REELS = [
  { code: 'De6hCFCN0b1', views: '83K' },
  { code: 'DewEI_rtpHt', views: '22.9K' },
  { code: 'DeeMh8htqQA', views: '22.1K' },
  { code: 'DfUQAh1Nq8N', views: '12.4K' },
  { code: 'DfHga8Bthg5', views: '2,115' },
  { code: 'DfP3FzptsoY', views: '1,617' },
  { code: 'DePYchot5j2', views: '552' },
  { code: 'DebbA_0tDv7', views: '357' },
];

const YT_AI_VIDEOS = [
  'XcN-4sjAxk0',
  'uodwo7fDVKg',
  'h_CV4ypkoOA',
  'cxwzSCMv_x4',
  'hu_HZIzSafs',
  '5Nc_4pg8TeI',
  'kf3H2z_jUEc',
  'o7E_4NvvX_g',
  'XAPvYxMogVU',
  'XbF9SjCkWJU',
];

const DRIVE_SCRIPT_VIDEOS = [
  '1-twnDAT53vQeAxQVn0dfb2L07li9VHNt',
  '1FUwyDEkV9QhmL9fDOQBtuw9FQzo7yP3I',
  '1l_xegudzUUlzVzvZf3N217FlDXGD-tb9',
  '13GsZqovRm0gQv0YpFpkUUON4u3r1QI28',
  '1SCC0NvuqPYU-g4q_pTDDUPaqAV8LcLJ1',
  '1DEpzzfo53WJOUj_UEtlq8TcAnRs-27Xn',
  '16h9IZaDQUWu20EUY-LDsbgj8GIgXbjH9',
  '1U_15wmyuTCypUosvMkRInzjyuL0Jlczb',
  '1t7tlA8eje369tH1sDOHBdGyf1xSUBUMC',
  '1_iZRybvUbGMg9SKVH-C9BDLs2MeGTh4z',
  '1krDP4by45h0sTTmpgTSpdmQ68GK_sjqo',
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai-client' | 'ai-studio' | 'script'>('ai-client');
  const [stopV, setStopV] = useState(false);
  const [stopP, setStopP] = useState(false);
  const [modalVideo, setModalVideo] = useState<{ type: 'yt' | 'drive'; id: string; title: string } | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const videoTrackRef = useRef<HTMLDivElement>(null);
  const postTrackRef = useRef<HTMLDivElement>(null);

  const instaUrl = (code: string) => 'https://www.' + 'instagram' + '.com/reel/' + code + '/embed/';
  const ytEmbedUrl = (id: string) => 'https://www.' + 'youtube-nocookie' + '.com/embed/' + id + '?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&loop=1&playlist=' + id;
  const ytThumbUrl = (id: string) => 'https://i.' + 'ytimg' + '.com/vi/' + id + '/hqdefault.jpg';
  const drivePreviewUrl = (id: string) => 'https://drive.' + 'google' + '.com/file/d/' + id + '/preview';
  const driveViewUrl = (id: string) => 'https://drive.' + 'google' + '.com/file/d/' + id + '/view';
  const driveThumbUrl = (id: string) => 'https://lh3.' + 'googleusercontent' + '.com/d/' + id + '=w600';

  const stepV = (dir: 'left' | 'right') => {
    setStopV(true);
    const el = videoTrackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (dir === 'right') {
      if (el.scrollLeft >= maxScroll - 20) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: 300, behavior: 'smooth' });
    } else {
      if (el.scrollLeft <= 20) el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      else el.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const stepP = (dir: 'left' | 'right') => {
    setStopP(true);
    if (postTrackRef.current) {
      postTrackRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
    }
  };
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-35%); } }
        .run-v { display: flex; width: max-content; animation: loopX 45s linear infinite; }
        .run-v-drive { display: flex; width: max-content; animation: loopX 75s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 90s linear infinite; }
        .run-v:hover, .run-v-drive:hover, .run-p:hover { animation-play-state: paused; }
        .stop-all { animation: none !important; }
      `}</style>

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">{t('أعمالي', 'Portfolio')}</span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">{t('مشاريع وأعمال تثبت النتائج', 'Projects that prove results')}</h2>
      </div>

      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">{t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {IMGS.map((src, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl border border-accent/25 bg-card-light dark:bg-card-dark shadow-md transition duration-300 hover:-translate-y-2 hover:border-[#f47b20]">
              <div className="aspect-[9/16] overflow-hidden"><img src={src} alt={'Account ' + (i + 1)} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
            </div>
          ))}
        </div>
      </div>

      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>

        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => { setModalVideo(null); setTab('ai-client'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai-client' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات من الفكرة للإنتاج بـ AI على الانستقرام', 'AI Videos: Concept to Production on Instagram')}
          </button>

          <button
            onClick={() => { setModalVideo(null); setTab('ai-studio'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai-studio' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات من الفكرة للإنتاج بـ AI', 'AI Videos: Concept to Production')}
          </button>

          <button
            onClick={() => { setModalVideo(null); setTab('script'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div
          ref={videoTrackRef}
          dir="ltr"
          onTouchStart={() => setStopV(true)}
          onMouseDown={() => setStopV(true)}
          className="no-scrollbar overflow-x-auto py-2 scroll-smooth"
        >
          {tab === 'ai-client' && (
            <div className={'run-v gap-4 ' + (stopV ? 'stop-all' : '')}>
              {REELS.map((item, idx) => (
                <div key={item.code} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-xl">
                  <div className="h-[515px] w-full overflow-hidden">
                    <iframe src={instaUrl(item.code)} title={'Reel ' + (idx + 1)} loading="lazy" className="h-full w-full border-0" allowFullScreen />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#121215] px-3.5 py-2 text-xs font-bold text-white">
                    <Eye className="h-4 w-4 text-white/90" />
                    <span>{item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'ai-studio' && (
            <div className={'run-v-drive gap-4 ' + (stopV || modalVideo ? 'stop-all' : '')}>
              {YT_AI_VIDEOS.map((ytId, idx) => {
                const label = 'AI & UGC #' + (idx + 1);
                return (
                  <div key={'yt-' + ytId} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-[#121215] shadow-xl">
                    <button
                      type="button"
                      onClick={() => { setStopV(true); setModalVideo({ type: 'yt', id: ytId, title: label }); }}
                      style={{ background: 'linear-gradient(145deg, #1a120b 0%, #2d180a 50%, #121215 100%)' }}
                      className="group relative h-[515px] w-full cursor-pointer overflow-hidden focus:outline-none"
                    >
                      <img
                        src={ytThumbUrl(ytId)}
                        alt={label}
                        loading={idx < 5 ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <span
                        style={{ backgroundColor: '#f47b20', boxShadow: '0 8px 25px rgba(244, 123, 32, 0.55)' }}
                        className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition duration-300 group-hover:scale-110"
                      >
                        <Play className="ml-1 h-7 w-7 fill-white text-white" />
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f47b20]/40 bg-black/65 px-3.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                        {t('اضغط للمشاهدة', 'Click to Watch')}
                      </span>
                    </button>
                    <div className="flex items-center justify-between bg-[#121215] px-3.5 py-2 text-xs font-bold text-white border-t border-white/10">
                      <span className="text-accent">{label}</span>
                      <span className="text-white/60">HD</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab === 'script' && (
            <div className={'run-v-drive gap-4 ' + (stopV || modalVideo ? 'stop-all' : '')}>
              {DRIVE_SCRIPT_VIDEOS.map((driveId, idx) => {
                const label = 'Script & Ad #' + (idx + 1);
                return (
                  <div key={'sc-' + driveId} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-[#121215] shadow-xl">
                    <button
                      type="button"
                      onClick={() => { setStopV(true); setModalVideo({ type: 'drive', id: driveId, title: label }); }}
                      style={{ background: 'linear-gradient(145deg, #1a120b 0%, #2d180a 50%, #121215 100%)' }}
                      className="group relative h-[515px] w-full cursor-pointer overflow-hidden focus:outline-none"
                    >
                      <img
                        src={driveThumbUrl(driveId)}
                        alt={label}
                        loading={idx < 5 ? 'eager' : 'lazy'}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <span
                        style={{ backgroundColor: '#f47b20', boxShadow: '0 8px 25px rgba(244, 123, 32, 0.55)' }}
                        className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition duration-300 group-hover:scale-110"
                      >
                        <Play className="ml-1 h-7 w-7 fill-white text-white" />
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f47b20]/40 bg-black/65 px-3.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                        {t('اضغط للمشاهدة', 'Click to Watch')}
                      </span>
                    </button>
                    <div className="flex items-center justify-between bg-[#121215] px-3.5 py-2 text-xs font-bold text-white border-t border-white/10">
                      <span className="text-accent">{label}</span>
                      <a href={driveViewUrl(driveId)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-accent transition">
                        <span>Drive</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepV('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepV('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div id="posts">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">
            {t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}
          </h3>
          <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
            {POST_URLS.length} {t('تصميم', 'Designs')}
          </span>
        </div>

        <div ref={postTrackRef} dir="ltr" className="no-scrollbar overflow-x-auto py-2 scroll-smooth">
          <div className={'run-p gap-4 ' + (stopP || lightboxImg ? 'stop-all' : '')}>
            {POST_URLS.slice(0, 25).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxImg(src)}
                className="h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60"
              >
                <img
                  src={src}
                  alt={'Post ' + (i + 1)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain transition duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepP('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepP('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md" onClick={() => setModalVideo(null)}>
          <div className="relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-[#f47b20]/60 bg-[#121215] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#18181c] px-4 py-2.5">
              <span className="text-xs font-bold text-[#f47b20]">{modalVideo.title}</span>
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#f47b20] text-white transition hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[82vh] max-h-[720px] w-full overflow-hidden bg-black">
              <iframe
                src={modalVideo.type === 'yt' ? ytEmbedUrl(modalVideo.id) : drivePreviewUrl(modalVideo.id)}
                title={modalVideo.title}
                className={modalVideo.type === 'yt' ? 'pointer-events-none h-[116%] w-full -translate-y-[8%] border-0' : 'h-full w-full border-0'}
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
              {modalVideo.type === 'yt' && (
                <>
                  <div className="pointer-events-none absolute top-0 inset-x-0 z-20 h-14 bg-gradient-to-b from-black via-black/90 to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-14 bg-gradient-to-t from-black via-black/90 to-transparent" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-accent transition"><X className="h-6 w-6" /></button>
          <img src={lightboxImg} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
