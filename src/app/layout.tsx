import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileCallBar } from '@/components/MobileCallBar';
import { JsonLd } from '@/components/JsonLd';
import { getLocalBusinessSchema, getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';

/* فونت وزیرمتن — self-host با next/font (بدون درخواست خارجی، بدون CLS) */
const vazirmatn = localFont({
  src: [
    { path: '../fonts/Vazirmatn-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Vazirmatn-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Vazirmatn-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/Vazirmatn-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-vazirmatn',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `تعمیر تلویزیون در تهران | ${siteConfig.legalName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  keywords: [
    'تعمیر تلویزیون',
    'تعمیر تلویزیون در تهران',
    'تعمیرات تلویزیون',
    'تعمیر برد تلویزیون',
    'تعویض بک لایت تلویزیون',
    'تعمیر تلویزیون سونی',
    'تعمیر تلویزیون ال جی',
    'تعمیر تلویزیون سامسونگ',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: `تعمیر تلویزیون در تهران | ${siteConfig.legalName}`,
    description: siteConfig.description,
  },
  twitter: { card: 'summary_large_image' },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0f1f3d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          پرش به محتوای اصلی
        </a>
        <Header />
        <main id="main" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCallBar />

        {/* اسکیماهای سراسری */}
        <JsonLd data={getLocalBusinessSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getOrganizationSchema()} />

        {/* Google Analytics 4 — فقط در صورت تنظیم شناسه در src/data/site.ts */}
        {siteConfig.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${siteConfig.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}