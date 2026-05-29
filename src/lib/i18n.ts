'use client';

import * as React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Translation dictionary ─────────────────────────────────────────────────────

export const translations: Record<string, Record<string, string>> = {
  en: {
    /* Nav */
    'nav.plans': 'Plans',
    'nav.about': 'About',
    'nav.web_app': 'Web App',
    'nav.sign_in': 'Sign In →',
    'nav.dashboard': 'Dashboard →',
    'nav.lang_en': 'EN',
    'nav.lang_ru': 'RU',

    /* Hero */
    'hero.badge': 'AI interview practice · Technical & Behavioral · Voice support · EN / RU',
    'hero.title': 'Ace Your Next {role} with AI',
    'hero.title_highlight': 'Tech Interview',
    'hero.subtitle': 'Upload your resume, get AI-generated questions tailored to any role and experience level. Practice both technical and behavioral (STAR method) interviews. Get instant scoring, and track your progress. Available in English and Russian.',
    'hero.cta_start': 'Start Free Practice',
    'hero.cta_plans': 'View Plans',
    'hero.footnote': 'No credit card required · Free plan available',

    /* Features */
    'features.title': 'Why AI Interview Trainer?',
    'features.subtitle': 'Everything you need to walk into your next interview with confidence.',
    'features.voice.title': 'Voice Answers',
    'features.voice.desc': 'Practice speaking out loud — record your answer with your microphone, AI transcribes it with Whisper and evaluates just like a real interview.',
    'features.platform.title': 'Works in Telegram & Browser',
    'features.platform.desc': 'Use the Mini App inside Telegram on mobile, or open mini.techinterviewai.com in any browser on desktop — same experience, synced account.',
    'features.languages.title': 'English & Russian',
    'features.languages.desc': 'Full interface and interview questions in English or Russian. AI generates questions and evaluates answers in your chosen language.',
    'features.resume.title': 'Upload Resume, Any Role',
    'features.resume.desc': 'Upload your PDF resume and let AI analyze your specialization. Practice for Frontend, Backend, Fullstack, ML, DevOps, QA, Security, Data Engineer, and more.',
    'features.tracking.title': 'Progress Tracking',
    'features.tracking.desc': 'Track scores over time, identify your weak spots, and revisit past sessions to measure growth across all roles and levels.',
    'features.feedback.title': 'Instant AI Feedback',
    'features.feedback.desc': 'Answer a question, get scored and receive detailed feedback immediately — no waiting, no scheduling.',
    'features.behavioral.title': 'Behavioral Interviews (STAR Method)',
    'features.behavioral.desc': 'Practice behavioral questions using the STAR method — Situation, Task, Action, Result. Get detailed STAR breakdown scores with specific feedback on each component of your answer.',

    /* How It Works */
    'how.title': 'How It Works',
    'how.subtitle': 'From zero to interview-ready in three simple steps.',
    'how.step1.title': 'Choose Your Role',
    'how.step1.desc': 'Pick your role (Frontend, Backend, Fullstack, ML, or any other) and experience level. Or upload your resume — AI detects everything automatically.',
    'how.step2.title': 'Answer 5 Questions',
    'how.step2.desc': 'Choose Technical or Behavioral mode — both available with detailed AI evaluation. Type or record voice answers to real interview questions. Each response is evaluated by AI in real-time with detailed feedback.',
    'how.step3.title': 'Get Your Score',
    'how.step3.desc': 'Receive a final score out of 100, breakdown by question, and tailored recommendations to improve your weakest areas.',

    /* CTA */
    'cta.title': 'Ready to Ace Your Interview?',
    'cta.subtitle': 'Join thousands of developers practicing with AI. Practice technical and behavioral (STAR method) interviews. Start free — no credit card required.',
    'cta.button': 'Start Practicing →',
    'cta.telegram': 'Open in Telegram',

    /* Footer */
    'footer.product': 'Product',
    'footer.home': 'Home',
    'footer.pricing': 'Pricing',
    'footer.dashboard': 'Dashboard',
    'footer.telegram_bot': 'Telegram Bot',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© {year} AI Interview Trainer. All rights reserved.',

    /* About page */
    'about.title': 'About AI Interview Trainer',
    'about.subtitle': 'We help developers land their next job by turning interview anxiety into interview confidence — one practice session at a time.',
    'about.mission.title': 'Our Mission',
    'about.mission.p1': 'Technical interviews are hard — not because developers lack skill, but because the interview format itself is a skill. Our mission is to democratize interview preparation by giving every developer access to realistic, AI-driven practice at any time, for free.',
    'about.mission.p2': 'We believe that with enough deliberate practice, any developer can walk into a technical interview with confidence. AI Interview Trainer makes that practice accessible, immediate, and measurable.',
    'about.what.title': 'What We Do',
    'about.what.p': 'AI Interview Trainer is an AI-powered platform that simulates real technical interviews via Telegram. Our system generates fresh, role-specific questions, evaluates your answers in depth, and gives you actionable feedback — instantly.',
    'about.feature1.title': 'Any Specialization, AI-Generated',
    'about.feature1.body': 'Upload your resume and AI detects your role — Frontend, Backend, Fullstack, ML, or any other specialization. No predefined question bank needed.',
    'about.feature2.title': 'Smart Resume Analysis',
    'about.feature2.body': 'Upload your PDF resume. Our AI parses your experience, tech stack, and seniority level — then starts a personalized interview instantly.',
    'about.feature3.title': '3 Experience Levels',
    'about.feature3.body': 'Junior, Mid-level, and Senior questions calibrated to match real hiring bars at top companies.',
    'about.feature4.title': 'Instant AI Feedback',
    'about.feature4.body': 'Get detailed, rubric-based feedback on every answer within seconds, not days.',
    'about.feature5.title': 'Progress Tracking',
    'about.feature5.body': 'Track your scores over time, spot weak areas, and see measurable improvement.',
    'about.team.title': 'The Team',
    'about.team.p1': "We're a small team of engineers and ML practitioners who have collectively gone through hundreds of technical interviews — and failed many of them. We built the tool we wish we'd had when we were preparing.",
    'about.team.p2': "We're remote-first, move fast, and care deeply about developer experience — both for our users and for ourselves.",
    'about.contact.title': 'Get In Touch',
    'about.contact.p': 'Questions, feedback, or partnership inquiries? Reach us at {email}. We read every message.',

    /* Terms page */
    'terms.note': '⚠️ This page is available in English only.',
    'terms.title': 'Terms of Service',
    'terms.effective': 'Effective date: {date}',

    /* Privacy page */
    'privacy.note': '⚠️ This page is available in English only.',
    'privacy.title': 'Privacy Policy',
    'privacy.effective': 'Effective date: {date}',

    /* Tariffs page */
    'tariffs.title': 'Simple, Transparent Pricing',
    'tariffs.subtitle': 'Start free. Upgrade when you need more. Cancel anytime.',
    'tariffs.footnote': 'All plans include access via Telegram. No app download required.',
    'tariffs.description': 'Start free. Upgrade when you need more. Cancel anytime.',
    'tariffs.free_forever': 'Free Forever',
    'tariffs.per_month': '/ month',
    'tariffs.most_popular': 'Most Popular',
    'tariffs.duration': '{days} days access',
    'tariffs.redirecting': 'Redirecting...',
    'tariffs.get_started': 'Get Started',
    'tariffs.subscribe_now': 'Subscribe Now',

    /* Language switch */
    'lang.en': '🇬🇧 English',
    'lang.ru': '🇷🇺 Русский',

    /* Dashboard */
    'dashboard.home': 'Home',
    'dashboard.my_interviews': 'My Interviews',
    'dashboard.profile': 'Profile',
    'dashboard.web_app': 'Web App',
    'dashboard.open_in_telegram': 'Open in Telegram',
    'dashboard.logout': 'Logout',
    'dashboard.welcome': 'Welcome back, {name}!',
    'dashboard.total_interviews': 'Total Interviews',
    'dashboard.avg_score': 'Average Score',
    'dashboard.current_plan': 'Current Plan',
    'dashboard.sessions_this_week': 'Sessions This Week',
    'dashboard.recent_interviews': 'Recent Interviews',
    'dashboard.view_all': 'View all →',
    'dashboard.no_interviews': 'No interviews yet. Start your first one!',
    'dashboard.start_practice': 'Start New Practice',
    'dashboard.page_of': 'Page {page} of {total}',
    'dashboard.previous': 'Previous',
    'dashboard.next': 'Next',
    'dashboard.no_interviews_title': 'No interviews yet.',
    'dashboard.no_interviews_desc': 'Start your first practice session in the Mini App!',
    'dashboard.in_progress': 'In Progress',
    'dashboard.done': 'Done',
    'dashboard.active': 'Active',
    'dashboard.loading': 'Loading...',
    'dashboard.error_load': 'Failed to load interviews. Please try again.',
    'dashboard.retry': 'Retry',
    'dashboard.interviews_title': 'My Interviews',
    'dashboard.interviews_total': '{count} total',
    'dashboard.date_role': 'Date / Role',
    'dashboard.level': 'Level',
    'dashboard.score': 'Score',
    'dashboard.status': 'Status',
    'dashboard.session_id': 'Session ID',
    'dashboard.started': 'Started',
    'dashboard.completed': 'Completed',
    'dashboard.score_value': '{score}/100',
    'dashboard.profile_title': 'Profile',
    'dashboard.account': 'Account',
    'dashboard.name': 'Name',
    'dashboard.telegram': 'Telegram',
    'dashboard.email': 'Email',
    'dashboard.telegram_id': 'Telegram ID',
    'dashboard.subscription': 'Subscription',
    'dashboard.plan': 'Plan',
    'dashboard.status_label': 'Status',
    'dashboard.expired': 'Expired',
    'dashboard.active_status': 'Active',
    'dashboard.expires': 'Expires',
    'dashboard.features': 'Features',
    'dashboard.no_subscription': 'No active subscription',
    'dashboard.free_plan': 'You are on the Free plan',
    'dashboard.subscribe_via_bot': 'Subscribe via Telegram bot',
    'dashboard.manage_in_bot': 'Manage in Telegram bot — /pay to renew',
    'dashboard.account_actions': 'Account Actions',
  },

  ru: {
    /* Nav */
    'nav.plans': 'Тарифы',
    'nav.about': 'О нас',
    'nav.web_app': 'Web App',
    'nav.sign_in': 'Войти →',
    'nav.dashboard': 'Панель →',
    'nav.lang_en': 'EN',
    'nav.lang_ru': 'RU',

    /* Hero */
    'hero.badge': 'AI практика интервью · Technical & Behavioral · Голосовая поддержка · EN / RU',
    'hero.title': 'Пройди {role} с AI',
    'hero.title_highlight': 'Tech Interview',
    'hero.subtitle': 'Загрузи резюме, получи AI-сгенерированные вопросы под любую роль и уровень. Практикуй технические и поведенческие (метод STAR) интервью. Получай мгновенные оценки и отслеживай прогресс. Доступно на английском и русском.',
    'hero.cta_start': 'Начать бесплатно',
    'hero.cta_plans': 'Тарифы',
    'hero.footnote': 'Без кредитной карты · Есть бесплатный план',

    /* Features */
    'features.title': 'Почему AI Interview Trainer?',
    'features.subtitle': 'Всё необходимое, чтобы прийти на собеседование с уверенностью.',
    'features.voice.title': 'Голосовые ответы',
    'features.voice.desc': 'Практикуйся вслух — записывай ответ микрофоном, AI расшифровывает через Whisper и оценивает как на реальном собеседовании.',
    'features.platform.title': 'Работает в Telegram и браузере',
    'features.platform.desc': 'Используй Mini App в Telegram на телефоне или открой mini.techinterviewai.com в браузере — тот же опыт, синхронизированный аккаунт.',
    'features.languages.title': 'Английский и русский',
    'features.languages.desc': 'Полный интерфейс и вопросы на английском или русском. AI генерирует вопросы и оценивает ответы на выбранном языке.',
    'features.resume.title': 'Загрузи резюме, любая роль',
    'features.resume.desc': 'Загрузи PDF-резюме и AI проанализирует твою специализацию. Практикуйся для Frontend, Backend, Fullstack, ML, DevOps, QA, Security, Data Engineer и других.',
    'features.tracking.title': 'Отслеживание прогресса',
    'features.tracking.desc': 'Отслеживай баллы, определяй слабые места и возвращайся к прошлым сессиям, чтобы видеть рост по всем ролям и уровням.',
    'features.feedback.title': 'Мгновенная AI обратная связь',
    'features.feedback.desc': 'Ответь на вопрос — получи оценку и подробный отзыв немедленно. Без ожидания и записи.',
    'features.behavioral.title': 'Behavioral интервью (метод STAR)',
    'features.behavioral.desc': 'Практикуй поведенческие вопросы по методике STAR — Ситуация, Задача, Действие, Результат. Получай детальные STAR-оценки с обратной связью по каждому компоненту ответа.',

    /* How It Works */
    'how.title': 'Как это работает',
    'how.subtitle': 'От нуля до готовности к собеседованию за три простых шага.',
    'how.step1.title': 'Выбери роль',
    'how.step1.desc': 'Выбери роль (Frontend, Backend, Fullstack, ML или любую другую) и уровень опыта. Или загрузи резюме — AI определит всё автоматически.',
    'how.step2.title': 'Ответь на 5 вопросов',
    'how.step2.desc': 'Выбери режим Technical или Behavioral — оба доступны с детальной AI оценкой. Печатай или записывай голосовые ответы на реальные вопросы. Каждый ответ оценивается AI в реальном времени с подробной обратной связью.',
    'how.step3.title': 'Получи результат',
    'how.step3.desc': 'Получи итоговый балл из 100, разбор по каждому вопросу и персонализированные рекомендации для улучшения слабых мест.',

    /* CTA */
    'cta.title': 'Готов пройти интервью?',
    'cta.subtitle': 'Присоединяйся к тысячам разработчиков, практикующихся с AI. Практикуй технические и поведенческие (метод STAR) интервью. Начни бесплатно — без кредитной карты.',
    'cta.button': 'Начать практику →',
    'cta.telegram': 'Открыть в Telegram',

    /* Footer */
    'footer.product': 'Продукт',
    'footer.home': 'Главная',
    'footer.pricing': 'Тарифы',
    'footer.dashboard': 'Панель',
    'footer.telegram_bot': 'Telegram Бот',
    'footer.company': 'Компания',
    'footer.about': 'О нас',
    'footer.privacy': 'Конфиденциальность',
    'footer.terms': 'Условия использования',
    'footer.copyright': '© {year} AI Interview Trainer. Все права защищены.',

    /* About page */
    'about.title': 'О AI Interview Trainer',
    'about.subtitle': 'Мы помогаем разработчикам получить работу, превращая страх перед собеседованием в уверенность — одну тренировку за раз.',
    'about.mission.title': 'Наша миссия',
    'about.mission.p1': 'Технические собеседования сложны — не потому что разработчикам не хватает навыков, а потому что формат собеседования сам по себе навык. Наша миссия — демократизировать подготовку к собеседованиям, давая каждому разработчику доступ к реалистичной AI-практике в любое время, бесплатно.',
    'about.mission.p2': 'Мы верим, что с достаточной целенаправленной практикой любой разработчик может прийти на техническое собеседование с уверенностью. AI Interview Trainer делает эту практику доступной, мгновенной и измеримой.',
    'about.what.title': 'Что мы делаем',
    'about.what.p': 'AI Interview Trainer — это AI-платформа, которая симулирует реальные технические собеседования через Telegram. Наша система генерирует новые вопросы по конкретным ролям, глубоко оценивает ответы и даёт практичную обратную связь — мгновенно.',
    'about.feature1.title': 'Любая специализация, AI-генерация',
    'about.feature1.body': 'Загрузи резюме, и AI определит твою роль — Frontend, Backend, Fullstack, ML или любую другую. Не нужна предопределённая база вопросов.',
    'about.feature2.title': 'Умный анализ резюме',
    'about.feature2.body': 'Загрузи PDF-резюме. AI анализирует твой опыт, технологический стек и уровень — и мгновенно начинает персонализированное интервью.',
    'about.feature3.title': '3 уровня опыта',
    'about.feature3.body': 'Вопросы для Junior, Mid-level и Senior, откалиброванные под реальные требования лучших компаний.',
    'about.feature4.title': 'Мгновенная AI обратная связь',
    'about.feature4.body': 'Получай детальную обратную связь по каждому ответу в течение секунд, а не дней.',
    'about.feature5.title': 'Отслеживание прогресса',
    'about.feature5.body': 'Отслеживай баллы, определяй слабые места и наблюдай измеримый прогресс.',
    'about.team.title': 'Команда',
    'about.team.p1': 'Мы небольшая команда инженеров и ML-специалистов, которые вместе прошли через сотни технических собеседований — и многие провалили. Мы создали инструмент, который хотели бы иметь при подготовке.',
    'about.team.p2': 'Мы работаем удалённо, двигаемся быстро и глубоко заботимся о пользовательском опыте — как для наших пользователей, так и для себя.',
    'about.contact.title': 'Свяжитесь с нами',
    'about.contact.p': 'Вопросы, отзывы или предложения о партнёрстве? Пишите на {email}. Мы читаем каждое сообщение.',

    /* Terms page */
    'terms.note': '⚠️ Эта страница доступна только на английском языке.',
    'terms.title': 'Terms of Service',
    'terms.effective': 'Дата вступления: {date}',

    /* Privacy page */
    'privacy.note': '⚠️ Эта страница доступна только на английском языке.',
    'privacy.title': 'Privacy Policy',
    'privacy.effective': 'Дата вступления: {date}',

    /* Tariffs page */
    'tariffs.title': 'Простые и понятные тарифы',
    'tariffs.subtitle': 'Начни бесплатно. Улучши план, когда понадобится. Отмена в любое время.',
    'tariffs.footnote': 'Все планы включают доступ через Telegram. Не требуется скачивать приложение.',
    'tariffs.description': 'Начни бесплатно. Улучши, когда понадобится. Отмена в любое время.',
    'tariffs.free_forever': 'Навсегда бесплатно',
    'tariffs.per_month': '/ мес',
    'tariffs.most_popular': 'Популярное',
    'tariffs.duration': 'доступ на {days} дней',
    'tariffs.redirecting': 'Перенаправление...',
    'tariffs.get_started': 'Начать бесплатно',
    'tariffs.subscribe_now': 'Оформить подписку',

    /* Language switch */
    'lang.en': '🇬🇧 English',
    'lang.ru': '🇷🇺 Русский',

    /* Dashboard */
    'dashboard.home': 'Главная',
    'dashboard.my_interviews': 'Мои интервью',
    'dashboard.profile': 'Профиль',
    'dashboard.web_app': 'Web App',
    'dashboard.open_in_telegram': 'Открыть в Telegram',
    'dashboard.logout': 'Выйти',
    'dashboard.welcome': 'С возвращением, {name}!',
    'dashboard.total_interviews': 'Всего интервью',
    'dashboard.avg_score': 'Средний балл',
    'dashboard.current_plan': 'Текущий план',
    'dashboard.sessions_this_week': 'Сессий на этой неделе',
    'dashboard.recent_interviews': 'Последние интервью',
    'dashboard.view_all': 'Все →',
    'dashboard.no_interviews': 'Ещё нет интервью. Начни первое!',
    'dashboard.start_practice': 'Новая практика',
    'dashboard.page_of': 'Страница {page} из {total}',
    'dashboard.previous': 'Назад',
    'dashboard.next': 'Вперёд',
    'dashboard.no_interviews_title': 'Пока нет интервью.',
    'dashboard.no_interviews_desc': 'Начни первую тренировку в Mini App!',
    'dashboard.in_progress': 'В процессе',
    'dashboard.done': 'Завершено',
    'dashboard.active': 'Активно',
    'dashboard.loading': 'Загрузка...',
    'dashboard.error_load': 'Не удалось загрузить интервью. Попробуй снова.',
    'dashboard.retry': 'Повторить',
    'dashboard.interviews_title': 'Мои интервью',
    'dashboard.interviews_total': 'всего {count}',
    'dashboard.date_role': 'Дата / Роль',
    'dashboard.level': 'Уровень',
    'dashboard.score': 'Балл',
    'dashboard.status': 'Статус',
    'dashboard.session_id': 'ID сессии',
    'dashboard.started': 'Начато',
    'dashboard.completed': 'Завершено',
    'dashboard.score_value': '{score}/100',
    'dashboard.profile_title': 'Профиль',
    'dashboard.account': 'Аккаунт',
    'dashboard.name': 'Имя',
    'dashboard.telegram': 'Telegram',
    'dashboard.email': 'Email',
    'dashboard.telegram_id': 'Telegram ID',
    'dashboard.subscription': 'Подписка',
    'dashboard.plan': 'План',
    'dashboard.status_label': 'Статус',
    'dashboard.expired': 'Истекла',
    'dashboard.active_status': 'Активна',
    'dashboard.expires': 'Истекает',
    'dashboard.features': 'Возможности',
    'dashboard.no_subscription': 'Нет активной подписки',
    'dashboard.free_plan': 'Вы на бесплатном плане',
    'dashboard.subscribe_via_bot': 'Оформить подписку через Telegram',
    'dashboard.manage_in_bot': 'Управление в Telegram боте — /pay чтобы продлить',
    'dashboard.account_actions': 'Действия с аккаунтом',
  },
};

// ── Context ────────────────────────────────────────────────────────────────────

export type UILanguage = 'en' | 'ru';

interface I18nContextType {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  loading: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [uiLang, setUiLangState] = useState<UILanguage>('en');
  const [loading, setLoading] = useState(true);

  // Load UI language from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ui_lang') as UILanguage | null;
      if (saved === 'en' || saved === 'ru') {
        setUiLangState(saved);
        document.documentElement.setAttribute('lang', saved);
      }
    } catch {
      // localStorage not available
    }
    setLoading(false);
  }, []);

  const setUiLang = useCallback((lang: UILanguage) => {
    setUiLangState(lang);
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('ui_lang', lang);
    } catch {
      // localStorage not available
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const dict = translations[uiLang];
      let template = dict?.[key] ?? key;

      if (!template || template === key) {
        // Fallback to English
        template = translations.en?.[key] ?? key;
      }

      if (!params) return template;

      let result = template;
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v));
      }
      return result;
    },
    [uiLang],
  );

  const value: I18nContextType = { uiLang, setUiLang, t, loading };

  return React.createElement(I18nContext.Provider, { value }, children);
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return ctx;
}
