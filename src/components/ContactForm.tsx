import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WHATSAPP_URL } from '@/data/links';

const SERVICE_OPTIONS = [
  'أرغب في تحديد الخدمة المناسبة',
  'تعاقد شهري عن بُعد (إدارة محتوى وحسابات)',
  'كتابة محتوى إعلاني وتسويقي للمنصات',
  'كتابة محتوى ووصف منتجات المتاجر (SEO / GEO / AEO)',
  'إدارة حسابات التواصل الاجتماعي',
  'صناعة فيديوهات الذكاء الاصطناعي والـ UGC',
];

export default function ContactForm() {
  const { lang, t } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: SERVICE_OPTIONS[0], message: '' });
  const [toast, setToast] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const lines = [
      `الاسم: ${form.name}`,
      `البريد الإلكتروني: ${form.email}`,
      form.phone ? `رقم الهاتف: ${form.phone}` : null,
      `الخدمة: ${form.service}`,
      form.message ? `الرسالة: ${form.message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `${WHATSAPP_URL}?text=${text}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const inputClass =
    'w-full rounded-xl border border-accent/20 bg-white/5 px-4 py-3 text-sm text-ink-light dark:text-ink-dark placeholder:text-ink-light/40 dark:placeholder:text-ink-dark/40 transition focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] focus:outline-none';
  const labelClass = 'mb-1.5 block text-[13px] font-bold text-ink-light/80 dark:text-ink-dark/80';

  return (
    <section id="contact-form" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px]">
        <div
          className="relative overflow-hidden rounded-3xl border border-accent/15 p-8 shadow-xl sm:p-12"
          style={{ backgroundColor: 'var(--contact-card-bg)' }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-[90px]"
              style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
            />
          </div>

          <div className="mb-8 text-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}
            >
              {t('تواصل معي', 'Contact Me')}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-ink-light dark:text-ink-dark sm:text-[28px]">
              {t('لنبدأ بمحادثة', "Let's Start a Conversation")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-light/60 dark:text-ink-dark/60">
              {t('أخبرني عن عملك، وسأعود لك خلال يوم عمل واحد.', 'Tell me about your work, and I\u2019ll get back to you within one business day.')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass} htmlFor="cf-name">
                {t('الاسم', 'Name')}
              </label>
              <input
                id="cf-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder={t('اسمك الكامل', 'Your full name')}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-email">
                {t('البريد الإلكتروني', 'Email')}
              </label>
              <input
                id="cf-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-phone">
                {t('رقم الهاتف', 'Phone Number')}
              </label>
              <input
                id="cf-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+966 50 123 4567"
                className={inputClass}
                dir="ltr"
              />
              <p className="mt-1.5 text-[11px] text-ink-light/45 dark:text-ink-dark/45">
                {t('أضف رمز الدولة إن أمكن لتسهيل التواصل معك.', 'Include your country code if possible for easier contact.')}
              </p>
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-service">
                {t('الخدمة التي تهمك (اختياري)', 'Service of Interest (optional)')}
              </label>
              <select
                id="cf-service"
                value={form.service}
                onChange={(e) => update('service', e.target.value)}
                className={inputClass}
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-bg-dark text-ink-dark">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-message">
                {t('رسالتك', 'Your Message')}
              </label>
              <textarea
                id="cf-message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder={t('عن ماذا تريد أن نتحدث؟', 'What would you like to talk about?')}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
              style={{ backgroundColor: '#7c3aed', boxShadow: '0 10px 30px -10px rgba(124, 58, 237, 0.5)' }}
            >
              <Send className="h-4 w-4" />
              {t('إرسال الرسالة', 'Send Message')}
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 animate-fade-up">
          <div
            className="flex items-center gap-2.5 rounded-2xl border border-[#7c3aed]/40 bg-bg-light dark:bg-bg-dark px-5 py-3.5 shadow-2xl"
            style={{ boxShadow: '0 12px 40px -12px rgba(124, 58, 237, 0.4)' }}
          >
            <CheckCircle2 className="h-5 w-5" style={{ color: '#7c3aed' }} />
            <span className="text-sm font-bold text-ink-light dark:text-ink-dark">
              {t(
                'تم تجهيز رسالتك على واتساب — سأعود إليك خلال يوم عمل واحد.',
                'Your message is ready on WhatsApp — I\u2019ll get back to you within one business day.'
              )}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
