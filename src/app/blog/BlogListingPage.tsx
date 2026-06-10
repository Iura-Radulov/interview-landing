'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getPublishedPosts, getCategories } from '@/lib/blog/posts';

export default function BlogListingPage() {
  const posts = useMemo(() => getPublishedPosts(), []);
  const categories = useMemo(() => getCategories(), []);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      <LandingNav />

      {/* Hero */}
      <div
        className="relative px-4 pt-28 pb-16 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Interview Prep Blog
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Expert guides, tips, and strategies to help you ace your next
            technical, behavioral, or system design interview.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">
                No posts in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 text-center rounded-2xl bg-slate-50 border border-slate-200 p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Ready to practice what you just learned?
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-6">
              Put these tips into action with a realistic AI mock interview.
              Get scored, get feedback, get better.
            </p>
            <a
              href="https://t.me/developing_interview_trainer_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Start Free Practice →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
