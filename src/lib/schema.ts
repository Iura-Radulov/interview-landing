import type { BlogPost } from '@/lib/blog/types';

const siteUrl = (process.env.FRONTEND_URL as string) || 'https://techinterviewai.com';

/** Organization schema — used on all pages via layout */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Interview Trainer',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'AI-powered interview practice platform. Practice technical and behavioral (STAR method) interviews with instant feedback, voice answers, and progress tracking.',
    sameAs: [
      'https://twitter.com/aceinterviewai',
      'https://t.me/AceInterviewAI',
    ],
    founder: {
      '@type': 'Person',
      name: 'PrepCraft LTD',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  };
}

/** WebApplication schema for the home page */
export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Interview Trainer',
    url: siteUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description:
      'Practice technical and behavioral interviews with AI. Frontend, Backend, Fullstack, System Design — 3 experience levels. Instant scoring, voice answers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI-powered mock interviews',
      'STAR method behavioral practice',
      'System Design interviews',
      'Voice answers with transcription',
      'Progress tracking & analytics',
    ],
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/** Article / BlogPosting schema */
export function blogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'AI Interview Trainer',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}

/** CollectionPage for blog listing */
export function blogListingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — AI Interview Trainer',
    description:
      'Expert guides on acing technical, behavioral, and system design interviews.',
    url: `${siteUrl}/blog`,
    isPartOf: {
      '@type': 'Blog',
      name: 'AI Interview Trainer Blog',
      url: `${siteUrl}/blog`,
    },
  };
}

/** AboutPage + Organization */
export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About — AI Interview Trainer',
    description: 'AI-powered interview practice to help developers ace their next tech interview.',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'AI Interview Trainer',
      description:
        'We help developers ace technical interviews with AI-powered practice. Our platform adapts to your experience level, company target, and role — providing instant feedback and personalized coaching.',
    },
  };
}

/** Product schema for a company prep page */
export function companyProductSchema(company: {
  nameEn: string;
  descriptionEn: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${company.nameEn} Interview Prep — AI Interview Trainer`,
    description: company.descriptionEn,
    url: `${siteUrl}/companies/${company.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'AI Interview Trainer',
      url: siteUrl,
    },
  };
}

/** CollectionPage for companies listing */
export function companiesListingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Company Interview Prep — AI Interview Trainer',
    description:
      'Prepare for Google, Amazon, Meta, Microsoft, Apple and more with AI-powered interview practice.',
    url: `${siteUrl}/companies`,
  };
}

/** Product + Offer for tariffs page */
export function tariffsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AI Interview Trainer — Plans & Pricing',
    description: 'Choose the plan that fits your interview prep goals. Free tier available.',
    url: `${siteUrl}/tariffs`,
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '19.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium Plan',
        price: '49.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
  };
}

/** WebPage for legal pages (privacy, terms) */
export function webPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteUrl}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'AI Interview Trainer',
      url: siteUrl,
    },
  };
}
