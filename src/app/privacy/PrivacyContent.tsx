'use client';

import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

const EFFECTIVE_DATE = 'May 20, 2026';
const CONTACT_EMAIL = 'info@techinterviewai.com';

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <>
      <LandingNav />

      <div
        className="px-4 py-24 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="max-w-3xl mx-auto pt-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t('privacy.title')}</h1>
          <p className="text-slate-400 text-sm">{t('privacy.effective', { date: EFFECTIVE_DATE })}</p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-20 space-y-12">

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            {t('privacy.note')}
          </div>

          <p className="text-slate-600 leading-relaxed">
            AI Interview Trainer (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the AI Interview Trainer platform
            accessible via Telegram and the web. This Privacy Policy explains what information we
            collect, how we use it, and what rights you have with respect to your data.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p><strong className="text-slate-800">Account data.</strong> When you connect via Telegram, we receive your Telegram user ID, display name, and username. We do not receive your phone number.</p>
              <p><strong className="text-slate-800">Usage data.</strong> We record the questions you are asked, your answers, scores, and session timestamps to power feedback and progress tracking.</p>
              <p><strong className="text-slate-800">Payment data.</strong> If you subscribe to a paid plan, payments are processed by a third-party provider. We store only your subscription status and plan tier — never full card details.</p>
              <p><strong className="text-slate-800">Technical data.</strong> We collect standard server logs including IP addresses, browser type, and pages visited on the web properties. These are used for security and performance monitoring.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>To operate and improve the interview practice service</li>
              <li>To generate personalised question sets and AI feedback</li>
              <li>To display your progress history and analytics</li>
              <li>To process payments and manage subscriptions</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To respond to support requests and inquiries</li>
            </ul>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We do not use your interview answers to train third-party AI models without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Sharing</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell your personal data. We share data only with:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-slate-600 leading-relaxed">
              <li><strong className="text-slate-800">AI inference providers</strong> (e.g. Anthropic) — your answers are sent to generate feedback. These providers are contractually bound not to use your data for model training.</li>
              <li><strong className="text-slate-800">Payment processors</strong> — for handling transactions under their own privacy policies.</li>
              <li><strong className="text-slate-800">Infrastructure providers</strong> — for hosting, databases, and monitoring.</li>
              <li><strong className="text-slate-800">Legal authorities</strong> — when required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We apply industry-standard measures including encrypted connections (TLS), encrypted
              data at rest, access controls, and regular security reviews. No system is perfectly
              secure; if you discover a vulnerability, please contact us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your account and session data for as long as your account is active. If you
              delete your account, we will purge your personal data within 30 days, except where
              retention is required for legal or financial compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Export your data in a machine-readable format</li>
            </ul>
            <p className="mt-4 text-slate-600 leading-relaxed">
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Our web properties use essential cookies for authentication and session management.
              We do not use third-party advertising cookies. You can disable cookies in your browser
              settings, but some features may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will update the
              effective date above and notify active users via Telegram or email for material changes.
              Continued use of the service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">9. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For privacy-related questions or requests, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}