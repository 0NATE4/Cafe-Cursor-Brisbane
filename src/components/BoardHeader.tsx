import { assetUrl } from "../lib/assetUrl";

export function BoardHeader() {
  return (
    <header className="board-header">
      <img className="brand-lockup" src={assetUrl("/brand/LOCKUP_HORIZONTAL_2D_DARK.svg")} alt="Cursor" />
      <h1>Cafe Cursor Board</h1>
      <p>
        A shared board of what everyone built. Tap any card to open the full project story.
      </p>
    </header>
  );
}
