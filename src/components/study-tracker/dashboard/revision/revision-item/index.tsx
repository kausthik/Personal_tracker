"use client";

import { completeRevisionAction } from "@/src/actions/revision.action";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link2, Flame } from "lucide-react";
import CompleteRevisionDialog from "../../complete-revision-dialog";
import { toast } from "sonner";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";

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
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isPriorityTarget = index < DAILY_REVISION_GOAL - revisionCount;

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
      className={`group flex items-center gap-3.5 rounded-xl border px-3.5 py-3 transition-colors ${
        isPriorityTarget
          ? "border-orange-500/25 bg-orange-500/4 hover:bg-orange-500/8"
          : "border-transparent hover:bg-muted/50"
      }`}
    >
      <CompleteRevisionDialog onConfirm={handleComplete}>
        <div className="cursor-pointer">
          <Checkbox
            checked={checked}
            disabled={isPending}
            className={`size-5 rounded-md ${
              isPriorityTarget
                ? "border-orange-500/70 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                : "border-muted-foreground/40 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
            }`}
          />
        </div>
      </CompleteRevisionDialog>

      <div className="min-w-0 flex-1">
        <h4
          className={`truncate text-sm font-medium ${
            checked ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {title}
        </h4>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="truncate">{subject}</span>
          {source && (
            <>
              <span className="text-muted-foreground/40">•</span>
              <span className="flex min-w-0 items-center gap-1">
                <Link2 className="size-3 shrink-0" />
                <span className="truncate">{source}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {isPriorityTarget && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
          <Flame className="size-3 fill-orange-500 text-orange-500" />#{index + 1}
        </span>
      )}
    </div>
  );
}
