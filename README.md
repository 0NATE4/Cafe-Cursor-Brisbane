# Cafe Cursor Board

Shared board for Cafe Cursor Brisbane. Add your project as a card on **[cafecursorbrisbane.com](https://cafecursorbrisbane.com/)** by adding one JSON file.

## Add your card

### 1. Copy the template

In this repo, duplicate:

`src/content/contributions/_template.json`

→ `src/content/contributions/your-slug.json`

Use a short, URL-friendly slug (e.g. `jane-doe`). **Do not edit** `_template.json`.

You can do this in GitHub (Add file → Create new file → paste and edit) or on your machine.

### 2. Fill in your file

| Field | What to write |
| --- | --- |
| `slug` | Same as your filename (e.g. `jane-doe`) |
| `name` | Your name |
| `contribution` | One sentence: what you made |
| `headline` | Short title for your project |
| `summary` | One paragraph for your detail page |
| `body` | Longer story; multiple lines are fine |
| `github`, `linkedin`, `website` | Optional links (leave out if you do not use them) |
| `coverImage` | Optional; see step 3 |

See `src/content/contributions/example-contributor.json` for a filled-in example.

### 3. Optional cover image

Add an image at:

`public/contributions/your-slug/cover.png`

Then set in your JSON:

`"coverImage": "/contributions/your-slug/cover.png"`

### 4. Publish

Push your changes on a **branch** and open a **pull request** (do not push to `main`). After your PR is merged, the site updates and your card appears on the board.

Not sure how to do that? Ask Nathan :)
