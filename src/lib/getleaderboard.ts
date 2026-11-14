import { getUserData } from "@/src/lib/graphql";
import { connectDB } from "@/src/lib/mongodb";
import { computeRates, dailySolved, istDateKey, shiftDateKey, withLive, type Snapshot } from "@/src/lib/weekly-rate";
import LeetCodeSnapshot from "@/src/models/leetcode-snapshot.model";

export const LEADERBOARD_USERS = [
  "kk_gangwar",
  "krotrn",
  "ujjwalsingh9939",
  "ROUSHAN_RAJ_17",
  "Harshit_Srivastava_25",
  "Harshal-03",
  "Arun_kumar7310",
  "AyushKumar98",
  "coder_bhumikaa",
  "ao55sdaK9Q",
  "Rishikesh2005",
];

type LiveUser = Awaited<ReturnType<typeof getUserData>>;

async function fetchLiveUsers(): Promise<LiveUser[]> {
  return Promise.all(LEADERBOARD_USERS.map((u) => getUserData(u)));
}

// Swaps the UTC submission count for problems solved since yesterday's snapshot (IST)
async function withTodaySolved(users: LiveUser[]) {
  try {
    await connectDB();
    const yesterday = await LeetCodeSnapshot.find({ date: shiftDateKey(istDateKey(), -1) }).lean<Snapshot[]>();
    return dailySolved(users, yesterday);
  } catch (err) {
    console.warn("[Next.js] Snapshot lookup failed, daily falls back to submission calendar.", err);
    return users;
  }
}

export async function getLeaderboard() {
  const result = await withTodaySolved(await fetchLiveUsers());

  const byTotal = [...result].sort((a, b) => (b.total as number) - (a.total as number));
  const byEasy = [...result].sort((a, b) => (b.easy as number) - (a.easy as number));
  const byMedium = [...result].sort((a, b) => (b.medium as number) - (a.medium as number));
  const byHard = [...result].sort((a, b) => (b.hard as number) - (a.hard as number));
  const byRating = [...result].sort((a, b) => (b.rating as number) - (a.rating as number));
  const byDaily = [...result].sort((a, b) => (b.daily as number) - (a.daily as number));

  return {
    byTotal,
    byEasy,
    byMedium,
    byHard,
    byRating,
    byDaily,
  };
}

// Rolling per-day solve rate over the last `days`, from the nightly snapshots plus today's live counts
export async function getRateLeaderboard(days: number) {
  await connectDB();
  const today = istDateKey();
  const [snapshots, live] = await Promise.all([
    LeetCodeSnapshot.find({ date: { $gte: shiftDateKey(today, -days) } }).lean<Snapshot[]>(),
    fetchLiveUsers(),
  ]);
  return computeRates(LEADERBOARD_USERS, withLive(snapshots, live, today));
}
