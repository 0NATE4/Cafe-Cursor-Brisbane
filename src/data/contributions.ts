import type { Contribution } from "../types";

const modules = import.meta.glob("../content/contributions/*.json", {
  eager: true,
  import: "default"
});

function isContribution(value: unknown): value is Contribution {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.slug === "string" &&
    typeof data.name === "string" &&
    typeof data.contribution === "string" &&
    typeof data.headline === "string" &&
    typeof data.summary === "string" &&
    typeof data.body === "string"
  );
}

export const contributions: Contribution[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("_template.json"))
  .map(([, value]) => value)
  .filter(isContribution)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getContributionBySlug(slug: string): Contribution | undefined {
  return contributions.find((contribution) => contribution.slug === slug);
}
