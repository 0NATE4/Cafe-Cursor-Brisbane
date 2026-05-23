import type { ProjectIdea, QuizAnswers } from "../types/ideaSpark";
import {
  experienceOptions,
  interestOptions,
  motivationOptions,
  timeOptions,
} from "../data/quizQuestions";

function labelFor<T extends string>(
  options: { id: T; label: string }[],
  id: T | T[],
): string {
  if (Array.isArray(id)) {
    return id
      .map((value) => options.find((option) => option.id === value)?.label ?? value)
      .join(", ");
  }
  return options.find((option) => option.id === id)?.label ?? id;
}

export function generateBriefMarkdown(idea: ProjectIdea, answers?: QuizAnswers): string {
  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const profileSection = answers
    ? `## Your profile

- **Experience:** ${labelFor(experienceOptions, answers.experience)}
- **Interests:** ${labelFor(interestOptions, answers.interests)}
- **Time available:** ${labelFor(timeOptions, answers.time)}
- **Motivation:** ${labelFor(motivationOptions, answers.motivation)}

`
    : "";

  const mvpList = idea.mvpFeatures.map((feature) => `- ${feature}`).join("\n");
  const stackList = idea.suggestedStack.map((item) => `- ${item}`).join("\n");
  const stepsList = idea.buildSteps.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const stretchList = idea.stretchGoals.map((goal) => `- ${goal}`).join("\n");

  return `# Project Brief: ${idea.title}

> Generated at Cafe Cursor Brisbane · ${today}

${profileSection}## The idea

**${idea.tagline}**

${idea.description}

## MVP features

${mvpList}

## Suggested stack

${stackList}

## Build steps

${stepsList}

## Stretch goals (if you have time)

${stretchList}

---

## Cursor prompt

Copy everything below into Cursor Agent to start building:

\`\`\`
${idea.cursorPrompt}

Keep scope tight — ship the MVP first, then pick one stretch goal if time allows.
Use modern best practices, clear component structure, and a polished UI appropriate for a cafe demo.
\`\`\`

---

## Tips for Cafe Cursor

1. Start with \`npm create vite@latest\` or scaffold in this repo if you are contributing to the board.
2. Commit early — a working ugly version beats a perfect plan.
3. When it works, add your card: copy \`src/content/contributions/_template.json\` and open a PR.
4. Ask your table or Nathan if you get stuck — that is what the event is for.

Good luck — now go build something fun.
`;
}

export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function copyMarkdown(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
}
