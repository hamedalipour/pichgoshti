import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/data/site';

type MetaInput = {
  title: string;
  description: string;
  /** مسیر داخلی مثل /services/lcd/ */
  path: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
};

const baseRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

/**
 * حذف نام برند از انتهای عنوان.
 * قالب ریشه (`%s | نام برند`) خودش پسوند را اضافه می‌کند؛ اگر عنوان هم برند را در انتها
 * داشته باشد، <title> دو بار برند می‌گیرد و فضای SERP بی‌دلیل هدر می‌رود.
 * (در openGraph/twitter همان عنوان خام می‌ماند، چون آنجا قالبی اعمال نمی‌شود.)
 */
function withoutBrandSuffix(title: string): string {
  const brand = siteConfig.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return title.replace(new RegExp(`\\s*(?:[|–—-]\\s*)?${brand}\\s*$`), '').trim();
}

/** سازنده متادیتای استاندارد سئو برای همه صفحات */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogType = 'website',
  publishedTime,
  noIndex = false,
}: MetaInput): Metadata {
  const url = absoluteUrl(pathof(path));
  return {
    title: withoutBrandSuffix(title),
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical: url,
      // کشف خودکار فید RSS توسط موتورها — بینگ از فید برای کشف/خزش مجدد استفاده می‌کند
      types: { 'application/rss+xml': '/rss.xml' },
    },
    robots: noIndex ? { index: false, follow: false } : baseRobots,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'fa_IR',
      type: ogType,
      publishedTime,
      // og:image از فایل‌های opengraph-image.tsx (تداخل با تصویر داینامیک نداشته باشد)
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/** مسیر با اسلش پایانی را نرمال می‌کند */
function pathof(p: string): string {
  return p.endsWith('/') ? p : `${p}/`;
}