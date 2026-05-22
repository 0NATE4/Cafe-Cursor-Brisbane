# Cafe Cursor Brisbane

**May 23, 2026 · Contribution board**

Add your project as a card on **[cafecursorbrisbane.com](https://cafecursorbrisbane.com/)** by cloning this repo, adding one JSON file, and opening a pull request.

## Add your card

### 1. Clone this repo

```bash
git clone https://github.com/0NATE4/Cafe-Cursor-Brisbane.git
cd Cafe-Cursor-Brisbane
```

### 2. Copy the template

Duplicate:

`src/content/contributions/_template.json`

→ `src/content/contributions/your-slug.json`

Use a short, URL-friendly slug (e.g. `jane-doe`). **Do not edit** `_template.json`.

### 3. Fill in your file

| Field | What to write |
| --- | --- |
| `slug` | Same as your filename (e.g. `jane-doe`) |
| `name` | Your name |
| `contribution` | One sentence: what you made |
| `headline` | Short title for your project |
| `summary` | One paragraph for your detail page |
| `body` | Longer story; multiple lines are fine |
| `github`, `linkedin`, `website` | Optional links (leave out if you do not use them) |
| `coverImage` | Optional; see step 4 |

See `src/content/contributions/example-contributor.json` for a filled-in example.

### 4. Optional cover image

Add an image at:

`public/contributions/your-slug/cover.png`

Then set in your JSON:

`"coverImage": "/contributions/your-slug/cover.png"`

### 5. Open a pull request

Commit your changes on a **new branch**, push, and open a **pull request** (do not push to `main`). After your PR is merged, the site updates and your card appears on the board.

Not sure how to do that? Ask Nathan :)

## Preview on your machine (optional)

After cloning (step 1), you can preview your card before opening a PR:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).
