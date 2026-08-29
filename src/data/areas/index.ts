import { westAreas } from './west';
import { centralWestAreas } from './central-west';
import { eastSouthAreas } from './east-south';
import type { Area, AreaGroup } from './types';

export const areaGroups: AreaGroup[] = [westAreas, centralWestAreas, eastSouthAreas];

/** همه مناطق به صورت یک لیست تخت */
export const areas: Area[] = areaGroups.flatMap((g) => g.areas);

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getNearbyAreas(area: Area): Area[] {
  return area.nearby
    .map((slug) => getArea(slug))
    .filter((a): a is Area => Boolean(a));
}

export type { Area, AreaGroup } from './types';