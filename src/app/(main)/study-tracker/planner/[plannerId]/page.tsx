import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import { isValidObjectId } from "mongoose";
import { ArrowLeft, CalendarDays, CheckCircle2, CircleDashed, ListChecks } from "lucide-react";

import {
  getPlannerByIdAction,
  getPlannerTasksAction,
} from "@/src/actions/planner.action";
import PlannerTaskItem from "@/src/components/study-tracker/planner/planner-task-item";
import ProgressRing from "@/src/components/study-tracker/progress-ring";
import { plannerRoute } from "@/lib/routes";
import { daysUntil } from "@/src/lib/date";
import { PlannerTaskStatus } from "@/src/types/planner";

interface PageProps {
  params: Promise<{
    plannerId: string;
  }>;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default async function PlannerPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { plannerId } = await params;

  if (!isValidObjectId(plannerId)) notFound();

  const planner = await getPlannerByIdAction(plannerId);
  if (!planner) notFound();

  const tasks = await getPlannerTasksAction(plannerId);

  const total = planner.totalTasks;
  const completed = planner.completedTasks;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isCompleted = progress === 100;
  const due = new Date(planner.dueDate);
  const daysLeft = daysUntil(due);
  const isOverdue = !isCompleted && daysLeft < 0;
  const nextTaskId = tasks.find((t) => t.status === PlannerTaskStatus.PENDING)?._id;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-16 text-foreground">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={plannerRoute}
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          All roadmaps
        </Link>

        {/* Overview */}
        <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs">
          <div className="grid md:grid-cols-[260px_1fr]">
            <div className="relative h-44 bg-muted md:h-full">
              <Image
                src={planner.imageUrl || "/planner.png"}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 260px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="space-y-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{planner.title}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {formatDate(new Date(planner.startDate))} → {formatDate(due)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : isOverdue
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          : "bg-muted text-foreground/80"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : isOverdue
                        ? `${-daysLeft}d overdue`
                        : daysLeft === 0
                          ? "Due today"
                          : `${daysLeft}d left`}
                  </span>
                </div>

                <dl className="flex gap-6 pt-1">
                  <Stat icon={<CheckCircle2 className="size-3.5 text-emerald-500" />} label="Done" value={completed} />
                  <Stat icon={<CircleDashed className="size-3.5 text-orange-500" />} label="Remaining" value={total - completed} />
                  <Stat icon={<ListChecks className="size-3.5 text-muted-foreground" />} label="Total" value={total} />
                </dl>
              </div>

              <ProgressRing
                value={progress}
                size={120}
                stroke={10}
                className={isOverdue ? "text-orange-500" : "text-emerald-500"}
              >
                <span className="text-2xl font-bold tabular-nums">{progress}%</span>
                <span className="text-[11px] text-muted-foreground">complete</span>
              </ProgressRing>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 sm:px-6">
            <h2 className="text-base font-semibold">Topics</h2>
            <span className="text-xs text-muted-foreground">
              {total - completed} remaining
            </span>
          </div>

          {tasks.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              This roadmap has no topics yet.
            </p>
          ) : (
            <ol className="divide-y divide-border/50">
              {tasks.map((task, index) => (
                <PlannerTaskItem
                  key={task._id}
                  index={index}
                  isNext={task._id === nextTaskId}
                  task={task}
                />
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="text-lg font-bold tabular-nums">{value}</dd>
    </div>
  );
}
