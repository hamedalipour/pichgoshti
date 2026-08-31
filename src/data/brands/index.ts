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

export type { Brand } from './types';