'use client';

const steps = [
  {
    number: 1,
    title: 'Choose Your Role',
    description:
      'Pick from Frontend, Backend, Fullstack, or Machine Learning — and your experience level.',
  },
  {
    number: 2,
    title: 'Answer 5 Questions',
    description:
      'Type your answers to real interview questions. Each one is evaluated by AI in real-time.',
  },
  {
    number: 3,
    title: 'Get Your Score',
    description:
      'Receive detailed feedback, scores out of 10, and tailored study recommendations.',
  },
];

export default function LandingHowItWorks() {
  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            From zero to interview-ready in three simple steps.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex-1 flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px border-t-2 border-dashed border-emerald-200 z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-200 mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
