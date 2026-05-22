import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — AI Interview Trainer',
  description: 'Learn about our mission to help developers ace technical interviews with AI-powered practice.',
};

export default function AboutPage() {
  return (
    <>
      <nav
        className="px-4 py-4 border-b border-white/10"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">
            AI Interview Trainer
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div
        className="px-4 py-24 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About AI Interview Trainer
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We help developers land their next job by turning interview anxiety into interview confidence —
            one practice session at a time.
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-20 space-y-16">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Technical interviews are hard — not because developers lack skill, but because the interview
              format itself is a skill. Our mission is to democratize interview preparation by giving every
              developer access to realistic, AI-driven practice at any time, for free.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We believe that with enough deliberate practice, any developer can walk into a technical
              interview with confidence. AI Interview Trainer makes that practice accessible, immediate,
              and measurable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Do</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              AI Interview Trainer is an AI-powered platform that simulates real technical interviews via
              Telegram. Our system generates fresh, role-specific questions, evaluates your answers in
              depth, and gives you actionable feedback — instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: '4 Engineering Roles',
                  body: 'Backend, Frontend, Full-Stack, and DevOps — each with its own question bank and evaluation criteria.',
                },
                {
                  title: '3 Experience Levels',
                  body: 'Junior, Mid-level, and Senior questions calibrated to match real hiring bars at top companies.',
                },
                {
                  title: 'Instant AI Feedback',
                  body: 'Get detailed, rubric-based feedback on every answer within seconds, not days.',
                },
                {
                  title: 'Progress Tracking',
                  body: 'Track your scores over time, spot weak areas, and see measurable improvement.',
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Team</h2>
            <p className="text-slate-600 leading-relaxed">
              We're a small team of engineers and ML practitioners who have collectively gone through
              hundreds of technical interviews — and failed many of them. We built the tool we wish
              we'd had when we were preparing. Our backgrounds span distributed systems, applied AI,
              and developer tooling at companies across Europe and North America.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We're remote-first, move fast, and care deeply about developer experience — both for our
              users and for ourselves.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions, feedback, or partnership inquiries? Reach us at{' '}
              <a href="mailto:hello@aiinterviewtrainer.com" className="text-emerald-600 hover:underline">
                hello@aiinterviewtrainer.com
              </a>
              . We read every message.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
