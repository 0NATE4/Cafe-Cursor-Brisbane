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
VITE_BASE_PATH=/cafe-cursor-board/ npm run build
cp dist/index.html dist/404.html
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` does this automatically on push to `main`.
