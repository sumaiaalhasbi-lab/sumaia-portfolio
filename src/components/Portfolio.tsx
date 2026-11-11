import { useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const SHOWCASE = [
  {
    img: 'https://images.pexels.com/photos/3850271/pexels-photo-3850271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'إدارة حسابات السوشيال ميديا', sub: 'إدارة كاملة للنشر والمحتوى والتقارير' },
    en: { title: 'Social Media Management', sub: 'Full posting, content & reporting' },
  },
  {
    img: 'https://images.pexels.com/photos/15525898/pexels-photo-15525898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'نمو المتابعين والمشاركة', sub: 'خطط تحريرية مدروسة لزيادة الوصول' },
    en: { title: 'Follower & Reach Growth', sub: 'Data-driven editorial plans for reach' },
  },
  {
    img: 'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'إدارة حسابات المتاجر', sub: 'تنظيم الهوية البصرية والمحتوى البيعي' },
    en: { title: 'E-commerce Social Accounts', sub: 'Visual identity & sales content' },
  },
  {
    img: 'https://images.pexels.com/photos/33525723/pexels-photo-33525723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'تقويم المحتوى الشهري', sub: 'جدولة دقيقة ومتابعة التفاعل اليومي' },
    en: { title: 'Monthly Content Calendar', sub: 'Precise scheduling & daily engagement' },
  },
  {
    img: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'حملات الإطلاق الموسمية', sub: 'إدارة متكاملة لحملات العروض والمواسم' },
    en: { title: 'Seasonal Launch Campaigns', sub: 'End-to-end management for seasonal offers' },
  },
  {
    img: 'https://images.pexels.com/photos/35976902/pexels-photo-35976902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ar: { title: 'تحليل الأداء والتقارير', sub: 'تقارير دورية لتحسين النتائج والوصول' },
    en: { title: 'Analytics & Reporting', sub: 'Periodic reports to optimize reach' },
  },
];

const VIDEO_TABS = [
  { key: 'script', ar: 'فيديوهات إعلانية (كتابة الاسكربت)', en: 'Ad Videos (Script Writing)' },
  { key: 'ai', ar: 'فيديوهات إعلانية و UGC (بالذكاء الاصطناعي)', en: 'Ad & UGC Videos (AI-Powered)' },
] as const;

const VIDEOS: { tab: 'script' | 'ai'; ar: string; en: string; poster: string }[] = [
  {
    tab: 'script',
    ar: 'سكربت إعلاني لمنتج عناية',
    en: 'Skincare product ad script',
    poster: 'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    tab: 'script',
    ar: 'سكربت حملة إطلاق براند',
    en: 'Brand launch campaign script',
    poster: 'https://images.pexels.com/photos/33525723/pexels-photo-33525723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    tab: 'script',
    ar: 'سكربت إعلان متجر إلكتروني',
    en: 'E-commerce store ad script',
    poster: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    tab: 'ai',
    ar: 'فيديو AI إعلاني لمنتج متجر',
    en: 'AI ad video for store product',
    poster: 'https://images.pexels.com/photos/35976902/pexels-photo-35976902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    tab: 'ai',
    ar: 'فيديو UGC بأسلوب تجريبي',
    en: 'UGC-style testimonial video',
    poster: 'https://images.pexels.com/photos/19117855/pexels-photo-19117855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    tab: 'ai',
    ar: 'فيديو إعلاني بالذكاء الاصطناعي',
    en: 'AI promotional product video',
    poster: 'https://images.pexels.com/photos/3850271/pexels-photo-3850271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
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
  // مضاعفة العناصر 4 مرات لضمان عدم وجود أي فراغ أثناء الحركة المستمرة
  const videosLoop = [...filteredVideos, ...filteredVideos, ...filteredVideos, ...filteredVideos];
  const postsLoop = [...POSTS, ...POSTS, ...POSTS, ...POSTS];

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

      {/* Part A: Social showcase (6 بطاقات متراصة بجانب بعضها) */}
      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 p-3">
                    <h4 className="text-xs font-bold leading-snug text-white">{data.title}</h4>
                    <p className="mt-1 text-[10px] leading-tight text-white/75">{data.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Videos marquee (حركة مستمرة في نفس الاتجاه بدون فراغات) */}
      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setVideoTab(tab.key);
                setPlayingVideo(null);
              }}
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

        <div dir="ltr" className="overflow-hidden py-2">
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
            {videosLoop.map((v, i) => {
              const isPlaying = playingVideo === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={isPlaying ? t('إيقاف الفيديو', 'Pause video') : t('تشغيل الفيديو', 'Play video')}
                  onClick={() => setPlayingVideo(isPlaying ? null : i)}
                  className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark"
                >
                  <img
                    src={v.poster}
