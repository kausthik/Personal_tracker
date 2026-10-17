import Link from "next/link";
import { ArrowRight, BookOpen, Flame, Trophy } from "lucide-react";
import ServiceCard from "../components/home/service-card";
import { servicesData } from "../config/services-data";
import ProfileLink from "../components/profile/profile-link";
import { auth } from "../lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-background text-foreground">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        {session?.user ? (
          <ProfileLink name={session.user.name} />
        ) : (
          <Link
            href="/login"
            className="inline-flex h-8 items-center rounded-full border border-border/80 bg-card px-4 text-xs font-medium transition-colors hover:bg-muted"
          >
            Log in
          </Link>
        )}
      </div>

      {/* Soft backdrop behind the hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-orange-500/[0.07] via-amber-400/[0.04] to-transparent" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-[0.35] [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mx-auto max-w-3xl pt-20 pb-14 text-center sm:pt-28 sm:pb-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Personal tracker
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Study, code and eat{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
              a little better
            </span>{" "}
            every day.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Spaced revision for what you learn, a LeetCode leaderboard for you and your friends, and a
            calorie log, all in one place.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/study-tracker"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background shadow-sm transition-opacity hover:opacity-90"
            >
              Open study tracker
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/80 bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <Trophy className="size-4 text-amber-500" />
              View leaderboard
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Flame className="size-3.5 text-orange-500" />
              Daily streaks
            </li>
            <li className="inline-flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-emerald-500" />
              Spaced repetition
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Trophy className="size-3.5 text-amber-500" />
              Friendly competition
            </li>
          </ul>
        </section>

        {/* Services */}
        <section aria-label="Trackers" className="grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.link} data={service} priority={index === 0} />
          ))}
        </section>
      </div>

      <footer className="mt-auto border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>Personal tracker · built to keep you consistent</span>
          <nav className="flex gap-4">
            {servicesData.map((s) => (
              <Link key={s.link} href={s.link} className="hover:text-foreground">
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
