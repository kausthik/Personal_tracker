import Link from "next/link";
import { RegisterStudiedTopic } from "./study/add-topic-dialog";
import { Compass, ArrowRight } from "lucide-react";
import { plannerRoute } from "@/lib/routes";

export default function DashboardHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 backdrop-blur-xl shadow-xs">
      {/* Decorative 3-color ambient gradient inside header (Emerald & Orange) */}
      <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            <span className="uppercase tracking-wider">Study & Revision HQ</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Revision{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
              Buddy
            </span>{" "}
            & Coach
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Prepare today for tomorrow. Stay on top of spaced repetition, clear scheduled revisions, and make steady progress on your roadmap planners.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={plannerRoute}
            className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground shadow-xs backdrop-blur-md transition-all hover:bg-muted/60 hover:-translate-y-0.5"
          >
            <Compass className="size-4 text-emerald-500" />
            <span>Study Planners</span>
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <RegisterStudiedTopic />
        </div>
      </div>
    </div>
  );
}