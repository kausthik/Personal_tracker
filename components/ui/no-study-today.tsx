"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoStudyToday() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 min-h-[380px] rounded-xl border border-dashed border-border/80 bg-card/40 space-y-4">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground shadow-xs">
        <BookOpen className="size-7" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="font-bold text-base text-foreground">
          No topics studied today
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Log a completed lesson or start a task from your study planners to maintain your study streak.
        </p>
      </div>

      <Button
        onClick={() => router.push("/study-tracker/planner")}
        className="gap-2 text-xs font-semibold rounded-xl"
        size="sm"
      >
        <Compass className="size-4" />
        <span>Open Study Planners</span>
      </Button>
    </div>
  );
}