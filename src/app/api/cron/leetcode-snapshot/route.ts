import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserData } from "@/src/lib/graphql";
import { LEADERBOARD_USERS } from "@/src/lib/getleaderboard";
import { snapshotDateKey } from "@/src/lib/weekly-rate";
import LeetCodeSnapshot from "@/src/models/leetcode-snapshot.model";

export const dynamic = "force-dynamic";

// Called by Vercel Cron at 23:50 IST (see vercel.json); Vercel sends `Bearer $CRON_SECRET`
export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const date = snapshotDateKey();
  const results = await Promise.allSettled(LEADERBOARD_USERS.map((u) => getUserData(u)));

  // getUserData returns all zeros on failure; saving that would wreck the weekly rate, so skip it
  const users = results.flatMap((r) => (r.status === "fulfilled" && r.value.total > 0 ? [r.value] : []));

  await LeetCodeSnapshot.bulkWrite(
    users.map(({ username, easy, medium, hard, total }) => ({
      updateOne: {
        filter: { username, date },
        update: { $set: { easy, medium, hard, total } },
        upsert: true,
      },
    }))
  );

  return NextResponse.json({
    date,
    saved: users.map((u) => u.username),
    skipped: LEADERBOARD_USERS.filter((u) => !users.some((s) => s.username === u)),
  });
}
