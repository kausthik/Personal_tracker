import { Schema, models, model } from "mongoose";
import type { Snapshot } from "@/src/lib/weekly-rate";

// One row per LeetCode user per IST day, written by the nightly cron
const LeetCodeSnapshotSchema = new Schema<Snapshot>(
  {
    username: { type: String, required: true },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    easy: { type: Number, required: true },
    medium: { type: Number, required: true },
    hard: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

LeetCodeSnapshotSchema.index({ username: 1, date: 1 }, { unique: true });

export default models.LeetCodeSnapshot || model<Snapshot>("LeetCodeSnapshot", LeetCodeSnapshotSchema);
