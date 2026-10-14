export interface CategoryConfig {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  color: string;
  badge: string;
  pillText: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconBg: string;
  accentBg: string;
  metricLabel: string;
}

export const categories: CategoryConfig[] = [
  {
    name: "Overall Ranking",
    slug: "total",
    icon: "🔥",
    desc: "Cumulative solved questions across Easy, Medium, and Hard tiers.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Grand Leaderboard",
    pillText: "All-Time Solves",
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent dark:from-blue-950/40 dark:via-cyan-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(14,165,233,0.25)]",
    borderColor: "border-sky-200/80 dark:border-sky-800/40 hover:border-sky-500/60",
    textColor: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-sky-50 dark:bg-sky-950/60",
    badgeBorder: "border-sky-200 dark:border-sky-800",
    badgeText: "text-sky-700 dark:text-sky-300",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white",
    accentBg: "from-blue-600 to-cyan-500",
    metricLabel: "Total problems solved",
  },
  {
    name: "Contest Rating",
    slug: "rating",
    icon: "🏆",
    desc: "Live competitive ratings, contest percentile tiers, and rank standings.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Competitive Elo",
    pillText: "Contest Rating",
    gradient: "from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-950/40 dark:via-purple-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.25)]",
    borderColor: "border-indigo-200/80 dark:border-indigo-800/40 hover:border-indigo-500/60",
    textColor: "text-indigo-700 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60",
    badgeBorder: "border-indigo-200 dark:border-indigo-800",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
    accentBg: "from-indigo-600 to-violet-600",
    metricLabel: "Peak competition rating",
  },
  {
    name: "Today's Problem",
    slug: "daily",
    icon: "📅",
    desc: "Consistency tracker for daily challenges and uninterrupted habit streaks.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Daily Streak",
    pillText: "Consistency",
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/40 dark:via-amber-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(249,115,22,0.25)]",
    borderColor: "border-orange-200/80 dark:border-orange-800/40 hover:border-orange-500/60",
    textColor: "text-orange-700 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60",
    badgeBorder: "border-orange-200 dark:border-orange-800",
    badgeText: "text-orange-700 dark:text-orange-300",
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white",
    accentBg: "from-orange-500 to-amber-500",
    metricLabel: "Daily challenges cleared",
  },
  {
    name: "Easy Problems",
    slug: "easy",
    icon: "🟢",
    desc: "Fundamental algorithmic problems, speed coding, and syntax mastery.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Level 1 • Basics",
    pillText: "Speed Solves",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)]",
    borderColor: "border-emerald-200/80 dark:border-emerald-800/40 hover:border-emerald-500/60",
    textColor: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
    accentBg: "from-emerald-600 to-teal-500",
    metricLabel: "Foundation problems",
  },
  {
    name: "Medium Problems",
    slug: "medium",
    icon: "🟡",
    desc: "Interview staples: graphs, binary trees, dynamic programming & two pointers.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Level 2 • Core",
    pillText: "Tech Interviews",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/40 dark:via-amber-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.25)]",
    borderColor: "border-amber-200/80 dark:border-amber-800/40 hover:border-amber-500/60",
    textColor: "text-amber-700 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    badgeText: "text-amber-700 dark:text-amber-300",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white",
    accentBg: "from-amber-600 to-orange-500",
    metricLabel: "Interview standard",
  },
  {
    name: "Hard Problems",
    slug: "hard",
    icon: "🔴",
    desc: "Advanced data structures, complex optimization, and extreme challenges.",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
    badge: "Level 3 • Elite",
    pillText: "Competitive Edge",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent dark:from-rose-950/40 dark:via-rose-900/10 dark:to-transparent",
    glowColor: "group-hover:shadow-[0_0_35px_-5px_rgba(244,63,94,0.25)]",
    borderColor: "border-rose-200/80 dark:border-rose-800/40 hover:border-rose-500/60",
    textColor: "text-rose-700 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60",
    badgeBorder: "border-rose-200 dark:border-rose-800",
    badgeText: "text-rose-700 dark:text-rose-300",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white",
    accentBg: "from-rose-600 to-red-600",
    metricLabel: "Elite tier challenges",
  },
];
