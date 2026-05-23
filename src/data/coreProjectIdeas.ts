import type { ProjectIdea } from "../types/ideaSpark";

/** Original hand-authored project ideas (1–16). */
export const coreProjectIdeas: ProjectIdea[] = [
  {
    id: "cafe-order-tracker",
    title: "Cafe Order Tracker",
    tagline: "A tiny board for what everyone ordered at the table.",
    interests: ["web-apps", "productivity"],
    experience: ["beginner", "intermediate"],
    time: ["quick", "half-day"],
    motivation: ["fun", "portfolio"],
    description:
      "Build a shared live board where people at your table add their drink order, dietary notes, and who is paying. Perfect cafe energy — useful in five minutes, demoable in twenty.",
    mvpFeatures: [
      "Add an order with name, drink, and optional note",
      "List all orders with a simple card layout",
      "Mark orders as received or still waiting",
      "Persist data in localStorage so refresh does not wipe the board",
    ],
    suggestedStack: ["React or vanilla HTML/CSS/JS", "localStorage", "Optional: Vite for fast dev"],
    buildSteps: [
      "Scaffold a single-page app with a form and order list",
      "Store orders as JSON in localStorage",
      "Style cards to match a warm cafe aesthetic",
      "Add a clear/reset button for the next round of coffees",
    ],
    stretchGoals: [
      "QR code that opens the board on phones",
      "Split-the-bill calculator per person",
      "Export orders as a shareable image",
    ],
    cursorPrompt:
      "Build a single-page Cafe Order Tracker. Users add orders (name, drink, notes), see a live list of cards, toggle status between waiting and received, and data persists in localStorage. Keep the UI warm and minimal — this is a cafe demo project.",
  },
  {
    id: "project-spark",
    title: "Project Spark",
    tagline: "Help stuck builders pick a demo and export a Cursor brief.",
    interests: ["web-apps", "productivity", "creative"],
    experience: ["beginner", "intermediate", "comfortable"],
    time: ["half-day", "full-day"],
    motivation: ["solve", "portfolio"],
    description:
      "A quiz-style app that asks about interests and time, matches a curated project idea, and downloads a markdown brief ready to paste into Cursor. Meta, helpful, and very on-theme for Cafe Cursor.",
    mvpFeatures: [
      "Multi-step quiz for experience, interests, time, and motivation",
      "Match answers to a curated library of demo project ideas",
      "I'm feeling lucky button for a random idea",
      "Generate and download a .md project brief for Cursor",
    ],
    suggestedStack: ["React + TypeScript", "Client-side matching logic", "Blob download for markdown export"],
    buildSteps: [
      "Define project templates with tags",
      "Build a scoring function that ranks ideas by quiz answers",
      "Create a results view with preview of the generated brief",
      "Add copy-to-clipboard and download .md actions",
    ],
    stretchGoals: [
      "Shareable URL with encoded quiz answers",
      "Community-submitted idea templates",
      "Difficulty badges and estimated build time",
    ],
    cursorPrompt:
      "Build Project Spark: a web app with a short quiz (experience, interests, time, motivation), an I'm feeling lucky button, idea matching from a local template library, and markdown export of a Cursor-ready project brief with MVP features and build steps.",
  },
  {
    id: "habit-streak-cli",
    title: "One-Thing Streak CLI",
    tagline: "Log one daily win from your terminal in under 30 seconds.",
    interests: ["cli", "productivity"],
    experience: ["intermediate", "comfortable"],
    time: ["quick", "half-day"],
    motivation: ["learn", "solve"],
    description:
      "A minimal command-line tool that tracks one habit or daily win. Type `win \"shipped the demo\"` and see your streak. Great if you want something off the browser and instantly useful after the event.",
    mvpFeatures: [
      "Add a daily entry with a short message",
      "Show current streak and last 7 entries",
      "Store entries in a JSON file in the user's home directory",
      "Friendly help text and error messages",
    ],
    suggestedStack: ["Node.js or Python", "JSON file storage", "Optional: npm publish for `npx` usage"],
    buildSteps: [
      "Parse subcommands: add, list, streak",
      "Write/read entries from ~/.one-thing-streak.json",
      "Calculate streak from consecutive calendar days",
      "Add a colorful terminal output with chalk or rich",
    ],
    stretchGoals: [
      "Export streak as markdown for a README badge",
      "Remind via a cron-friendly check command",
      "Sync to a gist or simple API",
    ],
    cursorPrompt:
      "Build a CLI called one-thing-streak. Commands: add a daily win message, list recent wins, show current streak. Persist to ~/.one-thing-streak.json. Calculate streaks by consecutive calendar days. Use Node.js with clear help text.",
  },
  {
    id: "regex-playground",
    title: "Regex Playground",
    tagline: "Test patterns against sample text with instant highlights.",
    interests: ["web-apps", "productivity"],
    experience: ["intermediate", "comfortable"],
    time: ["half-day"],
    motivation: ["learn", "portfolio"],
    description:
      "A focused regex tester with live match highlighting, capture groups, and a few built-in examples. Solves a real pain point and looks sharp in a portfolio.",
    mvpFeatures: [
      "Regex input with flags toggle (g, i, m)",
      "Sample text area with highlighted matches",
      "List capture groups for each match",
      "Preset examples: email, URL, date",
    ],
    suggestedStack: ["React or Svelte", "Native RegExp API", "CSS for match highlighting"],
    buildSteps: [
      "Build two-pane layout: pattern + test string",
      "Highlight matches safely without breaking HTML",
      "Handle invalid regex with inline error messages",
      "Add 3–4 example buttons that load common patterns",
    ],
    stretchGoals: [
      "Explain-the-regex plain English hints",
      "Shareable URL with encoded pattern",
      "Replace mode to preview substitutions",
    ],
    cursorPrompt:
      "Build a Regex Playground web app. Users enter a regex and test string; matches highlight live. Show capture groups, regex flags, inline errors for invalid patterns, and preset examples for email, URL, and dates. Clean dark UI.",
  },
  {
    id: "api-mock-server",
    title: "Instant Mock API",
    tagline: "Spin up fake REST endpoints from a JSON config file.",
    interests: ["apis", "automation"],
    experience: ["intermediate", "comfortable"],
    time: ["half-day", "full-day"],
    motivation: ["learn", "solve"],
    description:
      "Define routes and sample JSON responses in one config file, run a local server, and hit endpoints immediately. Perfect for frontend devs who need a backend in a hurry.",
    mvpFeatures: [
      "Read routes from mocks.json (path, method, response body)",
      "Start a local HTTP server on a chosen port",
      "Support GET and POST with static JSON responses",
      "Log incoming requests to the terminal",
    ],
    suggestedStack: ["Node.js + Express or Fastify", "JSON config file", "Optional: hot reload on config change"],
    buildSteps: [
      "Define mocks.json schema with routes array",
      "Register dynamic routes from config at startup",
      "Add CLI: `mock-api start --port 3001 --config mocks.json`",
      "Ship one example config with users and posts",
    ],
    stretchGoals: [
      "Random delay simulation for loading states",
      "CRUD with in-memory store",
      "OpenAPI export from config",
    ],
    cursorPrompt:
      "Build instant-mock-api: a Node CLI that reads mocks.json defining HTTP routes and JSON responses, starts a local server, logs requests, and supports GET/POST. Include an example config and README.",
  },
  {
    id: "mood-playlist-picker",
    title: "Mood Playlist Picker",
    tagline: "Pick a vibe, get a curated playlist link and cover art grid.",
    interests: ["creative", "web-apps"],
    experience: ["beginner", "intermediate"],
    time: ["quick", "half-day"],
    motivation: ["fun", "portfolio"],
    description:
      "Choose mood chips like Focus, Chill, or Hype and see a beautiful grid of playlist cards with links to Spotify or YouTube. No API keys needed if you hardcode a curated list.",
    mvpFeatures: [
      "Mood filter chips that narrow the playlist grid",
      "Playlist cards with title, mood tags, and external link",
      "Responsive grid with hover animations",
      "Optional dark/light theme toggle",
    ],
    suggestedStack: ["React", "Static JSON playlist data", "CSS grid and transitions"],
    buildSteps: [
      "Create playlists.json with mood tags and URLs",
      "Build filter state and derived playlist list",
      "Design card component with cover placeholders",
      "Add a random playlist button",
    ],
    stretchGoals: [
      "Embed preview player where allowed",
      "User-submitted playlist form (local only)",
      "Animated background that shifts with mood",
    ],
    cursorPrompt:
      "Build Mood Playlist Picker: mood filter chips, a responsive grid of playlist cards from static JSON (title, moods, link, cover color), smooth hover states, and a surprise me button. No external API required.",
  },
  {
    id: "csv-summarizer",
    title: "CSV Quick Summarizer",
    tagline: "Drop a CSV, get instant charts and column stats.",
    interests: ["data", "web-apps"],
    experience: ["intermediate", "comfortable"],
    time: ["half-day", "full-day"],
    motivation: ["learn", "portfolio"],
    description:
      "Upload or paste CSV data and immediately see column types, null counts, min/max for numbers, and a simple bar chart for categorical columns. All client-side — no server needed.",
    mvpFeatures: [
      "Paste or upload CSV text",
      "Parse headers and infer column types",
      "Show summary table: type, unique count, sample values",
      "Simple bar chart for the first categorical column",
    ],
    suggestedStack: ["React", "Papa Parse or custom CSV parser", "Chart.js or plain SVG bars"],
    buildSteps: [
      "Parse CSV into rows and columns",
      "Infer numeric vs string columns",
      "Render summary stats per column",
      "Add one visualization for top categories",
    ],
    stretchGoals: [
      "Export summary as markdown report",
      "Filter rows with a query box",
      "Detect date columns and plot over time",
    ],
    cursorPrompt:
      "Build CSV Quick Summarizer: paste/upload CSV, parse client-side, show per-column stats (type, nulls, min/max or top values), and a simple bar chart for categorical data. No backend. Clean data-viz aesthetic.",
  },
  {
    id: "typing-mini-game",
    title: "Coffee Break Typing Race",
    tagline: "Race to type cafe-themed phrases before the timer runs out.",
    interests: ["games", "web-apps"],
    experience: ["beginner", "intermediate"],
    time: ["quick", "half-day"],
    motivation: ["fun"],
    description:
      "A lightweight typing game with cafe-themed sentences, WPM score, and a leaderboard stored in localStorage. Fun to demo on a projector and easy to finish in an afternoon.",
    mvpFeatures: [
      "Display a random phrase and countdown timer",
      "Track typed characters with correct/incorrect styling",
      "Calculate WPM and accuracy at the end",
      "Local high-score table (top 5)",
    ],
    suggestedStack: ["Vanilla JS or React", "localStorage", "CSS animations for keystroke feedback"],
    buildSteps: [
      "Build phrase display with per-character state",
      "Wire keyboard input and timer",
      "Compute WPM and accuracy on completion",
      "Save and show local leaderboard",
    ],
    stretchGoals: [
      "Multiplayer room with a shared phrase",
      "Custom phrase packs",
      "Sound effects toggle",
    ],
    cursorPrompt:
      "Build Coffee Break Typing Race: random cafe-themed phrases, 60-second timer, live correct/incorrect character highlighting, WPM and accuracy score, localStorage top-5 leaderboard. Playful UI.",
  },
  {
    id: "bookmark-deduplicator",
    title: "Bookmark Deduplicator",
    tagline: "Import browser bookmarks and merge duplicates intelligently.",
    interests: ["productivity", "automation"],
    experience: ["comfortable"],
    time: ["half-day", "full-day"],
    motivation: ["solve"],
    description:
      "Import an HTML bookmark export, find duplicates by URL normalization, and export a cleaned file. A practical tool you will actually use after the event.",
    mvpFeatures: [
      "Upload Netscape-style bookmarks HTML export",
      "Parse folders and links into a tree",
      "Detect duplicates by normalized URL (strip trailing slashes, www)",
      "Export cleaned HTML or flat JSON",
    ],
    suggestedStack: ["React", "DOMParser for HTML import", "Client-side only processing"],
    buildSteps: [
      "Parse bookmark HTML into link objects",
      "Normalize URLs and group duplicates",
      "UI to review merges before export",
      "Generate downloadable cleaned HTML",
    ],
    stretchGoals: [
      "Tag suggestions from folder names",
      "Dead link checker (fetch HEAD requests)",
      "Merge similar titles with fuzzy match",
    ],
    cursorPrompt:
      "Build Bookmark Deduplicator: upload browser bookmark HTML, parse links, find duplicates by normalized URL, show merge review UI, export cleaned HTML. All client-side.",
  },
  {
    id: "ai-prompt-library",
    title: "Personal Prompt Library",
    tagline: "Save, tag, and one-click copy your best Cursor prompts.",
    interests: ["productivity", "creative", "web-apps"],
    experience: ["beginner", "intermediate"],
    time: ["quick", "half-day"],
    motivation: ["solve", "portfolio"],
    description:
      "A local-first app to store prompts you reuse in Cursor — refactor this, write tests, explain this file — with tags, search, and copy buttons. Immediately useful for everyone at the event.",
    mvpFeatures: [
      "Create prompts with title, body, and tags",
      "Search and filter by tag",
      "One-click copy to clipboard",
      "Persist in localStorage or export/import JSON",
    ],
    suggestedStack: ["React", "localStorage", "Optional: markdown preview for prompt body"],
    buildSteps: [
      "CRUD UI for prompt cards",
      "Tag filter and text search",
      "Copy button with toast feedback",
      "Export/import backup JSON",
    ],
    stretchGoals: [
      "Variable placeholders like {{filename}}",
      "Keyboard shortcut palette",
      "Sync via GitHub gist",
    ],
    cursorPrompt:
      "Build Personal Prompt Library: CRUD for prompt cards (title, body, tags), search and tag filters, copy-to-clipboard, localStorage persistence, JSON export/import. Dark minimal UI suited for developers.",
  },
  {
    id: "event-countdown",
    title: "Event Countdown Widget",
    tagline: "Beautiful countdown to your next meetup with shareable embed.",
    interests: ["web-apps", "creative"],
    experience: ["beginner"],
    time: ["quick"],
    motivation: ["fun", "learn"],
    description:
      "Enter an event name and date, get a gorgeous countdown with days/hours/minutes and a shareable link. Great first project if you want something visual and completable fast.",
    mvpFeatures: [
      "Form: event name, target date/time, accent color",
      "Live countdown display updating every second",
      "Shareable URL encoding event params",
      "Fullscreen presentation mode",
    ],
    suggestedStack: ["HTML/CSS/JS or React", "URLSearchParams for sharing", "CSS gradients"],
    buildSteps: [
      "Build countdown timer logic",
      "Create bold typographic display",
      "Encode settings in query string",
      "Add fullscreen toggle for demos",
    ],
    stretchGoals: [
      "ICS calendar download",
      "Confetti when countdown hits zero",
      "Multiple timezone display",
    ],
    cursorPrompt:
      "Build Event Countdown Widget: form for name/date/color, live countdown, shareable URL with encoded params, fullscreen mode. Bold typography and smooth tick animations.",
  },
  {
    id: "git-commit-message-helper",
    title: "Commit Message Helper",
    tagline: "Turn bullet points into conventional commit messages.",
    interests: ["cli", "productivity", "automation"],
    experience: ["beginner", "intermediate"],
    time: ["quick", "half-day"],
    motivation: ["learn", "solve"],
    description:
      "A small web or CLI tool where you jot what changed, pick a type (feat, fix, docs), and get a well-formatted conventional commit message ready to paste.",
    mvpFeatures: [
      "Select commit type and optional scope",
      "Short summary and longer body fields",
      "Live preview of final message",
      "Copy button and optional clipboard on generate",
    ],
    suggestedStack: ["React or Node CLI", "No backend required"],
    buildSteps: [
      "Form with type, scope, summary, body",
      "Assemble conventional commit format",
      "Validate summary length (50 chars hint)",
      "Copy and reset actions",
    ],
    stretchGoals: [
      "Parse git diff and suggest type",
      "Commit template history",
      "Integrate as a git prepare-commit-msg hook",
    ],
    cursorPrompt:
      "Build Commit Message Helper: pick conventional commit type/scope, enter summary and body, live preview, copy to clipboard. Web app with clean developer-focused UI.",
  },
  {
    id: "local-first-notes",
    title: "Local-First Sticky Notes",
    tagline: "Kanban-style notes that never leave your browser.",
    interests: ["productivity", "web-apps"],
    experience: ["beginner", "intermediate"],
    time: ["half-day"],
    motivation: ["portfolio", "solve"],
    description:
      "A Trello-lite board with Todo, Doing, Done columns. Drag cards, edit inline, autosave to localStorage. Classic demo that teaches state management and UX polish.",
    mvpFeatures: [
      "Three columns with add-card forms",
      "Drag and drop cards between columns",
      "Inline edit for card title and notes",
      "Autosave to localStorage on every change",
    ],
    suggestedStack: ["React", "HTML drag-and-drop or @dnd-kit", "localStorage"],
    buildSteps: [
      "Model board state as columns and cards",
      "Implement drag-and-drop between columns",
      "Persist and hydrate from localStorage",
      "Polish with smooth drag animations",
    ],
    stretchGoals: [
      "Multiple boards",
      "Markdown in card body",
      "Export board as JSON",
    ],
    cursorPrompt:
      "Build Local-First Sticky Notes: three kanban columns, drag-and-drop cards, inline editing, localStorage autosave. Smooth animations and accessible keyboard support where practical.",
  },
  {
    id: "color-palette-from-photo",
    title: "Palette from Photo",
    tagline: "Upload an image, extract a 5-color palette for your UI.",
    interests: ["creative", "web-apps"],
    experience: ["intermediate"],
    time: ["half-day"],
    motivation: ["fun", "portfolio"],
    description:
      "Upload a photo (coffee, skyline, anything) and extract dominant colors with hex codes and copy buttons. Designers and devs both love this one.",
    mvpFeatures: [
      "Image upload with preview",
      "Extract 5 dominant colors using canvas sampling",
      "Show hex codes with copy buttons",
      "Preview palette as a mini UI mock",
    ],
    suggestedStack: ["React", "Canvas API", "Simple k-means or bucket sampling"],
    buildSteps: [
      "Load image into canvas and sample pixels",
      "Cluster or bucket into 5 colors",
      "Display swatches with hex values",
      "Build mini preview card using extracted colors",
    ],
    stretchGoals: [
      "Export as CSS variables",
      "Accessibility contrast checker against bg",
      "Save palette history",
    ],
    cursorPrompt:
      "Build Palette from Photo: upload image, sample dominant colors via canvas, show 5 swatches with copyable hex codes and a mini UI preview using those colors. Client-side only.",
  },
  {
    id: "json-diff-viewer",
    title: "JSON Diff Viewer",
    tagline: "Paste two JSON blobs, see a clear side-by-side diff.",
    interests: ["apis", "productivity", "web-apps"],
    experience: ["intermediate", "comfortable"],
    time: ["half-day"],
    motivation: ["solve", "portfolio"],
    description:
      "Developers constantly compare API responses. Build a tool that pretty-prints two JSON inputs and highlights added, removed, and changed keys.",
    mvpFeatures: [
      "Two text areas for JSON input with parse validation",
      "Tree or inline diff view with color coding",
      "Expand/collapse nested objects",
      "Copy diff summary as markdown",
    ],
    suggestedStack: ["React", "Custom diff or diff library", "Syntax highlighting optional"],
    buildSteps: [
      "Parse and validate both JSON inputs",
      "Compute structural diff recursively",
      "Render diff with green/red/yellow styling",
      "Handle parse errors gracefully inline",
    ],
    stretchGoals: [
      "Load from URL fetch (CORS permitting)",
      "Patch format output (RFC 6902)",
      "Dark/light syntax themes",
    ],
    cursorPrompt:
      "Build JSON Diff Viewer: two JSON paste areas, validation errors inline, recursive structural diff with color-coded added/removed/changed keys, collapsible tree view, copy diff summary.",
  },
  {
    id: "micro-saas-landing",
    title: "One-Page SaaS Landing",
    tagline: "Ship a polished landing page for a fake (or real) product idea.",
    interests: ["creative", "web-apps"],
    experience: ["beginner", "intermediate"],
    time: ["half-day", "full-day"],
    motivation: ["portfolio", "learn"],
    description:
      "Pick a whimsical product ('AI that rates your coffee foam art') and build a conversion-focused landing page with hero, features, pricing, and FAQ. Pure frontend portfolio gold.",
    mvpFeatures: [
      "Hero with headline, subcopy, and CTA button",
      "Three feature cards with icons",
      "Simple pricing section (free vs pro)",
      "FAQ accordion and footer",
    ],
    suggestedStack: ["React or Astro", "CSS animations", "Placeholder content you invent"],
    buildSteps: [
      "Pick a fun product concept and write copy",
      "Build responsive sections with semantic HTML",
      "Add scroll animations and hover states",
      "Ensure mobile layout looks great",
    ],
    stretchGoals: [
      "Fake signup form with success toast",
      "Dark mode",
      "OpenGraph meta tags and social preview",
    ],
    cursorPrompt:
      "Build a one-page SaaS landing for a whimsical coffee-related product. Include hero, features, pricing, FAQ accordion, footer, responsive layout, and subtle scroll animations. Invent all copy.",
  },
];
