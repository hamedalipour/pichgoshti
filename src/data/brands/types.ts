/** تعریف تایپ‌های مشترک برندها */

export type Brand = {
  slug: string;
  name: string;
  nameEn: string;
  excerpt: string;
  intro: string[];
  /** ایرادهای رایج این برند */
  commonIssues: string[];
  seoTitle: string;
  seoDescription: string;
};