import { UserStats } from "../types.js";

export async function fetchLeetCodeUser(username: string): Promise<UserStats> {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query GetUser($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              submissionCalendar
              contestBadge {
                name
              }
            }
            userContestRanking(username: $username) {
              rating
              attendedContestsCount
            }
          }
        `,
        variables: { username },
      }),
    });

    const json = (await response.json()) as any;

    if (json?.errors && !json?.data) {
      console.warn(`[LeetCode Service] GraphQL error for ${username}:`, json.errors);
      return zeroUser(username);
    }

    const data = json?.data;
    if (!data?.matchedUser) {
      return zeroUser(username);
    }

    const stats = data.matchedUser?.submitStats?.acSubmissionNum || [];
    const map: Record<string, number> = {};
    stats.forEach((item: { difficulty: string; count: number }) => {
      map[item.difficulty] = item.count;
    });

    const calendar: Record<string, number> = JSON.parse(
      data.matchedUser?.submissionCalendar || "{}"
    );
    const nowSec = Math.floor(Date.now() / 1000);
    const startOfTodayUTC = nowSec - (nowSec % 86400);
    const daily = Number(calendar[String(startOfTodayUTC)] ?? 0);

    const rating = data.userContestRanking?.rating ?? 0;

    return {
      username,
      total: map["All"] ?? 0,
      easy: map["Easy"] ?? 0,
      medium: map["Medium"] ?? 0,
      hard: map["Hard"] ?? 0,
      daily,
      rating: Math.round(rating),
    };
  } catch (error) {
    console.error(`[LeetCode Service] Network failure fetching ${username}:`, error);
    return zeroUser(username);
  }
}

function zeroUser(username: string): UserStats {
  return {
    username,
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    daily: 0,
    rating: 0,
  };
}
