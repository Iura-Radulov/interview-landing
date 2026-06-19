import type { Metadata } from 'next';
import AboutContent from './AboutContent';
import JsonLd from '@/components/JsonLd';
import { aboutPageSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About — AI Interview Trainer',
  description: 'Learn about our mission to help developers ace technical interviews with AI-powered practice.',
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ])}
      />
      <AboutContent />
    </>
  );
}