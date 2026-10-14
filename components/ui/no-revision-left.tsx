import { CheckCircle2 } from "lucide-react";

export default function NoRevisionsLeft() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 min-h-[380px] rounded-xl border border-dashed border-border/80 bg-card/40 space-y-3">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs">
        <CheckCircle2 className="size-7" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="font-bold text-base text-foreground">
          All caught up for today!
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Great work! You have cleared all scheduled spaced repetition reviews for today.
        </p>
      </div>
    </div>
  );
}