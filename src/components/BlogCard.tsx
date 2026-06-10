'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200">
      <Link href={`/blog/${post.slug}`} className="block p-6 sm:p-8">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-slate-400">{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-3 leading-snug">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
