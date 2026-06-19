import type { Metadata } from 'next';
import { COMPANIES, getCompanyBySlug } from '@/lib/companies';
import CompanyPageContent from './CompanyContent';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { companyProductSchema, breadcrumbSchema, organizationSchema } from '@/lib/schema';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: 'Not Found' };

  const title = `${company.nameEn} Interview Prep — AI Interview Trainer`;
  const description = `Prepare for a ${company.nameEn} interview with AI-powered practice. ${company.descriptionEn}. Start free.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={companyProductSchema(company)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Companies', url: '/companies' },
          { name: company.nameEn, url: `/companies/${company.slug}` },
        ])}
      />
      <CompanyPageContent slug={slug} />
    </>
  );
}
