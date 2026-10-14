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
    <Card className="gap-0 rounded-2xl border border-border/70 bg-card py-0 shadow-xs ring-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-5 pt-5 pb-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Calendar className="size-[18px]" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">
              Important dates
              {dates.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground tabular-nums">
                  {dates.length}
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              Exams, interviews and deadlines.
            </CardDescription>
          </div>
        </div>

        <AddImportantDateDialog />
      </CardHeader>

      <CardContent className="px-3 pb-2 sm:px-4">
        {dates.length === 0 ? (
          <div className="space-y-1.5 rounded-xl border border-dashed border-border/70 bg-muted/20 px-6 py-8 text-center">
            <Calendar className="mx-auto size-7 text-muted-foreground/60" />
            <p className="text-sm font-semibold text-foreground">No upcoming dates</p>
            <p className="text-xs text-muted-foreground">
              Add exam dates or application deadlines to keep them in view.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {dates.map((item) => (
              <ImportantDateItem
                key={item._id.toString()}
                id={item._id.toString()}
                title={item.title}
                description={item.description}
                category={item.category}
                priority={item.priority}
                date={item.date.toISOString()}
              />
            ))}
          </div>
        )}
      </CardContent>

      <div className="flex items-center justify-between border-t border-border/60 px-5 py-2.5 sm:px-6">
        <span className="text-xs text-muted-foreground">Past dates</span>
        <PastImportantDatesDialog />
      </div>
    </Card>
  );
}
