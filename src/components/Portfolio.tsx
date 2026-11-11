import { useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const SHOWCASE = [
  {
    img: 'https://unsplash.com',
    ar: { title: 'إدارة حسابات السوشيال ميديا', sub: 'إدارة كاملة للنشر والمحتوى والتقارير' },
    en: { title: 'Social Media Management', sub: 'Full posting, content & reporting' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'نمو المتابعين والمشاركة', sub: 'خطط تحريرية مدروسة لزيادة الوصول' },
    en: { title: 'Follower & Reach Growth', sub: 'Data-driven editorial plans for reach' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'إدارة حسابات المتاجر', sub: 'تنظيم الهوية البصرية والمحتوى البيعي' },
    en: { title: 'E-commerce Social Accounts', sub: 'Visual identity & sales content' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'تقويم المحتوى الشهري', sub: 'جدولة دقيقة ومتابعة التفاعل اليومي' },
    en: { title: 'Monthly Content Calendar', sub: 'Precise scheduling & daily engagement' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'حملات الإطلاق الموسمية', sub: 'إدارة متكاملة لحملات العروض والمواسم' },
    en: { title: 'Seasonal Launch Campaigns', sub: 'End-to-end management for seasonal offers' },
  },
  {
    img: 'https://unsplash.com',
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
    poster: 'https://unsplash.com',
  },
  {
    tab: 'script',
    ar: 'سكربت حملة إطلاق براند',
    en: 'Brand launch campaign script',
    poster: 'https://unsplash.com',
  },
  {
    tab: 'script',
    ar: 'سكربت إعلان متجر إلكتروني',
    en: 'E-commerce store ad script',
    poster: 'https://unsplash.com',
  },
  {
    tab: 'ai',
    ar: 'فيديو AI إعلاني لمنتج متجر',
    en: 'AI ad video for store product',
    poster: 'https://unsplash.com',
  },
  {
    tab: 'ai',
    ar: 'فيديو UGC بأسلوب تجريبي',
    en: 'UGC-style testimonial video',
    poster: 'https://unsplash.com',
  },
  {
    tab: 'ai',
    ar: 'فيديو إعلاني بالذكاء الاصطناعي',
    en: 'AI promotional product video',
    poster: 'https://unsplash.com',
  },
];

const POSTS = [
  {
    img: 'https://unsplash.com',
    ar: { title: 'منشور منتج عناية', caption: 'محتوى بيعي متوافق مع SEO لمنتجات العناية بالبشرة — وصف جذاب يتصدر نتائج البحث.' },
    en: { title: 'Skincare Product Post', caption: 'SEO-aligned sales copy for skincare products — engaging descriptions that rank.' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'محتوى شامبو وبلسم', caption: 'وصف منتج متوافق مع محركات البحث والذكاء الاصطناعي لمتجر إلكتروني.' },
    en: { title: 'Shampoo & Conditioner Content', caption: 'Product description aligned with search and AI engines for an e-commerce store.' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'منشور روتين العناية', caption: 'منشور تسويقي بهيكل سرد جذاب ومتجه نحو التحويل.' },
    en: { title: 'Skincare Routine Post', caption: 'Marketing post with a compelling narrative structure built for conversion.' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'إطلاق منتج جديد', caption: 'محتوى حملة إطلاق بأسلوب إعلاني يبني الترقب ويدفع للشراء.' },
    en: { title: 'New Product Launch', caption: 'Launch campaign content in an advertising style that builds anticipation and drives sales.' },
  },
  {
    img: 'https://unsplash.com',
    ar: { title: 'بوكس هدية فاخر', caption: 'وصف منتج بيعي لبوكس هدية يبرز القيمة ويحفّز الطلب.' },
    en: { title: 'Luxury Gift Box', caption: 'Sales-driven product description for a gift box that highlights value and drives demand.' },
  },
];

    en: { title: 'Skincare Product Post', caption: 'SEO-aligned sales copy for skincare products — engaging descriptions that rank.' },
  },
  {
    img: 'https://pexels.com',
    ar: { title: 'محتوى شامبو وبلسم', caption: 'وصف منتج متوافق مع محركات البحث والذكاء الاصطناعي لمتجر إلكتروني.' },
    en: { title: 'Shampoo & Conditioner Content', caption: 'Product description aligned with search and AI engines for an e-commerce store.' },
  },
  {
    img: 'https://pexels.com',
    ar: { title: 'منشور روتين العناية', caption: 'منشور تسويقي بهيكل سرد جذاب ومتجه نحو التحويل.' },
    en: { title: 'Skincare Routine Post', caption: 'Marketing post with a compelling narrative structure built for conversion.' },
  },
  {
    img: 'https://pexels.com',
    ar: { title: 'إطلاق منتج جديد', caption: 'محتوى حملة إطلاق بأسلوب إعلاني يبني الترقب ويدفع للشراء.' },
    en: { title: 'New Product Launch', caption: 'Launch campaign content in an advertising style that builds anticipation and drives sales.' },
  },
  {
    img: 'https://pexels.com',
    ar: { title: 'بوكس هدية فاخر', caption: 'وصف منتج بيعي لبوكس هدية يبرز القيمة ويحفّز الطلب.' },
    en: { title: 'Luxury Gift Box', caption: 'Sales-driven product description for a gift box that highlights value and drives demand.' },
  },
];
                 type="button"
                  aria-label={isPlaying ? t('إيقاف الفيديو', 'Pause video') : t('تشغيل الفيديو', 'Play video')}
                  onClick={() => setPlayingVideo(isPlaying ? null : i)}
                  className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark"
                >
                  <img
                    src={v.poster}
                    alt={lang === 'ar' ? v.ar : v.en}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                      isPlaying ? 'scale-110 opacity-60' : 'group-hover:scale-105'
                    }`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                  <span className={`absolute inset-0 grid place-items-center transition ${isPlaying ? 'bg-accent/10' : ''}`}>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-white shadow-lg shadow-accent/40 transition group-hover:scale-110">
                      {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white ms-0.5" />}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}
        </h3>
        <div dir="ltr" className="overflow-hidden py-2">
          <div className="marquee-track gap-4">
            {postsLoop.map((post, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(post)}
                className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60"
              >
                <img
                  src={post.img}
                  alt={lang === 'ar' ? post.ar.title : post.en.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-4 end-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <img
                src={lightbox.img}
                alt={lang === 'ar' ? lightbox.ar.title : lightbox.en.title}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="mt-4 text-lg font-bold text-ink-light dark:text-ink-dark">
              {lang === 'ar' ? lightbox.ar.title : lightbox.en.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
              {lang === 'ar' ? lightbox.ar.caption : lightbox.en.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

