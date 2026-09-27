import imageSizesJson from '@/data/imageSizes.json';

/** عرض display تصویر مقاله: موبایل تمام‌عرض (کم حاشیه)، دسکتاپ ستون مقاله 768px */
export const IMAGE_SIZES = '(max-width: 820px) calc(100vw - 32px), 768px';

export type ImageMeta = { width: number; height: number; variants: number[] };

const FALLBACK: ImageMeta = { width: 1200, height: 675, variants: [] };

/** ابعاد واقعی فایل (از scripts/img-meta.mjs) تا width/height درست رندر شود و CLS ندهد */
export function getImageMeta(src: string): ImageMeta {
  return (imageSizesJson as Record<string, ImageMeta>)[src] ?? FALLBACK;
}

/** srcset با واریانت‌های 768w/1080w — موبایل به‌جای 79kb حدود 36kb دانلود می‌کند */
export function buildImageSrcSet(src: string, meta: ImageMeta): string | undefined {
  if (!meta.variants.length) return undefined;
  const variants = meta.variants.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`);
  return [...variants, `${src} ${meta.width}w`].join(', ');
}