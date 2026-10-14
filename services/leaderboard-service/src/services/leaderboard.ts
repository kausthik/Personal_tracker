import { fetchLeetCodeUser } from "./leetcode.js";
import { LeaderboardResponse, UserStats } from "../types.js";

const DEFAULT_USERS = [
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

export class LeaderboardManager {
  private users: Set<string>;
  private cache: LeaderboardResponse | null = null;
  private cacheExpiresAt: number = 0;
  private ttlMs: number;
  private inFlightPromise: Promise<LeaderboardResponse> | null = null;

  constructor(ttlSeconds: number = 300) {
    this.users = new Set(DEFAULT_USERS);
    this.ttlMs = ttlSeconds * 1000;
  }

  public getUsers(): string[] {
    return Array.from(this.users);
  }

  public addUser(username: string): boolean {
    const trimmed = username.trim();
    if (!trimmed || this.users.has(trimmed)) return false;
    this.users.add(trimmed);
    this.invalidateCache();
    return true;
  }

  public removeUser(username: string): boolean {
    const deleted = this.users.delete(username.trim());
    if (deleted) this.invalidateCache();
    return deleted;
  }

  public invalidateCache(): void {
    this.cache = null;
    this.cacheExpiresAt = 0;
  }

  public async getLeaderboard(forceRefresh: boolean = false): Promise<LeaderboardResponse> {
    const now = Date.now();

    if (!forceRefresh && this.cache && now < this.cacheExpiresAt) {
      return {
        ...this.cache,
        cached: true,
      };
    }

    if (this.inFlightPromise) {
      return this.inFlightPromise;
    }

    this.inFlightPromise = this.fetchAndBuildLeaderboard();

    try {
      const result = await this.inFlightPromise;
      return result;
    } finally {
      this.inFlightPromise = null;
    }
  }

  private async fetchAndBuildLeaderboard(): Promise<LeaderboardResponse> {
    const usernames = Array.from(this.users);
    console.log(`[Leaderboard Service] Syncing ${usernames.length} users from LeetCode...`);

    const usersData = await Promise.all(
      usernames.map((u) => fetchLeetCodeUser(u))
    );

    const byTotal = [...usersData].sort((a, b) => b.total - a.total);
    const byEasy = [...usersData].sort((a, b) => b.easy - a.easy);
    const byMedium = [...usersData].sort((a, b) => b.medium - a.medium);
    const byHard = [...usersData].sort((a, b) => b.hard - a.hard);
    const byRating = [...usersData].sort((a, b) => b.rating - a.rating);
    const byDaily = [...usersData].sort((a, b) => b.daily - a.daily);

    const response: LeaderboardResponse = {
      byTotal,
      byEasy,
      byMedium,
      byHard,
      byRating,
      byDaily,
      cached: false,
      lastUpdated: new Date().toISOString(),
    };

    this.cache = response;
    this.cacheExpiresAt = Date.now() + this.ttlMs;

    console.log(`[Leaderboard Service] Sync complete. Cached until ${new Date(this.cacheExpiresAt).toLocaleTimeString()}`);
    return response;
  }
}

export const leaderboardManager = new LeaderboardManager(
  Number(process.env.CACHE_TTL_SECONDS || 300)
);
