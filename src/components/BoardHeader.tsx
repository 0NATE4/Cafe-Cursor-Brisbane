import { assetUrl } from "../lib/assetUrl";
import { REPO_URL } from "../site";

export function BoardHeader() {
  return (
    <header className="board-header">
      <img className="brand-lockup" src={assetUrl("/brand/LOCKUP_HORIZONTAL_2D_DARK.svg")} alt="Cursor" />
      <h1>Cafe Cursor Brisbane</h1>
      <p className="board-header__event">May 23, 2026 · Contribution board</p>

      <div className="board-header__cta">
        <p className="board-header__cta-lead">Want your project on the board?</p>
        <p className="board-header__cta-copy">
          Add what you built{" "}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      </div>

      <p className="board-header__intro">
        A shared showcase of what everyone built. Tap any card to open the full project story.
      </p>
    </header>
  );
}
