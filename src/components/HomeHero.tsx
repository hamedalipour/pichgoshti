import Image from 'next/image';
import { siteConfig, telHref, baleUrl, CTAS } from '@/data/site';
import { FeatureIcon } from './ServiceIcon';
import heroBanner from '@/assets/hero-banner.webp';

const heroStats = [
  { label: 'سال تجربه', value: siteConfig.stats.years },
  { label: 'تلویزیون تعمیر شده', value: siteConfig.stats.repaired },
  { label: 'تکنسین متخصص', value: siteConfig.stats.technicians },
  { label: 'رضایت مشتریان', value: siteConfig.stats.satisfaction },
];

const heroChecks = ['عیب‌یابی قبل از تعمیر', 'فاکتور رسمی', 'تعمیر در محل'];

/** هیرو + نوار آمار صفحه اصلی — چیدمان نامتقارن با ورود پلکانی */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      {/* دو هاله ملایم نامتقارن در پس‌زمینه */}
      <div aria-hidden="true" className="pointer-events-none absolute -start-40 -top-24 size-[26rem] rounded-full bg-brand-100/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -end-24 bottom-10 size-80 rounded-full bg-accent-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* ستون متن */}
        <div className="flex flex-col items-start gap-7 lg:col-span-7">
          <span className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-bold text-brand-800 shadow-sm">
            <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-accent-500/15 text-accent-600">
              <FeatureIcon name="zap" className="size-3.5" />
            </span>
            اعزام تکنسین {siteConfig.stats.arrivalTime} در سراسر تهران
          </span>

          <h1 className="hero-rise text-4xl font-extrabold leading-[1.3] text-brand-950 [animation-delay:90ms] sm:text-5xl sm:leading-[1.25]">
            تعمیر تخصصی تلویزیون در تهران
            <span className="mt-3 block text-xl font-bold text-brand-600 sm:text-2xl">
              همه برندها، همه مدل‌ها؛ با گارانتی کتبی
            </span>
          </h1>

          <p className="hero-rise max-w-xl text-base leading-8 text-slate-600 [animation-delay:180ms] sm:text-lg">
            تعمیر برد پاور، برد اصلی، تعویض بک‌لایت و پنل تلویزیون‌های LCD، LED، OLED و QLED.
          </p>
          <div className="hero-rise flex w-full flex-col gap-3 [animation-delay:270ms] sm:w-auto sm:flex-row">
            <a
              href={telHref(siteConfig.phone)}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-accent-500 px-7 py-4 text-base font-extrabold text-brand-950 shadow-lg shadow-accent-500/25 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-accent-400"
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
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-extrabold text-brand-800 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
            >
              <span aria-hidden="true" className="text-bale-600">
                <FeatureIcon name="chat" className="size-5" />
              </span>
              {CTAS.order}
            </a>
          </div>

          <ul className="hero-rise flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-600 [animation-delay:360ms]">
            {heroChecks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <FeatureIcon name="check" className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ستون تصویر با نشان گارانتی */}
        <div className="hero-rise relative [animation-delay:200ms] lg:col-span-5">
          <Image
            src={heroBanner}
            alt="تعمیر تخصصی تلویزیون توسط تکنسین‌های پیچ‌گوشتی — همراه با ابزار حرفه‌ای"
            priority
            sizes="(min-width: 1024px) 42rem, 100vw"
            className="mx-auto h-auto w-full max-w-lg rounded-[2rem] shadow-2xl shadow-brand-950/10 ring-1 ring-brand-100 lg:max-w-none"
          />
          <div className="absolute bottom-5 start-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-brand-950/10 ring-1 ring-slate-100 backdrop-blur">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
              <FeatureIcon name="shield" className="size-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold text-brand-950">گارانتی کتبی {siteConfig.stats.warrantyMonths} ماهه</span>
              <span className="text-xs text-slate-500">روی همه تعمیرات</span>
            </span>
          </div>
        </div>
      </div>

      {/* نوار آمار با جداکننده و نشان کهربایی */}
      <div className="relative border-t border-slate-100 bg-white/70">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-9 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 sm:border-e sm:border-slate-100 sm:last:border-e-0"
            >
              <dd className="order-1 text-3xl font-extrabold text-brand-950">{s.value}</dd>
              <span aria-hidden="true" className="order-2 h-0.5 w-7 rounded-full bg-accent-400" />
              <dt className="order-3 text-sm text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}