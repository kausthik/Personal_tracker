import { User } from "@/src/lib/user-type";

export function getScore(user: User, category: string): number {
  if (category === "easy") return user.easy ?? 0;
  if (category === "medium") return user.medium ?? 0;
  if (category === "hard") return user.hard ?? 0;
  if (category === "daily") return user.daily ?? 0;
  if (category === "rating") return user.rating ?? 0;
  return user.total ?? 0; // also "weekly"/"monthly", whose total is the per-day rate
}

// eta from daysToOvertake: number of days, null = never at this pace, undefined = no estimate
export function etaLabel(eta: number | null | undefined) {
  if (eta === undefined) return null;
  return eta === null ? "Not catching #1 at 7-day pace" : `Passes #1 in ~${eta} day${eta === 1 ? "" : "s"}`;
}

export const initials = (username: string) => username.slice(0, 2).toUpperCase();

export const profileUrl = (username: string) => `https://leetcode.com/u/${username}`;
