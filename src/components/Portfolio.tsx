import { useEffect, useState } from 'react';
import { Play, X, ExternalLink, Sparkles } from 'lucide-react';
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
  'DfSMTJbt4-X', 'DfILeBKN6_2', 'DfUQAh1Nq8N', 'De9mdqINvBp', 'De6hCFCN0b1',
  'Deyr9n7NZO9', 'DewEI_rtpHt', 'DeeMh8htqQA', 'DeLkQ2rtWQd', 'DePYchot5j2',
];

export default function Portfolio() {
  const { lang, t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (!activeReel) return;
    const w = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
    if (w.instgrm?.Embeds?.process) {
      w.instgrm.Embeds.process();
    } else {
      const s = document.createElement('script');
      s.src = 'https://instagram.com';
      s.async = true;
      s.onload = () => w.instgrm?.Embeds?.process?.();
      document.body.appendChild(s);
    }
  }, [activeReel]);

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .track-x { display: flex; width: max-content; animation: scrollX 45s linear infinite; }
        .track-x:hover, .track-stop { animation-play-state: paused !important; }
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
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button onClick={() => setTab('ai')} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}>
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button onClick={() => setTab('script')} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg' : 'border border-accent/30 bg-accent/5 text-accent'}`}>
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          <div className={`track-x gap-4 ${activeReel ? 'track-stop' : ''}`}>
            {(tab === 'ai' ? [...REELS, ...REELS] : [...IMGS, ...IMGS]).map((item, idx) => {
              const poster = tab === 'ai' ? IMGS[idx % IMGS.length] : item;
              const reelUrl = tab === 'ai' ? `https://instagram.com{item}/` : null;
              return (
                <div key={idx} onClick={() => reelUrl && setActiveReel(reelUrl)} className="group relative aspect-[9/16] w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg transition hover:-translate-y-2 hover:border-[#f47b20]">
                  <img src={poster} alt="Video" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                  {reelUrl && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white border border-white/15">
                      <Sparkles className="h-3 w-3 text-[#f47b20]" /> Reel
                    </span>
                  )}
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f47b20] text-white shadow-lg transition group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white ms-0.5" />
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
        <div dir="ltr" className="overflow-hidden py-2">
          <div className="track-x gap-4">
            {[...IMGS, ...IMGS, ...IMGS].map((src, i) => (
              <button key={i} type="button" onClick={() => setLightboxImg(src)} className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60">
                <img src={src} alt="Post" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setActiveReel(null)}>
          <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-accent/40 bg-bg-light dark:bg-bg-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-ink-light dark:text-white">Instagram Reel</span>
              <button type="button" onClick={() => setActiveReel(null)} className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl bg-white p-1">
              <blockquote className="instagram-media" data-instgrm-permalink={activeReel} data-instgrm-version="14" style={{ width: '100%', maxWidth: '400px', margin: 0 }} />
            </div>
            <div className="mt-4 flex justify-center">
              <a href={activeReel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f47b20] px-5 py-2.5 text-xs font-bold text-white shadow-lg">
                <ExternalLink className="h-4 w-4" />
                {t('مشاهدة الفيديو في حساب العميل على إنستغرام', 'View Reel on Instagram')}
              </a>
            </div>
          </div>
        </div>
      )}

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-md w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
            <div className="aspect-[9/16] max-h-[75vh] mx-auto overflow-hidden rounded-2xl"><img src={lightboxImg} alt="Preview" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      )}
    </section>
  );
}
