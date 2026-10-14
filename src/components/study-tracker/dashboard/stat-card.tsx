import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  variant?: "neutral" | "green" | "orange";
}

const iconStyles = {
  neutral: "bg-muted text-foreground/80",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "neutral",
}: StatCardProps) {
  return (
    <div className="flex items-center gap-3.5 px-5 py-4">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconStyles[variant]}`}>
        <Icon className="size-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-muted-foreground">{title}</p>
        <p className="text-xl font-bold leading-tight tabular-nums">{value}</p>
        <p className="truncate text-[11px] text-muted-foreground/80">{description}</p>
      </div>
    </div>
  );
}
