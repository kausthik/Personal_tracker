// Run: node --test src/lib/weekly-rate.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeRates, dailySolved, shiftDateKey, snapshotDateKey, withLive } from "./weekly-rate.ts";

const snap = (date: string, easy: number, medium: number, hard: number) => ({
  username: "a",
  date,
  easy,
  medium,
  hard,
  total: easy + medium + hard,
});

test("per-day rate over the window, per section and overall", () => {
  const [r] = computeRates(["a"], [snap("2026-10-17", 17, 10, 1), snap("2026-10-10", 10, 3, 1), snap("2026-10-12", 11, 4, 1)]);
  assert.deepEqual([r.easy, r.medium, r.hard, r.total], [1, 1, 0, 2]);
});

test("missing or single snapshot gives 0, drops never go negative", () => {
  const [none, drop] = computeRates(["x", "a"], [snap("2026-10-10", 5, 5, 5), snap("2026-10-11", 4, 5, 5)]);
  assert.equal(none.total, 0);
  assert.equal(drop.easy, 0);
});

test("date keys: late cron run counts as the previous IST day", () => {
  assert.equal(snapshotDateKey(new Date("2026-10-17T18:20:00Z")), "2026-10-17"); // 23:50 IST
  assert.equal(snapshotDateKey(new Date("2026-10-17T18:55:00Z")), "2026-10-17"); // 00:25 IST next day
  assert.equal(shiftDateKey("2026-10-03", -7), "2026-09-26");
});

test("live counts replace today's snapshot and skip failed (zero) fetches", () => {
  const rows = withLive([snap("2026-10-10", 10, 0, 0), snap("2026-10-17", 99, 0, 0)], [{ ...snap("", 17, 0, 0), username: "a" }, { ...snap("", 0, 0, 0), username: "b" }], "2026-10-17");
  assert.deepEqual(rows.map((r) => [r.username, r.date, r.total]), [["a", "2026-10-10", 10], ["a", "2026-10-17", 17]]);
  assert.equal(computeRates(["a"], rows)[0].total, 1);
});

test("daily = live total minus yesterday's snapshot, else calendar count", () => {
  const live = [{ username: "a", total: 30, daily: 9 }, { username: "x", total: 5, daily: 2 }];
  assert.deepEqual(dailySolved(live, [snap("2026-10-16", 20, 7, 0)]).map((u) => u.daily), [3, 2]);
});
