/**
 * لوگوی پیچ‌گوشتی: صفحه تلویزیون + پیچ‌گوشتی — SVG سبک بدون فایل خارجی
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="6" width="44" height="30" rx="6" fill="#0f1f3d" />
      <rect x="5.5" y="9.5" width="37" height="23" rx="4" fill="#1d52eb" />
      <path d="M14 40h20l-2-4H16l-2 2z" fill="#0f1f3d" />
      <path
        d="M24 15.5v14M24 15.5l6 4-6 4"
        stroke="#fbbf24"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="35.5" cy="16.5" r="2" fill="#fbbf24" />
    </svg>
  );
}