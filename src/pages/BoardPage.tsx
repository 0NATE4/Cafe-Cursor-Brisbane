import { BoardHeader } from "../components/BoardHeader";
import { ContributionCard } from "../components/ContributionCard";
import { contributions } from "../data/contributions";

export function BoardPage() {
  return (
    <main className="page-shell">
      <BoardHeader />
      <section className="board-grid" aria-label="Contributions board">
        {contributions.map((contribution) => (
          <ContributionCard key={contribution.slug} contribution={contribution} />
        ))}
      </section>
    </main>
  );
}
