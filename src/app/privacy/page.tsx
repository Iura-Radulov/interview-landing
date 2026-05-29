import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy — AI Interview Trainer',
  description: 'How AI Interview Trainer collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}