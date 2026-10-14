"use client";

import { CalendarDays, Trash2 } from "lucide-react";
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

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/50 p-3.5 transition-all hover:bg-muted/40 hover:border-border">
      <div className="space-y-1 min-w-0">
        <h4 className="font-semibold text-foreground text-sm truncate">
          {title}
        </h4>

        {description && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {description}
          </p>
        )}

        <div className="flex items-center gap-1.5 pt-0.5">
          <Badge variant="outline" className="text-[11px] font-medium py-0 px-2 border-border/80">
            {category}
          </Badge>

          <Badge
            variant="outline"
            className={`text-[11px] font-semibold py-0 px-2 ${priorityStyles[priority] || priorityStyles.MEDIUM}`}
          >
            {priority}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <CalendarDays className="size-3.5 text-orange-500" />
          <span>{getRelativeDate(new Date(date))}</span>
        </div>

        <div className="flex items-center gap-1">
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
            className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Delete date"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}