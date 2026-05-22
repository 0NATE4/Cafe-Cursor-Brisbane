import { assetUrl } from "../lib/assetUrl";

const REPO_URL = "https://github.com/0NATE4/Cafe-Cursor-Brisbane";

export function BoardHeader() {
  return (
    <header className="board-header">
      <img className="brand-lockup" src={assetUrl("/brand/LOCKUP_HORIZONTAL_2D_DARK.svg")} alt="Cursor" />
      <h1>Cafe Cursor Brisbane</h1>
      <p className="board-header__event">May 23, 2026 · Contribution board</p>
      <p>
        A shared showcase of what everyone built. Tap a card for the full story, or{" "}
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
          add yours on GitHub
        </a>
        .
      </p>
    </header>
  );
}
