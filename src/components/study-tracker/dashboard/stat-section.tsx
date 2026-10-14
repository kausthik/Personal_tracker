import {
  BookOpen,
  RotateCcw,
  ListTodo,
  ClockAlert,
  CalendarClock,
} from "lucide-react";

import { getDashboardStatsAction } from "@/src/actions/stats.action";
import StatCard from "./stat-card";

export default async function StatsSection() {
  const dashboardStats = await getDashboardStatsAction();

  const stats: Array<{
    title: string;
    value: number | string;
    description: string;
    icon: typeof BookOpen;
    variant: "neutral" | "green" | "orange";
  }> = [
    {
      title: "Topics Studied",
      value: dashboardStats.topicsStudied,
      description: "Across all subjects",
      icon: BookOpen,
      variant: "green",
    },
    {
      title: "Topics Revised",
      value: dashboardStats.topicsRevised,
      description: "Active recall completed",
      icon: RotateCcw,
      variant: "green",
    },
    {
      title: "Planner Progress",
      value: `${dashboardStats.plannerProgress}%`,
      description: "Average roadmap completion",
      icon: ListTodo,
      variant: "neutral",
    },
    {
      title: "Overdue Revisions",
      value: dashboardStats.overdueRevisions,
      description: dashboardStats.overdueRevisions > 0 ? "Requires review" : "Up to date",
      icon: ClockAlert,
      variant: "orange",
    },
    {
      title: "Overdue Planners",
      value: dashboardStats.overduePlanners,
      description: dashboardStats.overduePlanners > 0 ? "Past target due date" : "On schedule",
      icon: CalendarClock,
      variant: "orange",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}