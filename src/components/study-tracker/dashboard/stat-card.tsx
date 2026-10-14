import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  variant?: "blue" | "emerald" | "purple" | "amber" | "rose";
}

const variantStyles = {
  blue: {
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white",
    border: "border-blue-200/60 dark:border-blue-900/40 hover:border-blue-400/60",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)]",
    valueColor: "text-foreground",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
    border: "border-emerald-200/60 dark:border-emerald-900/40 hover:border-emerald-400/60",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    valueColor: "text-foreground",
  },
  purple: {
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white",
    border: "border-violet-200/60 dark:border-violet-900/40 hover:border-violet-400/60",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]",
    valueColor: "text-foreground",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white",
    border: "border-amber-200/60 dark:border-amber-900/40 hover:border-amber-400/60",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]",
    valueColor: "text-foreground",
  },
  rose: {
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white",
    border: "border-rose-200/60 dark:border-rose-900/40 hover:border-rose-400/60",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]",
    valueColor: "text-foreground",
  },
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "blue",
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${styles.border} bg-card/70 p-5 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${styles.glow}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>

          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${styles.valueColor}`}>
            {value}
          </h3>

          <p className="text-xs text-muted-foreground/80">
            {description}
          </p>
        </div>

        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${styles.iconBg}`}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}