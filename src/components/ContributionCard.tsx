import { Link } from "react-router-dom";
import type { Contribution } from "../types";
import { CardCover } from "./CardCover";
import { SocialLinks } from "./SocialLinks";

type ContributionCardProps = {
  contribution: Contribution;
};

export function ContributionCard({ contribution }: ContributionCardProps) {
  const destination = contribution.cardLink ?? `/c/${contribution.slug}`;

  return (
    <article className="contribution-card">
      <Link to={destination} className="card-link">
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
