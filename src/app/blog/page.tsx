import type { Metadata } from 'next';
import BlogListingPage from './BlogListingPage';

export const metadata: Metadata = {
  title: 'Blog — AI Interview Trainer',
  description:
    'Expert guides on acing technical, behavioral, and system design interviews. React interview questions, STAR method tips, and career advice for developers.',
  openGraph: {
    title: 'Blog — AI Interview Trainer',
    description:
      'Expert guides on acing technical, behavioral, and system design interviews.',
  },
};

export default function BlogPage() {
  return <BlogListingPage />;
}
