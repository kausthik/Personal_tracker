// Pure helpers for the nightly LeetCode snapshot / weekly rate (no imports, so node --test can run it)

export interface Snapshot {
  username: string;
  date: string; // "YYYY-MM-DD" (IST)
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

const DAY_MS = 86_400_000;

// IST calendar date of the run. Shifted back 1h because Vercel Hobby fires the 23:50 cron
// anywhere in that hour, which can cross midnight into the next day.
export function snapshotDateKey(now = new Date()) {
  return new Date(now.getTime() - 3_600_000).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export function shiftDateKey(key: string, days: number) {
  return new Date(Date.parse(key) + days * DAY_MS).toISOString().slice(0, 10);
}

const perDay = (delta: number, days: number) => (days > 0 ? Math.round((Math.max(0, delta) / days) * 10) / 10 : 0);

// Per-day solve rate between each user's oldest and newest snapshot (caller passes the last 7 days)
export function computeRates(usernames: string[], snapshots: Snapshot[]) {
  return usernames.map((username) => {
    const mine = snapshots.filter((s) => s.username === username).sort((a, b) => a.date.localeCompare(b.date));
    const first = mine[0];
    const last = mine[mine.length - 1];
    const days = first ? (Date.parse(last.date) - Date.parse(first.date)) / DAY_MS : 0;

    return {
      username,
      easy: first ? perDay(last.easy - first.easy, days) : 0,
      medium: first ? perDay(last.medium - first.medium, days) : 0,
      hard: first ? perDay(last.hard - first.hard, days) : 0,
      total: first ? perDay(last.total - first.total, days) : 0,
      daily: 0,
      rating: 0,
    };
  });
}
