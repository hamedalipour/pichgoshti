import Link from 'next/link';
import { siteConfig, telHref, baleUrl } from '@/data/site';
import { serviceOptions } from '@/data/services';
import { areas } from '@/data/areas';
import { brands } from '@/data/brands';
import { Logo } from './Logo';
import { SocialLinks } from './FooterIcons';

export function Footer() {
  const year = new Date().getFullYear().toLocaleString('fa-IR', { useGrouping: false });

  return (
    <footer className="border-t border-brand-900/20 bg-brand-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name}؛ صفحه اصلی`}>
            <Logo className="size-9" />
            <span className="text-lg font-extrabold text-white">{siteConfig.name}</span>
          </Link>
          <p className="text-sm leading-7 text-slate-400">
            {siteConfig.legalName}؛ تعمیر تخصصی تلویزیون‌های دوو و اسنوا به‌همراه LCD، LED و QLED سایر برندها
            در تهران، با گارانتی کتبی {siteConfig.stats.warrantyMonths} ماهه و قطعات اورجینال.
          </p>
          <SocialLinks />
        </div>

        <nav aria-label="خدمات تعمیرات">
          <h2 className="mb-4 text-sm font-extrabold text-white">خدمات تعمیرات</h2>
          <ul className="grid grid-cols-1 gap-2.5 text-sm">
            {serviceOptions.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="text-slate-400 transition hover:text-accent-400">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="برندها و مناطق">
          <h2 className="mb-4 text-sm font-extrabold text-white">برندها و مناطق</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {brands.slice(0, 6).map((b) => (
              <li key={b.slug}>
                <Link href={`/brands/${b.slug}/`} className="text-slate-400 transition hover:text-accent-400">
                  تعمیر {b.name}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link href="/brands/" className="font-bold text-accent-400 transition hover:text-accent-300">
                همه برندها ←
              </Link>
            </li>
          </ul>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {areas.slice(0, 6).map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}/`} className="text-slate-400 transition hover:text-accent-400">
                  {a.name}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link href="/areas/" className="font-bold text-accent-400 transition hover:text-accent-300">
                همه مناطق تهران ←
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-extrabold text-white">تماس با ما</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href={telHref(siteConfig.phone)} className="flex items-center gap-2 transition hover:text-accent-400">
                <span aria-hidden="true">☎️</span>
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={baleUrl()} target="_blank" rel="noopener" className="flex items-center gap-2 transition hover:text-accent-400">
                <span aria-hidden="true">💬</span>
                <span dir="ltr">{siteConfig.mobileDisplay}</span>
                <span className="text-xs text-slate-500">(بله)</span>
              </a>
            </li>
            <li className="flex items-start gap-2 text-slate-400">
              <span aria-hidden="true">📍</span>
              <address className="not-italic leading-7">{siteConfig.address.street}</address>
            </li>
            <li className="flex items-start gap-2 text-slate-400">
              <span aria-hidden="true">🕒</span>
              <span className="leading-7">{siteConfig.workingHours}</span>
            </li>
            <li>
              <Link href="/contact/" className="mt-1 inline-flex rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-extrabold text-brand-950 transition hover:bg-accent-400">
                ثبت درخواست تعمیر
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row">
          <p>© {year} تمامی حقوق برای {siteConfig.legalName} محفوظ است.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <li><Link href="/about/" className="transition hover:text-slate-300">درباره ما</Link></li>
            <li><Link href="/faq/" className="transition hover:text-slate-300">سوالات متداول</Link></li>
            <li><Link href="/contact/" className="transition hover:text-slate-300">تماس</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}