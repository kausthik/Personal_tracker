"use client";

import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRelativeDate } from "@/src/lib/date";
import {
  ImportantDatePriority,
  ImportantDateCategory,
} from "@/src/types/important-date";
import { Button } from "@/components/ui/button";
import { deleteImportantDateAction } from "@/src/actions/important-date.action";
import { toast } from "sonner";
import EditImportantDateDialog from "./edit-important-date-dialog";
import { useTransition } from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  category: ImportantDateCategory;
  priority: ImportantDatePriority;
  date: string;
};

// Strictly 3-color palette (Neutral, Green, Orange)
const priorityStyles = {
  HIGH: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  MEDIUM: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  LOW: "bg-muted/60 text-muted-foreground border-border/80",
};

export default function ImportantDateItem({
  id,
  title,
  category,
  priority,
  description,
  date,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteImportantDateAction(id);
        toast.success(`Deleted "${title}"`);
      } catch (error: any) {
        toast.error(error?.message || "Failed to delete date");
      }
    });
  }

  // Dates come from a date input, i.e. UTC midnight, so format in UTC to show the picked day
  const day = new Date(date);
  const month = day.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const dayOfMonth = day.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" });

  return (
    <div className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50">
      <div
        className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-xl border ${
          priority === "HIGH"
            ? "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400"
            : "border-border/70 bg-muted/40 text-foreground"
        }`}
      >
        <span className="text-[10px] font-semibold uppercase leading-none tracking-wide opacity-80">
          {month}
        </span>
        <span className="text-lg font-bold leading-tight tabular-nums">{dayOfMonth}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-foreground">{title}</h4>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">{getRelativeDate(day)}</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="truncate capitalize">{category.toLowerCase()}</span>
          <Badge
            variant="outline"
            className={`ml-0.5 h-4 px-1.5 text-[10px] font-semibold ${priorityStyles[priority] || priorityStyles.MEDIUM}`}
          >
            {priority}
          </Badge>
        </div>
        {description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/80">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center opacity-60 transition-opacity group-hover:opacity-100">
        <EditImportantDateDialog
          importantDate={{
            id,
            title,
            description,
            category,
            priority,
            date,
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={handleDelete}
          className="size-8 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          title="Delete date"
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
