# Cafe Cursor Brisbane

**May 23, 2026 · Contribution board**

Add your project as a card on **[cafecursorbrisbane.com](https://cafecursorbrisbane.com/)** by forking this repo, adding one JSON file on a branch, and opening a pull request back here.

You do **not** need push access to this repo — you push to **your fork**, then we merge your PR.

## Add your card

### 1. Fork this repo

On GitHub, open **[github.com/0NATE4/Cafe-Cursor-Brisbane](https://github.com/0NATE4/Cafe-Cursor-Brisbane)** and click **Fork** (top right). That creates a copy under your GitHub account.

### 2. Clone your fork

Clone **your** fork, not the original repo. Replace `YOUR-GITHUB-USERNAME` with yours:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/Cafe-Cursor-Brisbane.git
cd Cafe-Cursor-Brisbane
```

In Cursor, you can open that folder and ask the agent to help you add your card from the template.

### 3. Create a branch

Do **not** work on `main`. Create your own branch (use your name or slug):

```bash
git checkout -b yourname
```

### 4. Create your JSON file from the template

You need a **new file** with your own name. Do **not** edit `_template.json`.

1. Open `src/content/contributions/_template.json` and **copy all of its contents**.
2. Create a **new file** next to it: `src/content/contributions/your-slug.json`  
   (use a short, URL-friendly slug, e.g. `jane-doe`).
3. **Paste** the copied template into that new file and save.

Or in the terminal (replace `jane-doe` with your slug):

```bash
cp src/content/contributions/_template.json src/content/contributions/jane-doe.json
```

In Cursor, you can say: *“Create `src/content/contributions/jane-doe.json` using the contents of `_template.json`, then fill in my details.”*

### 5. Fill in your file

| Field | What to write |
| --- | --- |
| `slug` | Same as your filename (e.g. `jane-doe`) |
| `name` | Your name |
| `contribution` | One sentence: what you made |
| `headline` | Short title for your project |
| `summary` | One paragraph for your detail page |
| `body` | Longer story; multiple lines are fine |
| `github`, `linkedin`, `website` | Optional links (leave out if you do not use them) |
| `coverImage` | Optional; see step 6 |

Edit the **new file** you created in step 4 — not `_template.json`.

See `src/content/contributions/example-contributor.json` for a filled-in example.

### 6. Optional cover image

Add an image at:

`public/contributions/your-slug/cover.png`

Then set in your JSON:

`"coverImage": "/contributions/your-slug/cover.png"`

### 7. Commit and push to your fork

When your files are ready:

```bash
git add .
git commit -m "Add my project card"
git push -u origin yourname
```

Use your own commit message if you like. Replace `yourname` with the branch name you created in step 3.

This pushes to **your fork**. You cannot push directly to `0NATE4/Cafe-Cursor-Brisbane` unless you are a collaborator.

### 8. Open a pull request

On GitHub, go to **your fork** and click **Compare & pull request** (or **Contribute → Open pull request**).

Open a PR **into** `0NATE4/Cafe-Cursor-Brisbane` → `main`. After it is merged, the site updates and your card appears on the board.

Not sure how to do that? Ask Nathan :)

## Preview on your machine (optional)

After cloning your fork (step 2) and creating your branch (step 3), you can preview your card before you commit:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).
