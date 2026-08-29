import { ContactForm } from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { siteConfig, telHref, baleUrl } from '@/data/site';

export const metadata = buildMetadata({
  title: 'تماس با ما و ثبت درخواست تعمیر تلویزیون',
  description:
    'شماره تماس، بله، آدرس کارگاه در سعادت‌آباد تهران و فرم ثبت درخواست تعمیر تلویزیون؛ پاسخ‌گویی شنبه تا پنجشنبه ۹ صبح تا ۸ شب.',
  path: '/contact/',
});

const infoItems = [
  {
    icon: '☎️',
    label: 'تلفن ثابت',
    value: siteConfig.phoneDisplay,
    href: telHref(siteConfig.phone),
    ltr: true,
  },
  {
    icon: '💬',
    label: 'موبایل و بله',
    value: siteConfig.mobileDisplay,
    href: baleUrl(),
    external: true,
    ltr: true,
  },
  {
    icon: '✉️',
    label: 'ایمیل',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    ltr: true,
  },
  { icon: '📍', label: 'آدرس کارگاه', value: siteConfig.address.street },
  { icon: '🕒', label: 'ساعت کاری', value: siteConfig.workingHours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="تماس با ما و ثبت درخواست تعمیر"
        description="تلفن بزنید، در بله پیام بدهید یا فرم را پر کنید؛ برآورد اولیه هزینه و زمان اعزام بلافاصله اعلام می‌شود. مشاوره اولیه رایگان است."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={telHref(siteConfig.phone)}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-800"
          >
            <span aria-hidden="true">☎️</span> تماس فوری — <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>
          <a
            href={baleUrl()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-2xl bg-bale-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-bale-600"
          >
            <span aria-hidden="true">💬</span> گفتگو در بله
          </a>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        {/* فرم درخواست */}
        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold text-brand-950">فرم ثبت درخواست تعمیر</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            فرم را پر کنید؛ اطلاعات شما به یک پیام آماده بله تبدیل می‌شود و همان‌جا ارسالش می‌کنید.
            معمولاً در کمتر از ۱۵ دقیقه پاسخ می‌دهیم.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        {/* اطلاعات تماس و آدرس */}
        <div className="flex flex-col gap-5">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {infoItems.map((item) => (
              <li key={item.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span aria-hidden="true" className="text-xl">{item.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-400">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
                      dir={item.ltr ? 'ltr' : undefined}
                      className="text-sm font-extrabold text-brand-900 transition hover:text-brand-600"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-extrabold leading-7 text-brand-900">{item.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* نقشه آدرس کارگاه */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${siteConfig.geo.lat},${siteConfig.geo.lng}&z=16&hl=fa&output=embed`}
              title="نقشه آدرس کارگاه پیچ‌گوشتی"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
