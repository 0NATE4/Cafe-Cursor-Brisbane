export type InterestId =
  | "web-apps"
  | "automation"
  | "data"
  | "games"
  | "productivity"
  | "creative"
  | "apis"
  | "cli";

export type ExperienceId = "beginner" | "intermediate" | "comfortable";

export type TimeId = "quick" | "half-day" | "full-day";

export type MotivationId = "learn" | "solve" | "fun" | "portfolio";

export type QuizAnswers = {
  experience: ExperienceId;
  interests: InterestId[];
  time: TimeId;
  motivation: MotivationId;
};

export type ProjectIdea = {
  id: string;
  title: string;
  tagline: string;
  interests: InterestId[];
  experience: ExperienceId[];
  time: TimeId[];
  motivation: MotivationId[];
  description: string;
  mvpFeatures: string[];
  suggestedStack: string[];
  buildSteps: string[];
  stretchGoals: string[];
  cursorPrompt: string;
};
