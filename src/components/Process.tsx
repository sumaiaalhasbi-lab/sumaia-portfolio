import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const STEPS = [
  {
    ar: { title: 'الاستشارة وفهم الهدف', desc: 'جلسة لتحديد احتياج مشروعك ونوع التعاقد.' },
    en: { title: 'Consultation & Goal Understanding', desc: 'A session to define your project needs and contract type.' },
  },
  {
    ar: { title: 'الخطة والهيكلة', desc: 'إعداد الخطة التحريرية، أو هيكلة وصف المنتجات (SEO / GEO / AEO).' },
    en: { title: 'Plan & Structure', desc: 'Editorial plan or product description structure (SEO / GEO / AEO).' },
  },
  {
    ar: { title: 'التنفيذ والإنتاج', desc: 'كتابة المحتوى والاسكربتات، إدخال بيانات المتجر، أو صناعة فيديوهات الذكاء الاصطناعي والـ UGC.' },
    en: { title: 'Execution & Production', desc: 'Content & scripts, store data entry, or AI/UGC video creation.' },
  },
  {
    ar: { title: 'التسليم والمتابعة', desc: 'مراجعة الأعمال، التسليم في الموعد، وتقديم تقارير الأداء.' },
    en: { title: 'Delivery & Follow-up', desc: 'Review, on-time delivery, and performance reports.' },
  },
];

const FAQS = [
  {
    ar: {
      q: 'كيف أختار كاتب محتوى متاجر إلكترونية مناسب؟',
      a: 'ابحث عن كاتب يجمع بين المهارة البيعية والفهم التقني لمحركات البحث والذكاء الاصطناعي. أكتب محتوى ووصف منتجات متوافق مع SEO و GEO و AEO ليتصدر متجرك نتائج البحث التقليدية والذكية معاً.',
    },
    en: {
      q: 'How do I choose the right e-commerce copywriter?',
      a: 'Look for a writer who combines sales skill with technical understanding of search and AI. I write product content aligned with SEO, GEO, and AEO so your store ranks in both traditional and AI search results.',
    },
  },
  {
    ar: {
      q: 'هل يمكن التوظيف الشهري عن بُعد؟',
      a: 'نعم، أقدم نموذج توظيف شهري عن بُعد لإدارة حسابات التواصل الاجتماعي وكتابة المحتوى بشكل مستمر، مع تقارير دورية وتقويم محتوى واضح.',
    },
    en: {
      q: 'Is monthly remote hiring available?',
      a: 'Yes, I offer a monthly remote model for ongoing social media management and content writing, with periodic reports and a clear content calendar.',
    },
  },
  {
    ar: {
      q: 'ما الذي تشمله إدارة حسابات التواصل الاجتماعي؟',
      a: 'كتابة المحتوى، إعداد الخطط التحريرية، تنسيق النشر، إعداد التقارير، وكتابة سيناريوهات فيديوهات الذكاء الاصطناعي والـ UGC، بالإضافة إلى إعلانات مدفوعة مستهدفة لإنستغرام وفيسبوك.',
    },
    en: {
      q: 'What does social media management include?',
      a: 'Content writing, editorial plans, scheduling, reports, AI/UGC video scripts, plus targeted paid ads for Instagram and Facebook.',
    },
  },
  {
    ar: {
      q: 'هل تصنعين فيديوهات الذكاء الاصطناعي والـ UGC؟',
      a: 'نعم، أكتب السيناريوهات وأصنع فيديوهات الذكاء الاصطناعي بأسلوب إعلاني احترافي، بالإضافة إلى فيديوهات UGC بأسلوب تجريبي واقعي يبني الثقة ويدفع للتحويل.',
    },
    en: {
      q: 'Do you create AI and UGC videos?',
      a: 'Yes, I write scripts and create AI videos in a professional advertising style, plus UGC-style realistic testimonial videos that build trust and drive conversion.',
    },
  },
  {
    ar: {
      q: 'كيف أتواصل مع سمية الحاصبي؟',
      a: 'يمكنك التواصل معي مباشرة عبر واتساب أو لينكدإن من أي زر في الصفحة. أرد بسرعة وأرتب لك جلسة استشارية لمناقشة مشروعك.',
    },
    en: {
      q: 'How do I contact Sumaia Al-Hasbi?',
      a: 'You can reach me directly via WhatsApp or LinkedIn from any button on the page. I reply quickly and will set up a consultation to discuss your project.',
    },
  },
];

export function Process() {
  const { lang, t } = useApp();
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
          {t('طريقة شغلي', 'How I Work')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('أربع خطوات من الفكرة إلى التسليم', 'Four steps from idea to delivery')}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const data = lang === 'ar' ? s.ar : s.en;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark p-6 transition hover:border-accent/50 hover:-translate-y-1"
            >
              <span className="text-3xl font-extrabold text-accent/30 transition group-hover:text-accent/60">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-sm font-bold text-ink-light dark:text-ink-dark">{data.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-light/65 dark:text-ink-dark/65">{data.desc}</p>
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FAQ() {
  const { lang, t } = useApp();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
          <MessageCircleQuestion className="h-3.5 w-3.5" />
          {t('الأسئلة الأكثر تكراراً', 'Frequently Asked Questions')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('أسئلة قد تدور في ذهنك', 'Questions you might have')}
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const data = lang === 'ar' ? f.ar : f.en;
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border bg-card-light dark:bg-card-dark transition ${
                isOpen ? 'border-accent/50 glow-soft' : 'border-accent/15'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-right"
              >
                <span className="text-sm font-bold text-ink-light dark:text-ink-dark">{data.q}</span>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition ${isOpen ? 'rotate-45' : ''}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-[13px] leading-relaxed text-ink-light/70 dark:text-ink-dark/70">{data.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export function FooterCTA() {
  const { t } = useApp();
  const waLink = ['https:/', 'wa.me', '967785759951'].join('/');
  const liLink = ['https:/', 'www.linkedin.com', 'in', 'sumaiaalhasbi', ''].join('/');

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-8 text-center sm:p-14">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-accent/25 blur-[100px]" />
          <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-accent/15 blur-[100px]" />
        </div>
        <h2 className="mx-auto max-w-2xl text-2xl font-extrabold leading-snug text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('بتبني متجر أو براند ومحتاج محتوى يتصدر ويبيع؟', 'Building a store or brand and need content that ranks and sells?')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink-light/70 dark:text-ink-dark/70">
          {t('احكي لي عن مشروعك — وأنا أرتب لك خطة المحتوى والظهور.', 'Tell me about your project — and I’ll arrange your content and visibility plan.')}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-soft hover:-translate-y-0.5"
          >
            <span>{t('محادثة واتساب مباشرة ←', 'Chat on WhatsApp ←')}</span>
          </a>

          <a
            href={liLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent"
          >
            <span>{t('تواصل عبر لينكدإن', 'Connect on LinkedIn')}</span>
          </a>
        </div>
      </div>

      <footer className="mt-12 border-t border-accent/15 pt-8 text-center text-xs text-ink-light/60 dark:text-ink-dark/60">
        <p>© {new Date().getFullYear()} {t('سمية الحاصبي — جميع الحقوق محفوظة', 'Sumaia Al-Hasbi — All Rights Reserved')}</p>
      </footer>
    </section>
  );
}
