import type { ExperienceId, InterestId, MotivationId, TimeId } from "../types/ideaSpark";

export type QuizOption<T extends string> = {
  id: T;
  label: string;
  hint?: string;
};

export const experienceOptions: QuizOption<ExperienceId>[] = [
  { id: "beginner", label: "Just getting started", hint: "New to coding or shipping projects" },
  { id: "intermediate", label: "Building regularly", hint: "Comfortable with tutorials and small apps" },
  { id: "comfortable", label: "Ship with confidence", hint: "Happy to pick up new APIs and patterns" },
];

export const interestOptions: QuizOption<InterestId>[] = [
  { id: "web-apps", label: "Web apps", hint: "Sites, dashboards, tools in the browser" },
  { id: "automation", label: "Automation", hint: "Scripts that save you time" },
  { id: "data", label: "Data & charts", hint: "CSV, stats, visualizations" },
  { id: "games", label: "Games & playful", hint: "Something fun to demo" },
  { id: "productivity", label: "Productivity", hint: "Tools you would actually use" },
  { id: "creative", label: "Creative & visual", hint: "Design-forward, expressive UI" },
  { id: "apis", label: "APIs & backends", hint: "Servers, endpoints, integrations" },
  { id: "cli", label: "CLI tools", hint: "Terminal commands and scripts" },
];

export const timeOptions: QuizOption<TimeId>[] = [
  { id: "quick", label: "~30 minutes", hint: "Tiny demo, one core feature" },
  { id: "half-day", label: "A few hours", hint: "Solid MVP you can show off" },
  { id: "full-day", label: "All day", hint: "Room for polish and stretch goals" },
];

export const motivationOptions: QuizOption<MotivationId>[] = [
  { id: "learn", label: "Learn something new", hint: "Pick up a skill or library" },
  { id: "solve", label: "Solve a real problem", hint: "Useful after you leave the cafe" },
  { id: "fun", label: "Have fun", hint: "Playful, demo-friendly energy" },
  { id: "portfolio", label: "Portfolio piece", hint: "Polished enough to show employers" },
];
