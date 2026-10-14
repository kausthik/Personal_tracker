import { getUserData } from "@/src/lib/graphql";

const LEADERBOARD_SERVICE_URL =
  process.env.LEADERBOARD_SERVICE_URL ||
  (process.env.NODE_ENV !== "production" ? "http://localhost:4001" : null);

export async function getLeaderboard() {
  // 1. Attempt to fetch from standalone Leaderboard Microservice if URL is configured
  if (LEADERBOARD_SERVICE_URL) {
    try {
      const res = await fetch(`${LEADERBOARD_SERVICE_URL}/api/leaderboard`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(2500),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          byTotal: data.byTotal,
          byEasy: data.byEasy,
          byMedium: data.byMedium,
          byHard: data.byHard,
          byRating: data.byRating,
          byDaily: data.byDaily,
        };
      }
    } catch {
      console.warn(
        `[Next.js] Leaderboard microservice at ${LEADERBOARD_SERVICE_URL} unavailable, using in-app fallback.`
      );
    }
  }

  // 2. Resilient in-app fallback if microservice is offline
  const users = [
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

  const result = await Promise.all(users.map((u) => getUserData(u)));

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