import { siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/HomeHero';
import { HomeSections } from '@/components/HomeSections';
import { HomeMore } from '@/components/HomeMore';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'تعمیر تلویزیون دوو و اسنوا در تهران | اعزام تکنسین کمتر از ۲ ساعت',
  description: siteConfig.description,
  path: '/',
  keywords: [
    'تعمیر تلویزیون دوو',
    'تعمیر تلویزیون اسنوا',
    'تعمیر تلویزیون دوو و اسنوا',
    'تعمیر تلویزیون دوو و اسنوا در تهران',
    'تعمیر برد پاور تلویزیون دوو',
    'فلش اندروید تلویزیون اسنوا',
    'تعویض بک لایت تلویزیون اسنوا',
    'تعمیر تلویزیون در محل',
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeSections />
      <HomeMore />
      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}