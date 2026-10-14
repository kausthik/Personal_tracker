import ImportantDatesCard from "@/src/components/important-dates/important-dates-card";
import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";
import StreakSection from "@/src/components/study-tracker/dashboard/streak-section";
import { getTodayRevisions } from "@/src/lib/server/revision";
import { getTodayStudies } from "@/src/lib/server/study";
import { getStudyActivityHistoryAction } from "@/src/actions/activity.action";
import Link from "next/link";
import { plannerRoute } from "@/lib/routes";
import { Compass, ArrowRight, BookMarked } from "lucide-react";

export default async function Page() {
  const [studies, revisions, activity] = await Promise.all([
    getTodayStudies(),
    getTodayRevisions(),
    getStudyActivityHistoryAction(70), // 10 weeks of LeetCode-style activity
  ]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground pb-16 overflow-hidden">
      {/* Premium 3-color ambient background glows (Neutral, Emerald, Orange) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-orange-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-48 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-48 -z-10 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <DashboardHeader />

        {/* 5-Card Analytics Strip */}
        <StatsSection />

        {/* LeetCode-style Streak Heatmap Section */}
        <StreakSection activity={activity} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Top 5 Today's Revisions (least date first) & Today's Studies */}
          <div className="lg:col-span-7 space-y-8">
            <RevisionCard revisions={revisions} />
            <StudiedTopicsCard studies={studies} />
          </div>

          {/* Right Column: Important Dates & Study Roadmaps */}
          <div className="lg:col-span-5 space-y-8">
            <ImportantDatesCard />

            {/* Quick Roadmap Planners Callout Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-xl shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <BookMarked className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Study Roadmaps & Planners
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Organize sheets like Striver A2Z DSA, OS, and System Design.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Break complex topics into ordered task checklists and track completion percentages as you advance.
              </p>

              <Link
                href={plannerRoute}
                className="group flex w-full items-center justify-between rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <Compass className="size-4" />
                  <span>Explore Roadmaps</span>
                </div>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}