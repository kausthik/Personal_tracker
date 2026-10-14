import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RevisionItem from "../revision-item";
import { getTodayRevisions } from "@/src/lib/server/revision";
import NoRevisionsLeft from "@/components/ui/no-revision-left";
import { todaysCompletedRevisionCount } from "@/src/actions/revision.action";
import { RotateCcw } from "lucide-react";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";

type RevisionCardProps = {
  revisions: Awaited<ReturnType<typeof getTodayRevisions>>;
};

export default async function RevisionCard({
  revisions,
}: RevisionCardProps) {
  const revisionCount = await todaysCompletedRevisionCount();

  // Repository already returns the earliest-scheduled revisions, capped at the daily goal
  const displayRevisions = revisions.slice(0, DAILY_REVISION_GOAL);

  const goalProgress = Math.min((revisionCount / DAILY_REVISION_GOAL) * 100, 100);
  const goalMet = revisionCount >= DAILY_REVISION_GOAL;

  return (
    <Card className="gap-0 rounded-2xl border border-border/70 bg-card py-0 shadow-xs ring-0">
      <CardHeader className="space-y-3 px-5 pt-5 pb-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <RotateCcw className="size-[18px]" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Today&apos;s revisions</CardTitle>
              <CardDescription className="text-xs">
                Earliest due first · finish {DAILY_REVISION_GOAL} to light today&apos;s square
              </CardDescription>
            </div>
          </div>

          <span
            className={`shrink-0 text-sm font-semibold tabular-nums ${
              goalMet ? "text-orange-600 dark:text-orange-400" : "text-foreground"
            }`}
          >
            {revisionCount}
            <span className="font-normal text-muted-foreground">/{DAILY_REVISION_GOAL}</span>
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-500 ${goalMet ? "bg-orange-500" : "bg-emerald-500"}`}
            style={{ width: `${goalProgress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
        {displayRevisions.length !== 0 ? (
          <div className="space-y-1.5">
            {displayRevisions.map((revision, idx) => (
              <RevisionItem
                index={idx}
                revisionCount={revisionCount}
                key={revision._id}
                id={revision._id}
                title={revision.studyId.title}
                subject={revision.studyId.subject}
                source={
                  revision.studyId.sources?.[0]?.name ?? "Direct study"
                }
              />
            ))}
          </div>
        ) : (
          <NoRevisionsLeft />
        )}
      </CardContent>
    </Card>
  );
}
