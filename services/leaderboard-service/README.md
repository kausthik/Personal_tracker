# Leaderboard Microservice

Standalone Node.js / Express microservice that syncs public LeetCode user statistics, computes competitive category rankings, and caches results to optimize performance and prevent rate-limiting.

---

## 🚀 Features

- **LeetCode GraphQL Integration**: Fetches problem solve breakdowns (Easy, Medium, Hard), total solved count, daily calendar streaks, and live contest ratings.
- **In-Memory Caching (TTL)**: Automatically caches synchronized standings (default: 5 minutes) and deduplicates concurrent in-flight requests.
- **Dynamic Cohort Management**: Endpoints to list and register new LeetCode handles dynamically.
- **Docker Ready**: Multi-stage lightweight Alpine container with health check.

---

## 🛠️ API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service health status and tracked user count |
| `GET` | `/api/leaderboard` | Full categorized standings (`byTotal`, `byEasy`, `byMedium`, etc.) |
| `GET` | `/api/leaderboard?refresh=true` | Forces cache bypass and fetches fresh data |
| `GET` | `/api/leaderboard/:category` | Specific category (`easy`, `medium`, `hard`, `daily`, `rating`, `total`) |
| `POST` | `/api/leaderboard/refresh` | Force cache invalidation and background sync |
| `GET` | `/api/users` | List of currently tracked LeetCode usernames |
| `POST` | `/api/users` | Add a new username to cohort (`{ "username": "handle" }`) |

---

## 💻 Running Locally

### Development Mode (with hot-reload):
```bash
# From root repository:
npm run dev:leaderboard

# Or inside services/leaderboard-service:
npm install
npm run dev
```

### Production Build:
```bash
npm run build:leaderboard
npm run start:leaderboard
```

---

## 🐳 Running with Docker

### Standalone Docker:
```bash
cd services/leaderboard-service
docker build -t leaderboard-service .
docker run -p 4001:4001 leaderboard-service
```

### With Docker Compose (from repo root):
```bash
docker compose up -d leaderboard-service
```
