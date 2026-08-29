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

export const services: Service[] = [
  lcdService,
  ledService,
  oledService,
  qledService,
  smartTvService,
  androidTvService,
  panelService,
  mainboardService,
  powerBoardService,
  backlightService,
  tconService,
  wallMountService,
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** گزینه‌های خدمات برای منو، فرم و فوتر */
export const serviceOptions = services.map((s) => ({
  slug: s.slug,
  label: s.navLabel,
}));

export type { Service, ServiceFaq } from './types';