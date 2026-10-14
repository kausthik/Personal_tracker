import { Check } from "lucide-react";
import CompleteTaskDialog from "./complete-task-dialog";
import { PlannerTaskStatus } from "@/src/types/planner";

interface PlannerTaskItemProps {
  index: number;
  isNext: boolean;
  task: {
    _id: string;
    title: string;
    subject: string;
    difficulty: string;
    status: PlannerTaskStatus;
  };
}

const difficultyText: Record<string, string> = {
  EASY: "text-emerald-600 dark:text-emerald-400",
  HARD: "text-orange-600 dark:text-orange-400",
};

export default function PlannerTaskItem({ index, isNext, task }: PlannerTaskItemProps) {
  const isDone = task.status === PlannerTaskStatus.COMPLETED;

  return (
    <li
      className={`flex items-center gap-4 px-5 py-3.5 transition-colors sm:px-6 ${
        isNext ? "bg-emerald-500/5" : "hover:bg-muted/40"
      }`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${
          isDone
            ? "bg-emerald-500 text-white"
            : isNext
              ? "border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border border-border text-muted-foreground"
        }`}
      >
        {isDone ? <Check className="size-3.5" /> : index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`truncate text-sm font-medium ${
              isDone ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          {isNext && (
            <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Up next
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {task.subject}
          <span className="mx-1.5 text-muted-foreground/40">•</span>
          <span className={`capitalize ${difficultyText[task.difficulty.toUpperCase()] ?? ""}`}>
            {task.difficulty.toLowerCase()}
          </span>
        </p>
      </div>

      {!isDone && <CompleteTaskDialog taskId={task._id} />}
    </li>
  );
}
