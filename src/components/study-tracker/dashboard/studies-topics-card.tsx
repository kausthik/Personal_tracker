"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import StudiedTopicItem from "./studied-topic-item";
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
    <Card className="gap-0 rounded-2xl border border-border/70 bg-card py-0 shadow-xs ring-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-5 pt-5 pb-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpenCheck className="size-[18px]" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">
              Studied today
              {studies.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground tabular-nums">
                  {studies.length}
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              Each topic is scheduled for spaced revision.
            </CardDescription>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(plannerRoute)}
          className="h-8 gap-1.5 rounded-lg text-xs text-muted-foreground"
        >
          <Compass className="size-3.5" />
          <span className="hidden sm:inline">Planners</span>
        </Button>
      </CardHeader>

      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
        {studies.length === 0 ? (
          <NoStudyToday />
        ) : (
          <div className="space-y-1.5">
            {studies.map((study) => (
              <StudiedTopicItem
                key={study._id}
                id={study._id}
                subject={study.subject}
                title={study.title}
                difficulty={study.difficulty}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
