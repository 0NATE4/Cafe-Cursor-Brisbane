import type {
  ExperienceId,
  InterestId,
  MotivationId,
  ProjectIdea,
  TimeId,
} from "../types/ideaSpark";

export type IdeaInput = {
  id: string;
  title: string;
  tagline: string;
  interests: InterestId[];
  experience?: ExperienceId[];
  time?: TimeId[];
  motivation?: MotivationId[];
  description: string;
  mvpFeatures: string[];
  suggestedStack?: string[];
  buildSteps?: string[];
  stretchGoals?: string[];
  cursorPrompt?: string;
};

export function createProjectIdea(input: IdeaInput): ProjectIdea {
  const experience: ExperienceId[] = input.experience ?? ["beginner", "intermediate"];
  const time: TimeId[] = input.time ?? ["half-day"];
  const motivation: MotivationId[] = input.motivation ?? ["fun", "portfolio"];

  const suggestedStack = input.suggestedStack ?? [
    "React + TypeScript",
    "Vite",
    "localStorage or static JSON where useful",
  ];

  const buildSteps = input.buildSteps ?? [
    `Scaffold ${input.title} with a clear single-page layout`,
    "Implement the core user flow and state",
    "Add validation, empty states, and responsive styling",
    "Polish interactions and persist data locally if it helps",
  ];

  const stretchGoals = input.stretchGoals ?? [
    "Export or share results",
    "Keyboard shortcuts for power users",
    "Theme toggle or accessibility improvements",
  ];

  const cursorPrompt =
    input.cursorPrompt ??
    `Build ${input.title}: ${input.description} Ship MVP features: ${input.mvpFeatures.join("; ")}. Keep scope tight for a cafe hack session.`;

  return {
    id: input.id,
    title: input.title,
    tagline: input.tagline,
    interests: input.interests,
    experience,
    time,
    motivation,
    description: input.description,
    mvpFeatures: input.mvpFeatures,
    suggestedStack,
    buildSteps,
    stretchGoals,
    cursorPrompt,
  };
}
