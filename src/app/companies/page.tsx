import type { Metadata } from 'next';
import CompaniesContent from './CompaniesContent';

export const metadata: Metadata = {
  title: 'Company Interview Prep — AI Interview Trainer',
  description:
    'Prepare for Google, Amazon, Meta, Microsoft, Apple, Netflix, Yandex and Tinkoff interviews with AI-powered practice. Tailored questions for each company.',
};

export default function CompaniesPage() {
  return <CompaniesContent />;
}
