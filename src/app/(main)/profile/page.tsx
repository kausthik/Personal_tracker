import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, KeyRound, Pencil } from "lucide-react";

import { auth } from "@/src/lib/auth";
import { connectDB } from "@/src/lib/mongodb";
import User, { IUser } from "@/src/models/user";
import { getDashboardStatsAction } from "@/src/actions/stats.action";
import { getInitials } from "@/src/components/profile/profile-link";
import LogoutButton from "@/src/components/profile/logout-button";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await connectDB();
  const [user, stats] = await Promise.all([
    User.findById(session.user.id).select("-password").lean<IUser>(),
    getDashboardStatsAction(),
  ]);
  if (!user) redirect("/login");

  const show = (value: number | null | undefined, unit: string) =>
    value ? `${value} ${unit}` : "—";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-16 text-foreground">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/study-tracker"
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Study tracker
        </Link>

        {/* Account */}
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-xs sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-foreground text-xl font-bold text-background">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight">{user.name}</h1>
                <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </section>

        {/* Study stats */}
        <Section title="Study">
          <Stat label="Topics studied" value={stats.topicsStudied} />
          <Stat label="Topics revised" value={stats.topicsRevised} />
          <Stat label="Planner progress" value={`${stats.plannerProgress}%`} />
        </Section>

        {/* Body goals */}
        <Section title="Body goals">
          <Stat label="Height" value={show(user.heightCm, "cm")} />
          <Stat label="Current weight" value={show(user.currentWeightKg, "kg")} />
          <Stat label="Target weight" value={show(user.targetWeightKg, "kg")} />
          <Stat label="Daily calories" value={show(user.dailyCalorieTarget, "kcal")} />
        </Section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/calorie-tracker/settings"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border/80 px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Pencil className="size-4" />
            Edit profile
          </Link>
          <Link
            href="/forget-password"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border/80 px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            <KeyRound className="size-4" />
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <h2 className="border-b border-border/60 px-5 py-4 text-base font-semibold sm:px-6">{title}</h2>
      <dl className="grid grid-cols-2 gap-5 p-5 sm:grid-cols-4 sm:p-6">{children}</dl>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-lg font-bold tabular-nums">{value}</dd>
    </div>
  );
}
