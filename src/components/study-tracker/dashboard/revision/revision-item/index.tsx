"use client";

import { completeRevisionAction } from "@/src/actions/revision.action";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link2, Target } from "lucide-react";
import CompleteRevisionDialog from "../../complete-revision-dialog";
import { toast } from "sonner";

interface RevisionItemProps {
  index: number;
  revisionCount: number;
  id: string;
  title: string;
  subject: string;
  source: string;
}

export default function RevisionItem({
  index,
  revisionCount,
  id,
  title,
  subject,
  source,
}: RevisionItemProps) {
  const val = process.env.NEXT_PUBLIC_REVISION_COUNT || "5";
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isPriorityTarget = index < Number(val) - revisionCount;

  const handleComplete = () => {
    startTransition(async () => {
      try {
        await completeRevisionAction(id);
        setChecked(true);
        toast.success(`Completed revision for "${title}"`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to complete revision");
      }
    });
  };

  return (
    <div
      className={`group relative flex items-start gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
        isPriorityTarget
          ? "border-amber-400/80 dark:border-amber-500/60 bg-amber-500/5 dark:bg-amber-950/20 shadow-xs hover:border-amber-400 hover:bg-amber-500/10"
          : "border-border/70 bg-card/50 hover:bg-muted/40 hover:border-border"
      }`}
    >
      <CompleteRevisionDialog onConfirm={handleComplete}>
        <div className="pt-0.5 cursor-pointer">
          <Checkbox
            checked={checked}
            disabled={isPending}
            className={isPriorityTarget ? "border-amber-500 data-[state=checked]:bg-amber-500" : ""}
          />
        </div>
      </CompleteRevisionDialog>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-foreground text-sm truncate">
            {title}
          </h4>

          {isPriorityTarget && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 shrink-0">
              <Target className="size-2.5" />
              <span>Target</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Badge variant="outline" className="text-[11px] font-medium py-0 px-2">
            {subject}
          </Badge>

          {source && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
              <Link2 className="size-3 text-muted-foreground" />
              <span className="truncate max-w-[180px]">{source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}