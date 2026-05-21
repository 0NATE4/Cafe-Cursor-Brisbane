import { Link, useParams } from "react-router-dom";
import { CardCover } from "../components/CardCover";
import { SocialLinks } from "../components/SocialLinks";
import { getContributionBySlug } from "../data/contributions";

export function DetailPage() {
  const { slug } = useParams();
  const contribution = slug ? getContributionBySlug(slug) : undefined;

  if (!contribution) {
    return (
      <main className="page-shell detail-layout">
        <p>Could not find that card.</p>
        <Link className="back-link" to="/">
          Back to board
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell detail-layout">
      <Link className="back-link" to="/">
        Back to board
      </Link>
      <article className="detail-card">
        <div className="detail-cover">
          <CardCover coverImage={contribution.coverImage} name={contribution.name} />
        </div>
        <div className="detail-content">
          <h1>{contribution.name}</h1>
          <p className="detail-headline">{contribution.headline}</p>
          <p className="detail-summary">{contribution.summary}</p>
          <p className="detail-body">{contribution.body}</p>
          <SocialLinks
            github={contribution.github}
            linkedin={contribution.linkedin}
            website={contribution.website}
          />
        </div>
      </article>
    </main>
  );
}
