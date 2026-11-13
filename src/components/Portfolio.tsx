import { useEffect, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Eye, RotateCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMGS = [
  '/images/social-1.jpg', '/images/social-2.jpg', '/images/social-3.jpg',
  '/images/social-4.jpg', '/images/social-5.jpg', '/images/social-6.jpg',
];

const POSTS = [
  'post (1).jpeg', 'post (1).jpg', 'post (1).png', 'post (2).jpeg', 'post (2).jpg', 'post (2).png',
  'post (3).jpg', 'post (3).png', 'post (4).jpg', 'post (4).png', 'post (5).jpg', 'post (5).png',
  'post (6).jpg', 'post (6).png', 'post (7).jpg', 'post (7).png', 'post (8).jpg', 'post (8).png',
  'post (9).jpg', 'post (9).png', 'post (10).jpg', 'post (10).png', 'post (11).jpg', 'post (11).png',
  'post (12).jpg', 'post (12).png', 'post (13).jpg', 'post (14).jpg', 'post (15).jpg', 'post (16).jpg',
  'post (17).jpg', 'post (18).jpg', 'post (19).jpg', 'post (20).jpg', 'post (21).jpg', 'post (22).jpg',
  'post (23).jpg', 'post (24).jpg', 'post (25).jpg', 'post (26).jpg', 'post (27).jpg', 'post (28).jpg',
  'post (29).jpg', 'post (30).jpg', 'post (31).jpg', 'post (32).jpg', 'post (33).jpg', 'post (34).jpg',
  'post (35).jpg', 'post (36).jpg', 'post (37).jpg', 'post (38).jpg', 'post (39).jpg', 'post (40).jpg', 'post (41).jpg',
];

const REELS = [
  { code: 'DebbA_0tDv7', views: '12.4K' }, { code: 'DePYchot5j2', views: '3K' },
  { code: 'DeLkQ2rtWQd', views: '578' },   { code: 'DeeMh8htqQA', views: '13.3K' },
  { code: 'Deyr9n7NZO9', views: '83.2K' }, { code: 'De9mdqINvBp', views: '22.9K' },
  { code: 'De6hCFCN0b1', views: '22.1K' }, { code: 'DfSMTJbt4-X', views: '552' },
  { code: 'DfILeBKN6_2', views: '485' },   { code: 'DfUQAh1Nq8N', views: '357' },
];

export default function Portfolio() {
  const { t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [reels, setReels] = useState(REELS);
  const [posts, setPosts] = useState(POSTS);
  const [lockV, setLockV] = useState(false);
  const [lockP, setLockP] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const instaEmbed = (c: string) => {
    const h = 'www.' + 'instagram' + '.com';
    return 'https://' + h + '/reel/' + c + '/embed/';
  };

  useEffect(() => {
    const onBlur = () => {
      const code = document.activeElement?.getAttribute('data-code');
      if (code) { setLockV(true); setActiveCode(code); }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  const stepV = (dir: 'left' | 'right') => {
    setLockV(true);
    setReels((p) => dir === 'right' ? [...p.slice(1), ...p.slice(0, 1)] : [...p.slice(-1), ...p.slice(0, -1)]);
  };

  const stepP = (dir: 'left' | 'right') => {
    setLockP(true);
    setPosts((p) => dir === 'right' ? [...p.slice(4), ...p.slice(0, 4)] : [...p.slice(-4), ...p.slice(0, -4)]);
  };

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes loopX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .run-v { display: flex; width: max-content; animation: loopX 55s linear infinite; }
        .run-p { display: flex; width: max-content; animation: loopX 120s linear infinite; }
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
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
          {lockV && <button type="button" onClick={() => { setLockV(false); setActiveCode(null); }} className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"><RotateCw className="h-3.5 w-3.5" /> {t('إعادة التحريك', 'Resume')}</button>}
        </div>
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button onClick={() => { setTab('ai'); setLockV(false); }} className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}>{t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}</button>
          <button onClick={() => { setTab('script'); setLockV(false); }} className={'rounded-xl px-4 py-2.5 text-xs font-bold transition ' + (tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent')}>{t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}</button>
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          {tab === 'ai' ? (
            <div className={'run-v gap-4 ' + (lockV ? 'stop-all' : '')}>
              {reels.map((item, idx) => (
                <div key={activeCode && activeCode !== item.code ? item.code + '-' + idx + '-' + activeCode : item.code + '-' + idx} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-xl">
                  <div className="h-[515px] w-full overflow-hidden">
                    <iframe data-code={item.code} src={instaEmbed(item.code)} title={'Reel ' + (idx + 1)} loading="lazy" className="h-full w-full border-0" allowFullScreen />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#121215] px-3.5 py-2 text-xs font-bold text-white"><Eye className="h-4 w-4" /><span>{item.views}</span></div>
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
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
          {lockP && <button type="button" onClick={() => setLockP(false)} className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"><RotateCw className="h-3.5 w-3.5" /> {t('إعادة التحريك', 'Resume')}</button>}
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          <div className={'run-p gap-4 ' + (lockP || lightboxImg ? 'stop-all' : '')}>
            {posts.map((name, i) => (
              <button key={name + '-' + i} type="button" onClick={() => setLightboxImg('/images/' + name)} className="h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60">
                <img src={'/images/' + name} alt={'Post ' + (i + 1)} onError={(e) => { const img = e.currentTarget; if (!img.dataset.f) { img.dataset.f = '1'; img.src = '/' + name; } else if (img.parentElement) { img.parentElement.style.display = 'none'; } }} className="h-full w-auto object-contain transition duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepP('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
