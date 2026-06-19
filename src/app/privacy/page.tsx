import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy — AI Interview Trainer',
  description: 'How AI Interview Trainer collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageSchema('Privacy Policy', 'How AI Interview Trainer collects, uses, and protects your personal data.', '/privacy')} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ])}
      />
      <PrivacyContent />
    </>
  );
}