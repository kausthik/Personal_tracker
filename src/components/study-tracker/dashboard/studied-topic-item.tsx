"use client";

import { Badge } from "@/components/ui/badge";
import { BookOpen, Trash2 } from "lucide-react";
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

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
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
    <div className="group flex items-center justify-between rounded-xl border border-border/70 bg-card/50 p-3.5 transition-all hover:bg-muted/40 hover:border-border">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="size-4" />
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold text-foreground text-sm truncate">
            {title}
          </h4>

          <p className="text-xs text-muted-foreground truncate">
            {subject}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Badge
          variant="outline"
          className={`text-xs font-semibold ${difficultyStyles[difficulty] || difficultyStyles.Medium}`}
        >
          {difficulty}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={handleDelete}
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete study log"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}