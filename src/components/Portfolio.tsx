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

const AI_VIDEOS = REELS.map((code, i) => ({
  id: `ai-${i}`,
  ar: `فيديو AI ترند و UGC #${i + 1}`,
  en: `AI Trend & UGC Video #${i + 1}`,
  poster: IMGS[i % IMGS.length],
  url: `https://instagram.com{code}/`,
}));

const SCRIPT_VIDEOS = [
  { id: 's1', ar: 'فيديو إعلاني - كتابة السكربت 1', en: 'Ad Video - Script 1', poster: IMGS, videoUrl: '' },
  { id: 's2', ar: 'فيديو إعلاني - كتابة السكربت 2', en: 'Ad Video - Script 2', poster: IMGS, videoUrl: '' },
  { id: 's3', ar: 'فيديو إعلاني - كتابة السكربت 3', en: 'Ad Video - Script 3', poster: IMGS, videoUrl: '' },
];

const POSTS = [
  { img: IMGS, ar: { title: 'منشور منتج عناية', caption: 'محتوى بيعي متوافق مع SEO لمنتجات العناية بالبشرة.' }, en: { title: 'Skincare Product Post', caption: 'SEO-aligned sales copy for skincare products.' } },
  { img: IMGS, ar: { title: 'محتوى شامبو وبلسم', caption: 'وصف منتج متوافق مع محركات البحث والذكاء الاصطناعي.' }, en: { title: 'Shampoo & Conditioner', caption: 'Product description aligned with search & AI engines.' } },
  { img: IMGS, ar: { title: 'منشور روتين العناية', caption: 'منشور تسويقي بهيكل سرد جذاب ومتجه نحو التحويل.' }, en: { title: 'Skincare Routine Post', caption: 'Marketing post built for conversion.' } },
  { img: IMGS, ar: { title: 'إطلاق منتج جديد', caption: 'محتوى حملة إطلاق بأسلوب إعلاني يبني الترقب.' }, en: { title: 'New Product Launch', caption: 'Launch campaign content that builds anticipation.' } },
  { img: IMGS, ar: { title: 'بوكس هدية فاخر', caption: 'وصف منتج بيعي يبرز القيمة ويحفّز الطلب.' }, en: { title: 'Luxury Gift Box', caption: 'Sales-driven product description highlighting value.' } },
];

export default function Portfolio() {
  const { lang, t } = useApp();
  const [tab, setTab] = useState<'ai' | 'script'>('ai');
  const [lightbox, setLightbox] = useState<(typeof POSTS)[number] | null>(null);
  const [activeInsta, setActiveInsta] = useState<(typeof AI_VIDEOS)[number] | null>(null);
  const [playingScript, setPlayingScript] = useState<string | null>(null);

  useEffect(() => {
    if (!activeInsta) return;
    const win = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
    if (win.instgrm?.Embeds?.process) {
      win.instgrm.Embeds.process();
    } else {
      const s = document.createElement('script');
      s.src = 'https://instagram.com';
      s.async = true;
      s.onload = () => win.instgrm?.Embeds?.process?.();
      document.body.appendChild(s);
    }
  }, [activeInsta]);
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-row { display: flex; width: max-content; animation: scrollLeft 45s linear infinite; }
        .marquee-row:hover, .marquee-stop { animation-play-state: paused !important; }
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
            <div key={i} className="group relative cursor-pointer overflow-hidden rounded-2xl border border-accent/25 bg-card-light dark:bg-card-dark shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.03] hover:border-[#f47b20] hover:shadow-[0_12px_30px_rgba(244,123,32,0.35)]">
              <div className="relative aspect-[9/16] overflow-hidden">
                <img src={src} alt={`Account ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button onClick={() => { setTab('ai'); setPlayingScript(null); }} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'ai' ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'}`}>
            {t('فيديوهات من الفكرة للإنتاج بالـ AI ترند في المجال و UGC', 'AI Videos: Concept to Production, Trends & UGC')}
          </button>
          <button onClick={() => { setTab('script'); setPlayingScript(null); }} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === 'script' ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'}`}>
            {t('فيديوهات إعلانية (كتابة السكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        {tab === 'ai' && (
          <div dir="ltr" className="overflow-hidden py-2">
            <div className={`marquee-row gap-4 ${activeInsta ? 'marquee-stop' : ''}`}>
              {[...AI_VIDEOS, ...AI_VIDEOS].map((item, idx) => (
                <div key={`${item.id}-${idx}`} onClick={() => setActiveInsta(item)} className="group relative aspect-[9/16] w-[225px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-card-light dark:bg-card-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#f47b20]">
                  <img src={item.poster} alt={item.ar} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/15">
                    <Sparkles className="h-3 w-3 text-[#f47b20]" /> Instagram Reel
                  </span>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f47b20] text-white shadow-lg transition group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white ms-0.5" />
                    </span>
                  </span>
                  <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="absolute bottom-3 inset-x-3">
                    <p className="text-xs font-bold text-white line-clamp-1">{lang === 'ar' ? item.ar : item.en}</p>
                    <p className="mt-0.5 text-[10px] text-white/75">{t('اضغط للمشاهدة والتأكد من الحساب', 'Click to watch & verify')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'script' && (
          <div dir="ltr" className="overflow-hidden py-2">
            <div className={`marquee-row gap-4 ${playingScript ? 'marquee-stop' : ''}`}>
              {[...SCRIPT_VIDEOS, ...SCRIPT_VIDEOS, ...SCRIPT_VIDEOS].map((v, idx) => {
                const k = `${v.id}-${idx}`;
                const isPlay = playingScript === k;
                return (
                  <button key={k} type="button" onClick={() => setPlayingScript(isPlay ? null : k)} className="group relative aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark">
                    {isPlay && v.videoUrl ? (
                      <video src={v.videoUrl} controls autoPlay className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <img src={v.poster} alt={v.ar} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-white shadow-lg transition group-hover:scale-110">
                            <Play className="h-6 w-6 fill-white ms-0.5" />
                          </span>
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}</h3>
        <div dir="ltr" className="overflow-hidden py-2">
          <div className="marquee-row gap-4">
            {[...POSTS, ...POSTS, ...POSTS].map((post, i) => (
              <button key={i} type="button" onClick={() => setLightbox(post)} className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60">
                <img src={post.img} alt={post.ar.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeInsta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setActiveInsta(null)}>
          <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-accent/40 bg-bg-light dark:bg-bg-dark p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-ink-light dark:text-white">{lang === 'ar' ? activeInsta.ar : activeInsta.en}</h4>
              <button type="button" onClick={() => setActiveInsta(null)} className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl bg-white p-1">
              <blockquote className="instagram-media" data-instgrm-permalink={activeInsta.url} data-instgrm-version="14" style={{ width: '100%', maxWidth: '400px', margin: 0 }} />
            </div>
            <div className="mt-4 flex justify-center">
              <a href={activeInsta.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f47b20] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110">
                <ExternalLink className="h-4 w-4" />
                {t('مشاهدة الفيديو في حساب العميل على إنستغرام', 'View Reel on Client Instagram')}
              </a>
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute top-4 end-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
            <div className="aspect-[9/16] max-h-[70vh] mx-auto overflow-hidden rounded-2xl"><img src={lightbox.img} alt={lightbox.ar.title} className="h-full w-full object-cover" /></div>
