import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About — AI Interview Trainer',
  description: 'Learn about our mission to help developers ace technical interviews with AI-powered practice.',
};

export default function AboutPage() {
  return <AboutContent />;
}