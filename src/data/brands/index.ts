import { daewooBrand } from './daewoo';
import { snowaBrand } from './snowa';
import { sonyBrand } from './sony';
import { lgBrand } from './lg';
import { samsungBrand } from './samsung';
import { panasonicBrand } from './panasonic';
import { xvisionBrand } from './xvision';
import { gplusBrand } from './gplus';
import { hisenseBrand } from './hisense';
import { tclBrand } from './tcl';
import { amicoBrand } from './amico';
import type { Brand } from './types';

/** دوو و اسنوا برندهای تخصصی سایت هستند و در صدر لیست قرار می‌گیرند */
export const brands: Brand[] = [
  daewooBrand,
  snowaBrand,
  sonyBrand,
  lgBrand,
  samsungBrand,
  panasonicBrand,
  xvisionBrand,
  gplusBrand,
  hisenseBrand,
  tclBrand,
  amicoBrand,
];

/** اسلاگ برندهای تخصصی سایت — برای نمایش ویژه در صفحه اصلی و اولویت sitemap */
export const featuredBrandSlugs = ['daewoo', 'snowa'];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** سوالات متداول برند — اختصاصی اگر تعریف شده باشد، وگرنه جنریک با نام برند */
export function getBrandFaqs(brand: Brand): { q: string; a: string }[] {
  if (brand.faqs?.length) return brand.faqs;
  return [
    {
      q: `هزینه تعمیر تلویزیون ${brand.name} چقدر است؟`,
      a: 'هزینه بسته به نوع خرابی متفاوت است؛ ترمیم برد پاور از حدود ۸۰۰ هزار تومان و تعویض بک‌لایت از ۱.۸ میلیون تومان شروع می‌شود. هزینه قطعی پس از عیب‌یابی و با تأیید شما نهایی می‌شود.',
    },
    {
      q: `تعمیر تلویزیون ${brand.name} در محل انجام می‌شود؟`,
      a: 'عیب‌یابی و خرابی‌های برد پاور در محل انجام می‌شود؛ تعویض بک‌لایت و پنل نیاز به کارگاه دارد و دستگاه با بسته‌بندی ایمن جمع‌آوری و پس از تعمیر تحویل می‌شود.',
    },
    {
      q: `برای تلویزیون ${brand.name} گارانتی می‌دهید؟`,
      a: 'بله؛ همه تعمیرات با گارانتی کتبی ۳ ماهه و فاکتور رسمی تحویل می‌شود و اگر همان مشکل برگردد، مجدد رایگان رفع می‌شود.',
    },
  ];
}

export type { Brand } from './types';