export type Topic =
  | "accounting"
  | "equity_ev"
  | "valuation"
  | "merger_models"
  | "lbo";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CardSource = "guide_extracted" | "ai_generated" | "seed";

export interface Card {
  id: number;
  topic: Topic;
  question: string;
  answer: string;
  difficulty: Difficulty;
  source: CardSource;
  created_at: number;
}

export interface CardResult {
  cardId: number;
  correct: boolean;
  timestamp: number;
}

export interface UserProgress {
  results: CardResult[];
  starred: number[];
}

export interface SessionConfig {
  topics: Topic[];
  difficulty?: Difficulty | "all";
  shuffle: boolean;
}

export interface TopicStats {
  topic: Topic;
  totalCards: number;
  sessionCorrect: number;
  sessionTotal: number;
  cumulativeCorrect: number;
  cumulativeTotal: number;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  accounting: "Accounting",
  equity_ev: "Equity / EV",
  valuation: "Valuation",
  merger_models: "Merger Models",
  lbo: "LBO",
};

export const TOPIC_COLORS: Record<Topic, string> = {
  accounting: "blue",
  equity_ev: "purple",
  valuation: "orange",
  merger_models: "emerald",
  lbo: "rose",
};

export const TOPIC_GRADIENTS: Record<Topic, string> = {
  accounting: "from-blue-600 to-blue-800",
  equity_ev: "from-purple-600 to-purple-800",
  valuation: "from-orange-500 to-orange-700",
  merger_models: "from-emerald-600 to-emerald-800",
  lbo: "from-rose-600 to-rose-800",
};

export const TOPIC_BG: Record<Topic, string> = {
  accounting: "bg-blue-600",
  equity_ev: "bg-purple-600",
  valuation: "bg-orange-500",
  merger_models: "bg-emerald-600",
  lbo: "bg-rose-600",
};

export const TOPIC_ICONS: Record<Topic, string> = {
  accounting: "📊",
  equity_ev: "💹",
  valuation: "⚖️",
  merger_models: "🤝",
  lbo: "🏦",
};

export const ALL_TOPICS: Topic[] = [
  "accounting",
  "equity_ev",
  "valuation",
  "merger_models",
  "lbo",
];
