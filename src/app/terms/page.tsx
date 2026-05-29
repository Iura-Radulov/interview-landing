import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service — AI Interview Trainer',
  description: 'Terms and conditions governing your use of AI Interview Trainer.',
};

export default function TermsPage() {
  return <TermsContent />;
}