/**
 * تعرفه خدمات — منبع داده: content/prices.json (قابل مدیریت از پنل ادمین)
 * قیمت‌ها به تومان است و به‌صورت خودکار با جداکننده فارسی نمایش داده می‌شوند.
 */
import pricesJson from '../../content/prices.json';

export type PriceRow = {
  service: string;
  size?: string;
  from: number;
  to: number;
  unit?: string;
  note?: string;
};

export type PriceCategory = {
  id: string;
  title: string;
  note?: string;
  rows: PriceRow[];
};

export const priceCategories = pricesJson.priceCategories as PriceCategory[];

/** متن توضیحی پایین جدول قیمت */
export const priceDisclaimer: string = pricesJson.priceDisclaimer;

export function formatToman(value: number): string {
  return value.toLocaleString('fa-IR');
}
