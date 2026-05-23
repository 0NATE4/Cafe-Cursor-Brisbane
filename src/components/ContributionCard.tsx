import { Link } from "react-router-dom";
import type { Contribution } from "../types";
import { CardCover } from "./CardCover";
import { SocialLinks } from "./SocialLinks";

type ContributionCardProps = {
  contribution: Contribution;
};

export function ContributionCard({ contribution }: ContributionCardProps) {
  return (
    <article className="contribution-card">
      <Link to={`/c/${contribution.slug}`} className="card-link">
        <div className="card-cover">
          <CardCover coverImage={contribution.coverImage} name={contribution.name} />
        </div>
        <div className="card-content">
          <h2>{contribution.name}</h2>
          <p>{contribution.contribution}</p>
        </div>
      </Link>
      <SocialLinks
        github={contribution.github}
        linkedin={contribution.linkedin}
        website={contribution.website}
      />
    </article>
  );
}
