"use client";

import type { ActivityHistoryResponse, DayActivity } from "@/src/actions/activity.action";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";
import { Flame, Trophy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const formatDay = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

interface StreakSectionProps {
  activity: ActivityHistoryResponse;
}

export default function StreakSection({ activity }: StreakSectionProps) {
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);

  // Group days into columns of 7 (Sunday to Saturday)
  const columns: DayActivity[][] = [];
  let currentColumn: DayActivity[] = [];

  // Align first day of history with day of week padding if needed
  const firstDay = activity.days[0];
  if (firstDay) {
    const padCount = firstDay.dayOfWeek; // 0=Sun, 1=Mon...
    for (let i = 0; i < padCount; i++) {
      currentColumn.push({
        date: "",
        dayOfWeek: i,
        revisions: 0,
        studies: 0,
        isPerfectDay: false,
      });
    }
  }

  activity.days.forEach((day) => {
    currentColumn.push(day);
    if (currentColumn.length === 7) {
      columns.push(currentColumn);
      currentColumn = [];
    }
  });

  if (currentColumn.length > 0) {
    while (currentColumn.length < 7) {
      currentColumn.push({
        date: "",
        dayOfWeek: currentColumn.length,
        revisions: 0,
        studies: 0,
        isPerfectDay: false,
      });
    }
    columns.push(currentColumn);
  }

  // Determine cell color strictly following user requirements
  const getCellColor = (day: DayActivity) => {
    if (!day.date) return "opacity-0 pointer-events-none";

    // Rule 1: Daily revision goal met -> ORANGE
    if (day.isPerfectDay) {
      return "bg-orange-500 hover:ring-2 hover:ring-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.5)]";
    }

    // Rule 2: Revisions partially completed -> GREEN faded according to progress toward the goal
    if (day.revisions > 0) {
      const progress = day.revisions / DAILY_REVISION_GOAL;
      if (progress >= 0.75) return "bg-emerald-500/85 hover:ring-2 hover:ring-emerald-400";
      if (progress >= 0.5) return "bg-emerald-500/65 hover:ring-2 hover:ring-emerald-400";
      if (progress >= 0.3) return "bg-emerald-500/45 hover:ring-2 hover:ring-emerald-400";
      return "bg-emerald-500/25 hover:ring-2 hover:ring-emerald-400";
    }

    // Rule 3: 0 revisions, but studies completed -> GREEN faded according to studies
    if (day.studies > 0) {
      if (day.studies >= 3) return "bg-emerald-500/60 hover:ring-2 hover:ring-emerald-400";
      if (day.studies === 2) return "bg-emerald-500/40 hover:ring-2 hover:ring-emerald-400";
      return "bg-emerald-500/20 hover:ring-2 hover:ring-emerald-400";
    }

    // Inactive day -> Neutral dark/light square
    return "bg-muted/40 dark:bg-zinc-800/60 border border-border/40 hover:border-zinc-500";
  };

  const isTodayComplete = activity.todayRevisions >= DAILY_REVISION_GOAL;
  const remainingToday = Math.max(DAILY_REVISION_GOAL - activity.todayRevisions, 0);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-xl shadow-xs space-y-6">
      {/* Header with Streaks */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Flame className="size-4" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Revision & Study Streak
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            LeetCode-style daily consistency. Complete all {DAILY_REVISION_GOAL} revisions in a day to ignite the orange flame.
          </p>
        </div>

        {/* Streak Metrics Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Current Streak */}
          <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
            <Flame className="size-3.5 fill-orange-500 text-orange-500" />
            <span>{activity.currentStreak} Day Streak</span>
          </div>

          {/* Max Streak */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <Trophy className="size-3.5 text-foreground/80" />
            <span>Best: {activity.maxStreak}d</span>
          </div>

          {/* Days the revision goal was met */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>{activity.perfectDaysCount} Full Days</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid & Legend */}
      <div className="space-y-3">
        {/* Scrollable Grid Container */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex gap-1.5 p-1">
            {columns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {column.map((day, rowIdx) => (
                  <div
                    key={`${colIdx}-${rowIdx}`}
                    role={day.date ? "button" : undefined}
                    tabIndex={day.date ? 0 : -1}
                    aria-hidden={!day.date}
                    aria-label={
                      day.date
                        ? `${formatDay(day.date)}: ${day.revisions} revisions, ${day.studies} studies`
                        : undefined
                    }
                    onMouseEnter={() => day.date && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    onFocus={() => day.date && setHoveredDay(day)}
                    onBlur={() => setHoveredDay(null)}
                    onClick={() => day.date && setHoveredDay(day)}
                    className={`size-3.5 sm:size-4 rounded-xs cursor-pointer transition-transform duration-150 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${getCellColor(
                      day
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Tooltip Bar & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/50 text-xs text-muted-foreground">
          {/* Hover Details Preview */}
          <div className="min-h-5 flex items-center gap-2">
            {hoveredDay ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {formatDay(hoveredDay.date)}:
                </span>
                <span
                  className={
                    hoveredDay.isPerfectDay
                      ? "text-orange-500 font-bold"
                      : "text-foreground font-medium"
                  }
                >
                  {hoveredDay.revisions}/{DAILY_REVISION_GOAL} Revisions
                </span>
                <span>•</span>
                <span className="text-emerald-500 font-medium">
                  {hoveredDay.studies} Studies Logged
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground/70">
                Hover or tap any day to see details
              </span>
            )}
          </div>

          {/* Visual Legend strictly following the 3-color palette */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <span className="size-3 rounded-xs bg-muted/40 dark:bg-zinc-800/60 border border-border/40" title="No activity" />
            <span className="size-3 rounded-xs bg-emerald-500/25" title="Light activity" />
            <span className="size-3 rounded-xs bg-emerald-500/45" title="Some revisions" />
            <span className="size-3 rounded-xs bg-emerald-500/65" title="Most revisions" />
            <span className="size-3 rounded-xs bg-emerald-500/85" title="Almost at goal" />
            <span className="size-3 rounded-xs bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]" title={`All ${DAILY_REVISION_GOAL} revisions completed (Goal met)`} />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Today's Target Status Bar */}
      <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex size-7 items-center justify-center rounded-lg ${
              isTodayComplete
                ? "bg-orange-500 text-white"
                : "bg-emerald-500/10 text-emerald-500"
            }`}
          >
            <Flame className="size-4" />
          </div>

          <div>
            <span className="text-xs font-semibold text-foreground">
              Today&apos;s Revision Goal: {activity.todayRevisions} / {DAILY_REVISION_GOAL} completed
            </span>
            <p className="text-[11px] text-muted-foreground">
              {isTodayComplete
                ? "🔥 Daily goal achieved! Today's square is unlocked as orange."
                : `Complete ${remainingToday} more revision${remainingToday > 1 ? "s" : ""} to unlock today's orange flame.`}
            </p>
          </div>
        </div>

        {/* Mini Goal Progress Bar */}
        <div className="w-full sm:w-36 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isTodayComplete ? "bg-orange-500" : "bg-emerald-500"
            }`}
            style={{ width: `${Math.min((activity.todayRevisions / DAILY_REVISION_GOAL) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
