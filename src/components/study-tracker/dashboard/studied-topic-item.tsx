"use client";

import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteStudyAction } from "@/src/actions/study.action";
import { toast } from "sonner";
import { useTransition } from "react";

interface StudiedTopicItemProps {
  id: string;
  subject: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// Strictly 3-color palette (Neutral, Green, Orange)
const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-muted/60 text-muted-foreground border-border/80",
  Hard: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

const difficultyDot = {
  Easy: "bg-emerald-500",
  Medium: "bg-muted-foreground/50",
  Hard: "bg-orange-500",
};

export default function StudiedTopicItem({
  id,
  subject,
  title,
  difficulty,
}: StudiedTopicItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteStudyAction(id);
        toast.success(`Removed "${title}" from today's studies`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to remove topic");
      }
    });
  };

  return (
    <div className="group flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-muted/50">
      <span className={`size-2 shrink-0 rounded-full ${difficultyDot[difficulty] ?? difficultyDot.Medium}`} />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-foreground">{title}</h4>
        <p className="truncate text-xs text-muted-foreground">{subject}</p>
      </div>

      <Badge
        variant="outline"
        className={`shrink-0 text-[11px] font-medium ${difficultyStyles[difficulty] || difficultyStyles.Medium}`}
      >
        {difficulty}
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        className="size-8 shrink-0 text-muted-foreground opacity-60 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        title="Delete study log"
        aria-label={`Delete ${title}`}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
