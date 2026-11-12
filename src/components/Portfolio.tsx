import { useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const IMG_1 = '/images/social-1.jpg';
const IMG_2 = '/images/social-2.jpg';
const IMG_3 = '/images/social-3.jpg';
const IMG_4 = '/images/social-4.jpg';
const IMG_5 = '/images/social-5.jpg';
const IMG_6 = '/images/social-6.jpg';

const SHOWCASE = [
  { img: IMG_1, title: 'Social Media 1' },
  { img: IMG_2, title: 'Social Media 2' },
  { img: IMG_3, title: 'Social Media 3' },
  { img: IMG_4, title: 'Social Media 4' },
  { img: IMG_5, title: 'Social Media 5' },
  { img: IMG_6, title: 'Social Media 6' },
];

// 1. قسم فيديوهات إعلانية (كتابة الاسكربت / الفيديوهات المرفوعة من Cloudinary)
const SCRIPT_VIDEOS = [
  { id: 's1', ar: 'سكربت إعلاني لمنتج عناية', en: 'Skincare product ad script', poster: IMG_3, videoUrl: '' },
  { id: 's2', ar: 'سكربت حملة إطلاق براند', en: 'Brand launch campaign script', poster: IMG_4, videoUrl: '' },
  { id: 's3', ar: 'سكربت إعلان متجر إلكتروني', en: 'E-commerce store ad script', poster: IMG_5, videoUrl: '' },
];

// 2. قسم فيديوهات AI من الفكرة للإنتاج والنشر (روابط إنستغرام الفعلية)
const AI_INSTAGRAM_VIDEOS = [
  { id: 'ai1', ar: 'فيديو AI إعلاني 1', en: 'AI Ad Video 1', instaUrl: 'https://instagram.com' },
  { id: 'ai2', ar: 'فيديو AI إعلاني 2', en: 'AI Ad Video 2', instaUrl: 'https://instagram.com' },
  { id: 'ai3', ar: 'فيديو AI إعلاني 3', en: 'AI Ad Video 3', instaUrl: 'https://instagram.com' },
];

const POSTS = [
  { img: IMG_3, ar: { title: 'منشور منتج عناية', caption: 'محتوى بيعي متوافق مع SEO لمنتجات العناية بالبشرة.' }, en: { title: 'Skincare Product Post', caption: 'SEO-aligned sales copy for skincare products.' } },
  { img: IMG_4, ar: { title: 'محتوى شامبو وبلسم', caption: 'وصف منتج متوافق مع محركات البحث والذكاء الاصطناعي.' }, en: { title: 'Shampoo & Conditioner Content', caption: 'Product description aligned with search and AI engines.' } },
  { img: IMG_5, ar: { title: 'منشور روتين العناية', caption: 'منشور تسويقي بهيكل سرد جذاب ومتجه نحو التحويل.' }, en: { title: 'Skincare Routine Post', caption: 'Marketing post built for conversion.' } },
  { img: IMG_6, ar: { title: 'إطلاق منتج جديد', caption: 'محتوى حملة إطلاق بأسلوب إعلاني يبني الترقب.' }, en: { title: 'New Product Launch', caption: 'Launch campaign content that builds anticipation.' } },
  { img: IMG_1, ar: { title: 'بوكس هدية فاخر', caption: 'وصف منتج بيعي يبرز القيمة ويحفّز الطلب.' }, en: { title: 'Luxury Gift Box', caption: 'Sales-driven product description that highlights value.' } },
];

function getInstaEmbedUrl(url: string) {
  const clean = url.split('?')[0].replace(/\/$/, '');
  return `${clean}/embed`;
}

export default function Portfolio() {
  const { lang, t } = useApp();
  const [videoTab, setVideoTab] = useState<'script' | 'ai'>('ai');
  const [lightbox, setLightbox] = useState<(typeof POSTS)[number] | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const scriptLoop = [...SCRIPT_VIDEOS, ...SCRIPT_VIDEOS, ...SCRIPT_VIDEOS, ...SCRIPT_VIDEOS];
  const aiLoop = [...AI_INSTAGRAM_VIDEOS, ...AI_INSTAGRAM_VIDEOS, ...AI_INSTAGRAM_VIDEOS];
  const postsLoop = [...POSTS, ...POSTS, ...POSTS, ...POSTS];
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes smoothScrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: smoothScrollLeft 40s linear infinite; }
        .marquee-track:hover, .marquee-paused { animation-play-state: paused !important; }
      `}</style>

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
          {t('أعمالي', 'Portfolio')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('مشاريع وأعمال تثبت النتائج', 'Projects that prove results')}
        </h2>
      </div>

      {/* إدارة حسابات السوشيال ميديا بمقاس الستوري 9:16 وبحجم كبير وواضح */}
      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}
        </h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3 max-w-4xl mx-auto">
          {SHOWCASE.map((s, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-accent/25 bg-card-light dark:bg-card-dark shadow-lg transition hover:border-accent/60 hover:-translate-y-1">
              <div className="relative aspect-[9/16] overflow-hidden">
                <img src={s.img} alt={s.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* قسم الفيديوهات المفصول بالكامل */}
      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => { setVideoTab('ai'); setPlayingId(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${videoTab === 'ai' ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'}`}
          >
            {t('فيديوهات AI من الفكرة للإنتاج والنشر (إنستغرام)', 'AI Videos: Idea to Production & Publishing')}
          </button>
          <button
            onClick={() => { setVideoTab('script'); setPlayingId(null); }}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${videoTab === 'script' ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'}`}
          >
            {t('فيديوهات إعلانية (كتابة الاسكربت)', 'Ad Videos (Script Writing)')}
          </button>
        </div>

        {videoTab === 'ai' && (
          <div dir="ltr" className="overflow-hidden py-2">
            <div className={`marquee-track gap-5 ${playingId ? 'marquee-paused' : ''}`}>
              {aiLoop.map((item, idx) => {
                const uniqueKey = `${item.id}-${idx}`;
                return (
                  <div
                    key={uniqueKey}
                    onMouseEnter={() => setPlayingId(uniqueKey)}
                    onMouseLeave={() => setPlayingId(null)}
                    className="relative h-[460px] w-[310px] shrink-0 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-xl"
                  >
                    <iframe
                      src={getInstaEmbedUrl(item.instaUrl)}
                      title={lang === 'ar' ? item.ar : item.en}
                      className="h-full w-full border-0"
                      allowFullScreen
                      scrolling="no"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {videoTab === 'script' && (
          <div dir="ltr" className="overflow-hidden py-2">
            <div className={`marquee-track gap-4 ${playingId ? 'marquee-paused' : ''}`}>
              {scriptLoop.map((v, idx) => {
                const uniqueKey = `${v.id}-${idx}`;
                const isPlaying = playingId === uniqueKey;
                return (
                  <button
                    key={uniqueKey}
                    type="button"
                    onClick={() => setPlayingId(isPlaying ? null : uniqueKey)}
                    className="group relative aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark"
                  >
                    {isPlaying && v.videoUrl ? (
                      <video src={v.videoUrl} controls autoPlay className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <img
                          src={v.poster}
                          alt={lang === 'ar' ? v.ar : v.en}
                          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${isPlaying ? 'scale-105 opacity-70' : 'group-hover:scale-105'}`}
                        />
                        <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-white shadow-lg shadow-accent/40 transition group-hover:scale-110">
                            {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white ms-0.5" />}
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
          <div className="marquee-track gap-4">
            {postsLoop.map((post, i) => (
              <button key={i} type="button" onClick={() => setLightbox(post)} className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60">
                <img src={post.img} alt={lang === 'ar' ? post.ar.title : post.en.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute top-4 end-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"><X className="h-5 w-5" /></button>
            <div className="aspect-[9/16] max-h-[70vh] mx-auto overflow-hidden rounded-2xl"><img src={lightbox.img} alt={lang === 'ar' ? lightbox.ar.title : lightbox.en.title} className="h-full w-full object-cover" /></div>
            <h4 className="mt-4 text-lg font-bold text-ink-light dark:text-ink-dark">{lang === 'ar' ? lightbox.ar.title : lightbox.en.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">{lang === 'ar' ? lightbox.ar.caption : lightbox.en.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
