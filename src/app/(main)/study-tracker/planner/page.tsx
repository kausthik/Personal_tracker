import { getUserPlannersAction } from "@/src/actions/planner.action";
import PlannerCard from "@/src/components/study-tracker/planner/planner-card";
import PlannerHeader from "@/src/components/study-tracker/planner/planner-header";
import { Compass } from "lucide-react";

export default async function PlannerPage() {
  const planners = await getUserPlannersAction();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-blue-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-48 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <PlannerHeader />

        {planners.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 min-h-[340px] rounded-2xl border border-dashed border-border/80 bg-card/40 space-y-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Compass className="size-7" />
            </div>
            <h3 className="text-lg font-bold">No study roadmaps yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Create your first study planner or roadmap (e.g., Striver A2Z DSA, Operating Systems) using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planners.map((planner) => {
              const progress =
                planner.totalTasks > 0
                  ? Math.round(
                      (planner.completedTasks / planner.totalTasks) * 100
                    )
                  : 0;

              return (
                <PlannerCard
                  key={planner._id}
                  id={planner._id}
                  title={planner.title}
                  image={planner.imageUrl ?? "/planner.jpg"}
                  progress={progress}
                  completed={planner.completedTasks}
                  total={planner.totalTasks}
                  dueDate={new Date(planner.dueDate).toLocaleDateString()}
                  status={progress === 100 ? "Completed" : "In Progress"}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}