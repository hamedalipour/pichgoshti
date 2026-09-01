/** ساختار بلوک‌های محتوای مقالات */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'link'; text: string; href: string }
  /** تصویر داخل مقاله — مسیر نسبی از ریشه سایت مثل /images/blog/file.jpg */
  | { type: 'image'; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** تاریخ ISO برای اسکیما و نقشه سایت */
  isoDate: string;
  /** تاریخ نمایشی فارسی */
  dateFa: string;
  keywords: string[];
  blocks: PostBlock[];
  seoTitle: string;
  seoDescription: string;
  /** اسلاگ خدمات مرتبط برای لینک‌سازی داخلی */
  relatedServices: string[];
};

/** زمان تقریبی مطالعه بر اساس تعداد کلمات */
export function readingTime(blocks: PostBlock[]): string {
  const words = blocks
    .map((b) => {
      if (b.type === 'list') return b.items.join(' ');
      if (b.type === 'table') return [...b.headers, ...b.rows.flat()].join(' ');
      return 'text' in b ? b.text : '';
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(2, Math.round(words / 200));
  return `${minutes.toLocaleString('fa-IR')} دقیقه`;
}