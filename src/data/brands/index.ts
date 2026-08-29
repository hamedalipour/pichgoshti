import { sonyBrand } from './sony';
import { lgBrand } from './lg';
import { samsungBrand } from './samsung';
import { panasonicBrand } from './panasonic';
import { xvisionBrand } from './xvision';
import { snowaBrand } from './snowa';
import { gplusBrand } from './gplus';
import { hisenseBrand } from './hisense';
import { tclBrand } from './tcl';
import { amicoBrand } from './amico';
import type { Brand } from './types';

export const brands: Brand[] = [
  sonyBrand,
  lgBrand,
  samsungBrand,
  panasonicBrand,
  xvisionBrand,
  snowaBrand,
  gplusBrand,
  hisenseBrand,
  tclBrand,
  amicoBrand,
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export type { Brand } from './types';