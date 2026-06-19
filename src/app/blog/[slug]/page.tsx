import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog/posts';
import BlogPostContent from './BlogPostContent';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { blogPostSchema, breadcrumbSchema, organizationSchema } from '@/lib/schema';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | AI Interview Trainer`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <BlogPostContent post={post} />
    </>
  );
}
