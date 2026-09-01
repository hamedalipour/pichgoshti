import { siteConfig, absoluteUrl } from '@/data/site';
import { services } from '@/data/services';
import { areaGroups } from '@/data/areas';
import { averageRating, totalReviews, testimonials } from '@/data/testimonials';

/** اسکیمای LocalBusiness (ریشه سئوی محلی) */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+98${siteConfig.phone.replace(/^0/, '')}`,
    email: siteConfig.email,
    image: absoluteUrl('/og-default.png'),
    logo: absoluteUrl('/icon.svg'),
    priceRange: siteConfig.priceRange,
    currenciesAccepted: 'IRR',
    paymentAccepted: 'نقدی، کارت بانکی',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'IR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'تهران' },
      ...areaGroups.flatMap((g) =>
        g.areas.map((a) => ({ '@type': 'Place', name: `${a.name}، تهران` })),
      ),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.slice(0, 5).map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5' },
      reviewBody: t.text,
      datePublished: t.date,
    })),
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات تعمیرات تلویزیون',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.navLabel,
          url: absoluteUrl(`/services/${s.slug}/`),
          description: s.excerpt,
          areaServed: 'تهران',
        },
      })),
    },
    foundingDate: siteConfig.foundedYear,
    slogan: siteConfig.tagline,
    knowsAbout: [
      'تعمیر تلویزیون دوو',
      'تعمیر تلویزیون اسنوا',
      'تعمیر برد پاور تلویزیون',
      'تعویض بک‌لایت تلویزیون',
      'فلش اندروید تلویزیون',
      'تعمیر پنل تلویزیون',
    ],
  };
}

/** اسکیمای WebSite با جست‌وجوی داخلی */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    inLanguage: 'fa-IR',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

/** اسکیمای Organization */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/icon.svg'),
    telephone: `+98${siteConfig.phone.replace(/^0/, '')}`,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: 'IR',
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/** اسکیمای Service برای صفحات خدمت */
export function getServiceSchema(opts: {
  name: string;
  description: string;
  path: string;
  faqs?: { q: string; a: string }[];
}) {
  const { name, description, path, faqs } = opts;
  const schema: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url: absoluteUrl(path),
      serviceType: name,
      provider: { '@id': `${siteConfig.url}/#business` },
      areaServed: { '@type': 'City', name: 'تهران' },
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: `+98${siteConfig.phone.replace(/^0/, '')}`,
        serviceUrl: absoluteUrl('/contact/'),
      },
    },
  ];
  if (faqs?.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return schema;
}

/** اسکیمای BlogPosting برای مقالات */
export function getBlogPostSchema(opts: {
  title: string;
  description: string;
  path: string;
  isoDate: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.isoDate,
    dateModified: opts.isoDate,
    inLanguage: 'fa-IR',
    keywords: opts.keywords.join(', '),
    author: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
    image: absoluteUrl('/og-default.png'),
  };
}