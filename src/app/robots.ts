import type { MetadataRoute } from 'next';

const siteUrl = process.env.FRONTEND_URL || 'https://techinterviewai.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/auth/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
