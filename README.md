# Cafe Cursor Board

A static, mobile-responsive board site for sharing what each person built.

## Local development

```bash
npm install
npm run dev
```

## Add a new contribution card

1. Copy `src/content/contributions/_template.json` to `src/content/contributions/<your-slug>.json`.
2. Fill in your details.
3. Optional: add a cover image at `public/contributions/<your-slug>/cover.png` and set `coverImage` to `/contributions/<your-slug>/cover.png`.
4. Commit and push.

## Build for GitHub Pages

```bash
VITE_BASE_PATH=/Cafe-Cursor-Brisbane/ npm run build
cp dist/index.html dist/404.html
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds on every push to `main`, commits the production `index.html` / `assets/` bundle to the repo (for legacy branch-based Pages), and also uploads `dist/` for Actions-based Pages.

### One-time Pages setting (recommended)

In the repo **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** instead of **Deploy from a branch / main**. Until then, the workflow still updates `main` with the built `index.html` so the site loads the bundled app instead of raw `/src/main.tsx`.

Live site: https://0nate4.github.io/Cafe-Cursor-Brisbane/
