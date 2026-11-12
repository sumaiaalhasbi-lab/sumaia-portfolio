import { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/links';

export default function Navbar() {
  const { lang, theme, toggleLang, toggleTheme, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-accent/15 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <a href="#home" className="flex shrink-0 items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white font-extrabold text-sm shadow-lg shadow-accent/40 transition-transform duration-300 group-hover:scale-105">
            س
          </span>
          <span className="hidden sm:block text-sm font-bold tracking-tight text-ink-light dark:text-white transition-colors group-hover:text-accent">
            {t('سمية الحاصبي', 'Sumaia Al-Hasbi')}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="relative rounded-lg px-3.5 py-2 text-sm font-bold text-ink-light dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-accent dark:hover:text-accent hover:bg-accent/10 hover:shadow-[0_4px_15px_rgba(124,58,237,0.25)] after:absolute after:bottom-1 after:inset-x-3 after:h-0.5 after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {t(s.ar, s.en)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span
            style={{ color: theme === 'dark' ? '#ffffff' : '#09090b' }}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_4px_15px_rgba(124,58,237,0.35)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {t('متاحة للعمل عن بُعد', 'Available for Remote')}
          </span>

          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-ink-light dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[0_4px_15px_rgba(124,58,237,0.35)]"
          >
            <span className="flex items-center gap-1 text-[11px] font-bold">
              <Languages className="h-4 w-4" />
              {lang === 'ar' ? 'EN' : 'ع'}
            </span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-ink-light dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[0_4px_15px_rgba(124,58,237,0.35)]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setOpen((p) => !p)}
            aria-label="Menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-accent/5 text-ink-light dark:text-white transition hover:bg-accent/15"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div ref={menuRef} className="lg:hidden border-t border-accent/15 bg-bg-light dark:bg-bg-dark backdrop-blur-xl">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-light dark:text-white transition hover:bg-accent/10 hover:text-accent"
                >
                  {t(s.ar, s.en)}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <span
                style={{ color: theme === 'dark' ? '#ffffff' : '#09090b' }}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-bold"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                {t('متاحة للعمل عن بُعد', 'Available for Remote')}
              </span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
