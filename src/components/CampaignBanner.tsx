import Link from 'next/link';
import { siteConfig, telHref } from '@/data/site';

/**
 * بنر کمپین تخفیف — زیر هدر در همه صفحات
 * فعال/غیرفعال بودن و متن‌ها از content/site.json (فیلد campaign) مدیریت می‌شود.
 * CTA اصلی تماس تلفنی است و لینک جزئیات به صفحه هزینه بک‌لایت می‌رود.
 */
export function CampaignBanner() {
  const c = siteConfig.campaign;
  if (!c?.active) return null;

  return (
    <aside
      aria-label="کمپین تخفیف ویژه"
      className="relative z-40 overflow-hidden bg-gradient-to-l from-accent-600 via-accent-500 to-accent-400 text-brand-950"
    >
      {/* جلوه براق ملایم */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-10 start-1/4 h-24 w-64 rotate-12 rounded-full bg-white/20 blur-2xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-center sm:flex-row sm:gap-3 sm:text-start">
        <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-extrabold leading-6 sm:justify-start">
          <span className="rounded-full bg-brand-950/15 px-2.5 py-0.5 text-xs font-extrabold">{c.badge}</span>
          {c.title}
          <span className="text-xs font-bold text-brand-900/75">{c.subtitle}</span>
        </p>

        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={telHref(siteConfig.phone)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-950 px-4 py-1.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-brand-900"
          >
            <span aria-hidden="true">☎️</span>
            استفاده از تخفیف
          </a>
          {c.href ? (
            <Link
              href={c.href}
              className="text-xs font-extrabold text-brand-900 underline decoration-brand-900/40 underline-offset-4 transition hover:decoration-brand-900"
            >
              جزئیات و هزینه‌ها
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
