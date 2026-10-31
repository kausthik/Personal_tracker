import { notFound } from "next/navigation";
import { Leaderboard } from "./leaderboard-template";
import { getLeaderboard, getRateLeaderboard } from "@/src/lib/getleaderboard";
import { findCategory } from "@/src/config/category-data";

const rateDays: Record<string, number> = { weekly: 7, monthly: 30 };

const boardKey = {
  total: "byTotal",
  rating: "byRating",
  daily: "byDaily",
  easy: "byEasy",
  medium: "byMedium",
  hard: "byHard",
} as const;

// Shared by /leaderboard and /leaderboard/[category]
export async function LeaderboardBoard({ slug }: { slug: string }) {
  const category = findCategory(slug);
  if (!category) notFound();

  const data =
    category.slug in rateDays
      ? await getRateLeaderboard(rateDays[category.slug])
      : (await getLeaderboard())[boardKey[category.slug as keyof typeof boardKey]];

  return <Leaderboard category={category.slug} data={data} />;
}
