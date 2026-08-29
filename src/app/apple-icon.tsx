import { ImageResponse } from 'next/og';

export const alt = 'لوگوی پیچ‌گوشتی — تعمیر تخصصی تلویزیون';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/**
 * آیکون اپل (apple-touch-icon) — در زمان بیلد رندر و به‌صورت فایل استاتیک /apple-icon در خروجی export ساخته می‌شود.
 * فقط از اشکال برند استفاده شده تا به فونت خاصی وابسته نباشد.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a1428',
          position: 'relative',
        }}
      >
        {/* هاله پشت تلویزیون */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: -30,
            width: 240,
            height: 240,
            borderRadius: 9999,
            backgroundColor: 'rgba(51,113,246,0.22)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {/* قاب و صفحه تلویزیون */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 132,
              height: 86,
              backgroundColor: '#1d52eb',
              border: '8px solid #173fd8',
              borderRadius: 16,
              position: 'relative',
            }}
          >
            {/* فلش لوگو */}
            <div
              style={{
                width: 40,
                height: 9,
                borderRadius: 5,
                backgroundColor: '#fbbf24',
                transform: 'rotate(-45deg)',
              }}
            />
            {/* چراغ پاور */}
            <div
              style={{
                position: 'absolute',
                top: 9,
                right: 10,
                width: 9,
                height: 9,
                borderRadius: 9999,
                backgroundColor: '#fbbf24',
              }}
            />
          </div>
          {/* پایه */}
          <div style={{ display: 'flex', width: 22, height: 16, backgroundColor: '#0f1f3d' }} />
          <div style={{ display: 'flex', width: 84, height: 12, backgroundColor: '#16305c', borderRadius: 6 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
