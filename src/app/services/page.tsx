import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'خدمات تعمیرات تلویزیون | از برد پاور تا نصب دیواری',
  description:
    'فهرست کامل خدمات تعمیرات تلویزیون در تهران: تعمیر برد پاور و اصلی، تعویض بک‌لایت و پنل، تعمیر T-Con، اسمارت و اندروید تلویزیون و نصب دیواری.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="خدمات تعمیرات تخصصی تلویزیون"
        description="هر خدمت، صفحه اختصاصی خودش را دارد: علائم خرابی، مراحل کار، بازه هزینه و سوالات متداول. اگر مشکل تلویزیون‌تان را نمی‌شناسید، از صفحه تماس با ما شروع کنید."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <div className="pb-16">
        <CTASection
          title="نمی‌دانید مشکل از کجاست؟ عیب‌یابی می‌کنیم"
          description="نیازی نیست نوع خرابی را بدانید؛ تکنسین با تجهیزات تست، علت واقعی را مشخص و هزینه را شفاف اعلام می‌کند."
        />
      </div>
    </>
  );
}