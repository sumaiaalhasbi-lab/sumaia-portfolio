import { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Eye, ExternalLink } from 'lucide-react';
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

const DRIVE_AI_VIDEOS = [
  '1ebAB_D74u2Pgm2HVOHiWmJptIyCRMxhK',
  '1gieXZNhIpwBwbWBbrlKucGvJBZkqzZnv',
  '1-E08gdaudM1uf3Mtg1MQ92nBudsAXxfR',
  '1EXRfF7DbxCKRAQYZC9wc1anpWhot-sgU',
  '145utUNOvupON1LJCABp_jryPbfGEH6p3',
  '1z3tjwD_1uNOUHsIdGLG60Uvhd6hG4iz3',
  '1FEY36pHEub9zPmE9YGhuAYSYw6rsu_ar',
  '1v4nV-B74uW0sDkqPzTEfh1DQyFmTPSrk',
  '1Rh8FPjgTaZPdYDnTsNvbOcr3NNCzNUXG',
  '1Lrokwyb4M4yOKBiphgc0ngJI_OG111ux',
  '1zri8HTpleEHcprH7BlfsufBt1sSOu3_A',
  '1PTjZlliWazm_-qqQQRvC8s1etx1-5ad9',
  '1PW6hYS6TjsFf4XMnXPrlS6TEFqhuITyL',
  '1F0brhkqTkAoyli3ht4u7d_wHEeSQ-o5N',
  '1s4y89jYAfat-0U19X7kpiRwGbSkQYyI-',
  '15RYtT78_fsjcyAmPiITKT5LBzdPzEakq',
  '1M_s-2riEfO3KNZMh_d3Pd8p7YcOaURqk',
  '1GExeXOFLCW0ILPoJB0fLZpOi0ylRUK6e',
  '1LdOd5j6BjW-2_HLJRFuGeD4dMn0Ldqxk',
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai-client' | 'ai-studio' | 'script'>('ai-client');
  const [reels, setReels] = useState(REELS);
  const [driveVideos, setDriveVideos] = useState(DRIVE_AI_VIDEOS);
  const [posts, setPosts] = useState(POST_URLS);
  const [stopV, setStopV] = useState(false);
  const [stopP, setStopP] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const instaUrl = (code: string) => {
    const h = 'www.' + 'instagram' + '.com';
    return 'https://' + h + '/reel/' + code + '/embed/';
  };

  const stepV = (dir: 'left' | 'right') => {
    setStopV(true);
    if (tab === 'ai-client') {
      setReels((p) => (dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]));
    } else if (tab === 'ai-studio') {
      setDriveVideos((p) => (dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]));
    }
  };

  const stepP = (dir: 'left' | 'right') => {
    setStopP(true);
    setPosts((p) => (dir === 'right' ? [...p.slice(4), ...p.slice(0, 4)] : [...p.slice(-4), ...p.slice(0, -4)]));
  };
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .run-v { display: flex; width: max-content; animation: loopX 50s linear infinite; }
        .run-v-drive { display: flex; width: max-content; animation: loopX 90s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 120s linear infinite; }
        .run-v:hover, .run-v-drive:hover, .run-p:hover { animation-play-state: paused; }
        .stop-all { animation: none !important; transform: translateX(0) !important; }
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
              <div className="aspect-[9/16] overflow-hidden"><img src={src} alt={'Account ' + (i + 1)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
            </div>
          ))}
        </div>
      </div>

      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>

        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => { setTab('ai-client'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai-client' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC (على منصة العميل فقط)', 'AI Videos: Concept to Production, Trends & UGC (Client Platform)')}
          </button>

          <button
            onClick={() => { setTab('ai-studio'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai-studio' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>

          <button
            onClick={() => { setTab('script'); setStopV(false); }}
            className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}
          >
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          {tab === 'ai-client' && (
            <div className={'run-v gap-4 ' + (stopV ? 'stop-all' : '')}>
              {reels.map((item, idx) => (
                <div key={item.code + '-' + idx} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-xl">
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
            <div className={'run-v-drive gap-4 ' + (stopV ? 'stop-all' : '')}>
              {driveVideos.map((driveId, idx) => (
                <div key={driveId + '-' + idx} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-[#121215] shadow-xl">
                  <div className="h-[515px] w-full overflow-hidden bg-black">
                    <iframe
                      src={`https://google.com{driveId}/preview`}
                      title={'AI Video ' + (idx + 1)}
                      loading="lazy"
                      className="h-full w-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center justify-between bg-[#121215] px-3.5 py-2 text-xs font-bold text-white border-t border-white/10">
                    <span className="text-accent">AI & UGC #{idx + 1}</span>
                    <a
                      href={`https://google.com{driveId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/80 hover:text-accent transition"
                    >
                      <span>Drive</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'script' && (
            <div className="run-v gap-4">
              {[...IMGS, ...IMGS].map((src, idx) => (
                <div key={idx} className="relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg">
                  <img src={src} alt="Script" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white"><Play className="h-6 w-6 fill-white ms-0.5" /></span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepV('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepV('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
        <div dir="ltr" className="overflow-hidden py-2">
          <div className={'run-p gap-4 ' + (stopP || lightboxImg ? 'stop-all' : '')}>
            {[...posts, ...posts].map((src, i) => (
              <button key={i} type="button" onClick={() => setLightboxImg(src)} className="h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60">
                <img src={src} alt={'Post ' + (i + 1)} className="h-full w-auto object-contain transition duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepP('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepP('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-accent transition"><X className="h-6 w-6" /></button>
          <img src={lightboxImg} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
