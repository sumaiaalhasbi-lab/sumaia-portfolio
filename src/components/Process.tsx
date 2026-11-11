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
          {/* Inline CTA icons linking directly */}
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-soft hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {t('واتساب', 'WhatsApp')}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.451zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            {t('لينكدإن', 'LinkedIn')}
          </a>
          <a
            href="mailto:sumaiaalhasi@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {t('البريد الإلكتروني', 'Email')}
          </a>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          {t('العمل عن بُعد بالكامل', '100% Remote Work')}
        </p>
      </div>

      <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-accent/10 pt-6 text-center sm:flex-row sm:text-right">
        <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">
          {t('© 2026 سمية الحاصبي | Sumaia Al-Hasbi — جميع الحقوق محفوظة', '© 2026 Sumaia Al-Hasbi — All rights reserved')}
        </p>
        <p className="text-xs text-ink-light/40 dark:text-ink-dark/40">
          {t('كاتبة محتوى تسويقي · إدارة سوشيال ميديا · SEO / GEO / AEO', 'Marketing copywriter · Social media · SEO / GEO / AEO')}
        </p>
      </footer>
    </section>
  );
}
