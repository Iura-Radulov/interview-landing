export interface TariffPlan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  features: string[];
  features_ru: string[] | null;
  max_interviews_per_day: number;
  is_active: boolean;
}

export interface InterviewSession {
  id: number;
  user_id: number;
  role: string;
  experience_level: string;
  started_at: string;
  completed: boolean;
  total_score?: number;
  completed_at?: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  tariff_plan_id: number;
  status: string;
  start_date: string;
  end_date: string;
  plan_name: string;
  features: string[];
  features_ru: string[] | null;
  payment_type: string | null;
}

export interface UserStats {
  totalInterviews: number;
  avgScore: number | null;
  sessionsThisWeek: number;
  currentPlan: { name: string; features: string[] } | null;
  recentSessions: InterviewSession[];
}

export interface User {
  id: number;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  email: string | null;
  role: string;
}
