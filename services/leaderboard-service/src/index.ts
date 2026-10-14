import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { leaderboardManager } from "./services/leaderboard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "leaderboard-service",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    trackedUsersCount: leaderboardManager.getUsers().length,
  });
});

// Full leaderboard
app.get("/api/leaderboard", async (req: Request, res: Response) => {
  try {
    const force = req.query.refresh === "true";
    const data = await leaderboardManager.getLeaderboard(force);
    res.json(data);
  } catch (error) {
    console.error("[Leaderboard API Error]:", error);
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});

// Specific category leaderboard
app.get("/api/leaderboard/:category", async (req: Request, res: Response) => {
  try {
    const category = req.params.category.toLowerCase();
    const data = await leaderboardManager.getLeaderboard();

    let list;
    switch (category) {
      case "easy":
        list = data.byEasy;
        break;
      case "medium":
        list = data.byMedium;
        break;
      case "hard":
        list = data.byHard;
        break;
      case "daily":
        list = data.byDaily;
        break;
      case "rating":
      case "contest":
        list = data.byRating;
        break;
      case "total":
      default:
        list = data.byTotal;
        break;
    }

    res.json({
      category,
      standings: list,
      cached: data.cached,
      lastUpdated: data.lastUpdated,
    });
  } catch (error) {
    console.error(`[Leaderboard API Error ${req.params.category}]:`, error);
    res.status(500).json({ error: "Failed to retrieve category leaderboard" });
  }
});

// Force cache refresh
app.post("/api/leaderboard/refresh", async (req: Request, res: Response) => {
  try {
    const data = await leaderboardManager.getLeaderboard(true);
    res.json({ message: "Cache refreshed successfully", data });
  } catch (error) {
    console.error("[Refresh API Error]:", error);
    res.status(500).json({ error: "Failed to refresh leaderboard cache" });
  }
});

// Get cohort usernames
app.get("/api/users", (req: Request, res: Response) => {
  res.json({ users: leaderboardManager.getUsers() });
});

// Add user to cohort
app.post("/api/users", (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "A valid username is required" });
    return;
  }

  const added = leaderboardManager.addUser(username);
  if (!added) {
    res.status(409).json({ error: "User already exists or invalid username" });
    return;
  }

  res.status(201).json({
    message: `User ${username} added to leaderboard tracking`,
    users: leaderboardManager.getUsers(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Leaderboard Microservice running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Leaderboard API: http://localhost:${PORT}/api/leaderboard`);
});
