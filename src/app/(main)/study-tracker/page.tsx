import ImportantDatesCard from "@/src/components/important-dates/important-dates-card";
import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";
import { getTodayRevisions } from "@/src/lib/server/revision";
import { getTodayStudies } from "@/src/lib/server/study";
import Link from "next/link";
import { plannerRoute } from "@/lib/routes";
import { Compass, Sparkles, ArrowRight, BookMarked } from "lucide-react";

export default async function Page() {
  const studies = await getTodayStudies();
  const revisions = await getTodayRevisions();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground pb-12 overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-blue-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-48 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-48 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <DashboardHeader />

        {/* 5-Card Analytics Strip */}
        <StatsSection />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Daily Revisions & Logged Studies */}
          <div className="lg:col-span-7 space-y-8">
            <RevisionCard revisions={revisions} />
            <StudiedTopicsCard studies={studies} />
          </div>

          {/* Right Column: Deadlines & Roadmap Planners Shortcut */}
          <div className="lg:col-span-5 space-y-8">
            <ImportantDatesCard />

            {/* Quick Roadmap Planners Callout Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-6 backdrop-blur-xl shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
                className="group flex w-full items-center justify-between rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
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