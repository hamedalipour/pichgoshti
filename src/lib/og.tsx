import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '@/data/site';

/** ابعاد استاندارد تصاویر OG (بازنویسی‌شده در همه فایل‌های opengraph-image) */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

type OgFont = { name: string; data: Buffer; weight: 400 | 700; style: 'normal' };

let fontsCache: OgFont[] | null = null;

/** فونت وزیرمتن فقط یک‌بار در بیلد خوانده می‌شود (خروجی export در بیلد تولید می‌شود) */
function loadFonts(): OgFont[] {
  if (!fontsCache) {
    const read = (file: string) => fs.readFileSync(path.join(process.cwd(), 'src/fonts', file));
    fontsCache = [
      { name: 'Vazirmatn', data: read('Vazirmatn-Bold.ttf'), weight: 700, style: 'normal' },
      { name: 'Vazirmatn', data: read('Vazirmatn-Regular.ttf'), weight: 400, style: 'normal' },
    ];
  }
  return fontsCache;
}

/** برش متن طولانی با سه‌نقطه */
function clamp(text: string, max: number): string {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

/**
 * کارت استاندارد OG — ۱۲۰۰×۶۳۰ با هویت بصری سایت:
 * پس‌زمینه سرمه‌ای برند، لوگوی تلویزیون، عنوان صفحه، شماره تماس و دامنه
 * در بیلد رندر و به‌صورت PNG استاتیک در خروجی export ساخته می‌شود.
 */
export function renderOgImage(title: string, subtitle?: string) {
  const cleanTitle = clamp(title, 80);
  const titleSize = cleanTitle.length > 55 ? 52 : cleanTitle.length > 28 ? 64 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          backgroundColor: '#0a1428',
          position: 'relative',
          fontFamily: 'Vazirmatn',
        }}
      >
        {/* هاله‌های تزئینی */}
        <div
          style={{
            position: 'absolute',
            top: -130,
            right: -90,
            width: 430,
            height: 430,
            borderRadius: 9999,
            backgroundColor: 'rgba(51,113,246,0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -70,
            width: 390,
            height: 390,
            borderRadius: 9999,
            backgroundColor: 'rgba(245,158,11,0.12)',
          }}
        />

        {/* هدر: لوگو + نشان گارانتی */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                width: 58,
                height: 40,
                backgroundColor: '#1d52eb',
                border: '4px solid #173fd8',
                borderRadius: 10,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: '#fbbf24',
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#ffffff' }}>{siteConfig.name}</div>
              <div style={{ fontSize: 19, color: '#8ebdfd' }}>مرکز تخصصی تعمیرات تلویزیون</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 9999,
              backgroundColor: 'rgba(251,191,36,0.14)',
              fontSize: 22,
              fontWeight: 700,
              color: '#fbbf24',
            }}
          >
            گارانتی کتبی ۳ ماهه
          </div>
        </div>

        {/* عنوان صفحه */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', maxWidth: 1040 }}>
          <div style={{ fontSize: titleSize, fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>{cleanTitle}</div>
          {subtitle ? (
            <div style={{ fontSize: 26, color: '#bcd7fe', lineHeight: 1.55 }}>{clamp(subtitle, 120)}</div>
          ) : null}
        </div>

        {/* فوتر: تماس + دامنه */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 6, borderRadius: 9999, backgroundColor: '#f59e0b' }} />
            <div style={{ fontSize: 27, fontWeight: 700, color: '#ffffff' }}>{siteConfig.phoneDisplay}</div>
          </div>
          <div style={{ fontSize: 24, color: '#5997fa' }}>pich-goshti.ir</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: loadFonts() },
  );
}
