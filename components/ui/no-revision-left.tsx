import { CheckCircle2 } from "lucide-react";

export default function NoRevisionsLeft() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 rounded-xl border border-dashed border-border/70 bg-muted/20 space-y-3">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-6" />
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