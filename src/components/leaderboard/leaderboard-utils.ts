import { User } from "@/src/lib/user-type";

export function getScore(user: User, category: string): number {
  if (category === "easy") return user.easy ?? 0;
  if (category === "medium") return user.medium ?? 0;
  if (category === "hard") return user.hard ?? 0;
  if (category === "daily") return user.daily ?? 0;
  if (category === "rating" || category === "contest") return user.rating ?? 0;
  return user.total ?? 0;
}

export function getScoreLabel(category: string): string {
  if (category === "rating" || category === "contest") return "Contest Rating";
  if (category === "daily") return "Day Streak";
  return "Solved";
}
