/**
 * مقالات وبلاگ — منبع داده: content/posts.json (قابل مدیریت از پنل ادمین)
 * اضافه/ویرایش/حذف مقاله فقط با تغییر همان فایل انجام می‌شود؛
 * صفحات، sitemap و اسکیماهای سئو خودکار به‌روز می‌شوند.
 */
import postsJson from '../../../content/posts.json';
import type { Post } from './types';

/** همه مقالات — جدیدترین اول */
export const posts = postsJson as unknown as Post[];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export { readingTime } from './types';
export type { Post, PostBlock } from './types';
