import { User } from "@/src/lib/user-type";

// Stacked Easy / Medium / Hard split of a user's solved problems
export function DifficultyBar({
  user,
  showCounts = false,
}: {
  user: Pick<User, "easy" | "medium" | "hard">;
  showCounts?: boolean;
}) {
  const total = user.easy + user.medium + user.hard;
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  return (
    <div className="space-y-1.5">
      <div
        className="flex h-1.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${user.easy} easy, ${user.medium} medium, ${user.hard} hard`}
      >
        <div className="bg-emerald-500" style={{ width: `${pct(user.easy)}%` }} />
        <div className="bg-amber-400" style={{ width: `${pct(user.medium)}%` }} />
        <div className="bg-rose-500" style={{ width: `${pct(user.hard)}%` }} />
      </div>

      {showCounts && (
        <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
          <span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.easy}</span> E
          </span>
          <span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">{user.medium}</span> M
          </span>
          <span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">{user.hard}</span> H
          </span>
        </div>
      )}
    </div>
  );
}
