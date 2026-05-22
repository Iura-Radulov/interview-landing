'use client';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Evaluation',
    description:
      'GPT-4o scores your answers 1-10 with detailed, actionable feedback on every response.',
  },
  {
    icon: '📚',
    title: '4 Roles, 3 Levels',
    description:
      'Frontend, Backend, Fullstack, and ML roles × Junior, Mid, and Senior experience levels.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description:
      'Track scores over time, identify your weak spots, and revisit past sessions to measure growth.',
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description:
      'No waiting. Answer a question, get evaluated immediately, and keep improving.',
  },
];

export default function LandingFeatures() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why AI Interview Trainer?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Everything you need to walk into your next interview with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
