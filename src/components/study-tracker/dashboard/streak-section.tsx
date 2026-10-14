"use client";

import type { ActivityHistoryResponse, DayActivity } from "@/src/actions/activity.action";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";
import { BookOpen, CheckCircle2, Flame, Trophy } from "lucide-react";
import { useState } from "react";

type Mode = "revisions" | "studies";

interface StreakSectionProps {
  activity: ActivityHistoryResponse;
}

const EMPTY_CELL = "bg-muted dark:bg-zinc-800/70";
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const formatDay = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

// Revisions: green shades by progress toward the goal, orange once the goal is met
function revisionCell(day: DayActivity) {
  if (day.isPerfectDay) return "bg-orange-500";
  const progress = day.revisions / DAILY_REVISION_GOAL;
  if (progress >= 0.75) return "bg-emerald-500";
  if (progress >= 0.5) return "bg-emerald-500/70";
  if (progress > 0) return "bg-emerald-500/40";
  return EMPTY_CELL;
}

// Studies: green shades by number of topics logged
function studyCell(day: DayActivity) {
  if (day.studies >= 4) return "bg-emerald-500";
  if (day.studies >= 2) return "bg-emerald-500/70";
  if (day.studies === 1) return "bg-emerald-500/40";
  return EMPTY_CELL;
}

// Pads the history into Sunday-first week columns
function toWeeks(days: DayActivity[]) {
  const cells: (DayActivity | null)[] = [
    ...Array(days[0]?.dayOfWeek ?? 0).fill(null),
    ...days,
  ];
  while (cells.length % 7) cells.push(null);

  const weeks: (DayActivity | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabel(week: (DayActivity | null)[], index: number) {
  const first = week.find((d) => d !== null);
  if (!first) return "";
  const date = new Date(first.date + "T00:00:00");
  // Label the first column, and every column that starts a new month
  if (index === 0 || date.getDate() <= 7) {
    return date.toLocaleDateString("en-US", { month: "short" });
  }
  return "";
}

export default function StreakSection({ activity }: StreakSectionProps) {
  const [mode, setMode] = useState<Mode>("revisions");
  const [selected, setSelected] = useState<DayActivity | null>(null);

  const weeks = toWeeks(activity.days);
  const isRevisions = mode === "revisions";
  const streak = isRevisions ? activity.revisionStreak : activity.studyStreak;
  const cellColor = isRevisions ? revisionCell : studyCell;
  const activeDays = activity.days.filter((d) =>
    isRevisions ? d.revisions > 0 : d.studies > 0
  ).length;

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Consistency</h2>
          <p className="text-xs text-muted-foreground">
            Last {Math.ceil(activity.days.length / 7)} weeks of activity
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border/70 bg-muted/40 p-0.5 text-xs font-medium">
          {(["revisions", "studies"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setSelected(null);
              }}
              aria-pressed={mode === m}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 capitalize transition-colors ${
                mode === m
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "revisions" ? (
                <Flame className="size-3.5 text-orange-500" />
              ) : (
                <BookOpen className="size-3.5 text-emerald-500" />
              )}
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Heatmap */}
        <div className="min-w-0 flex-1 overflow-x-auto pb-1">
          <div className="inline-flex gap-1">
            <div className="mr-1 flex flex-col gap-1 pt-5 text-[10px] text-muted-foreground">
              {WEEKDAY_LABELS.map((label, i) => (
                <span key={i} className="flex h-3.5 items-center sm:h-4">
                  {label}
                </span>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                <span className="h-4 whitespace-nowrap text-[10px] text-muted-foreground">
                  {monthLabel(week, wi)}
                </span>
                {week.map((day, di) =>
                  day ? (
                    <button
                      key={day.date}
                      type="button"
                      aria-label={`${formatDay(day.date)}: ${day.revisions} revisions, ${day.studies} studies`}
                      onMouseEnter={() => setSelected(day)}
                      onFocus={() => setSelected(day)}
                      onClick={() => setSelected(day)}
                      className={`size-3.5 rounded-[3px] transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-4 ${cellColor(day)} ${
                        selected?.date === day.date ? "ring-2 ring-foreground/40" : ""
                      }`}
                    />
                  ) : (
                    <span key={`pad-${di}`} className="size-3.5 sm:size-4" />
                  )
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
            <span className="min-h-4">
              {selected ? (
                <>
                  <span className="font-medium text-foreground">{formatDay(selected.date)}</span>
                  {" · "}
                  {isRevisions
                    ? `${selected.revisions}/${DAILY_REVISION_GOAL} revisions`
                    : `${selected.studies} topic${selected.studies === 1 ? "" : "s"} studied`}
                </>
              ) : (
                "Hover or tap a day for details"
              )}
            </span>

            <span className="flex items-center gap-1">
              Less
              <span className={`size-3 rounded-[3px] ${EMPTY_CELL}`} />
              <span className="size-3 rounded-[3px] bg-emerald-500/40" />
              <span className="size-3 rounded-[3px] bg-emerald-500/70" />
              <span className="size-3 rounded-[3px] bg-emerald-500" />
              {isRevisions && (
                <span
                  className="size-3 rounded-[3px] bg-orange-500"
                  title={`All ${DAILY_REVISION_GOAL} revisions done`}
                />
              )}
              More
            </span>
          </div>
        </div>

        {/* Streak summary for the selected mode */}
        <div className="grid grid-cols-3 gap-3 lg:w-48 lg:grid-cols-1">
          <Metric
            icon={
              isRevisions ? (
                <Flame className="size-4 fill-orange-500 text-orange-500" />
              ) : (
                <BookOpen className="size-4 text-emerald-500" />
              )
            }
            label="Current streak"
            value={`${streak.current}d`}
          />
          <Metric
            icon={<Trophy className="size-4 text-foreground/70" />}
            label="Best streak"
            value={`${streak.best}d`}
          />
          <Metric
            icon={<CheckCircle2 className="size-4 text-emerald-500" />}
            label={isRevisions ? "Goal days" : "Active days"}
            value={isRevisions ? activity.perfectDaysCount : activeDays}
          />
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-0.5 text-lg font-bold tabular-nums">{value}</p>
    </div>
  );
}
