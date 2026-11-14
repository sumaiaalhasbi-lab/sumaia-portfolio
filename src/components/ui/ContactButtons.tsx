import { WhatsAppIcon, LinkedInIcon, EmailIcon } from '@/components/icons/BrandIcons';
import { WHATSAPP_URL, EMAIL_URL } from '@/data/links';
import { useApp } from '@/context/AppContext';

type Variant = 'solid' | 'outline' | 'icon';

const MY_LINKEDIN = 'https://linkedin.com';

export function WhatsAppButton({
  variant = 'solid',
  label,
  className = '',
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const { t } = useApp();
  const text = label ?? t('محادثة واتساب مباشرة ←', 'Chat on WhatsApp ←');

  if (variant === 'icon') {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={`grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white hover:scale-105 ${className}`}
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === 'solid'
          ? `inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-soft hover:shadow-accent/50 hover:-translate-y-0.5 ${className}`
          : `inline-flex items-center justify-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent ${className}`
      }
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{text}</span>
    </a>
  );
}

export function LinkedInButton({
  variant = 'solid',
  label,
  className = '',
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const { t } = useApp();
  const text = label ?? t('تواصل عبر لينكدإن', 'Connect on LinkedIn');

  if (variant === 'icon') {
    return (
      <a
        href={MY_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white hover:scale-105 ${className}`}
      >
        <LinkedInIcon className="h-5 w-5" />
      </a>
    );
  }

  return (
    <a
      href={MY_LINKEDIN}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === 'solid'
          ? `inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-soft hover:shadow-accent/50 hover:-translate-y-0.5 ${className}`
          : `inline-flex items-center justify-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent ${className}`
      }
    >
      <LinkedInIcon className="h-5 w-5" />
      <span>{text}</span>
    </a>
  );
}

export function EmailButton({ variant = 'outline', className = '' }: { variant?: Variant; className?: string }) {
  const { t } = useApp();
  if (variant === 'icon') {
    return (
      <a
        href={EMAIL_URL}
        aria-label="Email"
        className={`grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition hover:bg-accent hover:text-white hover:scale-105 ${className}`}
      >
        <EmailIcon className="h-5 w-5" />
      </a>
    );
  }
  return (
    <a
      href={EMAIL_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-accent/50 bg-transparent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent/10 hover:border-accent ${className}`}
    >
      <EmailIcon className="h-5 w-5" />
      <span>{t('راسلني عبر البريد', 'Email Me')}</span>
    </a>
  );
}
