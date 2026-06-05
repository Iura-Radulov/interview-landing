'use client';

import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

const EFFECTIVE_DATE = 'May 20, 2026';
const CONTACT_EMAIL = 'info@techinterviewai.com';

export default function PrivacyContent() {
  const { t, uiLang } = useTranslation();
  const isRu = uiLang === 'ru';

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

          {isRu ? (
            <>
              <p className="text-slate-600 leading-relaxed">
                AI Interview Trainer (далее — «сервис») предоставляется компанией <strong>PrepCraft LTD</strong> (зарегистрирована в Англии и Уэльсе, Company No. 17249290). Сервис доступен через Telegram и веб-интерфейс. Настоящая Политика конфиденциальности объясняет, какие данные мы собираем, как их используем и какие у вас есть права.
              </p>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">1. Какие данные мы собираем</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p><strong className="text-slate-800">Данные аккаунта.</strong> При подключении через Telegram мы получаем ваш Telegram ID, имя и username. Номер телефона не передаётся.</p>
                  <p><strong className="text-slate-800">Данные использования.</strong> Мы записываем вопросы, ваши ответы, оценки и метки времени сессий для обратной связи и отслеживания прогресса.</p>
                  <p><strong className="text-slate-800">Платёжные данные.</strong> При оформлении платной подписки платежи обрабатываются через стороннего провайдера (Stripe). Мы храним только статус подписки и тариф — никогда полные данные карты.</p>
                  <p><strong className="text-slate-800">Технические данные.</strong> Мы собираем стандартные серверные логи, включая IP-адреса, тип браузера и посещённые страницы. Это используется для безопасности и мониторинга производительности.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">2. Как мы используем ваши данные</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
                  <li>Для работы и улучшения сервиса тренировки интервью</li>
                  <li>Для генерации персонализированных наборов вопросов и AI-фидбека</li>
                  <li>Для отображения истории прогресса и аналитики</li>
                  <li>Для обработки платежей и управления подписками</li>
                  <li>Для обнаружения и предотвращения мошенничества</li>
                  <li>Для ответа на запросы поддержки</li>
                </ul>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Мы не используем ваши ответы на интервью для обучения сторонних AI-моделей без вашего явного согласия.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">3. Передача данных</h2>
                <p className="text-slate-600 leading-relaxed">
                  Мы не продаём ваши персональные данные. Мы передаём данные только:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-slate-600 leading-relaxed">
                  <li><strong className="text-slate-800">AI-провайдерам</strong> (например, Anthropic) — ваши ответы отправляются для генерации обратной связи. Контрактно обязаны не использовать данные для обучения моделей.</li>
                  <li><strong className="text-slate-800">Платёжным системам</strong> — для обработки транзакций в соответствии с их политиками конфиденциальности.</li>
                  <li><strong className="text-slate-800">Инфраструктурным провайдерам</strong> — для хостинга, баз данных и мониторинга.</li>
                  <li><strong className="text-slate-800">Государственным органам</strong> — если это требуется по закону или для защиты наших прав.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">4. Безопасность данных</h2>
                <p className="text-slate-600 leading-relaxed">
                  Мы применяем стандартные отраслевые меры: зашифрованные соединения (TLS), шифрование данных в покое, контроль доступа и регулярные проверки безопасности. Ни одна система не является абсолютно защищённой; если вы обнаружите уязвимость, пожалуйста, свяжитесь с нами немедленно по адресу{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">5. Хранение данных</h2>
                <p className="text-slate-600 leading-relaxed">
                  Мы храним данные вашего аккаунта и сессий, пока ваш аккаунт активен. При удалении аккаунта мы удаляем персональные данные в течение 30 дней, за исключением случаев, когда сохранение требуется по закону или для финансовой отчётности.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">6. Ваши права</h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  В зависимости от вашей юрисдикции вы можете иметь право:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
                  <li>Запросить доступ к вашим персональным данным</li>
                  <li>Исправить неточные данные</li>
                  <li>Потребовать удаления ваших данных</li>
                  <li>Возражать против или ограничивать обработку</li>
                  <li>Экспортировать данные в машиночитаемом формате</li>
                </ul>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Для осуществления любого из этих прав напишите нам на{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>. Мы ответим в течение 30 дней.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">7. Файлы cookie</h2>
                <p className="text-slate-600 leading-relaxed">
                  Наши веб-страницы используют необходимые cookie для аутентификации и управления сессиями. Мы не используем сторонние рекламные cookie. Вы можете отключить cookie в настройках браузера, но некоторые функции могут работать некорректно.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">8. Изменения в политике</h2>
                <p className="text-slate-600 leading-relaxed">
                  Мы можем время от времени обновлять эту Политику конфиденциальности. При существенных изменениях мы уведомим активных пользователей через Telegram или email. Продолжение использования сервиса после изменений означает принятие новой версии.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">9. Контакты</h2>
                <p className="text-slate-600 leading-relaxed">
                  По вопросам конфиденциальности обращайтесь по адресу{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>. Юридическое лицо: <strong>PrepCraft LTD</strong>, Англия и Уэльс, Company No. 17249290. Зарегистрированный офис: 5 Brayford Square, London, E1 0SG, United Kingdom.
                </p>
              </section>
            </>
          ) : (
            <>
              <p className="text-slate-600 leading-relaxed">
                AI Interview Trainer (the &quot;Service&quot;) is operated by <strong>PrepCraft LTD</strong>, a company registered in England and Wales (Company No. 17249290). The Service is accessible via Telegram and the web. This Privacy Policy explains what information we collect, how we use it, and what rights you have with respect to your data.
              </p>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p><strong className="text-slate-800">Account data.</strong> When you connect via Telegram, we receive your Telegram user ID, display name, and username. We do not receive your phone number.</p>
                  <p><strong className="text-slate-800">Usage data.</strong> We record the questions you are asked, your answers, scores, and session timestamps to power feedback and progress tracking.</p>
                  <p><strong className="text-slate-800">Payment data.</strong> If you subscribe to a paid plan, payments are processed by a third-party provider (Stripe). We store only your subscription status and plan tier — never full card details.</p>
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
                  <li><strong className="text-slate-800">Payment processors</strong> (Stripe) — for handling transactions under their own privacy policies.</li>
                  <li><strong className="text-slate-800">Infrastructure providers</strong> — for hosting, databases, and monitoring.</li>
                  <li><strong className="text-slate-800">Legal authorities</strong> — when required by law or to protect our rights.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                <p className="text-slate-600 leading-relaxed">
                  We apply industry-standard measures including encrypted connections (TLS), encrypted data at rest, access controls, and regular security reviews. No system is perfectly secure; if you discover a vulnerability, please contact us immediately at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
                <p className="text-slate-600 leading-relaxed">
                  We retain your account and session data for as long as your account is active. If you delete your account, we will purge your personal data within 30 days, except where retention is required for legal or financial compliance.
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
                  </a>. We will respond within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">7. Cookies</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our web properties use essential cookies for authentication and session management. We do not use third-party advertising cookies. You can disable cookies in your browser settings, but some features may not function correctly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. When we do, we will update the effective date above and notify active users via Telegram or email for material changes. Continued use of the service after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">9. Contact</h2>
                <p className="text-slate-600 leading-relaxed">
                  For privacy-related questions or requests, contact us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>. The Service is operated by <strong>PrepCraft LTD</strong>, England and Wales, Company No. 17249290. Registered office: 5 Brayford Square, London, E1 0SG, United Kingdom.
                </p>
              </section>
            </>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
