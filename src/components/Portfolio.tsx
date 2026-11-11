import { useState } from 'react';
import { Play, Pause, X, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const SHOWCASE = [
  {
    img: 'https://images.pexels.com/photos/3850271/pexels-photo-3850271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'إدارة حسابات السوشيال ميديا', metric: '+180% نمو التفاعل', sub: 'إدارة كاملة للنشر والمحتوى والتقارير' },
    en: { title: 'Social Media Account Management', metric: '+180% Engagement Growth', sub: 'Full posting, content & reporting' },
  },
  {
    img: 'https://images.pexels.com/photos/15525898/pexels-photo-15525898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'نمو المتابعين والمشاركة', metric: '+12K متابع جديد', sub: 'خطط تحريرية مدروسة لزيادة الوصول' },
    en: { title: 'Follower & Engagement Growth', metric: '+12K New Followers', sub: 'Data-driven editorial plans for reach' },
  },
];

const VIDEO_TABS = [
  { key: 'script', ar: 'فيديوهات إعلانية (كتابة الاسكربت)', en: 'Ad Videos (Script Writing)' },
  { key: 'ai', ar: 'فيديوهات إعلانية و UGC (بالذكاء الاصطناعي)', en: 'Ad & UGC Videos (AI-Powered)' },
] as const;

const VIDEOS: { tab: 'script' | 'ai'; ar: string; en: string }[] = [
  { tab: 'script', ar: 'سكربت إعلاني لمنتج عناية', en: 'Skincare product ad script' },
  { tab: 'script', ar: 'سكربت حملة إطلاق براند', en: 'Brand launch campaign script' },
  { tab: 'ai', ar: 'فيديو AI إعلاني لمنتج متجر', en: 'AI ad video for store product' },
  { tab: 'ai', ar: 'فيديو UGC بأسلوب تجريبي', en: 'UGC-style testimonial video' },
];

const POSTS = [
  {
    img: 'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'منشور منتج عناية', caption: 'محتوى بيعي متوافق مع SEO لمنتجات العناية بالبشرة — وصف جذاب يتصدر نتائج البحث.' },
    en: { title: 'Skincare Product Post', caption: 'SEO-aligned sales copy for skincare products — engaging descriptions that rank.' },
  },
  {
    img: 'https://images.pexels.com/photos/33525723/pexels-photo-33525723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'محتوى شامبو وبلسم', caption: 'وصف منتج متوافق مع محركات البحث والذكاء الاصطناعي لمتجر إلكتروني.' },
    en: { title: 'Shampoo & Conditioner Content', caption: 'Product description aligned with search and AI engines for an e-commerce store.' },
  },
  {
    img: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'منشور روتين العناية', caption: 'منشور تسويقي بهيكل سرد جذاب ومتجه نحو التحويل.' },
    en: { title: 'Skincare Routine Post', caption: 'Marketing post with a compelling narrative structure built for conversion.' },
  },
  {
    img: 'https://images.pexels.com/photos/35976902/pexels-photo-35976902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'إطلاق منتج جديد', caption: 'محتوى حملة إطلاق بأسلوب إعلاني يبني الترقب ويدفع للشراء.' },
    en: { title: 'New Product Launch', caption: 'Launch campaign content in an advertising style that builds anticipation and drives sales.' },
  },
  {
    img: 'https://images.pexels.com/photos/19117855/pexels-photo-19117855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'بوكس هدية فاخر', caption: 'وصف منتج بيعي لبوكس هدية يبرز القيمة ويحفّز الطلب.' },
    en: { title: 'Luxury Gift Box', caption: 'Sales-driven product description for a gift box that highlights value and drives demand.' },
  },
];

export default function Portfolio() {
  const { lang, t } = useApp();
  const [videoTab, setVideoTab] = useState<'script' | 'ai'>('script');
  const [lightbox, setLightbox] = useState<(typeof POSTS)[number] | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const filteredVideos = VIDEOS.filter((v) => v.tab === videoTab);
  const videosLoop = [...filteredVideos, ...filteredVideos, ...filteredVideos];

  const postsLoop = [...POSTS, ...POSTS, ...POSTS];

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
          {t('أعمالي', 'Portfolio')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('مشاريع وأعمال تثبت النتائج', 'Projects that prove results')}
        </h2>
      </div>

      {/* Part A: Social showcase */}
      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE.map((s, i) => {
            const data = lang === 'ar' ? s.ar : s.en;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/50 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={s.img}
                    alt={data.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h4 className="text-sm font-bold text-white">{data.title}</h4>
                    <p className="mt-1 text-[11px] text-white/70">{data.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Videos marquee */}
      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setVideoTab(tab.key)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                videoTab === tab.key
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'
              }`}
            >
              {t(tab.ar, tab.en)}
            </button>
          ))}
        </div>

        <div className="overflow-hidden">
          <div className="flex w-max gap-4 animate-marquee">
            {videosLoop.map((v, i) => {
              const isPlaying = playingVideo === i;
              const poster = POSTS[i % POSTS.length].img;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={isPlaying ? t('إيقاف الفيديو', 'Pause video') : t('تشغيل الفيديو', 'Play video')}
                  onClick={() => setPlayingVideo(isPlaying ? null : i)}
                  className="group relative aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark"
                >
                  <img
                    src={poster}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${isPlaying ? 'scale-110 opacity-60' : 'group-hover:scale-105'}`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                  <span className={`absolute inset-0 grid place-items-center transition ${isPlaying ? 'bg-accent/10' : ''}`}>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-white shadow-lg shadow-accent/40 transition group-hover:scale-110">
                      {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white" />}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Part C: Posts marquee */}
      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('محتوى منشورات السوشيال ميديا', 'Social Media Post Content')}
        </h3>
        <div className="overflow-hidden">
          <div className="flex w-max gap-4 animate-marquee" style={{ animationDirection: 'reverse' }}>
            {postsLoop.map((p, i) => {
              const data = lang === 'ar' ? p.ar : p.en;
              return (
                <button
                  key={i}
                  onClick={() => setLightbox(p)}
                  className="group relative aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark text-left transition hover:border-accent/50 hover:-translate-y-1"
                >
                  <img
                    src={p.img}
                    alt={data.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <PostLightbox post={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}

function PostLightbox({ post, onClose }: { post: (typeof POSTS)[number]; onClose: () => void }) {
  const { lang } = useApp();
  const data = lang === 'ar' ? post.ar : post.en;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-up" />
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-accent/30 bg-bg-light dark:bg-bg-dark shadow-2xl shadow-accent/20 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-black/40 text-white backdrop-blur transition hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid sm:grid-cols-2">
          <img src={post.img} alt={data.title} className="h-64 w-full object-cover sm:h-full" />
          <div className="p-6">
            <h3 className="text-base font-extrabold text-ink-light dark:text-ink-dark">{data.title}</h3>
            <div className="mt-3 flex gap-4 text-xs text-ink-light/50 dark:text-ink-dark/50">
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-accent" /> 2.4K</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5 text-accent" /> 318</span>
              <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5 text-accent" /> 902</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-light/75 dark:text-ink-dark/75">{data.caption}</p>
            <span className="mt-4 inline-block rounded-lg bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
              {lang === 'ar' ? 'كاتبة المحتوى: سمية الحاصبي' : 'Content Writer: Sumaia Al-Hasbi'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
