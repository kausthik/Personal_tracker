"use server";

import { auth } from "../lib/auth";
import { connectDB } from "../lib/mongodb";
import { Revision } from "../models/revision.model";
import { Study } from "../models/study.model";
import { Types } from "mongoose";
import { DAILY_REVISION_GOAL } from "../lib/revision.utils";

export interface DayActivity {
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 - 6
  revisions: number;
  studies: number;
  isPerfectDay: boolean; // met DAILY_REVISION_GOAL
}

export interface ActivityHistoryResponse {
  days: DayActivity[];
  currentStreak: number;
  maxStreak: number;
  totalActiveDays: number;
  perfectDaysCount: number;
  todayRevisions: number;
  todayStudies: number;
}

export async function getStudyActivityHistoryAction(
  daysCount: number = 70 // 10 weeks of history
): Promise<ActivityHistoryResponse> {
  await connectDB();
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const now = new Date();

  // Start date (daysCount days ago at 00:00:00)
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - daysCount + 1);
  startDate.setHours(0, 0, 0, 0);

  const userObjectId = new Types.ObjectId(userId);

  // Fetch completed revisions and logged studies in range
  const [completedRevisions, studies] = await Promise.all([
    Revision.find(
      {
        userId: userObjectId,
        status: "COMPLETED",
        completedAt: { $gte: startDate },
      },
      { completedAt: 1 }
    ).lean(),
    Study.find(
      {
        userId: userObjectId,
        studiedAt: { $gte: startDate },
      },
      { studiedAt: 1, createdAt: 1 }
    ).lean(),
  ]);

  // Map to YYYY-MM-DD
  const revisionCountMap = new Map<string, number>();
  for (const r of completedRevisions) {
    if (r.completedAt) {
      const d = new Date(r.completedAt);
      const key = d.toLocaleDateString("en-CA"); // YYYY-MM-DD
      revisionCountMap.set(key, (revisionCountMap.get(key) || 0) + 1);
    }
  }

  const studyCountMap = new Map<string, number>();
  for (const s of studies) {
    const rawDate = s.studiedAt || s.createdAt;
    if (rawDate) {
      const d = new Date(rawDate);
      const key = d.toLocaleDateString("en-CA");
      studyCountMap.set(key, (studyCountMap.get(key) || 0) + 1);
    }
  }

  // Build sequential calendar days from startDate to now
  const days: DayActivity[] = [];
  const current = new Date(startDate);
  const todayKey = now.toLocaleDateString("en-CA");

  while (current <= now) {
    const key = current.toLocaleDateString("en-CA");
    const revisions = revisionCountMap.get(key) || 0;
    const studyCount = studyCountMap.get(key) || 0;

    days.push({
      date: key,
      dayOfWeek: current.getDay(),
      revisions,
      studies: studyCount,
      isPerfectDay: revisions >= DAILY_REVISION_GOAL,
    });

    current.setDate(current.getDate() + 1);
  }

  // Calculate streaks
  let maxStreak = 0;
  let tempStreak = 0;
  let totalActiveDays = 0;
  let perfectDaysCount = 0;

  for (const d of days) {
    const isActive = d.revisions > 0 || d.studies > 0;
    if (isActive) {
      totalActiveDays++;
      tempStreak++;
      if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }

    if (d.isPerfectDay) {
      perfectDaysCount++;
    }
  }

  // Current streak counts back from today; if today has no activity yet, it continues from yesterday
  let currentStreak = 0;
  const lastIndex = days.length - 1;
  const isTodayActive =
    lastIndex >= 0 && (days[lastIndex].revisions > 0 || days[lastIndex].studies > 0);

  for (let i = isTodayActive ? lastIndex : lastIndex - 1; i >= 0; i--) {
    if (days[i].revisions > 0 || days[i].studies > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    days,
    currentStreak,
    maxStreak,
    totalActiveDays,
    perfectDaysCount,
    todayRevisions: revisionCountMap.get(todayKey) || 0,
    todayStudies: studyCountMap.get(todayKey) || 0,
  };
}
