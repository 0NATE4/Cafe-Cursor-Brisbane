type SocialLinksProps = {
  github?: string;
  linkedin?: string;
  website?: string;
};

export function SocialLinks({ github, linkedin, website }: SocialLinksProps) {
  if (!github && !linkedin && !website) return null;

  return (
    <div className="social-links">
      {github ? (
        <a href={github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      ) : null}
      {linkedin ? (
        <a href={linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      ) : null}
      {website ? (
        <a href={website} target="_blank" rel="noreferrer">
          Website
        </a>
      ) : null}
    </div>
  );
}
