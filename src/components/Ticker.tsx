import { useApp } from '@/context/AppContext';
import { Award, Users, ShoppingCart, Briefcase } from 'lucide-react';

const ITEMS = [
  {
    icon: Award,
    ar: { title: '+4 سنوات خبرة', sub: 'في السوق الخليجي · كتابة المحتوى والتسويق' },
    en: { title: '+4 Years Experience', sub: 'Gulf market · Content & Marketing' },
  },
  {
    icon: Users,
    ar: { title: '+15 شركة وعميل', sub: 'مشاريع ناجحة عن بُعد' },
    en: { title: '+15 Clients & Companies', sub: 'Successful remote projects' },
  },
  {
    icon: ShoppingCart,
    ar: { title: 'إدارة متكاملة لمتجر إلكتروني', sub: 'محتوى · إدخال بيانات · صور · SEO' },
    en: { title: 'Full E-commerce Management', sub: 'Content · Data · Images · SEO' },
  },
  {
    icon: Briefcase,
    ar: { title: 'نموذج عمل مرن', sub: 'توظيف شهري عن بُعد · تنفيذ مشاريع مستقلة' },
    en: { title: 'Flexible Work Model', sub: 'Monthly remote · Freelance projects' },
  },
];

export default function Ticker() {
  const { lang, t } = useApp();
  const items = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section className="relative border-y border-accent/15 bg-card-light/50 dark:bg-card-dark/50 py-5">
      <style>{`
        @keyframes tickerSmooth {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerSmooth 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div dir="ltr" className="overflow-hidden">
        <div className="ticker-track gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            const txt = lang === 'ar' ? item.ar : item.en;
            return (
              <div
                key={i}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className="flex items-center gap-3 whitespace-nowrap px-2"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-ink-light dark:text-ink-dark">{txt.title}</span>
                  <span className="text-[11px] text-ink-light/50 dark:text-ink-dark/50">{txt.sub}</span>
                </div>
                <span className="mx-3 h-1.5 w-1.5 rounded-full bg-accent/50" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { lang, t } = useApp();
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-card-light dark:bg-card-dark p-7 sm:p-10">
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
            {t('من أنا', 'Who I Am')}
          </span>
          <h2 className="mt-4 text-xl font-extrabold text-ink-light dark:text-ink-dark sm:text-2xl">
            {t('سمية الحاصبي', 'Sumaia Al-Hasbi')}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.9] text-ink-light/75 dark:text-ink-dark/75">
            {lang === 'ar' ? (
              <>
                أنا سمية الحاصبي — كاتبة محتوى تسويقي وأخصائية إدارة حسابات التواصل الاجتماعي عن بُعد، أعمل في السوق
                الخليجي منذ أكثر من 4 سنوات مع الشركات وأصحاب المتاجر الإلكترونية. أقدم حلولاً عملية تشمل كتابة المحتوى
                الإعلاني، إعداد الخطط التحريرية وتقويم المحتوى، إدارة المتاجر وإدخال البيانات ووصف المنتجات المتوافق مع{' '}
                <span dir="ltr">(SEO / GEO / AEO)</span>، بالإضافة إلى كتابة سيناريوهات وصناعة فيديوهات الذكاء
                الاصطناعي بأسلوب إعلاني وفيديوهات الـ <span dir="ltr">UGC</span>.
              </>
            ) : (
              <>
                I'm Sumaia Al-Hasbi — a marketing content writer and social media management specialist working remotely,
                serving the Gulf market for over 4 years with companies and e-commerce store owners. I deliver practical
                solutions including advertising content, editorial plans and content calendars, store management, data
                entry, and product descriptions aligned with <span dir="ltr">(SEO / GEO / AEO)</span>, as well as
                scriptwriting and AI video creation in an advertising style and <span dir="ltr">UGC</span> videos.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
