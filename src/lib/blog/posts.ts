import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'top-react-interview-questions-2026',
    title: 'Top 50 React Interview Questions and Answers in 2026',
    description:
      'Ace your React interview with this comprehensive guide covering hooks, state management, performance optimization, SSR, and the latest React 19+ patterns. Includes code examples and explanations.',
    date: '2026-06-08',
    readTime: '15 min read',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Interview'],
    author: 'AI Interview Trainer Team',
    published: true,
    content: `
Technical interviews for React positions have evolved significantly in 2026. Employers now expect not just knowledge of hooks and state management, but a deep understanding of React's rendering model, concurrent features, server components, and performance optimization.

Below we cover 50 essential React interview questions, divided by category. Each question includes a concise answer and code examples where relevant.

---

## Core React Concepts (Questions 1-10)

### 1. What is React and how does it differ from other frameworks?

React is a declarative, component-based JavaScript library for building user interfaces. Unlike full frameworks (Angular, Vue), React focuses primarily on the view layer and leaves routing, state management, and data fetching to external libraries or built-in solutions like Next.js.

**Key differences:**
- **Virtual DOM** — React uses a virtual representation of the UI to batch updates efficiently
- **Unidirectional data flow** — data flows down via props, events flow up
- **JSX** — JavaScript syntax extension that combines markup with logic
- **Library, not a framework** — you choose your tooling

### 2. Explain the Virtual DOM and its reconciliation process

The Virtual DOM is a lightweight JavaScript object representation of the real DOM. When state changes, React:

1. Creates a new virtual DOM tree
2. Diffs it against the previous tree (reconciliation)
3. Calculates the minimal set of DOM mutations
4. Batches and applies them

This process is called **reconciliation** and is driven by the \`key\` prop for lists, element type comparison, and the \`Fiber\` architecture introduced in React 16.

### 3. What are React Hooks? List the most common ones.

Hooks are functions that let you use state and lifecycle features in functional components. Introduced in React 16.8, they replaced class components as the standard.

**Core hooks:**
- \`useState\` — local component state
- \`useEffect\` — side effects (data fetching, subscriptions, DOM manipulation)
- \`useContext\` — consume context
- \`useRef\` — mutable references that persist across renders
- \`useMemo\` — memoize expensive computations
- \`useCallback\` — memoize function references
- \`useReducer\` — complex state logic with reducers
- \`useTransition\` (React 18+) — mark state updates as non-urgent
- \`useOptimistic\` (React 19+) — optimistic UI updates
- \`useActionState\` (React 19+) — manage form actions with pending state

### 4. What is the difference between \`useEffect\` and \`useLayoutEffect\`?

- **\`useEffect\`** runs **after** the browser paints. It's asynchronous and non-blocking. Use for data fetching, subscriptions, analytics.
- **\`useLayoutEffect\`** runs **synchronously** after DOM mutations but before the browser paints. Use for reading layout and synchronously re-rendering (measuring DOM elements, animations).

**Rule of thumb:** prefer \`useEffect\` unless you see a visual flicker (flash of unstyled content).

### 5. Explain the Rules of Hooks

1. **Only call Hooks at the top level** — don't call them inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** — function components or custom hooks, not regular JavaScript functions

These rules ensure that hooks are called in the same order on every render, which is how React preserves state between \`useState\` and \`useEffect\` calls.

### 6. What is the Context API and when should you use it?

Context provides a way to pass data through the component tree without manually passing props at every level (prop drilling).

\`\`\`jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Hello</div>;
}
\`\`\`

**When to use:** global state (theme, locale, auth user), rarely-changed data.
**When NOT to use:** frequently-updating data (use a state management library like Zustand, Jotai, or Redux instead).

### 7. Explain the \`key\` prop — why is it important?

The \`key\` prop helps React identify which items in a list have changed, been added, or removed. Without stable keys, React may unnecessarily re-render all items or introduce bugs with component state.

\`\`\`jsx
// ❌ Bad — using index as key
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ Good — using a stable unique ID
{items.map((item) => <Item key={item.id} {...item} />)}
\`\`\`

Never use \`Math.random()\` or array indexes for keys in dynamic lists, as it defeats React's reconciliation.

### 8. What is the difference between controlled and uncontrolled components?

- **Controlled**: React state drives the input value. The component has full control.
  \`\`\`jsx
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
  \`\`\`

- **Uncontrolled**: the DOM manages its own state. You use a ref to access the value when needed.
  \`\`\`jsx
  const ref = useRef(null);
  return <input ref={ref} />; // access via ref.current.value
  \`\`\`

**Rule of thumb:** use controlled components for most cases (validation, instant feedback). Use uncontrolled for simple forms or integrating with non-React code.

### 9. What is the \`StrictMode\` component?

\`StrictMode\` is a development-only wrapper that:

- Identifies components with unsafe lifecycle methods
- Detects unexpected side effects by double-invoking render functions
- Warns about legacy string ref API usage
- Detects deprecated \`findDOMNode\` usage

It helps catch bugs early by intentionally running certain functions twice in development.

### 10. Explain the difference between \`useMemo\` and \`useCallback\`

- **\`useMemo\`** memoizes a **value**: \`const sorted = useMemo(() => items.sort(), [items])\`
- **\`useCallback\`** memoizes a **function**: \`const handleClick = useCallback(() => doSomething(id), [id])\`

Both are performance optimizations. Apply them only when you've identified a performance bottleneck — premature optimization adds complexity without benefit.

---

## State Management (Questions 11-20)

### 11. What is lifting state up?

When multiple components need access to the same piece of state, move that state to the nearest common ancestor and pass it down via props.

### 12. \`useReducer\` vs \`useState\` — when to use which?

- **\`useState\`** — simple independent values (strings, booleans, numbers)
- **\`useReducer\`** — complex state logic with multiple sub-values, or when the next state depends on the previous one

\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
\`\`\`

### 13. What are popular React state management libraries in 2026?

1. **Zustand** — minimal, hook-based, no boilerplate (most popular)
2. **Jotai** — atomic state management, inspired by Recoil
3. **TanStack Query** — server state (data fetching, caching)
4. **Redux Toolkit** — still widely used in enterprise
5. **Valtio** — proxy-based, mutable API

### 14. What is the difference between state and props?

| Aspect | Props | State |
|--------|-------|-------|
| Mutability | Immutable (read-only) | Mutable |
| Ownership | Parent | Component itself |
| Changes | Parent re-render | \`setState\` / state updater |
| Usage | Configuration, callbacks | Dynamic data |

### 15. What are pure components and \`React.memo\`?

\`React.memo\` is a higher-order component that memoizes the rendered output. It prevents re-rendering when props haven't changed (shallow comparison).

\`\`\`jsx
const ExpensiveComponent = React.memo(function Expensive({ data }) {
  return <div>{data.map(/* ... */)}</div>;
});
\`\`\`

---

## Performance Optimization (Questions 21-25)

### 21. What causes unnecessary re-renders in React?

Common causes:
- Parent re-render (all children re-render by default)
- Inline objects/arrays/functions passed as props (new reference each render)
- State at too high a level
- Missing \`key\` props or unstable keys

### 22. What is React.memo and when should you use it?

\`React.memo\` prevents re-renders when props haven't changed. Use it for:
- Components that render often but receive the same props
- Expensive rendering trees
- Leaf components in performance-critical views

### 23. Explain code splitting in React

Code splitting lets you split your bundle into smaller chunks loaded on demand:

\`\`\`jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

### 24. What is the \`useDeferredValue\` hook?

\`useDeferredValue\` lets you defer re-rendering a non-urgent part of the UI:

\`\`\`jsx
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => search(deferredQuery), [deferredQuery]);
\`\`\`

The deferred value updates "lag behind" the urgent update, keeping the UI responsive.

### 25. How do React Server Components (RSC) improve performance?

RSC (Next.js App Router) render components on the server, sending only the HTML to the client. Benefits:
- Zero JavaScript for server components
- Direct database access without API endpoints
- Smaller client bundles
- Automatic code splitting
- Streaming and Suspense for progressive rendering

---

## Advanced Topics (Questions 26-40)

### 26. What is Suspense in React?

Suspense lets components "wait" for something before rendering:

\`\`\`jsx
<Suspense fallback={<Spinner />}>
  <AsyncComponent />
</Suspense>
\`\`\`

In React 18+, Suspense works with data fetching, code splitting, and streaming SSR.

### 27. Explain concurrent rendering (React 18+)

Concurrent mode is a new behind-the-scenes rendering mechanism that lets React:
- **Interrupt** a render in progress
- **Prioritize** urgent updates (user input) over less urgent ones (data loading)
- **Keep** the old UI visible while preparing the new one

Enabled by \`createRoot\` and features like \`useTransition\` and \`useDeferredValue\`.

### 28. What are Custom Hooks?

Custom hooks are JavaScript functions that reuse stateful logic:

\`\`\`jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}
\`\`\`

### 29. What is the render props pattern?

A render prop is a function prop that a component uses to know what to render:

\`\`\`jsx
<Mouse render={(position) => <Cat position={position} />} />
\`\`\`

### 30. What is the difference between \`useEffect\` cleanup and \`componentWillUnmount\`?

They're conceptually the same — both run when the component unmounts. \`useEffect\` cleanup also runs before the effect re-runs (if deps changed), which \`componentWillUnmount\` did not.

---

## Testing (Questions 41-45)

### 41. What testing libraries are commonly used with React?

- **Vitest** — fast, Vite-native test runner (replacing Jest)
- **React Testing Library** — tests from a user perspective
- **Playwright** — end-to-end testing

### 42. How do you test a custom hook?

Use \`renderHook\` from \`@testing-library/react\`:

\`\`\`jsx
import { renderHook, act } from '@testing-library/react';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
\`\`\`

---

## Real-World Scenarios (Questions 46-50)

### 46. How would you handle authentication in a React app?

Modern approach (with Next.js App Router):
1. JWT or session-based auth
2. Middleware for route protection
3. Server-side session check for RSC
4. \`useContext\` or Zustand for client-side auth state
5. Refresh token rotation

### 47. How do you optimize a React app with thousands of list items?

- Window virtualization (\`react-window\`, \`@tanstack/virtual\`)
- \`React.memo\` on list items
- Stable \`key\` props
- Debounce search/filter inputs
- Pagination or infinite scroll
- Server-side filtering

### 48. How do you handle errors in React?

- **Error Boundaries** (class components with \`componentDidCatch\`)
- \`Suspense\` boundary for async errors
- Try/catch in event handlers
- Global error handler via \`window.onerror\`

### 49. How do internationalization (i18n) work in React?

Common approach:
1. \`react-i18next\` or \`next-intl\`
2. Store translations as JSON
3. Use \`t()\` function in components
4. Lazy-load translations
5. Handle RTL layouts

### 50. What is the future of React? (2026 perspective)

React continues to evolve toward:
- **Server Components** as the default
- **Actions** — built-in form handling (\`useActionState\`, \`Server Actions\`)
- **React Compiler** — automatic memoization (no more \`useMemo\`/\`useCallback\` manual optimization)
- **Offscreen** — keep components mounted but invisible
- **Tight integration** with frameworks (Next.js, Remix)

---

## How to Practice These Questions

The best way to master React interviews is **deliberate practice**. Use [AI Interview Trainer](https://t.me/developing_interview_trainer_bot) to:
- Practice these exact questions with AI-generated follow-ups
- Get scored on your answers with detailed feedback
- Track your progress across topics
- Practice in **Technical** or **Behavioral** mode
- Record **voice answers** for a realistic interview experience

[Start free practice →](https://t.me/developing_interview_trainer_bot)
`,
  },
  {
    slug: 'system-design-interview-complete-guide',
    title: 'How to Ace the System Design Interview: A Complete Guide',
    description:
      'Master system design interviews with frameworks for designing scalable systems. Covers load balancing, caching, databases, microservices, and real-world examples like designing YouTube, Twitter, and URL shorteners.',
    date: '2026-06-08',
    readTime: '12 min read',
    category: 'System Design',
    tags: ['System Design', 'Architecture', 'Scalability', 'Backend'],
    author: 'AI Interview Trainer Team',
    published: true,
    content: `
System design interviews are often the most intimidating round in big tech interviews. Unlike coding interviews where there's a right answer, system design is open-ended — interviewers evaluate your thought process, trade-off analysis, and communication skills.

This guide covers the framework you need to approach any system design question.

---

## The System Design Interview Framework

### Step 1: Understand the Requirements (5 min)

Start by clarifying the scope:

**Functional requirements:**
- What features does the system need?
- Who are the users?
- What actions can they perform?

**Non-functional requirements:**
- How many users? (DAU / MAU)
- Latency expectations? (real-time vs async)
- Availability target? (99.9%, 99.99%)
- Consistency vs availability trade-off

### Step 2: High-Level Design (10 min)

Draw the core components:
- **Client** (web, mobile)
- **Load balancer** (reverse proxy)
- **API gateway**
- **Application servers**
- **Database** (read/write paths)
- **Cache layer**
- **CDN** (for static/media content)

### Step 3: Deep Dive (15 min)

Focus on the most interesting aspect:
- Database schema and sharding strategy
- Caching strategy (write-through, cache-aside)
- Message queues for async processing
- Data replication and consistency
- Monitoring and alerting

### Step 4: Trade-offs and Scalability (10 min)

Discuss:
- Bottlenecks and their solutions
- Single points of failure
- Scale: horizontal vs vertical
- Cost vs performance
- Alternative approaches

---

## Key Building Blocks

### Load Balancing
- **Algorithms**: Round robin, least connections, IP hash, consistent hashing
- **Types**: Layer 4 (TCP) vs Layer 7 (HTTP)
- **Tools**: NGINX, HAProxy, AWS ALB/ELB

### Caching
- **Strategies**: Cache-aside, write-through, write-behind, read-through
- **Eviction**: LRU, LFU, TTL-based
- **Tiers**: Browser cache → CDN → In-memory cache (Redis/Memcached) → Application cache
- **Pitfalls**: Cache stampede, stale data, cache invalidation

### Databases
**SQL vs NoSQL:**
| Factor | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed | Flexible |
| ACID | Full | Limited |
| Scalability | Vertical | Horizontal |
| Use case | Transactions, reporting | Real-time, high volume, schemaless |

**Read replicas** — scale reads by adding replicas, leader handles writes.
**Sharding** — horizontal partitioning by key (user_id, region, hash).
**Consistency models** — strong, eventual, causal.

### Message Queues
- **Use cases**: Decoupling services, async processing, event-driven architecture
- **Tools**: Kafka, RabbitMQ, AWS SQS/SNS, Redis Streams
- **Patterns**: Pub/sub, work queues, event sourcing

### Monitoring and Observability
- **Metrics**: Latency (p50, p95, p99), error rate, throughput, saturation
- **Logging**: Structured logs, centralized aggregation
- **Tracing**: Distributed tracing (Jaeger, Zipkin) for microservices
- **Alerting**: PagerDuty, Grafana alerts

---

## Real-World Design Examples

### Example 1: Design YouTube

**Requirements:**
- Upload, watch, search videos
- 2B users, 500 hours uploaded per minute
- Low latency playback globally

**Key decisions:**
1. **Storage**: Files stored in blob storage (S3/Google Cloud Storage), metadata in SQL (user info, comments)
2. **CDN**: Videos served from edge locations nearest to users
3. **Transcoding**: Async pipeline using message queues — upload triggers transcoding job (360p, 720p, 1080p, 4K)
4. **Preprocessing**: Adaptive bitrate streaming (HLS/DASH) — client picks quality based on bandwidth
5. **Caching**: Popular videos cached at CDN edge; long-tail served from origin

**Deep dive — upload flow:**
Client → Load balancer → Upload service → Message queue → Transcoding workers → CDN

**Deep dive — watch flow:**
Client → CDN (cache hit) OR Client → Load balancer → Watch service → Stream from storage

### Example 2: Design Twitter

**Requirements:**
- Post tweets, follow users, timeline (home + user)
- 500M users, 500M tweets/day
- Timeline must load < 500ms

**Key approach — fanout on write vs fanout on read:**

| Pattern | Write | Read | Best for |
|---------|-------|------|----------|
| Fanout on write | Pre-compute timeline on tweet | O(1) read | Celebrities (many followers) |
| Fanout on read | O(1) write | Compute on request | Regular users (few followers) |

**Hybrid approach:**
- Celebrities (100k+ followers): **Fanout on read** — don't pre-populate
- Regular users: **Fanout on write** — pre-populate timeline cache

**Data model:**
\`\`\`
User: user_id, name, followers_count
Tweet: tweet_id, user_id, content, timestamp
Timeline: user_id, list of tweet_ids (sorted by time)
Follow: follower_id, followee_id
\`\`\`

### Example 3: Design a URL Shortener (bit.ly)

**Requirements:**
- Shorten long URLs to short codes (7 chars)
- Redirect to original URL
- Analytics: click count, referrer, location
- 100M URLs/month

**Hash generation:**
- **Base62 encoding**: 62^7 = 3.5T unique URLs — enough
- **Approach**: Take MD5/SHA hash, encode first 7 chars in Base62
- **Collision handling**: Check database; if collision, extend and retry

**Database:**
- Primary: key-value (Redis) for hot URLs
- Secondary: SQL (PostgreSQL) for persistence + analytics
- Shard by hash of short code

**Redirection flow:**
1. User clicks short link → DNS → Load balancer → Redirect service
2. Check Redis cache → if miss, query DB
3. Return 301 (permanent) or 302 (temporary) redirect
4. Log analytics async via Kafka → Analytics worker → Clickhouse

---

## Common Pitfalls

1. **Jumping into details too fast** — start with the high-level design
2. **Not discussing trade-offs** — every decision has trade-offs; show you understand them
3. **Ignoring bottlenecks** — identify and address single points of failure
4. **Forgetting non-functional requirements** — availability, latency, durability
5. **Not estimating scale** — use back-of-envelope calculations (QPS, storage, bandwidth)

---

## Practice System Design with AI

Want to practice these exact scenarios with a live AI interviewer? [Try AI Interview Trainer](https://t.me/developing_interview_trainer_bot):

- Practice System Design, Technical, and Behavioral interviews
- Get scored with detailed feedback
- Upload your resume for personalized questions
- Choose your experience level: Junior, Mid, or Senior
- Available in English and Russian

[Start practicing now →](https://t.me/developing_interview_trainer_bot)
`,
  },
  {
    slug: 'star-method-behavioral-interview-guide',
    title: 'STAR Method Interview: How to Answer Behavioral Questions',
    description:
      'Learn the STAR method (Situation, Task, Action, Result) to ace behavioral interviews. Includes examples for leadership, conflict resolution, failure stories, and practice templates.',
    date: '2026-06-07',
    readTime: '10 min read',
    category: 'Behavioral',
    tags: ['STAR Method', 'Behavioral Interview', 'Soft Skills', 'Career'],
    author: 'AI Interview Trainer Team',
    published: true,
    content: `
Behavioral questions are increasingly important in 2026 — companies want to know not just what you can do technically, but how you handle real situations. The STAR method is the most effective framework for structuring your answers.

---

## What is the STAR Method?

STAR stands for:

- **S**ituation — Set the context. Where were you? What was going on?
- **T**ask — What was your specific responsibility or goal?
- **A**ction — What concrete steps did you take? (This is the most important part)
- **R**esult — What happened? Use metrics whenever possible.

### Why STAR Works

The STAR method forces you to tell a complete story. Interviewers are evaluating:
1. **Can you handle the situation?** (competence)
2. **How do you think?** (analytical skills)
3. **How do you collaborate?** (teamwork)
4. **Do you take ownership?** (leadership potential)

---

## Common Behavioral Questions

### 1. "Tell me about a time you faced a conflict at work."

**Weak answer:** "I had a disagreement with a teammate but we resolved it."

**STAR answer:**
> **Situation:** At my previous company, our engineering team was split between building a new feature (my team) and fixing critical tech debt (another team). Both projects had the same deadline.
>
> **Task:** As the lead engineer, I needed to ensure both deliverables were met without burning out the team.
>
> **Action:** I proposed a compromise: we'd allocate 3 days to the feature and 2 days to tech debt each sprint. I organized a cross-team meeting where each side presented their priorities with data. We agreed on an MVP scope for the feature and a must-fix list for tech debt. I also introduced a shared Jira board so both teams could see dependencies.
>
> **Result:** Both deliverables shipped on time. The feature launched with 95% of planned functionality, and the critical tech debt was reduced by 60%. The two teams started doing joint sprint planning, which reduced similar conflicts by 80%. My manager later cited this as a model for cross-team collaboration.

### 2. "Describe a time you failed."

**STAR answer:**
> **Situation:** I was responsible for migrating our monolithic application to microservices over 6 months. I underestimated the complexity of data consistency across services.
>
> **Task:** Deliver the first three microservices by the deadline.
>
> **Action:** After the first service caused data inconsistencies in production, I stopped, gathered the team, and did a root cause analysis. I identified that we lacked a proper event-sourcing pattern. I restructured the approach: introduced Kafka for event streaming, added a saga pattern for distributed transactions, and wrote comprehensive integration tests.
>
> **Result:** The migration was delayed by 3 weeks, but the new architecture handled 10x the traffic without data issues. I documented the lessons learned in a post-mortem that became our team's standard for future migrations. Most importantly, I learned to validate distributed system assumptions early with prototypes.

### 3. "Tell me about a time you showed leadership."

> **Situation:** During a critical production outage affecting payments, our on-call engineer was overwhelmed.
>
> **Task:** Coordinate the response while calming the team and maintaining communication with stakeholders.
>
> **Action:** I immediately created a war room channel, assigned clear roles: two engineers on root cause, one on mitigation, and myself on communication. I sent status updates every 15 minutes to the VP of Engineering while keeping the team focused. I also set up a secondary environment to test the fix before applying it to production.
>
> **Result:** Outage resolved in 47 minutes (compared to average 2+ hours). The incident was written up as a runbook, and we reduced future payment outages by 90% with automated monitoring.

---

## STAR Method Template

Use this structure to prepare your own stories:

### Situation (25-30 seconds)
- When and where did this happen?
- What project or context?
- Who was involved?
- **Keep it concise** — just enough to set the stage.

### Task (10-15 seconds)
- What was your specific role?
- What goal were you working toward?
- What was at stake?

### Action (45-60 seconds) — **This is your main content**
- What specific steps did YOU take? (use "I" not "we")
- How did you decide what to do?
- What skills or knowledge did you apply?
- Show your thought process and decision-making.

### Result (20-30 seconds)
- What happened? Be specific.
- Use numbers: percentages, time saved, revenue impact
- What did you learn?
- How did it affect your team or company?

**Total: ~2 minutes per story**

---

## Building Your STAR Story Bank

Prepare 5-7 stories that cover:

| Category | Example Question |
|----------|-----------------|
| Leadership | Tell me about a time you led a project |
| Conflict | How did you resolve a disagreement? |
| Failure | Tell me about a mistake |
| Success | Your biggest achievement |
| Teamwork | A time you helped a teammate |
| Innovation | When you improved a process |
| Challenge | The hardest technical problem you solved |

---

## Behavioral Interview Mistakes to Avoid

1. **Too vague** — "It went well" is not a result. Use metrics.
2. **Not taking ownership** — Always use "I" for actions.
3. **Too long** — Practice to stay under 2 minutes.
4. **Wrong STAR balance** — Action should be 50%+ of your answer.
5. **Rambling** — Practice aloud. Record yourself.
6. **No lesson learned** — Always reflect on what the experience taught you.

---

## Practice Behavioral Interviews with AI

The STAR method takes practice — especially under pressure. Use [AI Interview Trainer](https://t.me/developing_interview_trainer_bot) to:

- Practice behavioral questions with AI scoring
- Get detailed STAR breakdown: feedback on each component (S/T/A/R)
- Receive tailored improvement suggestions
- Practice in English or Russian
- Track your progress over time

[Start free practice →](https://t.me/developing_interview_trainer_bot)
`,
  },
  {
    slug: 'frontend-vs-backend-interview-prep',
    title: 'Frontend vs Backend Interviews: Key Differences and Prep Tips',
    description:
      'Understand the differences between frontend and backend technical interviews. Learn what topics each covers, how to prepare, and where to focus your study time for maximum impact.',
    date: '2026-06-06',
    readTime: '8 min read',
    category: 'Career',
    tags: ['Frontend', 'Backend', 'Career Advice', 'Interview Prep'],
    author: 'AI Interview Trainer Team',
    published: true,
    content: `
One of the most common questions developers ask is: "Should I focus on frontend or backend?" The answer depends on your goals, but the interview process differs significantly between the two tracks.

This guide breaks down exactly what each type of interview covers, how to prepare, and where to focus.

---

## Frontend Interview Focus

### Core Topics

**1. JavaScript Fundamentals (30% of questions)**
- Closures, promises, async/await
- Prototypal inheritance, \`this\` binding
- Event loop, microtasks vs macrotasks
- Array methods (map, filter, reduce, flatMap)
- ES6+ features (destructuring, optional chaining, nullish coalescing)

**2. Framework Expertise (25%)**
- React: hooks, reconciliation, context, performance
- React 19+: Actions, \`useOptimistic\`, \`useActionState\`
- State management: Zustand, Jotai, Redux
- SSR/SSG/ISR in Next.js
- Vue, Angular, or Svelte depending on the role

**3. CSS & UI (15%)**
- Flexbox, Grid, responsive design
- CSS custom properties, container queries
- CSS-in-JS vs utility frameworks (Tailwind)
- Animations and transitions
- Accessibility (ARIA, screen readers, keyboard navigation)

**4. Web Performance (15%)**
- Core Web Vitals (LCP, FID, CLS)
- Bundle optimization, tree shaking, code splitting
- Lazy loading, image optimization
- Network performance (HTTP/2, HTTP/3, caching)
- Rendering patterns (CSR, SSR, SSG, ISR, RSC)

**5. Browser APIs (10%)**
- DOM manipulation, event delegation
- Web Workers, Service Workers, PWA
- Canvas, WebGL, WebSockets
- Storage APIs (localStorage, IndexedDB, Cache API)
- WebSockets, Server-Sent Events

**6. Build Tools & DevOps (5%)**
- Vite vs Webpack
- ESLint, Prettier, TypeScript
- CI/CD for frontend
- Testing (Vitest, Playwright, Testing Library)

### Common Frontend Coding Problems

\`\`\`javascript
// Implement a debounce function
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Implement a deep clone
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}
\`\`\`

---

## Backend Interview Focus

### Core Topics

**1. Language & Runtime (25%)**
- **Node.js**: event loop, streams, buffers, \`process.nextTick\`
- **Python**: GIL, decorators, generators, async/await
- **Java**: JVM, garbage collection, multithreading
- **Go**: goroutines, channels, interfaces
- **General**: memory management, concurrency, error handling

**2. Databases & Data Modeling (20%)**
- SQL: joins, indexing, query optimization, transactions
- NoSQL: document stores (MongoDB), key-value (Redis), columnar (Cassandra)
- ORM vs raw SQL
- Migrations and schema design
- ACID vs BASE

**3. API Design (15%)**
- RESTful API design principles
- GraphQL (queries, mutations, subscriptions, resolvers)
- gRPC (protocol buffers, streaming)
- Authentication (JWT, OAuth 2.0, session-based)
- Rate limiting, versioning, pagination

**4. System Design (20%)**
- Microservices vs monolith
- Load balancing, caching, CDN
- Message queues (Kafka, RabbitMQ)
- Distributed systems (consensus, CAP theorem)
- Observability (logging, metrics, tracing)

**5. Security (10%)**
- OWASP Top 10
- SQL injection, XSS, CSRF prevention
- Authentication and authorization
- Encryption at rest and in transit
- Secrets management

**6. DevOps & Deployment (10%)**
- Docker, Kubernetes, CI/CD
- Cloud services (AWS, GCP, Azure)
- Infrastructure as Code (Terraform)
- Monitoring and alerting

### Common Backend Coding Problems

\`\`\`python
# Rate limiter (sliding window)
from collections import deque
import time

class SlidingWindowRateLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = deque()

    def allow(self) -> bool:
        now = time.time()
        # Remove expired timestamps
        while self.requests and self.requests[0] < now - self.window:
            self.requests.popleft()
        if len(self.requests) >= self.max_requests:
            return False
        self.requests.append(now)
        return True

# LRU Cache
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
\`\`\`

---

## Fullstack Interview — Hybrid Focus

Fullstack interviews test both areas, but the depth is shallower. Expect:

- **Coding**: DS&A problems (LeetCode medium)
- **Frontend**: JS fundamentals + one framework
- **Backend**: API design + database basics
- **System Design**: Simple high-level design
- **Behavioral**: Standard STAR questions

---

## Preparation Strategy

### 6-Week Prep Plan

| Week | Focus | Hours/Day |
|------|-------|-----------|
| 1 | DS&A fundamentals (arrays, strings, hashing) | 2-3 |
| 2 | Trees, graphs, dynamic programming | 2-3 |
| 3 | Specialized knowledge (React/SQL per your track) | 2-3 |
| 4 | System design + behavioral stories | 2-3 |
| 5 | Mock interviews (3-5 per week) | 3-4 |
| 6 | Target company research + review weak spots | 2-3 |

### Resources

- **LeetCode** — 150 problems (blind 75 + your track-specific)
- **System Design Interview** by Alex Xu
- **Cracking the Coding Interview** by Gayle Laakmann McDowell
- **AI Interview Trainer** — for personalized mock interviews

---

## Track-Specific Tips

**For Frontend Developers:**
- Master the event loop — it's almost always asked
- Build a small project from scratch (no framework) to prove fundamentals
- Know browser rendering pipeline (DOM → CSSOM → Render Tree → Layout → Paint)
- Practice CSS layout challenges (flexbox, grid, responsive)

**For Backend Developers:**
- Be ready to design a database schema on a whiteboard
- Know the CAP theorem and when to choose consistency vs availability
- Practice building a REST API from scratch
- Understand how databases work under the hood (B-trees, indexes, query planning)

**For Fullstack Developers:**
- Expect the "build a feature" challenge — full CRUD with UI
- Lean toward deeper backend knowledge (harder to learn on the job)
- System design expectations are typically lower than pure backend roles

---

## Practice with AI Mock Interviews

The best preparation is realistic practice. [AI Interview Trainer](https://t.me/developing_interview_trainer_bot) offers:

- Role-specific practice (Frontend, Backend, Fullstack, System Design)
- Technical AND Behavioral modes
- Instant scoring with detailed feedback
- Voice answer support
- Company-specific interview prep (Google, Amazon, Meta, etc.)
- Progress tracking across sessions

[Start free practice →](https://t.me/developing_interview_trainer_bot)
`,
  },
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.published);
}

export function getCategories(): string[] {
  const cats = new Set(blogPosts.filter((p) => p.published).map((p) => p.category));
  return Array.from(cats).sort();
}
