/**
 * Company data for landing pages.
 * Matches slugs from the company_sets DB table.
 */
export interface CompanyInfo {
  slug: string;
  emoji: string;
  nameEn: string;
  nameRu: string;
  descriptionEn: string;
  descriptionRu: string;
  longDescriptionEn: string;
  longDescriptionRu: string;
  tagsEn: string[];
  tagsRu: string[];
}

export const COMPANIES: CompanyInfo[] = [
  {
    slug: 'google',
    emoji: '🔍',
    nameEn: 'Google',
    nameRu: 'Google',
    descriptionEn: 'FAANG-level Google interview prep — algorithms, system design, Googleyness',
    descriptionRu: 'Подготовка к собеседованию в Google — алгоритмы, system design, Googleyness',
    longDescriptionEn:
      'Google interviews are known for their rigor. You will face difficult algorithm challenges, system design at massive scale, and behavioral questions that probe your leadership and ambiguity-handling skills. Our AI adapts to Google\'s structured interview style, starting broad and probing deeper with every answer.',
    longDescriptionRu:
      'Собеседования в Google славятся своей сложностью. Вас ждут сложные алгоритмические задачи, проектирование систем огромного масштаба и поведенческие вопросы, проверяющие лидерские качества. Наш AI адаптируется к структурированному стилю интервью Google.',
    tagsEn: ['Algorithms', 'System Design', 'Go/Python', 'Distributed Systems'],
    tagsRu: ['Алгоритмы', 'System Design', 'Go/Python', 'Распределённые системы'],
  },
  {
    slug: 'amazon',
    emoji: '📦',
    nameEn: 'Amazon',
    nameRu: 'Amazon',
    descriptionEn: 'Amazon Leadership Principles focused prep — STAR behavioral, bar-raising',
    descriptionRu: 'Подготовка с фокусом на лидерские принципы Amazon — STAR, bar-raising',
    longDescriptionEn:
      'Amazon interviews are built around 16 Leadership Principles. Every question — technical or behavioral — ties back to Customer Obsession, Ownership, Bias for Action, and more. Our AI crafts questions that mirror Amazon\'s bar-raising culture, pushing you to demonstrate principle-driven decision-making.',
    longDescriptionRu:
      'Собеседования Amazon построены вокруг 16 лидерских принципов. Каждый вопрос — технический или поведенческий — привязан к Customer Obsession, Ownership, Bias for Action и другим. Наш AI формирует вопросы в стиле bar-raising культуры Amazon.',
    tagsEn: ['Leadership Principles', 'STAR Method', 'AWS', 'Scalable Systems'],
    tagsRu: ['Лидерские принципы', 'STAR метод', 'AWS', 'Масштабируемые системы'],
  },
  {
    slug: 'meta',
    emoji: '💙',
    nameEn: 'Meta',
    nameRu: 'Meta',
    descriptionEn: 'Meta (Facebook) interview prep — product engineering, real-time systems',
    descriptionRu: 'Подготовка к собеседованию в Meta — продуктовый инжиниринг',
    longDescriptionEn:
      'Meta interviews focus on product-aware engineering. Expect questions on real-time systems, social graph at scale, React/Hack/Python, and system design for billions of users. Every technical choice ties back to user impact. Our AI emphasizes moving fast, iteration, and data-driven decisions.',
    longDescriptionRu:
      'Интервью Meta фокусируются на продуктовой инженерии. Вас ждут вопросы по real-time системам, социальному графу в масштабе, React/Hack/Python и system design для миллиардов пользователей. Наш AI делает акцент на скорости, итерациях и data-driven решениях.',
    tagsEn: ['React/JavaScript', 'Real-time Systems', 'Product Engineering', 'Distributed Caching'],
    tagsRu: ['React/JavaScript', 'Real-time системы', 'Продуктовая инженерия', 'Кеширование'],
  },
  {
    slug: 'netflix',
    emoji: '🎬',
    nameEn: 'Netflix',
    nameRu: 'Netflix',
    descriptionEn: 'Netflix culture & engineering — microservices, chaos engineering, CDN',
    descriptionRu: 'Подготовка к собеседованию в Netflix — культура свободы и ответственности',
    longDescriptionEn:
      'Netflix is known for its Freedom & Responsibility culture. Their interviews focus on building resilient microservices, chaos engineering, CDN optimization, and high-availability patterns. Our AI will challenge you to own decisions end-to-end, just like a real Netflix engineer.',
    longDescriptionRu:
      'Netflix известен культурой свободы и ответственности. Интервью фокусируются на отказоустойчивых микросервисах, chaos engineering, оптимизации CDN и high-availability паттернах. Наш AI научит вас принимать решения end-to-end.',
    tagsEn: ['Microservices', 'Chaos Engineering', 'CDN/Streaming', 'Java/Spring'],
    tagsRu: ['Микросервисы', 'Chaos Engineering', 'CDN/Стриминг', 'Java/Spring'],
  },
  {
    slug: 'microsoft',
    emoji: '🪟',
    nameEn: 'Microsoft',
    nameRu: 'Microsoft',
    descriptionEn: 'Microsoft interview prep — Azure, C#, system design, growth mindset',
    descriptionRu: 'Подготовка к собеседованию в Microsoft — Azure, C#, system design',
    longDescriptionEn:
      'Microsoft interviews blend deep technical knowledge with behavioral questions aligned to their growth mindset culture. You will face system design challenges around Azure and distributed cloud services, coding in C#/C++/Python, and "tell me about a time" questions that probe collaboration and customer obsession.',
    longDescriptionRu:
      'Интервью Microsoft сочетают глубокие технические знания с поведенческими вопросами в стиле growth mindset. Вас ждут system design для Azure и облачных сервисов, coding на C#/C++/Python и вопросы о коллаборации и клиентоориентированности.',
    tagsEn: ['C#/.NET', 'Azure', 'System Design', 'Distributed Computing'],
    tagsRu: ['C#/.NET', 'Azure', 'System Design', 'Распределённые вычисления'],
  },
  {
    slug: 'apple',
    emoji: '🍎',
    nameEn: 'Apple',
    nameRu: 'Apple',
    descriptionEn: 'Apple engineering prep — Swift, iOS/macOS, privacy-first design',
    descriptionRu: 'Подготовка к собеседованию в Apple — Swift, iOS/macOS, дизайн и качество',
    longDescriptionEn:
      'Apple interviews emphasize craftsmanship, attention to detail, and cross-functional collaboration. You will be tested on Swift/Objective-C for client-side roles, C/C++ for systems-level work, and system design that prioritizes performance, privacy, and exceptional user experience.',
    longDescriptionRu:
      'Интервью Apple делают акцент на мастерстве, внимании к деталям и кросс-функциональном взаимодействии. Вас ждут Swift/Objective-C, C/C++ для системного уровня и system design с фокусом на производительность, приватность и пользовательский опыт.',
    tagsEn: ['Swift/Objective-C', 'iOS/macOS', 'Privacy & Security', 'Hardware-Software'],
    tagsRu: ['Swift/Objective-C', 'iOS/macOS', 'Приватность', 'Hardware-Software'],
  },
  {
    slug: 'yandex',
    emoji: '🔴',
    nameEn: 'Yandex',
    nameRu: 'Яндекс',
    descriptionEn: 'Yandex SDE prep — competitive algorithms, search, ML in production',
    descriptionRu: 'Подготовка к собеседованию в Яндекс — алгоритмы, поиск, ML',
    longDescriptionEn:
      'Yandex interviews are algorithm-heavy with a competitive programming flavor. Expect complex multi-step problems, deep algorithmic knowledge, and system design for large-scale search, recommendation, and data processing. Our AI matches the challenging style of Yandex technical interviews.',
    longDescriptionRu:
      'Собеседования в Яндекс требуют глубоких алгоритмических знаний. Вас ждут многошаговые задачи, проектирование поисковых и рекомендательных систем и вопросы по ML в production. Наш AI адаптируется под сложный стиль технических интервью Яндекса.',
    tagsEn: ['Competitive Algorithms', 'Search Systems', 'C++/Python', 'ML in Production'],
    tagsRu: ['Олимпиадные алгоритмы', 'Поисковые системы', 'C++/Python', 'ML в production'],
  },
  {
    slug: 'tinkoff',
    emoji: '💳',
    nameEn: 'Tinkoff',
    nameRu: 'Тинькофф',
    descriptionEn: 'Tinkoff fintech engineering — Java, Spring, payments, high-load',
    descriptionRu: 'Подготовка к собеседованию в Тинькофф — Java, финтех, high-load',
    longDescriptionEn:
      'Tinkoff (T-Bank) interviews focus on fintech engineering: Java/Kotlin and Spring Boot, high-load backend architecture, microservices with Kafka and PostgreSQL, and domain-specific challenges like transaction processing, idempotency, and anti-fraud systems.',
    longDescriptionRu:
      'Собеседования в Тинькофф фокусируются на финтех-инженерии: Java/Kotlin и Spring Boot, high-load архитектура, микросервисы с Kafka и PostgreSQL, а также доменные задачи — транзакции, идемпотентность и антифрод.',
    tagsEn: ['Java/Kotlin', 'Spring Boot', 'Fintech', 'Kafka/PostgreSQL'],
    tagsRu: ['Java/Kotlin', 'Spring Boot', 'Финтех', 'Kafka/PostgreSQL'],
  },
];

/** Get a company by slug, or undefined if not found. */
export function getCompanyBySlug(slug: string): CompanyInfo | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}
