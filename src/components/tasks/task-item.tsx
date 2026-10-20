"use client";

import { useTransition } from "react";
import { Snowflake, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  deleteTaskAction,
  setTaskDoneAction,
  setTaskFrozenAction,
} from "@/src/actions/task.action";

type Props = {
  id: string;
  title: string;
  frozen: boolean;
  done: boolean;
};

export default function TaskItem({ id, title, frozen, done }: Props) {
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
    });
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted/50",
        frozen && "bg-sky-500/5"
      )}
    >
      <Checkbox
        checked={done}
        disabled={isPending}
        onCheckedChange={(checked) => run(() => setTaskDoneAction(id, checked === true))}
        aria-label={`Mark ${title} as ${done ? "not done" : "done"}`}
      />

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          done && "text-muted-foreground line-through"
        )}
      >
        {title}
      </span>

      <div className="flex shrink-0 items-center">
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={() => run(() => setTaskFrozenAction(id, !frozen))}
          className={cn(
            "size-8",
            frozen
              ? "text-sky-600 dark:text-sky-400"
              : "text-muted-foreground opacity-60 group-hover:opacity-100"
          )}
          title={frozen ? "Unfreeze (stop repeating daily)" : "Freeze (repeat every day)"}
          aria-label={frozen ? `Unfreeze ${title}` : `Freeze ${title}`}
          aria-pressed={frozen}
        >
          <Snowflake className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={() => run(() => deleteTaskAction(id))}
          className="size-8 text-muted-foreground opacity-60 transition-colors group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
          title="Delete task"
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
