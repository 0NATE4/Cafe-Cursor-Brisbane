# Cafe Cursor Board

A **shared board** for the group. Everyone adds a card by dropping in one JSON file; the site builds and deploys automatically.

## Add your card

1. Copy the template:
   ```bash
   cp src/content/contributions/_template.json src/content/contributions/your-slug.json
   ```
2. Fill in the fields in your new file (`slug`, `name`, `contribution`, `headline`, `summary`, `body`, and optional links).
3. *(Optional)* Add a cover image at `public/contributions/your-slug/cover.png` and set `coverImage` to `/contributions/your-slug/cover.png`.
4. Commit and push to `main`. Your card appears on the board after deploy.

Use a short, URL-friendly slug (e.g. `jane-doe`). Do not edit `_template.json` itself.

## For maintainers

Local preview:

```bash
npm install
npm run dev
```

Production build (GitHub Pages uses the repo name as the base path):

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

Deploy is handled by `.github/workflows/deploy.yml` on push to `main`.

Design tokens for the dark theme live in `docs/dark-theme-colours.md`.
