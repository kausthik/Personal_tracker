"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import StudiedTopicItem from "./studied-topic-item";
import { RegisterStudiedTopic } from "./study/add-topic-dialog";
import { getTodayStudies } from "@/src/lib/server/study";
import NoStudyToday from "@/components/ui/no-study-today";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { plannerRoute } from "@/lib/routes";
import { BookOpenCheck, Compass } from "lucide-react";

type StudiedTopicsCardProps = {
  studies: Awaited<ReturnType<typeof getTodayStudies>>;
};

export default function StudiedTopicsCard({
  studies,
}: StudiedTopicsCardProps) {
  const router = useRouter();

  return (
    <Card className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpenCheck className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold">Studied Topics</CardTitle>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {studies.length} Logged
              </span>
            </div>
            <CardDescription className="text-xs">
              Topics and lessons completed today.
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(plannerRoute)}
            className="text-xs font-medium gap-1.5 h-8 rounded-lg"
          >
            <Compass className="size-3.5 text-muted-foreground" />
            <span>Planners</span>
          </Button>
          <RegisterStudiedTopic />
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-2.5">
        {studies.length === 0 ? (
          <NoStudyToday />
        ) : (
          studies.map((study) => (
            <StudiedTopicItem
              key={study._id}
              id={study._id}
              subject={study.subject}
              title={study.title}
              difficulty={study.difficulty}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}