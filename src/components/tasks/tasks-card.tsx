import { getTodayTasksAction } from "@/src/actions/task.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTaskForm from "./add-task-form";
import TaskItem from "./task-item";
import { ListTodo } from "lucide-react";

export default async function TasksCard() {
  const tasks = await getTodayTasksAction();
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <Card className="gap-0 rounded-2xl border border-border/70 bg-card py-0 shadow-xs ring-0">
      <CardHeader className="flex flex-row items-center gap-3 px-5 pt-5 pb-4 sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <ListTodo className="size-[18px]" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold">
            Tasks
            {tasks.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground tabular-nums">
                {doneCount}/{tasks.length}
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-xs">
            Freeze a task to keep it on your list every day.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-3 pb-4 sm:px-4">
        <AddTaskForm />

        {tasks.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-muted-foreground">
            No tasks yet. Add one above.
          </p>
        ) : (
          <div className="space-y-1">
            {tasks.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
