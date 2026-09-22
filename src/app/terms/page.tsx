import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { PageHero, SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'شرایط استفاده و قوانین خدمات | پیچ‌گوشتی',
  description:
    'شرایط استفاده از سایت پیچ‌گوشتی، قوانین ارائه خدمات تعمیر تلویزیون، گارانتی کتبی، نحوه قیمت‌گذاری و حریم خصوصی مشتریان.',
  path: '/terms/',
});

const sections = [
  {
    title: 'شرایط استفاده از سایت',
    body: [
      'محتوای این سایت برای اطلاع‌رسانی درباره خدمات تعمیر تلویزیون ارائه می‌شود. بازه‌های قیمتی ذکرشده تقریبی هستند و قیمت قطعی پس از عیب‌یابی و با تأیید مشتری نهایی می‌شود.',
      'کپی محتوا بدون ذکر منبع و استفاده تجاری از تصاویر و متون بدون هماهنگی ممنوع است.',
    ],
  },
  {
    title: 'قوانین ارائه خدمات',
    body: [
      'عیب‌یابی در محل انجام می‌شود؛ در صورت تعمیر، هزینه عیب‌یابی از مبلغ نهایی کسر یا رایگان محاسبه می‌شود.',
      'شروع هر تعمیر فقط پس از اعلام قیمت قطعی و تأیید مشتری انجام می‌شود. هیچ هزینه‌ای بدون توافق قبلی دریافت نمی‌شود.',
      'فقط تعویض پنل به دلیل حساسیت بالا با بسته‌بندی ایمن به کارگاه منتقل می‌شود؛ سایر تعمیرات در محل مشتری انجام می‌شود.',
    ],
  },
  {
    title: 'گارانتی',
    body: [
      'همه تعمیرات با گارانتی کتبی ۳ ماهه و فاکتور رسمی تحویل داده می‌شود.',
      'اگر همان مشکل (همان قطعه/همان عیب) در دوره گارانتی عودت کند، تعمیر مجدد بدون دریافت هزینه انجام می‌شود.',
      'گارانتی شامل آسیب فیزیکی، نوسان شدید برق پس از تحویل، دستکاری توسط شخص ثالث و مایع‌خوردگی نمی‌شود.',
    ],
  },
  {
    title: 'حریم خصوصی',
    body: [
      'شماره تماس و آدرس مشتری فقط برای هماهنگی اعزام تکنسین و پیگیری سفارش استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد.',
      'این سایت از Google Analytics برای آمار بازدید استفاده می‌کند و داده‌های تحلیلی به‌صورت تجمیعی است.',
      'برای سؤال درباره حریم خصوصی یا حذف اطلاعات، از طریق صفحه تماس پیام بدهید.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="شرایط استفاده و قوانین خدمات"
        description="قواعد شفاف قیمت‌گذاری، گارانتی کتبی ۳ ماهه، نحوه ارائه خدمات تعمیر تلویزیون و حریم خصوصی مشتریان پیچ‌گوشتی."
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <article key={s.title} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <SectionHeading align="start" title={s.title} />
              <div className="mt-5 flex flex-col gap-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-9 text-slate-700">{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          سؤالی دارید؟ از{' '}
          <Link href="/contact/" className="font-bold text-brand-600">صفحه تماس</Link>{' '}
          یا <Link href="/faq/" className="font-bold text-brand-600">سوالات متداول</Link> بپرسید.
        </p>
      </section>

      <div className="pb-16">
        <CTASection title="نیاز به تعمیر تلویزیون دارید؟ عیب‌یابی شفاف قبل از هر هزینه‌ای" />
      </div>
    </>
  );
}
