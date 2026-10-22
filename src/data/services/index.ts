import { lcdService } from './lcd';
import { ledService } from './led';
import { oledService } from './oled';
import { qledService } from './qled';
import { smartTvService } from './smart-tv';
import { androidTvService } from './android-tv';
import { panelService } from './panel';
import { mainboardService } from './mainboard';
import { powerBoardService } from './power-board';
import { backlightService } from './backlight';
import { tconService } from './tcon';
import { wallMountService } from './wall-mount';
import type { Service } from './types';

/**
 * ترتیب لیست = ترتیب اولویت.
 *
 * مبنای اولویت‌بندی: سرچ کنسول (نمایش/کلیک/جایگاه) + اولویت تجاری.
 * بک‌لایت بالاترین اولویت است (پرتقاضاترین خدمت و سودمحورترین)،
 * نصب دیواری دوم است و «پنل شکسته» عمداً آخر قرار می‌گیرد.
 *
 * این ترتیب هم‌زمان روی صفحه اصلی (services.slice(0, 6))، صفحه خدمات،
 * اسکیمای OfferCatalog و نقشه سایت اثر می‌گذارد.
 */
export const services: Service[] = [
  backlightService,
  wallMountService,
  powerBoardService,
  mainboardService,
  tconService,
  androidTvService,
  smartTvService,
  ledService,
  lcdService,
  oledService,
  qledService,
  panelService,
];

/**
 * اولویت سئوی هر خدمت (۱ = بالاترین) — برای priority نقشه سایت.
 * پنل عمداً پایین‌ترین اولویت است تا وزن صفحه به بک‌لایت و نصب دیواری منتقل شود.
 */
export const servicePriority: Record<string, number> = {
  backlight: 1.0,
  'wall-mount': 0.95,
  'power-board': 0.8,
  mainboard: 0.8,
  tcon: 0.75,
  'android-tv': 0.7,
  'smart-tv': 0.65,
  led: 0.6,
  lcd: 0.6,
  oled: 0.55,
  qled: 0.5,
  panel: 0.4,
};

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** گزینه‌های خدمات برای منو، فرم و فوتر */
export const serviceOptions = services.map((s) => ({
  slug: s.slug,
  label: s.navLabel,
}));

export type { Service, ServiceFaq } from './types';