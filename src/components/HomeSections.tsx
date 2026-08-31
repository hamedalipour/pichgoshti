import Link from 'next/link';
import { services } from '@/data/services';
import { brands, featuredBrandSlugs } from '@/data/brands';
import { siteConfig } from '@/data/site';
import { SectionHeading } from './SectionHeading';
import { ServiceCard, BrandCard } from './Cards';
import { FeatureIcon } from './ServiceIcon';
import { Reveal } from './Reveal';

const features = [
  { icon: 'zap', tile: 'bg-amber-100 text-amber-600', title: 'اعزام سریع تکنسین', text: `در اکثر مناطق تهران ${siteConfig.stats.arrivalTime}؛ عیب‌یابی همان بازدید اول.` },
  { icon: 'shield', tile: 'bg-emerald-100 text-emerald-600', title: `گارانتی کتبی ${siteConfig.stats.warrantyMonths} ماهه`, text: 'همه تعمیرات با فاکتور و گارانتی کتبی؛ اگر مشکل برگردد، مجدد رایگان است.' },
  { icon: 'search', tile: 'bg-sky-100 text-sky-600', title: 'عیب‌یابی شفاف', text: 'قبل از شروع تعمیر، علت خرابی و هزینه قطعی را با شما توافق می‌کنیم. بدون هزینه پنهان.' },
  { icon: 'box', tile: 'bg-violet-100 text-violet-600', title: 'قطعات اورجینال', text: 'پنل، بک‌لایت و بردها از تأمین‌کنندگان معتبر؛ نوع قطعه روی فاکتور قید می‌شود.' },
];

const steps = [
  { n: '۱', title: 'ثبت درخواست', text: 'تلفن بزنید یا در بله مدل تلویزیون و مشکل را بفرستید؛ برآورد اولیه همان لحظه می‌گیرید.' },
  { n: '۲', title: 'عیب‌یابی', text: 'تکنسین با تجهیزات تست به محل شما می‌آید یا دستگاه به کارگاه منتقل می‌شود.' },
  { n: '۳', title: 'تأیید و تعمیر', text: 'هزینه قطعی اعلام و با تأیید شما، تعمیر با قطعه اورجینال انجام می‌شود.' },
  { n: '۴', title: 'تحویل با گارانتی', text: 'تست ۴۸ ساعته، فاکتور رسمی و گارانتی کتبی تحویل می‌شود.' },
];

export function HomeSections() {
  return (
    <>
      {/* خدمات */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="خدمات ما"
          title="تعمیرات تخصصی تلویزیون در تهران"
          description="از برد پاور و بک‌لایت تا تعویض پنل و نصب دیواری؛ هر خدمت تیم متخصص و تجهیزات تست مخصوص خودش را دارد."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className={i === 0 ? 'h-full sm:col-span-2' : 'h-full'}>
              <ServiceCard service={s} featured={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services/"
            className="inline-flex rounded-2xl border border-brand-200 bg-white px-6 py-3 text-sm font-extrabold text-brand-700 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
          >
            همه {services.length.toLocaleString('fa-IR')} خدمت تعمیرات ←
          </Link>
        </div>
      </section>

      {/* برندها — تمرکز روی دوو و اسنوا */}
      <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="تخصص اصلی ما"
            title="تعمیر تلویزیون دوو و اسنوا"
            description="بیشترین سهم تعمیرات کارگاه ما مربوط به دوو و اسنواست؛ به همین دلیل تجربه ما روی این دو برند عمیق‌تر است و قطعاتشان همیشه آماده داریم. سایر برندها هم پوشش داده می‌شوند."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {brands
              .filter((b) => featuredBrandSlugs.includes(b.slug))
              .map((b, i) => (
                <Reveal key={b.slug} delay={i * 60} className="h-full">
                  <BrandCard brand={b} featured />
                </Reveal>
              ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands
              .filter((b) => !featuredBrandSlugs.includes(b.slug))
              .map((b, i) => (
                <Reveal key={b.slug} delay={(i % 4) * 50} className="h-full">
                  <BrandCard brand={b} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* چرا ما */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="چرا پیچ‌گوشتی؟"
          title="تفاوت ما در صداقت و تجهیزات است"
          description="علت خرابی با دستگاه تست مشخص و هزینه شفاف اعلام می‌شود؛ نه حدس، نه تعویض بی‌مورد قطعه."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="h-full">
              <div className="group flex h-full flex-col gap-4 rounded-3xl bg-slate-50 p-7 transition duration-300 ease-out-quart hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-brand-950/[0.06] hover:ring-1 hover:ring-slate-200">
                <span
                  aria-hidden="true"
                  className={`inline-flex size-12 items-center justify-center rounded-2xl ${f.tile} transition-transform duration-300 ease-out-quart group-hover:scale-110`}
                >
                  <FeatureIcon name={f.icon} className="size-6" />
                </span>
                <h3 className="text-base font-extrabold text-brand-950">{f.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* مراحل کار */}
      <section className="relative overflow-hidden border-y border-white/10 bg-brand-950 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 end-0 size-72 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2.5 text-sm font-extrabold text-accent-400">
              <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-accent-500" />
              فرآیند کار
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.35] sm:text-4xl sm:leading-[1.3]">از تماس تا تحویل، فقط ۴ قدم</h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="h-full">
                <li className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 transition duration-300 ease-out-quart hover:bg-white/[0.09]">
                  <span aria-hidden="true" className="pointer-events-none absolute -top-2 end-4 select-none text-6xl font-extrabold text-white/[0.06]">
                    {s.n}
                  </span>
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-500 text-lg font-extrabold text-brand-950">
                    {s.n}
                  </span>
                  <h3 className="text-base font-extrabold">{s.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}