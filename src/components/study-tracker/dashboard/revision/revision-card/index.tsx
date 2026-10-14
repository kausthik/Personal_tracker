import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RevisionItem from "../revision-item";
import { getTodayRevisions } from "@/src/lib/server/revision";
import NoRevisionsLeft from "@/components/ui/no-revision-left";
import { todaysCompletedRevisionCount } from "@/src/actions/revision.action";
import { RotateCcw } from "lucide-react";

type RevisionCardProps = {
  revisions: Awaited<ReturnType<typeof getTodayRevisions>>;
};

export default async function RevisionCard({
  revisions,
}: RevisionCardProps) {
  const revisionCount = await todaysCompletedRevisionCount();

  return (
    <Card className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <RotateCcw className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold">Today's Revisions</CardTitle>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {revisions.length} Pending
              </span>
            </div>
            <CardDescription className="text-xs">
              Complete scheduled revisions to reinforce memory retention.
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/40 border border-border/60 rounded-lg px-2.5 py-1.5">
          <span>Completed Today:</span>
          <span className="font-bold text-foreground">{revisionCount}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {revisions.length !== 0 ? (
          <ScrollArea className="h-[420px] pr-3 space-y-2.5">
            {revisions.map((revision, idx) => (
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
          </ScrollArea>
        ) : (
          <NoRevisionsLeft />
        )}
      </CardContent>
    </Card>
  );
}