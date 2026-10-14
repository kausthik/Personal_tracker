import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  variant?: "neutral" | "green" | "orange";
}

const variantStyles = {
  neutral: {
    iconBg: "bg-muted/70 text-foreground group-hover:bg-foreground group-hover:text-background",
    border: "border-border/80 hover:border-zinc-400 dark:hover:border-zinc-600",
    glow: "group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)]",
    valueColor: "text-foreground",
  },
  green: {
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    valueColor: "text-foreground",
  },
  orange: {
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white",
    border: "border-orange-500/20 hover:border-orange-500/50",
    glow: "group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.25)]",
    valueColor: "text-foreground",
  },
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "neutral",
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