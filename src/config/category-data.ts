import {
  CalendarCheck,
  Crown,
  Layers,
  Skull,
  Sparkles,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface CategoryConfig {
  slug: string;
  name: string; // page title
  tab: string; // short label for the category tabs
  desc: string;
  scoreLabel: string;
  icon: LucideIcon;
}

export const categories: CategoryConfig[] = [
  {
    slug: "total",
    name: "Overall",
    tab: "Overall",
    desc: "Total problems solved across Easy, Medium and Hard.",
    scoreLabel: "Solved",
    icon: Crown,
  },
  {
    slug: "rating",
    name: "Contest rating",
    tab: "Contest",
    desc: "Current LeetCode contest rating.",
    scoreLabel: "Rating",
    icon: Trophy,
  },
  {
    slug: "daily",
    name: "Today",
    tab: "Today",
    desc: "Submissions made today (UTC day).",
    scoreLabel: "Today",
    icon: CalendarCheck,
  },
  {
    slug: "weekly",
    name: "This week",
    tab: "This week",
    desc: "Average problems solved per day over the last 7 days, overall and per difficulty. Updated nightly at 11:50 PM IST.",
    scoreLabel: "Per day",
    icon: TrendingUp,
  },
  {
    slug: "easy",
    name: "Easy problems",
    tab: "Easy",
    desc: "Easy problems solved: fundamentals and speed.",
    scoreLabel: "Easy",
    icon: Sparkles,
  },
  {
    slug: "medium",
    name: "Medium problems",
    tab: "Medium",
    desc: "Medium problems solved: the interview staples.",
    scoreLabel: "Medium",
    icon: Layers,
  },
  {
    slug: "hard",
    name: "Hard problems",
    tab: "Hard",
    desc: "Hard problems solved: advanced data structures and optimisation.",
    scoreLabel: "Hard",
    icon: Skull,
  },
];

// "contest" is an older alias for the rating board
export function findCategory(slug: string) {
  const normalized = slug === "contest" ? "rating" : slug;
  return categories.find((c) => c.slug === normalized);
}
