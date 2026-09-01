import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { siteConfig } from '@/data/site';

export const alt = `${siteConfig.legalName} — تعمیر تلویزیون دوو و اسنوا در تهران`;
export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/** تصویر OG پیش‌فرض سایت — به همه صفحات بدون تصویر اختصاصی ارث می‌رسد */
export default function OgImage() {
  return renderOgImage(
    'تعمیر تخصصی تلویزیون دوو و اسنوا در تهران',
    'اعزام تکنسین کمتر از ۲ ساعت؛ تعمیر برد پاور، بک‌لایت و پنل با قطعات اورجینال.',
  );
}
