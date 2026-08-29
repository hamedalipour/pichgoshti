import Link from 'next/link';
import { siteConfig, telHref, baleUrl, CTAS } from '@/data/site';

/**
 * بخش دعوت به اقدام پایین صفحات
 */
export function CTASection({
  title = 'تلویزیون شما امروز تعمیر می‌شود',
  description = 'همین حالا تماس بگیرید یا درخواست را در بله ثبت کنید؛ برآورد هزینه و زمان اعزام بلافاصله اعلام می‌شود.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-6 py-12 text-center sm:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-brand-700/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5">
          <h2 className="max-w-xl text-2xl font-extrabold leading-snug text-white sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-xl leading-8 text-slate-300">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(siteConfig.phone)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 px-7 py-4 text-base font-extrabold text-brand-950 transition hover:bg-accent-400"
            >
              <span aria-hidden="true">☎️</span> {CTAS.call} — <span dir="ltr">{siteConfig.phoneDisplay}</span>
            </a>
            <a
              href={baleUrl()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-7 py-4 text-base font-extrabold text-white ring-1 ring-white/25 transition hover:bg-white/15"
            >
              <span aria-hidden="true">💬</span> {CTAS.bale}
            </a>
          </div>
          <p className="text-sm text-slate-400">
            گارانتی کتبی {siteConfig.stats.warrantyMonths} ماهه • اعزام {siteConfig.stats.arrivalTime} • عیب‌یابی شفاف قبل از تعمیر
          </p>
          <Link href="/contact/" className="text-sm font-bold text-accent-400 transition hover:text-accent-300">
            یا فرم درخواست تعمیر را پر کنید ←
          </Link>
        </div>
      </div>
    </section>
  );
}