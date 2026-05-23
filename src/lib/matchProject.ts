import { projectIdeas } from "../data/projectIdeas";
import type { ProjectIdea, QuizAnswers } from "../types/ideaSpark";

function scoreIdea(idea: ProjectIdea, answers: QuizAnswers): number {
  let score = 0;

  const interestOverlap = answers.interests.filter((i) => idea.interests.includes(i)).length;
  score += interestOverlap * 4;

  if (idea.experience.includes(answers.experience)) {
    score += 3;
  }

  if (idea.time.includes(answers.time)) {
    score += 3;
  }

  if (idea.motivation.includes(answers.motivation)) {
    score += 2;
  }

  return score;
}

export function matchProjects(answers: QuizAnswers, limit = 5): ProjectIdea[] {
  const ranked = projectIdeas
    .map((idea) => ({ idea, score: scoreIdea(idea, answers) }))
    .sort((a, b) => b.score - a.score || a.idea.title.localeCompare(b.idea.title));

  return ranked.slice(0, limit).map((entry) => entry.idea);
}

export function pickRandomProject(): ProjectIdea {
  const index = Math.floor(Math.random() * projectIdeas.length);
  return projectIdeas[index];
}

export function getProjectById(id: string): ProjectIdea | undefined {
  return projectIdeas.find((idea) => idea.id === id);
}
