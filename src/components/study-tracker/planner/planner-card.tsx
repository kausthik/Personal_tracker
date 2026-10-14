import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { plannerRoute } from "@/lib/routes";
import { daysUntil } from "@/src/lib/date";

interface PlannerCardProps {
  id: string;
  title: string;
  image: string;
  completed: number;
  total: number;
  dueDate: string; // ISO string
}

export default function PlannerCard({
  id,
  title,
  image,
  completed,
  total,
  dueDate,
}: PlannerCardProps) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isCompleted = progress === 100;
  const due = new Date(dueDate);
  const daysLeft = daysUntil(due);
  const isOverdue = !isCompleted && daysLeft < 0;

  const dueLabel = isCompleted
    ? "Completed"
    : isOverdue
      ? `${-daysLeft}d overdue`
      : daysLeft === 0
        ? "Due today"
        : `${daysLeft}d left`;

  return (
    <Link
      href={`${plannerRoute}/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
    >
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />

        {isCompleted && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            <CheckCircle2 className="size-3" />
            Done
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold">{title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            <span>
              {due.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span
              className={
                isOverdue
                  ? "font-medium text-orange-600 dark:text-orange-400"
                  : isCompleted
                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                    : ""
              }
            >
              {dueLabel}
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">
              {completed} of {total} topics
            </span>
            <span className="font-semibold tabular-nums">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${isOverdue ? "bg-orange-500" : "bg-emerald-500"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
