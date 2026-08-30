'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/* useLayoutEffect فقط سمت کلاینت — برای جلوگیری از هشدار prerender در Next */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * اسکرول-ریویل با IntersectionObserver (طبق قاعده ۵ اسکیل taste-skill — بدون scroll listener).
 * بدون جاوااسکریپت هم محتوا کاملاً قابل مشاهده است (کلاس hide فقط بعد از هیدریشن فعال می‌شود).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  /** تأخیر پلکانی بر حسب میلی‌ثانیه */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useIsoLayoutEffect(() => {
    setArmed(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['reveal', armed ? 'reveal-armed' : '', visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}