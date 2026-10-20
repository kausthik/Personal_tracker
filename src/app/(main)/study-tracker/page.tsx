import ImportantDatesCard from "@/src/components/important-dates/important-dates-card";
import TasksCard from "@/src/components/tasks/tasks-card";
import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";
import StreakSection from "@/src/components/study-tracker/dashboard/streak-section";
import { getTodayRevisions } from "@/src/lib/server/revision";
import { getTodayStudies } from "@/src/lib/server/study";
import { getStudyActivityHistoryAction } from "@/src/actions/activity.action";
import { auth } from "@/src/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { plannerRoute } from "@/lib/routes";
import { ArrowRight, Map as MapIcon } from "lucide-react";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [studies, revisions, activity] = await Promise.all([
    getTodayStudies(),
    getTodayRevisions(),
    getStudyActivityHistoryAction(119), // 17 weeks of history
  ]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-16 text-foreground">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader name={session?.user?.name} activity={activity} />

        <StatsSection />

        <StreakSection activity={activity} />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <RevisionCard revisions={revisions} />
            <StudiedTopicsCard studies={studies} />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <TasksCard />

            <ImportantDatesCard />

            <Link
              href={plannerRoute}
              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <MapIcon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Study roadmaps</p>
                <p className="text-xs text-muted-foreground">
                  Work through sheets like Striver A2Z, OS and System Design topic by topic.
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
