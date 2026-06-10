'use client';

import Link from 'next/link';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import type { BlogPost } from '@/lib/blog/types';

export default function BlogPostContent({ post }: { post: BlogPost }) {
  // Render markdown-like content: convert code blocks and bold, keep paragraphs
  function renderContent(content: string) {
    const lines = content.split('\n');
    const nodes: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLang = '';
    let key = 0;

    function flushCode() {
      if (codeLines.length > 0) {
        nodes.push(
          <pre key={key++} className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-6 overflow-x-auto my-6 text-sm leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
      }
    }

    for (const line of lines) {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCode();
          inCodeBlock = false;
          codeLang = '';
        } else {
          inCodeBlock = true;
          codeLang = line.slice(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        nodes.push(<div key={key++} className="h-4" />);
        continue;
      }

      // Headings
      if (line.startsWith('### ')) {
        nodes.push(
          <h3 key={key++} className="text-xl font-bold text-slate-900 mt-8 mb-3">
            {line.slice(4)}
          </h3>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        nodes.push(
          <h2 key={key++} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            {line.slice(3)}
          </h2>
        );
        continue;
      }
      if (line.startsWith('# ')) {
        nodes.push(
          <h1 key={key++} className="text-3xl font-bold text-slate-900 mt-10 mb-4">
            {line.slice(2)}
          </h1>
        );
        continue;
      }

      // Inline code within text — handle with simple string replacement
      function processInline(text: string): string {
        // Replace **text** with bold
        let processed = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Replace `code` with code spans
        processed = processed.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-emerald-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
        return processed;
      }

      // Tables
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        const isHeader = line.includes('---') || line.includes('-----');
        if (isHeader) continue; // skip separator row

        nodes.push(
          <div key={key++} className="flex gap-4 py-1">
            {cells.map((cell, i) => (
              <span key={i} className="text-sm text-slate-600 flex-1">{processInline(cell)}</span>
            ))}
          </div>
        );
        continue;
      }

      // Regular paragraph
      nodes.push(
        <p key={key++} className="text-slate-600 leading-relaxed mb-4">
          <span dangerouslySetInnerHTML={{ __html: processInline(line) }} />
        </p>
      );
    }

    flushCode();
    return nodes;
  }

  return (
    <>
      <LandingNav />

      {/* Breadcrumb */}
      <div className="bg-white pt-24">
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-0">
          <nav className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{post.title.slice(0, 40)}...</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="bg-white">
        <div className="max-w-3xl mx-auto px-4 pb-16">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Share / CTA */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Practice what you learned
            </h3>
            <p className="text-slate-500 mb-6">
              Try a realistic AI mock interview tailored to your role.
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

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-sm text-slate-400 hover:text-emerald-600 transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
