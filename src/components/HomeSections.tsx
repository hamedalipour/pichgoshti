import Link from 'next/link';
import { services } from '@/data/services';
import { brands } from '@/data/brands';
import { siteConfig } from '@/data/site';
import { SectionHeading } from './SectionHeading';
import { ServiceCard, BrandCard } from './Cards';
import { FeatureIcon } from './ServiceIcon';

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
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="خدمات ما"
          title="تعمیرات تخصصی تلویزیون در تهران"
          description="از برد پاور و بک‌لایت تا تعویض پنل و نصب دیواری؛ هر خدمت تیم متخصص و تجهیزات تست مخصوص خودش را دارد."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services/" className="inline-flex rounded-2xl border border-brand-200 bg-white px-6 py-3 text-sm font-extrabold text-brand-700 transition hover:bg-brand-50">
            همه {services.length.toLocaleString('fa-IR')} خدمت تعمیرات ←
          </Link>
        </div>
      </section>

      {/* برندها */}
      <section className="border-y border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="برندها"
            title="تعمیر تلویزیون همه برندها"
            description="تکنسین‌های ما مدارک سرویس و تجربه مدل‌های رایج بازار ایران را دارند."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {brands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </div>
      </section>

      {/* چرا ما */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="چرا پیچ‌گوشتی؟"
          title="تفاوت ما در صداقت و تجهیزات است"
          description="علت خرابی با دستگاه تست مشخص و هزینه شفاف اعلام می‌شود؛ نه حدس، نه تعویض بی‌مورد قطعه."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-950/5">
              <span
                aria-hidden="true"
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${f.tile} transition-transform duration-300 group-hover:scale-110`}
              >
                <FeatureIcon name={f.icon} className="size-6" />
              </span>
              <h3 className="text-base font-extrabold text-brand-950">{f.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* مراحل کار */}
      <section className="border-y border-slate-100 bg-brand-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-accent-400">فرآیند کار</span>
            <h2 className="text-2xl font-extrabold sm:text-3xl">از تماس تا تحویل، فقط ۴ قدم</h2>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-500 text-lg font-extrabold text-brand-950">
                  {s.n}
                </span>
                <h3 className="text-base font-extrabold">{s.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}