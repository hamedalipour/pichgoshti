import { buildMetadata } from '@/lib/seo';
import { PageHero, SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { Testimonials } from '@/components/Testimonials';
import { siteConfig } from '@/data/site';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { brands } from '@/data/brands';

export const metadata = buildMetadata({
  title: 'درباره ما — مرکز تخصصی تعمیرات تلویزیون پیچ‌گوشتی',
  description: `${siteConfig.legalName} از سال ${siteConfig.foundedYear} در تهران؛ تیم تخصصی تعمیر برد، بک‌لایت و پنل با گارانتی کتبی، قیمت شفاف و قطعات اورجینال.`,
  path: '/about/',
});

const values = [
  {
    icon: '⚡',
    title: 'سرعت در اعزام',
    text: `در اکثر مناطق تهران ${siteConfig.stats.arrivalTime}؛ چون می‌دانیم تلویزیون قلب خانه است و نبودش حس می‌شود.`,
  },
  {
    icon: '🛡️',
    title: 'گارانتی کتبی',
    text: `روی همه تعمیرات گارانتی کتبی ${siteConfig.stats.warrantyMonths} ماهه و فاکتور رسمی می‌دهیم؛ اگر همان مشکل برگردد، مجدد رایگان رفع می‌شود.`,
  },
  {
    icon: '🔍',
    title: 'شفافیت در هزینه',
    text: 'علت خرابی با تجهیزات تست مشخص و هزینه قطعی قبل از شروع کار با شما توافق می‌شود؛ نه حدس، نه هزینه پنهان.',
  },
  {
    icon: '⚙️',
    title: 'احترام به دستگاه',
    text: 'قطعات از تأمین‌کنندگان معتبر و متناسب با شماره پنل انتخاب می‌شود؛ نوع قطعه روی فاکتور قید می‌گردد.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`درباره ${siteConfig.name}`}
        description={`${siteConfig.legalName}؛ از سال ${siteConfig.foundedYear} در تهران. کارگاه تخصصی بردها و پنل، تیمی از تکنسین‌های آموزش‌دیده و هزاران تعمیر موفق.`}
      />

      {/* داستان ما */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHeading
            align="start"
            as="h2"
            eyebrow="داستان ما"
            title="از یک میز کار کوچک تا مرجع تعمیرات تلویزیون"
          />
          <p className="leading-8 text-slate-600">
            پیچ‌گوشتی سال {siteConfig.foundedYear} با یک میز کار، یک هویه و یک قانون ساده شروع شد:
            «هیچ قطعه‌ای را بدون تشخیص دقیق عیب عوض نکن.» همان قانون ما را پس از
            {' '}{siteConfig.stats.years} سال فعالیت به یکی از مراجع تخصصی تعمیرات تلویزیون در تهران
            تبدیل کرده است.
          </p>
          <p className="leading-8 text-slate-600">
            امروز {siteConfig.stats.technicians} تکنسین متخصص در تیم ما کار می‌کنند؛ هر کدام در حوزه خودشان —
            برد پاور، برد اصلی، بک‌لایت، پنل یا نرم‌افزار تلویزیون‌های هوشمند — آموزش دیده‌اند.
            کارگاه ما در سعادت‌آباد مجهز به دستگاه تست بک‌لایت، منبع تغذیه آزمایشی و تجهیزات تعمیر
            برد است و تلویزیون‌های نیازمند کارگاهی با بسته‌بندی ایمن جمع‌آوری و تحویل می‌شوند.
          </p>
          <p className="leading-8 text-slate-600">
            بیش از {siteConfig.stats.repaired} تلویزیون تعمیرشده و رضایت {siteConfig.stats.satisfaction} مشتریان،
            نتیجه همین شفافیت و وسواس در کیفیت کار است.
          </p>
        </div>

        {/* کارت آمار */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-950 p-8 text-white sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-brand-700/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-20 size-56 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-x-6 gap-y-8">
            {[
              { label: 'سال تجربه', value: siteConfig.stats.years },
              { label: 'تلویزیون تعمیر شده', value: siteConfig.stats.repaired },
              { label: 'تکنسین متخصص', value: siteConfig.stats.technicians },
              { label: 'رضایت مشتریان', value: siteConfig.stats.satisfaction },
              { label: 'شروع فعالیت', value: siteConfig.foundedYear },
              { label: 'امتیاز مشتریان', value: `${siteConfig.rating.value} از ۵` },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <span className="order-1 text-2xl font-extrabold text-accent-400">{s.value}</span>
                <span className="order-2 text-sm text-slate-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="border-y border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="اصل کار ما"
            title="چرا مشتری‌ها به پیچ‌گوشتی اعتماد می‌کنند؟"
            description="چهار اصلی که از روز اول تا امروز تغییر نکرده است."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
                <span className="text-3xl" aria-hidden="true">{v.icon}</span>
                <h3 className="text-base font-extrabold text-brand-950">{v.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* آمار پوشش */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <dl className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-8 text-center sm:grid-cols-4">
          {[
            { label: 'خدمت تخصصی', value: services.length.toLocaleString('fa-IR') },
            { label: 'برند تحت سرویس', value: brands.length.toLocaleString('fa-IR') },
            { label: 'محله تحت پوشش تهران', value: `${areas.length.toLocaleString('fa-IR')}+` },
            { label: 'ماه گارانتی کتبی', value: siteConfig.stats.warrantyMonths.toLocaleString('fa-IR') },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dd className="order-1 text-3xl font-extrabold text-brand-900">{s.value}</dd>
              <dt className="order-2 text-sm text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Testimonials />

      <div className="py-16">
        <CTASection title="تلویزیون‌تان را به تخصص بسپارید" />
      </div>
    </>
  );
}
