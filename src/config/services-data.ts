export type servicesType = {
  img_url: string;
  title: string;
  desc: string;
  link: string;
  cta: string;
  features: string[];
  accent: "amber" | "emerald" | "orange";
};

export const servicesData: servicesType[] = [
  {
    img_url: "/services/study-tracker.png",
    title: "Study tracker",
    desc: "Log what you study and let spaced revision bring it back at the right time.",
    link: "/study-tracker",
    cta: "Start studying",
    features: ["Daily revision goal & streaks", "Roadmap planners", "Exam and deadline reminders"],
    accent: "orange",
  },
  {
    img_url: "/services/leetcode_ranking.png",
    title: "Coders' leaderboard",
    desc: "Compete with friends on LeetCode and see exactly who is ahead, and by how much.",
    link: "/leaderboard",
    cta: "See standings",
    features: ["Overall, contest & daily boards", "Easy / Medium / Hard split", "Refreshed every minute"],
    accent: "amber",
  },
  {
    img_url: "/services/calorie-tracker.png",
    title: "Calorie tracker",
    desc: "Count calories, track your weight and stay on course for your fitness goals.",
    link: "/calorie-tracker",
    cta: "Track meals",
    features: ["Meal logging", "Weight progress", "Personal targets"],
    accent: "emerald",
  },
];
