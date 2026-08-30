'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig, telHref } from '@/data/site';
import { Logo } from './Logo';

const navItems = [
  { href: '/services/', label: 'خدمات' },
  { href: '/brands/', label: 'برندها' },
  { href: '/areas/', label: 'مناطق تهران' },
  { href: '/prices/', label: 'تعرفه‌ها' },
  { href: '/blog/', label: 'وبلاگ' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // بستن منو با تغییر مسیر
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // قفل اسکرول هنگام باز بودن منو
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-18">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name}؛ صفحه اصلی`}>
          <Logo className="size-9" />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-brand-950">{siteConfig.name}</span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
              مرکز تخصصی تعمیرات تلویزیون
            </span>
          </span>
        </Link>

        {/* منوی دسکتاپ */}
        <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                isActive(item.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(siteConfig.phone)}
            className="hidden items-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-brand-800 sm:inline-flex"
          >
            <PhoneIcon className="size-4" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>

          {/* دکمه همبرگری موبایل */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[70vh]' : 'max-h-0 border-t-0'
        }`}
      >
        <nav aria-label="منوی موبایل" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {[...navItems, { href: '/faq/', label: 'سوالات متداول' }, { href: '/about/', label: 'درباره ما' }].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-[15px] font-bold transition ${
                  isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-3 flex gap-3 px-1 pb-2">
            <a
              href={telHref(siteConfig.phone)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-extrabold text-white"
            >
              <PhoneIcon className="size-4" /> تماس فوری
            </a>
            <Link
              href="/contact/"
              className="flex flex-1 items-center justify-center rounded-xl bg-accent-500 px-4 py-3 text-sm font-extrabold text-brand-950 transition hover:bg-accent-400"
            >
              ثبت درخواست تعمیر
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.897.339 1.84.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}