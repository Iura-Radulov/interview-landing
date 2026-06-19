import type { Metadata } from 'next';
import CompaniesContent from './CompaniesContent';
import JsonLd from '@/components/JsonLd';
import { companiesListingSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Company Interview Prep — AI Interview Trainer',
  description:
    'Prepare for Google, Amazon, Meta, Microsoft, Apple, Netflix, Yandex and Tinkoff interviews with AI-powered practice. Tailored questions for each company.',
};

export default function CompaniesPage() {
  return (
    <>
      <JsonLd data={companiesListingSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Companies', url: '/companies' },
        ])}
      />
      <CompaniesContent />
    </>
  );
}
