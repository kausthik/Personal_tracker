"use client";

import { useState } from "react";
import MealUploadModal from "./mealUploadModal";
import ActivityModal from "./activityModal";

interface Ingredient { name: string; quantity: string; calories: number; }
interface Meal { _id: string; mealType: string; totalCalories: number; createdAt: string; }
interface Activity { _id: string; activityType: string; durationMinutes?: number; caloriesBurned: number; notes?: string; }

interface Props {
  initialMeals: Meal[];
  initialActivities: Activity[];
  totalConsumed: number;
  totalBurned: number;
  dailyCalorieTarget: number;
  currentWeight: number | null;
  targetWeight: number | null;
  bmi: number | null;
  userName: string;
  today: string;
}

const MEAL_COLORS: Record<string, string> = {
  breakfast: "#f59e0b",
  lunch: "#10b981",
  dinner: "#6366f1",
  snack: "#f43f5e",
};

const MEAL_ICONS: Record<string, string> = {
  breakfast: "☀️",
  lunch: "🥗",
  dinner: "🍽️",
  snack: "🍎",
};

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "#60a5fa" };
  if (bmi < 25) return { label: "Healthy", color: "#10b981" };
  if (bmi < 30) return { label: "Overweight", color: "#f59e0b" };
  return { label: "Obese", color: "#f43f5e" };
}

export default function DashboardClient({
  initialMeals, initialActivities, totalConsumed, totalBurned,
  dailyCalorieTarget, currentWeight, targetWeight, bmi, userName, today,
}: Props) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [consumed, setConsumed] = useState(totalConsumed);
  const [burned, setBurned] = useState(totalBurned);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const net = consumed - burned;
  const remaining = dailyCalorieTarget - net;
  const consumedPct = Math.min((consumed / dailyCalorieTarget) * 100, 100);
  const burnedPct = Math.min((burned / dailyCalorieTarget) * 100, 100);

  const dateLabel = new Date(today + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  function onMealAdded(meal: Meal) {
    setMeals((prev) => [...prev, meal]);
    setConsumed((prev) => prev + meal.totalCalories);
    setShowMealModal(false);
  }

  function onActivityAdded(activity: Activity) {
    setActivities((prev) => [...prev, activity]);
    setBurned((prev) => prev + activity.caloriesBurned);
    setShowActivityModal(false);
  }

  async function deleteMeal(id: string, cal: number) {
    setDeletingId(id);
    await fetch(`/api/meals?id=${id}`, { method: "DELETE" });
    setMeals((prev) => prev.filter((m) => m._id !== id));
    setConsumed((prev) => prev - cal);
    setDeletingId(null);
  }

  async function deleteActivity(id: string, cal: number) {
    setDeletingId(id);
    await fetch(`/api/activity?id=${id}`, { method: "DELETE" });
    setActivities((prev) => prev.filter((a) => a._id !== id));
    setBurned((prev) => prev - cal);
    setDeletingId(null);
  }

  const bmiBand = bmi ? bmiCategory(bmi) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f11", color: "#f0f0f0", fontFamily: "'Inter', sans-serif" }}>
      {/* Top nav */}
      <nav style={{ borderBottom: "1px solid #1e1e24", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6366f1,#f43f5e)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>CalTrack</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/calorie-tracker/progress" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>Progress</a>
          <a href="/calorie-tracker/settings" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>Settings</a>
          <a href="/profile" title="Profile" aria-label="Profile" style={{ width: 32, height: 32, borderRadius: "50%", background: "#1e1e24", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "inherit", textDecoration: "none" }}>
            {userName.charAt(0).toUpperCase()}
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>{dateLabel}</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
            Hey, {userName.split(" ")[0]} 👋
          </h1>
        </div>

        {/* Stat cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Consumed", value: consumed, unit: "kcal", color: "#6366f1", icon: "🍴" },
            { label: "Burned", value: burned, unit: "kcal", color: "#10b981", icon: "🔥" },
            { label: "Net", value: net, unit: "kcal", color: net > dailyCalorieTarget ? "#f43f5e" : "#f0f0f0", icon: "⚖️" },
            { label: "Remaining", value: remaining, unit: "kcal", color: remaining < 0 ? "#f43f5e" : "#f59e0b", icon: "🎯" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, letterSpacing: "-0.02em" }}>{s.value.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label} • {s.unit}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Daily goal — {dailyCalorieTarget.toLocaleString()} kcal</span>
            <span style={{ fontSize: 12, color: "#666" }}>{Math.round(consumedPct)}% consumed</span>
          </div>
          <div style={{ height: 10, background: "#0f0f11", borderRadius: 99, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", height: "100%", width: `${consumedPct}%`, background: "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: 99, transition: "width 0.4s ease" }} />
            {burnedPct > 0 && (
              <div style={{ position: "absolute", right: 0, height: "100%", width: `${burnedPct}%`, background: "linear-gradient(90deg,#059669,#10b981)", borderRadius: 99, opacity: 0.5 }} />
            )}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "#6366f1" }}>■ Consumed</span>
            <span style={{ fontSize: 11, color: "#10b981" }}>■ Burned back</span>
          </div>
        </div>

        {/* BMI + weight row */}
        {(bmi || currentWeight || targetWeight) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
            {currentWeight && (
              <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Current weight</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{currentWeight} <span style={{ fontSize: 14, fontWeight: 400, color: "#666" }}>kg</span></div>
              </div>
            )}
            {targetWeight && currentWeight && (
              <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>To goal</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: currentWeight <= targetWeight ? "#10b981" : "#f59e0b" }}>
                  {currentWeight <= targetWeight ? "✓ Reached" : `${(currentWeight - targetWeight).toFixed(1)} kg`}
                </div>
              </div>
            )}
            {bmi && bmiBand && (
              <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>BMI</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: bmiBand.color }}>{bmi}</div>
                <div style={{ fontSize: 11, color: bmiBand.color, marginTop: 2 }}>{bmiBand.label}</div>
              </div>
            )}
          </div>
        )}

        {/* Two column: meals + activities */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Meals */}
          <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Today's meals</h2>
              <button
                onClick={() => setShowMealModal(true)}
                style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                + Add meal
              </button>
            </div>

            {meals.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#444" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🍽️</div>
                <div style={{ fontSize: 13 }}>No meals logged yet</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>Upload a photo to get started</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {meals.map((m) => (
                  <div key={m._id} style={{ background: "#0f0f11", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 14 }}>{MEAL_ICONS[m.mealType] || "🍴"}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: MEAL_COLORS[m.mealType] || "#888", textTransform: "capitalize" }}>{m.mealType}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{m.totalCalories}</span>
                      <span style={{ fontSize: 10, color: "#555" }}>kcal</span>
                      <button
                        onClick={() => deleteMeal(m._id, m.totalCalories)}
                        disabled={deletingId === m._id}
                        style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 12, padding: 0 }}>
                        {deletingId === m._id ? "…" : "✕"}
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #1e1e24", paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
                  <span style={{ color: "#666" }}>Total</span>
                  <span style={{ color: "#6366f1" }}>{consumed} kcal</span>
                </div>
              </div>
            )}
          </div>

          {/* Activities */}
          <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Activity</h2>
              <button
                onClick={() => setShowActivityModal(true)}
                style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                + Log activity
              </button>
            </div>

            {activities.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#444" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🏃</div>
                <div style={{ fontSize: 13 }}>No activity logged yet</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>Add a walk, run, gym session…</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activities.map((a) => (
                  <div key={a._id} style={{ background: "#0f0f11", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "capitalize", marginBottom: 4 }}>🏃 {a.activityType}</div>
                      {a.durationMinutes && <div style={{ fontSize: 11, color: "#555" }}>{a.durationMinutes} min</div>}
                      {a.notes && <div style={{ fontSize: 11, color: "#666" }}>{a.notes}</div>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#10b981" }}>-{a.caloriesBurned}</span>
                      <span style={{ fontSize: 10, color: "#555" }}>kcal</span>
                      <button
                        onClick={() => deleteActivity(a._id, a.caloriesBurned)}
                        disabled={deletingId === a._id}
                        style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 12, padding: 0 }}>
                        {deletingId === a._id ? "…" : "✕"}
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #1e1e24", paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
                  <span style={{ color: "#666" }}>Total burned</span>
                  <span style={{ color: "#10b981" }}>-{burned} kcal</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMealModal && (
        <MealUploadModal today={today} onClose={() => setShowMealModal(false)} onSuccess={onMealAdded} />
      )}
      {showActivityModal && (
        <ActivityModal today={today} onClose={() => setShowActivityModal(false)} onSuccess={onActivityAdded} />
      )}
    </div>
  );
}
