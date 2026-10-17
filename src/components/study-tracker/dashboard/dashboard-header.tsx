import Link from "next/link";
import { RegisterStudiedTopic } from "./study/add-topic-dialog";
import { ArrowLeft, BookOpen, Compass, Flame } from "lucide-react";
import { plannerRoute } from "@/lib/routes";
import type { ActivityHistoryResponse, Streak } from "@/src/actions/activity.action";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";
import ProgressRing from "../progress-ring";
import ProfileLink from "@/src/components/profile/profile-link";

interface DashboardHeaderProps {
  name?: string | null;
  activity: ActivityHistoryResponse;
}

export default function DashboardHeader({ name, activity }: DashboardHeaderProps) {
  const done = activity.todayRevisions;
  const remaining = Math.max(DAILY_REVISION_GOAL - done, 0);
  const goalMet = remaining === 0;
  const firstName = name?.split(" ")[0];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs">
      {/* Brand accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="group flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Home
              </Link>
              <ProfileLink name={name} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Today
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              {goalMet ? (
                <>
                  Daily revision goal complete.{" "}
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    Today&apos;s square is lit.
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {remaining} revision{remaining === 1 ? "" : "s"}
                  </span>{" "}
                  left to hit today&apos;s goal
                  {activity.todayStudies > 0 &&
                    ` · ${activity.todayStudies} topic${activity.todayStudies === 1 ? "" : "s"} studied`}
                  .
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <RegisterStudiedTopic />
            <Link
              href={plannerRoute}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border/80 px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Compass className="size-4 text-emerald-500" />
              Study planners
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <ProgressRing
            value={(done / DAILY_REVISION_GOAL) * 100}
            size={128}
            stroke={11}
            className={goalMet ? "text-orange-500" : "text-emerald-500"}
          >
            <span className="text-3xl font-bold tabular-nums">
              {done}
              <span className="text-base font-medium text-muted-foreground">/{DAILY_REVISION_GOAL}</span>
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">revisions</span>
          </ProgressRing>

          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-1">
            <StreakTile
              label="Revision streak"
              streak={activity.revisionStreak}
              icon={<Flame className="size-4 fill-orange-500 text-orange-500" />}
              iconBg="bg-orange-500/10"
            />
            <StreakTile
              label="Study streak"
              streak={activity.studyStreak}
              icon={<BookOpen className="size-4 text-emerald-500" />}
              iconBg="bg-emerald-500/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StreakTile({
  label,
  streak,
  icon,
  iconBg,
}: {
  label: string;
  streak: Streak;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 px-4 py-3 sm:min-w-52">
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-bold leading-tight tabular-nums">
          {streak.current} day{streak.current === 1 ? "" : "s"}
        </p>
        <p className="text-[11px] text-muted-foreground">Best {streak.best}</p>
      </div>
    </div>
  );
}
