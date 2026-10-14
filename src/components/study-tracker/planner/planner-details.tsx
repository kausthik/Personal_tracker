import { Progress } from "@/components/ui/progress";
import PlannerTaskItem from "./planner-task-item";
import { PlannerTaskStatus } from "@/src/types/planner";

const tasks = [
  {
    id: 1,
    title: "Arrays",
    subject: "DSA",
    difficulty: "EASY",
    completed: true,
  },
  {
    id: 2,
    title: "Binary Search",
    subject: "DSA",
    difficulty: "MEDIUM",
    completed: false,
  },
  {
    id: 3,
    title: "Sliding Window",
    subject: "DSA",
    difficulty: "HARD",
    completed: false,
  },
  {
    id: 4,
    title: "Deadlock",
    subject: "Operating System",
    difficulty: "MEDIUM",
    completed: false,
  },
];

export default function PlannerDetails() {
  return (
    <div className="space-y-8">

      <div className="space-y-2">

        <h1 className="text-3xl font-bold">
          Striver A2Z DSA
        </h1>

        <p className="text-muted-foreground">
          8 / 20 Tasks Completed
        </p>

      </div>

      <Progress value={40} />

      <div className="space-y-4">
        {tasks.map((task) => (
          <PlannerTaskItem
            key={task.id}
            task={{
              _id: String(task.id),
              title: task.title,
              subject: task.subject,
              difficulty: task.difficulty,
              status: task.completed
                ? PlannerTaskStatus.COMPLETED
                : PlannerTaskStatus.PENDING,
            }}
          />
        ))}
      </div>

    </div>
  );
}