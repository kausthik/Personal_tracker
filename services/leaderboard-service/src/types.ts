export interface UserStats {
  username: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  daily: number;
  rating: number;
}

export interface LeaderboardResponse {
  byTotal: UserStats[];
  byEasy: UserStats[];
  byMedium: UserStats[];
  byHard: UserStats[];
  byRating: UserStats[];
  byDaily: UserStats[];
  cached: boolean;
  lastUpdated: string;
}
