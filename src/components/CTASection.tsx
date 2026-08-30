import Link from 'next/link';
import { siteConfig, telHref, baleUrl, CTAS } from '@/data/site';
import { FeatureIcon } from './ServiceIcon';

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
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-14 text-center sm:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 end-8 size-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5">
          <h2 className="max-w-xl text-3xl font-extrabold leading-[1.35] text-white sm:text-4xl sm:leading-[1.3]">
            {title}
          </h2>
          <p className="max-w-xl leading-8 text-slate-300">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(siteConfig.phone)}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-accent-500 px-7 py-4 text-base font-extrabold text-brand-950 shadow-lg shadow-accent-500/20 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-accent-400"
            >
              <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-brand-950/10">
                <FeatureIcon name="phone" className="size-4" />
              </span>
              {CTAS.call}
              <span dir="ltr">{siteConfig.phoneDisplay}</span>
            </a>
            <a
              href={baleUrl()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white/10 px-7 py-4 text-base font-extrabold text-white ring-1 ring-white/25 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-white/15"
            >
              <span aria-hidden="true" className="text-accent-400">
                <FeatureIcon name="chat" className="size-5" />
              </span>
              {CTAS.bale}
            </a>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <li>گارانتی کتبی {siteConfig.stats.warrantyMonths} ماهه</li>
            <li aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />
            <li>اعزام {siteConfig.stats.arrivalTime}</li>
            <li aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />
            <li>عیب‌یابی شفاف قبل از تعمیر</li>
          </ul>
          <Link href="/contact/" className="text-sm font-bold text-accent-400 transition hover:text-accent-300">
            یا فرم درخواست تعمیر را پر کنید ←
          </Link>
        </div>
      </div>
    </section>
  );
}