import { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg', '/images/social-2.jpg', '/images/social-3.jpg',
  '/images/social-4.jpg', '/images/social-5.jpg', '/images/social-6.jpg',
];

const POST_FILES = Array.from({ length: 155 }, (_, i) => [
  'p' + (i + 1) + '.jpg',
  'p' + (i + 1) + '.png',
  'p' + (i + 1) + '.jpeg',
]).flat();

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

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [reels, setReels] = useState(REELS);
  const [posts, setPosts] = useState(POST_FILES);
  const [stopV, setStopV] = useState(false);
  const [stopP, setStopP] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const instaUrl = (code: string) => {
    const h = 'www.' + 'instagram' + '.com';
    return 'https://' + h + '/reel/' + code + '/embed/';
  };

  const stepV = (dir: 'left' | 'right') => {
    setStopV(true);
    setReels((p) => dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]);
  };

  const stepP = (dir: 'left' | 'right') => {
    setStopP(true);
    setPosts((p) => dir === 'right' ? [...p.slice(6), ...p.slice(0, 6)] : [...p.slice(-6), ...p.slice(0, -6)]);
  };

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .run-v { display: flex; width: max-content; animation: loopX 50s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 140s linear infinite; }
        .run-v:hover, .run-p:hover { animation-play-state: paused; }
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
          <button onClick={() => { setTab('ai'); setStopV(false); }} className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}>{t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}</button>
          <button onClick={() => { setTab('script'); setStopV(false); }} className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}>{t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}</button>
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          {tab === 'ai' ? (
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
          ) : (
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
            {posts.map((name, i) => (
              <button key={name + '-' + i} type="button" onClick={() => setLightboxImg('/images/' + name)} className="h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60">
                <img src={'/images/' + name} alt={'Post ' + (i + 1)} onError={(e) => { const btn = e.currentTarget.parentElement; if (btn) btn.style.display = 'none'; }} className="h-full w-auto object-contain transition duration-500 hover:scale-105" />
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
          <div className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
            <div className="max-h-[80vh] mx-auto overflow-hidden rounded-2xl flex justify-center"><img src={lightboxImg} alt="Preview" className="max-h-[80vh] w-auto object-contain" /></div>
          </div>
        </div>
      )}
    </section>
  );
}
