import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — AI Interview Trainer',
  description: 'Terms and conditions governing your use of AI Interview Trainer.',
};

const EFFECTIVE_DATE = 'May 20, 2026';
const CONTACT_EMAIL = 'hello@aiinterviewtrainer.com';

export default function TermsPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-20 space-y-12">

          <p className="text-slate-600 leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of AI Interview Trainer,
            including its Telegram bot and web properties (collectively, the "Service"), operated by
            AI Interview Trainer ("we", "us", or "our"). By using the Service, you agree to these Terms.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using the Service, you confirm that you are at least 16 years old, have
              the legal capacity to enter into these Terms, and agree to be bound by them. If you are
              using the Service on behalf of an organisation, you represent that you have authority to
              bind that organisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Account Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>Your account is created through Telegram authentication. You are responsible for maintaining the security of your Telegram account.</li>
              <li>You must provide accurate information and keep it up to date.</li>
              <li>You may not share your account or allow others to access the Service through your account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must notify us immediately of any unauthorised use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Acceptable Use</h2>
            <p className="text-slate-600 leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>Use the Service for any unlawful purpose or in violation of any applicable law</li>
              <li>Attempt to reverse-engineer, scrape, or systematically extract content from the Service</li>
              <li>Use automated scripts or bots to interact with the Service beyond normal use</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to gain unauthorised access to any part of the Service or its related systems</li>
              <li>Resell or redistribute access to the Service without our written permission</li>
              <li>Submit answers containing illegal, harmful, or abusive content</li>
            </ul>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these rules at our
              sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>Paid plans are billed in advance on a monthly or annual basis.</li>
              <li>All fees are non-refundable except as required by applicable law or at our discretion.</li>
              <li>We may change pricing with 30 days' notice. Continued use after a price change constitutes acceptance.</li>
              <li>Failure to pay may result in suspension of your paid features. Your free-tier access remains unaffected.</li>
              <li>Taxes, if applicable, are your responsibility unless we are required to collect them.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              The Service, including its question bank, UI, and AI-generated feedback, is owned by us
              and protected by intellectual property laws. You retain ownership of your own answers and
              content. You grant us a limited, non-exclusive licence to process your content solely to
              deliver the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Disclaimers</h2>
            <p className="text-slate-600 leading-relaxed">
              The Service is provided "as is" and "as available" without warranties of any kind, express
              or implied. We do not guarantee that the Service will be error-free, uninterrupted, or that
              AI-generated feedback will be accurate or sufficient to pass any specific interview. The
              Service is a practice tool, not a guarantee of employment outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              You may stop using the Service at any time. We may suspend or terminate your access if
              you breach these Terms, if the Service is discontinued, or for any other reason with
              reasonable notice where practicable. Upon termination, your right to use the Service
              ceases immediately. Provisions that by their nature should survive termination will do so.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including lost profits, lost data, or loss of
              goodwill, arising out of or relating to your use of the Service. Our total liability for
              any claim arising from the Service is limited to the amount you paid us in the 12 months
              preceding the claim, or €50, whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">9. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms are governed by the laws of the European Union and the jurisdiction in which
              we are incorporated. Any disputes shall be resolved in the competent courts of that
              jurisdiction, unless mandatory consumer protection laws in your country require otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes via
              Telegram or email at least 14 days before they take effect. Continued use of the Service
              after the effective date constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">11. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions about these Terms? Contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
