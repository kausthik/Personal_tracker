import { getUpcomingImportantDatesAction } from "@/src/actions/important-date.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddImportantDateDialog from "./add-important-date-dialog";
import ImportantDateItem from "./important-date-item";
import PastImportantDatesDialog from "./past-important-dates-dialog";
import { Calendar } from "lucide-react";

export default async function ImportantDatesCard() {
  const dates = await getUpcomingImportantDatesAction();

  return (
    <Card className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Calendar className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold">Important Dates</CardTitle>
              <span className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
                {dates.length} Upcoming
              </span>
            </div>
            <CardDescription className="text-xs">
              Upcoming interviews, exams, contests, and deadlines.
            </CardDescription>
          </div>
        </div>

        <AddImportantDateDialog />
      </CardHeader>

      <CardContent className="pt-4 space-y-2.5">
        {dates.length === 0 ? (
          <div className="py-8 text-center space-y-1.5 border border-dashed border-border/80 rounded-xl p-6">
            <Calendar className="size-8 mx-auto text-muted-foreground/60" />
            <p className="font-semibold text-sm text-foreground">No upcoming dates</p>
            <p className="text-xs text-muted-foreground">
              Add upcoming exam dates or application deadlines to stay organized.
            </p>
          </div>
        ) : (
          dates.map((item) => (
            <ImportantDateItem
              key={item._id.toString()}
              id={item._id.toString()}
              title={item.title}
              description={item.description}
              category={item.category}
              priority={item.priority}
              date={item.date.toISOString()}
            />
          ))
        )}

        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Historical records</span>
          <PastImportantDatesDialog />
        </div>
      </CardContent>
    </Card>
  );
}