import type { Metadata } from 'next';
import TermsContent from './TermsContent';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Service — AI Interview Trainer',
  description: 'Terms and conditions governing your use of AI Interview Trainer.',
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={webPageSchema('Terms of Service', 'Terms and conditions governing your use of AI Interview Trainer.', '/terms')} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ])}
      />
      <TermsContent />
    </>
  );
}