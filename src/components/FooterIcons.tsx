import { siteConfig } from '@/data/site';

export function SocialLinks() {
  return (
    <ul className="flex gap-3" aria-label="شبکه‌های اجتماعی">
      {siteConfig.social.instagram && (
        <li>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener" className="inline-flex rounded-lg bg-white/5 p-2.5 transition hover:bg-white/10" aria-label="اینستاگرام">
            <InstaIcon className="size-5" />
          </a>
        </li>
      )}
      {siteConfig.social.telegram && (
        <li>
          <a href={siteConfig.social.telegram} target="_blank" rel="noopener" className="inline-flex rounded-lg bg-white/5 p-2.5 transition hover:bg-white/10" aria-label="تلگرام">
            <TelegramIcon className="size-5" />
          </a>
        </li>
      )}
    </ul>
  );
}

function InstaIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.5 4.1 2.9 11.3c-.9.35-.87 1.65.06 1.95l4.6 1.5 1.75 5.5c.27.85 1.35 1.06 1.62.32l2.2-4.15 4.9 3.6c.7.5 1.7.13 1.87-.7l3-14.6c.2-.95-.74-1.72-1.6-1.12zM9.6 14.2l8.5-6.7c.3-.24.62.2.37.45l-7 7.1-.35 3.2-1.5-4.05z" />
    </svg>
  );
}