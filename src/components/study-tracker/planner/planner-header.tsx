"use client";

import CreatePlannerDialog from "./create-planner-dialog";
import Link from "next/link";
import { homeRoute } from "@/lib/routes";
import { ArrowLeft, Compass } from "lucide-react";

export default function PlannerHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 backdrop-blur-xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={homeRoute}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Study Tracker</span>
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Study Roadmaps & Planners
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl">
            Track multi-topic sheets, organize task sequences, and measure completion velocity.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <CreatePlannerDialog />
        </div>
      </div>
    </div>
  );
}