import { getUserPlannersAction } from "@/src/actions/planner.action";
import PlannerCard from "@/src/components/study-tracker/planner/planner-card";
import PlannerHeader from "@/src/components/study-tracker/planner/planner-header";
import { Map as MapIcon } from "lucide-react";
import { daysUntil } from "@/src/lib/date";

export default async function PlannerPage() {
  const planners = await getUserPlannersAction();

  const completed = planners.filter(
    (p) => p.totalTasks > 0 && p.completedTasks >= p.totalTasks
  ).length;
  const overdue = planners.filter(
    (p) => p.completedTasks < p.totalTasks && daysUntil(new Date(p.dueDate)) < 0
  ).length;
  const avgProgress = planners.length
    ? Math.round(
        planners.reduce(
          (sum, p) => sum + (p.totalTasks > 0 ? p.completedTasks / p.totalTasks : 0),
          0
        ) * (100 / planners.length)
      )
    : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-16 text-foreground">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PlannerHeader
          summary={[
            { label: "Active", value: planners.length - completed },
            { label: "Completed", value: completed },
            { label: "Overdue", value: overdue, highlight: overdue > 0 },
            { label: "Avg. progress", value: `${avgProgress}%` },
          ]}
        />

        {planners.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center space-y-3 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <MapIcon className="size-6" />
            </div>
            <h3 className="text-base font-semibold">No study roadmaps yet</h3>
            <p className="max-w-sm text-xs text-muted-foreground">
              Create your first roadmap, such as Striver A2Z DSA or Operating Systems, with the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {planners.map((planner) => (
              <PlannerCard
                key={planner._id}
                id={planner._id}
                title={planner.title}
                image={planner.imageUrl || "/planner.png"}
                completed={planner.completedTasks}
                total={planner.totalTasks}
                dueDate={new Date(planner.dueDate).toISOString()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
