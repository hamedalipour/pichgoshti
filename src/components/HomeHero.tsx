import Image from 'next/image';
import { siteConfig, telHref, baleUrl, CTAS } from '@/data/site';
import heroBanner from '@/assets/hero-banner.webp';

/** هیرو + نوار آمار صفحه اصلی */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-brand-100/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-accent-300/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-4 py-1.5 text-sm font-bold text-accent-700">
            <span aria-hidden="true">⚡</span>
            اعزام تکنسین {siteConfig.stats.arrivalTime} در سراسر تهران
          </span>
          <h1 className="text-3xl font-extrabold leading-[1.4] text-brand-950 sm:text-4xl lg:text-[2.75rem]">
            تعمیر تخصصی تلویزیون در تهران
            <span className="mt-2 block text-brand-600">همه برندها، همه مدل‌ها — با گارانتی کتبی</span>
          </h1>
          <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            تعمیر برد پاور، برد اصلی، تعویض بک‌لایت و پنل تلویزیون‌های LCD، LED، OLED و QLED.
            {siteConfig.stats.years} سال تجربه، {siteConfig.stats.repaired} تلویزیون تعمیر شده و
            رضایت {siteConfig.stats.satisfaction} مشتریان.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(siteConfig.phone)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-7 py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-brand-800"
            >
              <span aria-hidden="true">☎️</span> {CTAS.call}
            </a>
            <a
              href={baleUrl()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bale-500 px-7 py-4 text-base font-extrabold text-white transition hover:bg-bale-600"
            >
              <span aria-hidden="true">💬</span> {CTAS.order}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-500">
            <li className="flex items-center gap-1.5"><span aria-hidden="true">✅</span> عیب‌یابی قبل از تعمیر</li>
            <li className="flex items-center gap-1.5"><span aria-hidden="true">✅</span> فاکتور رسمی</li>
            <li className="flex items-center gap-1.5"><span aria-hidden="true">✅</span> تعمیر در محل</li>
          </ul>
        </div>
        <Image
          src={heroBanner}
          alt="تعمیر تخصصی تلویزیون توسط تکنسین‌های پیچ‌گوشتی — همراه با ابزار حرفه‌ای"
          priority
          sizes="(min-width: 1024px) 32rem, 100vw"
          className="mx-auto h-auto w-full max-w-lg"
        />
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 text-center sm:grid-cols-4">
          {[
            { label: 'سال تجربه', value: siteConfig.stats.years },
            { label: 'تلویزیون تعمیر شده', value: siteConfig.stats.repaired },
            { label: 'تکنسین متخصص', value: siteConfig.stats.technicians },
            { label: 'رضایت مشتریان', value: siteConfig.stats.satisfaction },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 text-sm text-slate-500">{s.label}</dt>
              <dd className="order-1 text-2xl font-extrabold text-brand-900">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}