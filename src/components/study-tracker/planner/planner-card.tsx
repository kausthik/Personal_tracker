import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, ChevronRight, Clock } from "lucide-react";

interface PlannerCardProps {
  id: string;
  title: string;
  image: string;
  progress: number;
  completed: number;
  total: number;
  dueDate: string;
  status: string;
}

export default function PlannerCard({
  id,
  title,
  image,
  progress,
  completed,
  total,
  dueDate,
  status,
}: PlannerCardProps) {
  // Safe date parse
  let daysRemaining = 0;
  try {
    const [day, month, year] = dueDate.split("/").map(Number);
    const targetDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const diffInMs = targetDate.getTime() - currentDate.getTime();
    daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  } catch {
    daysRemaining = 0;
  }

  const isCompleted = progress === 100;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        <div className="absolute top-3 right-3">
          <Badge
            variant={isCompleted ? "default" : "secondary"}
            className={
              isCompleted
                ? "bg-emerald-600 hover:bg-emerald-600 text-white font-semibold"
                : "bg-background/90 backdrop-blur-md font-semibold border border-border/80"
            }
          >
            {isCompleted ? "Completed" : "In Progress"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pt-4 pb-2 space-y-1">
        <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5 text-primary" />
          <span>Due: {dueDate}</span>
          {daysRemaining > 0 && !isCompleted && (
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              ({daysRemaining}d left)
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              {completed} of {total} Tasks
            </span>
            <span className="text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full rounded-xl gap-1 text-xs font-semibold" size="sm">
          <Link href={`/study-tracker/planner/${id}`}>
            <span>Open Roadmap</span>
            <ChevronRight className="size-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}