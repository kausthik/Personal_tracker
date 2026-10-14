import CreatePlannerDialog from "./create-planner-dialog";
import Link from "next/link";
import { homeRoute } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";

interface PlannerHeaderProps {
  summary: { label: string; value: string | number; highlight?: boolean }[];
}

export default function PlannerHeader({ summary }: PlannerHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Link
            href={homeRoute}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Study tracker
          </Link>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Study roadmaps</h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Break big syllabuses into ordered topics. Every topic you finish is logged and scheduled for revision.
            </p>
          </div>
          <CreatePlannerDialog />
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="bg-card px-5 py-3">
              <dt className="text-[11px] text-muted-foreground">{item.label}</dt>
              <dd
                className={`text-xl font-bold tabular-nums ${
                  item.highlight ? "text-orange-600 dark:text-orange-400" : ""
                }`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
