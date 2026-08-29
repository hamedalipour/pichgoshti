/**
 * تصویرسازی SVG صفحه هیرو — سبک، بدون فایل تصویر خارجی
 */
export function TvIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" fill="none" className={className} role="img" aria-label="تعمیر تخصصی تلویزیون">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d52eb" />
          <stop offset="100%" stopColor="#0f1f3d" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="160" r="150" fill="url(#glow)" />
      <circle cx="210" cy="160" r="150" stroke="#c7d7f5" strokeDasharray="3 8" />

      {/* قاب تلویزیون */}
      <rect x="80" y="60" width="260" height="164" rx="16" fill="#0f1f3d" />
      <rect x="92" y="72" width="236" height="140" rx="10" fill="url(#glow)" />
      <rect x="92" y="72" width="236" height="140" rx="10" fill="#1d52eb" opacity="0.85" />

      {/* تصویر روی صفحه */}
      <path d="M150 105 l70 37 -70 37 z" fill="#ffffff" opacity="0.9" />
      <rect x="248" y="100" width="60" height="10" rx="5" fill="#ffffff" opacity="0.35" />
      <rect x="248" y="122" width="44" height="10" rx="5" fill="#ffffff" opacity="0.25" />
      <rect x="248" y="144" width="52" height="10" rx="5" fill="#fbbf24" opacity="0.8" />
      <rect x="112" y="180" width="80" height="10" rx="5" fill="#ffffff" opacity="0.25" />

      {/* پایه */}
      <path d="M182 224 h56 l14 26 h-126 l14-26 z" fill="#0f1f3d" opacity="0.9" />
      <rect x="160" y="250" width="100" height="10" rx="5" fill="#0f1f3d" />

      {/* پیچ‌گوشتی */}
      <g transform="rotate(-32 330 220)">
        <rect x="322" y="140" width="16" height="80" rx="6" fill="#f59e0b" />
        <rect x="326" y="216" width="8" height="42" rx="3" fill="#94a3b8" />
        <rect x="316" y="128" width="28" height="18" rx="8" fill="#0f1f3d" />
      </g>

      {/* ذرات */}
      <circle cx="70" cy="90" r="5" fill="#fbbf24" opacity="0.7" />
      <circle cx="378" cy="70" r="4" fill="#1d52eb" opacity="0.5" />
      <circle cx="60" cy="250" r="6" fill="#1d52eb" opacity="0.3" />
    </svg>
  );
}