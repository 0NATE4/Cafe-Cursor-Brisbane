/**
 * Generates src/data/ideaSeeds.generated.ts (112 ideas).
 * Run: node scripts/generate-ideas.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/data/ideaSeeds.generated.ts");

function s(id, title, tagline, interests, description, mvp, opts = {}) {
  return { id, title, tagline, interests: interests.split(","), description, mvpFeatures: mvp, ...opts };
}

/** @type {Array<Record<string, unknown>>} */
const catalog = [
  s("pomodoro-cafe-timer", "Pomodoro Cafe Timer", "Focus sprints with optional cafe ambience.", "productivity,web-apps", "A Pomodoro timer with work/break cycles, session count, and optional cafe sound.", ["25/5 timer controls", "Session counter", "Optional ambience toggle", "localStorage settings"], { time: ["quick", "half-day"], motivation: ["solve", "learn"] }),
  s("wifi-qr-display", "WiFi QR Display", "Scannable QR for guest WiFi.", "web-apps,productivity", "Enter SSID and password, generate a QR code guests scan to join.", ["SSID/password form", "Live QR preview", "Download PNG", "Copy connection string"], { time: ["quick"], experience: ["beginner"] }),
  s("table-topic-generator", "Table Topic Generator", "Icebreakers for dev meetup tables.", "games,web-apps,creative", "Random conversation starters for hackathon and cafe cursor tables.", ["Category chips", "Shuffle animation", "Mark used prompts", "Copy to clipboard"], { time: ["quick"], motivation: ["fun"] }),
  s("bill-splitter", "Bill Splitter", "Split cafe bills with tip and tax.", "web-apps,productivity", "Fair bill splitting including tip, tax, and uneven item splits.", ["Subtotal tip tax inputs", "Per-person totals", "Rounding options", "Copy summary"], { time: ["quick"], experience: ["beginner"] }),
  s("currency-converter", "Travel Currency Converter", "Quick AUD conversions abroad.", "web-apps,data", "Convert currencies with manual rates or a free API.", ["Currency pair selector", "Swap button", "Manual rate override", "Recent history"], { time: ["quick", "half-day"] }),
  s("project-name-generator", "Project Name Generator", "Codenames for side projects.", "creative,games,web-apps", "Combine word lists into memorable project names and slugs.", ["Themed word lists", "Lock slots", "Copy slug", "Favorites list"], { time: ["quick"], motivation: ["fun"] }),
  s("slugify-tool", "Slugify Tool", "URL-safe slugs from any title.", "web-apps,productivity", "Preview kebab, snake, and camel slugs with one-click copy.", ["Live preview", "Case format toggle", "Unicode handling", "Copy feedback"], { time: ["quick"], experience: ["beginner"] }),
  s("coffee-lorem-ipsum", "Coffee Lorem Ipsum", "Placeholder text, coffee-themed.", "creative,web-apps", "Generate coffee-themed filler for mockups.", ["Length slider", "Coffee word bank", "Copy HTML/plain", "Regenerate animation"], { time: ["quick"], motivation: ["fun", "portfolio"] }),
  s("unit-converter", "Unit Converter", "Length, weight, temp, and data units.", "web-apps,productivity", "Tabbed converter for units devs and travelers use daily.", ["Category tabs", "Two-way conversion", "Preset pairs", "Swap units"], { time: ["quick", "half-day"] }),
  s("password-generator", "Password Generator", "Secure passwords, client-side only.", "web-apps,productivity", "Configurable passwords with strength hints, no network.", ["Length and charset toggles", "crypto.random generation", "Strength label", "Copy button"], { time: ["quick"], experience: ["beginner"] }),
  s("base64-toolkit", "Base64 Toolkit", "Encode/decode text and small files.", "web-apps,apis", "Base64 utilities for API debugging in the browser.", ["Text encode/decode", "Small file upload", "Validation errors", "Copy buttons"], { time: ["quick", "half-day"], experience: ["intermediate"] }),
  s("url-encoder", "URL Encoder / Decoder", "Fix query strings fast.", "web-apps,apis", "Encode/decode URLs with parsed query param table.", ["Encode/decode modes", "Query param table", "Examples", "Copy actions"], { time: ["quick"] }),
  s("timestamp-converter", "Timestamp Converter", "Unix, ISO, and human dates.", "web-apps,apis,data", "Convert timestamps with timezone support.", ["Flexible input", "Multi-format output", "Timezone select", "Now button"], { time: ["quick"], experience: ["intermediate"] }),
  s("cron-explainer", "Cron Expression Explainer", "Cron in plain English.", "automation,cli,productivity", "Parse cron and show next run times.", ["Cron validation", "Plain English summary", "Next 5 runs", "Presets"], { time: ["half-day"], experience: ["intermediate", "comfortable"] }),
  s("uuid-batch-generator", "UUID Batch Generator", "Bulk v4 UUIDs for fixtures.", "web-apps,apis,automation", "Generate many UUIDs for test data.", ["Count selector", "crypto.randomUUID", "Copy all", "Download txt"], { time: ["quick"] }),
  s("markdown-live-editor", "Markdown Live Editor", "Split-pane README drafting.", "web-apps,productivity,creative", "Markdown editor with live preview and export.", ["Split panes", "Live preview", "Autosave", "Download md"], { time: ["half-day"] }),
];

// Programmatic expansion to reach 112 unique ideas
const expansions = [
  ["emoji-picker", "Emoji Picker", "Search and copy emoji fast.", "web-apps,creative", "Emoji grid with search, skin tones, and recent copies.", ["Search filter", "Category tabs", "Copy on click", "Recent list"]],
  ["color-contrast-checker", "Color Contrast Checker", "WCAG contrast for text pairs.", "web-apps,creative", "Pick colors and see WCAG AA/AAA pass/fail.", ["Color inputs", "Contrast ratio", "Pass/fail badges", "Swap colors"]],
  ["flexbox-playground", "Flexbox Playground", "Tweak flex props live.", "web-apps,creative", "Interactive flex container with CSS output.", ["Flex controls", "Live preview", "Copy CSS", "Preset layouts"]],
  ["css-grid-generator", "CSS Grid Generator", "Draw a grid, export CSS.", "web-apps,creative", "Define grid tracks and gap visually.", ["Rows/columns/gap", "Visual overlay", "Copy CSS", "Reset"]],
  ["html-entity-tool", "HTML Entity Tool", "Encode/decode HTML entities.", "web-apps,apis", "Convert special characters for safe HTML.", ["Encode/decode", "Entity reference", "Live preview", "Copy"]],
  ["jwt-decoder", "JWT Decoder", "Inspect JWT header and payload.", "web-apps,apis", "Decode JWT parts without verifying signature.", ["JWT input", "Header/payload view", "Expiry highlight", "Copy claims"]],
  ["hash-generator", "Hash Generator", "SHA-256 hashes in browser.", "web-apps,apis", "Hash text with Web Crypto API.", ["Text input", "SHA-256 output", "Copy hash", "Compare hashes"]],
  ["text-diff-tool", "Text Diff Tool", "Line diff for two texts.", "web-apps,productivity", "Highlight added/removed lines.", ["Two text areas", "Line diff", "Copy diff", "Ignore whitespace"]],
  ["line-sort-dedupe", "Line Sort & Dedupe", "Clean pasted lists.", "web-apps,productivity,automation", "Sort, dedupe, trim lines.", ["Paste area", "Sort asc/desc", "Dedupe toggle", "Copy output"]],
  ["word-counter", "Word Counter", "Words, chars, reading time.", "web-apps,productivity", "Live stats as you type.", ["Word/char count", "Reading time", "Sentence count", "Copy stats"]],
  ["reading-time-estimator", "Reading Time Estimator", "Blog reading minutes.", "web-apps,creative", "Estimate reading time with WPM slider.", ["Paste article", "WPM slider", "Minutes output", "Copy summary"]],
  ["focus-todo-today", "Focus Todo Today", "Only today's tasks.", "productivity,web-apps", "Minimal today-only todo list.", ["Add/complete tasks", "Today view", "localStorage", "Clear done"]],
  ["shopping-list", "Shopping List", "Grocery list with checkoffs.", "productivity,web-apps", "Check off items by category.", ["Add/check items", "Categories", "Clear purchased", "localStorage"]],
  ["packing-list-gen", "Packing List Generator", "Trip packing checklists.", "productivity,web-apps", "Templates by trip type.", ["Trip templates", "Editable list", "Check off", "Export md"]],
  ["gift-idea-roulette", "Gift Idea Roulette", "Random gift ideas.", "games,creative,web-apps", "Gift ideas by recipient and budget.", ["Filters", "Random card", "Favorites", "Copy list"]],
  ["decision-wheel", "Decision Wheel", "Spin to choose.", "games,web-apps", "Custom options on a spin wheel.", ["Custom options", "Spin animation", "Remove winner", "Reset"]],
  ["lunch-roulette", "Lunch Roulette", "Pick lunch fast.", "games,productivity,web-apps", "Random lunch with diet filters.", ["Diet filters", "Random pick", "Exclude recent", "Favorites"]],
  ["compliment-generator", "Compliment Generator", "Dev-themed shout-outs.", "games,creative", "Sincere compliments for demos.", ["Random compliment", "Categories", "Copy text", "No repeats"]],
  ["ascii-art-text", "ASCII Art Text", "Banner text for READMEs.", "creative,cli", "Text to ASCII banners.", ["Text input", "Font style", "Copy output", "Preview"]],
  ["qr-business-card", "QR Business Card", "vCard QR for events.", "web-apps,creative", "QR with contact details.", ["Contact form", "QR preview", "Download PNG", "Copy vCard"]],
  ["link-in-bio", "Link-in-Bio Page", "Single page of your links.", "creative,web-apps", "Personal link hub.", ["Profile section", "Link buttons", "Theme picker", "Mobile layout"]],
  ["micro-portfolio", "Micro Portfolio", "One-page dev portfolio.", "creative,web-apps", "Projects, skills, contact.", ["Hero/about", "Project cards", "Skills tags", "Contact links"]],
  ["readme-badge-builder", "README Badge Builder", "Shields.io badges visually.", "web-apps,productivity", "Build and copy badge markdown.", ["Badge presets", "Label/color fields", "Live preview", "Copy md"]],
  ["changelog-builder", "Changelog Builder", "Keep a Changelog format.", "productivity,web-apps", "Add entries by type.", ["Added/changed/fixed", "Version input", "Markdown export", "Copy"]],
  ["api-status-page", "API Status Page", "Status page for side projects.", "apis,web-apps", "Service statuses with notes.", ["Service list", "Status toggle", "Incident notes", "Public layout"]],
  ["webhook-tester-ui", "Webhook Tester UI", "Inspect POST payloads.", "apis,web-apps", "Simulate webhook receipt.", ["Payload input", "Headers mock", "Pretty JSON", "Save last 5"]],
  ["http-request-builder", "HTTP Request Builder", "Build fetch snippets.", "apis,web-apps", "Configure fetch visually.", ["Method/URL", "Headers", "JSON body", "Copy fetch"]],
  ["curl-to-fetch", "cURL to Fetch", "Convert cURL to fetch.", "apis,automation,web-apps", "Paste cURL, get fetch code.", ["cURL input", "Parse/convert", "Copy code", "Errors"]],
  ["fetch-to-curl", "Fetch to cURL", "Fetch calls to cURL.", "apis,automation,web-apps", "Paste fetch, output cURL.", ["Fetch input", "Extract parts", "Copy cURL", "Examples"]],
  ["graphql-formatter", "GraphQL Formatter", "Pretty-print GraphQL.", "apis,web-apps", "Format and minify queries.", ["Query textarea", "Format", "Minify toggle", "Copy"]],
  ["sql-formatter", "SQL Formatter", "Pretty-print SQL.", "data,apis,web-apps", "Format SQL with indentation.", ["SQL input", "Format", "Uppercase toggle", "Copy"]],
  ["json-to-typescript", "JSON to TypeScript", "Types from JSON sample.", "apis,web-apps,automation", "Generate TS interfaces.", ["JSON input", "Validation", "Interface output", "Copy types"]],
  ["csv-to-json", "CSV to JSON", "Convert CSV to JSON.", "data,web-apps", "Paste CSV, get JSON.", ["CSV paste", "Parse JSON", "Preview table", "Download"]],
  ["json-to-csv", "JSON to CSV", "JSON arrays to CSV.", "data,web-apps", "Flatten JSON to CSV.", ["JSON input", "Flatten keys", "CSV preview", "Download"]],
  ["yaml-json-converter", "YAML ↔ JSON Converter", "Convert config formats.", "apis,automation,web-apps", "YAML and JSON two-pane converter.", ["Two panes", "Both directions", "Parse errors", "Copy output"]],
  ["env-file-editor", ".env File Editor", "Edit env vars safely.", "apis,productivity,web-apps", "Key-value editor with masking.", ["Key-value rows", "Add/remove", "Mask secrets", "Export dotenv"]],
  ["gitignore-generator", "Gitignore Generator", "Stack-based gitignore.", "automation,cli,productivity", "Pick stack, copy gitignore.", ["Stack checkboxes", "Generate", "Copy file", "Preview"]],
  ["license-picker", "License Picker", "Compare OSS licenses.", "productivity,web-apps", "Summaries of common licenses.", ["License list", "Summary", "Full text", "Copy LICENSE"]],
  ["semver-calculator", "SemVer Calculator", "Bump and compare versions.", "automation,cli,productivity", "Increment and compare semver.", ["Version input", "Bump buttons", "Compare", "Copy"]],
  ["package-json-inspector", "package.json Inspector", "Visualize deps and scripts.", "web-apps,data,productivity", "Parse package.json visually.", ["JSON paste", "Deps table", "Scripts list", "Summary"]],
  ["file-tree-generator", "File Tree Generator", "ASCII trees for READMEs.", "cli,productivity,web-apps", "Indented structure to tree.", ["Indented input", "Tree preview", "Copy block", "Templates"]],
  ["image-compressor", "Image Compressor", "Compress in browser.", "creative,web-apps", "Quality slider compression.", ["Upload", "Quality slider", "Size compare", "Download"]],
  ["image-resizer", "Image Resizer", "Resize to dimensions.", "creative,web-apps", "Export PNG/JPEG at size.", ["Upload", "Dimensions", "Aspect lock", "Download"]],
  ["favicon-generator", "Favicon Generator", "Emoji/letter favicons.", "creative,web-apps", "Simple favicon PNG export.", ["Emoji/letter", "Background color", "Preview", "Download"]],
  ["css-gradient-gen", "CSS Gradient Generator", "Linear gradient builder.", "creative,web-apps", "Visual gradient CSS.", ["Color stops", "Angle", "Preview", "Copy CSS"]],
  ["box-shadow-gen", "Box Shadow Generator", "Layer shadows visually.", "creative,web-apps", "Shadow sliders and preview.", ["Sliders", "Color picker", "Preview card", "Copy CSS"]],
  ["font-pairing-picker", "Font Pairing Picker", "Preview font pairs.", "creative,web-apps", "Curated Google Font combos.", ["Pairs list", "Live preview", "Copy imports", "Favorites"]],
  ["memory-card-game", "Memory Card Game", "Flip-and-match cards.", "games,web-apps", "Memory game with timer.", ["4x4 grid", "Flip animation", "Move counter", "Win screen"]],
  ["snake-game", "Snake Game", "Canvas snake classic.", "games,web-apps", "Snake with high score.", ["Canvas loop", "Score", "Game over", "High score"]],
  ["tic-tac-toe", "Tic Tac Toe", "Two-player or AI.", "games,web-apps", "Classic tic tac toe.", ["3x3 board", "Turn indicator", "Win detection", "Reset"]],
  ["wordle-mini", "Wordle Mini", "5-letter word game.", "games,web-apps", "Wordle-style feedback tiles.", ["5x6 grid", "Keyboard", "Tile colors", "Random word"]],
  ["game-2048-mini", "2048 Mini", "Slide tile puzzle.", "games,web-apps", "Minimal 2048 clone.", ["Arrow controls", "Score", "Merge logic", "Game over"]],
  ["pong-canvas", "Pong Canvas", "Two-player pong.", "games,web-apps", "Canvas pong game.", ["Render loop", "Two paddles", "Score", "Restart"]],
  ["click-particles", "Click Particles Toy", "Particles on click.", "games,creative,web-apps", "Satisfying click bursts.", ["Canvas particles", "Colors", "Fade", "Clear"]],
  ["sound-board", "Sound Board", "Grid of sound buttons.", "games,creative", "Play sounds on press.", ["Button grid", "Upload sounds", "Volume", "Mute"]],
  ["metronome", "Metronome", "Adjustable BPM clicks.", "creative,games,web-apps", "Visual/audio metronome.", ["BPM slider", "Start/stop", "Beat indicator", "Tap tempo"]],
  ["habit-tracker-month", "Habit Tracker Month", "Monthly habit grid.", "productivity,web-apps,data", "GitHub-style habit calendar.", ["Add habit", "Toggle days", "Month nav", "localStorage"]],
  ["mood-journal", "Mood Journal", "Log daily mood fast.", "productivity,creative,web-apps", "Emoji mood with notes.", ["Mood picker", "Optional note", "Week view", "Persist"]],
  ["gratitude-jar", "Gratitude Jar", "Daily gratitude notes.", "productivity,creative", "Add and draw random notes.", ["Add note", "Jar UI", "Random draw", "Export"]],
  ["expense-tracker-lite", "Expense Tracker Lite", "Log spends by category.", "productivity,data,web-apps", "Quick expense logging.", ["Add expense", "Totals", "Breakdown", "Export CSV"]],
  ["subscription-tracker", "Subscription Tracker", "Track SaaS renewals.", "productivity,data,web-apps", "Monthly subscription costs.", ["Add sub", "Cost/date", "Monthly total", "List view"]],
  ["job-application-tracker", "Job Application Tracker", "Kanban job search.", "productivity,web-apps", "Track application stages.", ["Kanban columns", "Company/role", "Notes", "localStorage"]],
  ["book-reading-log", "Book Reading Log", "Track books and progress.", "productivity,web-apps", "Reading list with ratings.", ["Add book", "Status", "Rating", "Filter"]],
  ["movie-watchlist", "Movie Watchlist", "Queue films to watch.", "productivity,creative,web-apps", "Watchlist with watched toggle.", ["Add title", "Watched toggle", "Tags", "Filter"]],
  ["recipe-box", "Recipe Box", "Save recipes locally.", "productivity,creative,web-apps", "Recipe cards with ingredients.", ["Add recipe", "Ingredients", "Steps", "Search"]],
  ["meal-planner-week", "Meal Planner Week", "Plan Mon–Sun meals.", "productivity,web-apps", "Weekly meal grid.", ["7-day grid", "Meal slots", "Favorites", "Shopping hints"]],
  ["workout-log", "Workout Log Simple", "Log sets and reps.", "productivity,data,web-apps", "Exercise history tracker.", ["Add entry", "Date groups", "History", "Export JSON"]],
  ["stretch-reminder", "Stretch Reminder", "Interval stretch nudges.", "productivity,web-apps", "Remind to move every N minutes.", ["Interval setting", "Toast alert", "Start/pause", "Skip"]],
  ["water-intake-tracker", "Water Intake Tracker", "Glasses toward daily goal.", "productivity,web-apps", "Tap to log water glasses.", ["Daily goal", "Tap add", "Progress ring", "Midnight reset"]],
  ["parking-timer", "Parking Meter Timer", "Countdown to ticket expiry.", "productivity,web-apps", "Parking expiry warnings.", ["End time", "Countdown", "5-min warning", "Notification"]],
  ["multi-event-countdown", "Multi Event Countdown", "Several upcoming dates.", "productivity,web-apps,creative", "Dashboard of countdowns.", ["Add events", "Sorted list", "Accent colors", "Edit/delete"]],
  ["timezone-meeting-planner", "Timezone Meeting Planner", "Find overlap across zones.", "productivity,web-apps,data", "Overlapping business hours.", ["City pickers", "Hour grid", "Highlight overlap", "Copy time"]],
  ["world-clock-grid", "World Clock Grid", "Live clocks for cities.", "productivity,web-apps", "Favorite city time cards.", ["Add city", "Live clocks", "12/24h", "Reorder"]],
  ["log-viewer", "Log Line Colorizer", "Highlight log levels.", "data,apis,web-apps", "Colorize error/warn/info lines.", ["Log paste", "Level colors", "Filter levels", "Copy html"]],
  ["regex-cheatsheet", "Regex Cheatsheet", "Searchable regex reference.", "web-apps,productivity", "Copyable pattern reference.", ["Categories", "Search", "Copy pattern", "Examples"]],
  ["git-command-cheatsheet", "Git Command Cheatsheet", "Common git recipes.", "cli,productivity,web-apps", "Searchable git commands.", ["Command cards", "Search", "Copy", "Tags"]],
  ["shell-script-template", "Shell Script Template Gen", "Bash boilerplate.", "cli,automation", "Bash templates with safety flags.", ["Template types", "Generate", "Copy", "Explain flags"]],
  ["rename-files-cli", "Batch Rename CLI", "Pattern file renames.", "cli,automation", "Prefix/suffix/sequential renames.", ["Directory arg", "Pattern", "Dry run", "Apply"]],
  ["folder-stats-cli", "Folder Stats CLI", "Files by extension.", "cli,data,automation", "Summarize folder contents.", ["Path arg", "Extension stats", "Size estimate", "JSON flag"]],
  ["csv-cli-summary", "CSV CLI Summary", "Column stats in terminal.", "cli,data", "CSV column summary CLI.", ["File path", "Stats table", "Null counts", "Delimiter flag"]],
  ["json-pretty-cli", "JSON Pretty CLI", "Format JSON in terminal.", "cli,apis", "Pretty or minify JSON files.", ["File/stdin", "Pretty print", "Minify flag", "Validate"]],
  ["watch-folder-cli", "Watch Folder CLI", "Run command on changes.", "cli,automation", "Minimal file watcher runner.", ["Watch path", "Debounced rerun", "Ignore globs", "Clear console"]],
  ["screenshot-notes", "Screenshot Notes", "Annotate screenshots.", "creative,productivity,web-apps", "Arrows and labels on images.", ["Upload", "Draw shapes", "Text labels", "Export PNG"]],
  ["bug-report-template", "Bug Report Template", "GitHub issue bodies.", "productivity,web-apps", "Markdown bug report form.", ["Steps/expected/actual", "Environment", "Preview", "Copy"]],
  ["standup-note-gen", "Standup Note Generator", "Yesterday/today/blockers.", "productivity,web-apps", "Formatted standup copy.", ["Three fields", "Preview", "Copy md", "History"]],
  ["meeting-cost-calculator", "Meeting Cost Calculator", "Dollar cost of meetings.", "data,productivity,web-apps", "Meeting cost from headcount.", ["Attendees", "Salary est", "Duration", "Cost display"]],
  ["tech-debt-register", "Tech Debt Register", "Log and prioritize debt.", "productivity,web-apps", "Impact/effort scoring.", ["Add item", "Scores", "Sort priority", "Export md"]],
  ["feature-flag-demo", "Feature Flag Demo", "Toggle features locally.", "apis,web-apps,automation", "Flags from JSON config.", ["flags.json", "Toggle panel", "Conditional UI", "Persist"]],
  ["rate-limit-visualizer", "Rate Limit Visualizer", "Token bucket animation.", "apis,data,web-apps", "Visualize rate limiting.", ["RPS slider", "Bucket animation", "Reject log", "Explainer"]],
  ["websocket-echo-demo", "WebSocket Echo Demo", "Minimal realtime chat.", "apis,web-apps", "Tiny websocket chat.", ["Message input", "Live list", "Connection status", "Clear"]],
  ["openapi-viewer-lite", "OpenAPI Viewer Lite", "Browse OpenAPI endpoints.", "apis,web-apps", "Paste spec, list paths.", ["Spec paste", "Endpoint list", "Method badges", "Schema expand"]],
  ["dns-lookup-ui", "DNS Lookup UI Mock", "Explain DNS record types.", "apis,web-apps", "Educational DNS mock UI.", ["Domain input", "Record type", "Mock response", "Explain"]],
  ["password-strength-meter", "Password Strength Meter", "Detailed password feedback.", "web-apps,productivity", "Criteria checklist for passwords.", ["Input", "Checklist", "Strength bar", "Show/hide"]],
  ["keyboard-shortcut-trainer", "Keyboard Shortcut Trainer", "Flash cards for shortcuts.", "games,productivity,web-apps", "Learn IDE shortcuts.", ["Decks", "Quiz mode", "Score", "Custom deck"]],
  ["brisbane-cafe-list", "Brisbane Cafe List", "Static cafe directory.", "creative,web-apps", "Filterable Brisbane cafes.", ["Static JSON", "Suburb filter", "Tags", "Maps links"]],
  ["weather-brisbane-widget", "Brisbane Weather Widget", "Weather card for Brisbane.", "web-apps,data", "Current weather fetch.", ["API fetch", "Temp/conditions", "Loading/error", "Refresh"]],
  ["uv-index-reminder", "UV Index Reminder AU", "Sunscreen nudge by UV.", "productivity,web-apps,data", "UV level and advice.", ["Location", "UV display", "Advice text", "Daily mock alert"]],
  ["public-transport-mock", "Transit Departures Mock", "Fake departure board.", "web-apps,creative,data", "Simulated transit board.", ["Route select", "Departures", "Auto-refresh", "Delay badges"]],
  ["poll-live", "Live Poll", "Instant polls with codes.", "web-apps,games", "Create and vote on polls.", ["Create poll", "Share code", "Vote UI", "Results chart"]],
  ["retro-board", "Team Retro Board", "Glad/sad/mad columns.", "productivity,web-apps", "Retrospective sticky board.", ["Three columns", "Add cards", "Anonymous opt", "Export"]],
  ["pair-program-timer", "Pair Programming Timer", "Switch driver/navigator.", "productivity,web-apps", "Role-switch interval timer.", ["Interval", "Role indicator", "Switch sound", "Session log"]],
  ["desk-setup-showcase", "Desk Setup Showcase", "Carousel your desk gear.", "creative,web-apps", "Desk item showcase cards.", ["Item cards", "Photos", "Filter", "Detail modal"]],
  ["npm-readme-gen", "npm README Generator", "Package README sections.", "automation,productivity,web-apps", "Fill README from form.", ["Name/description", "Section toggles", "Preview", "Copy"]],
  ["dockerfile-template-gen", "Dockerfile Template Gen", "Stack Dockerfile starters.", "automation,cli,apis", "Node/Python Dockerfile templates.", ["Stack select", "Generate", "Copy", "dockerignore"]],
  ["ci-yaml-template", "GitHub Actions Template", "Workflow YAML generator.", "automation,cli,apis", "GH Actions for test/lint/deploy.", ["Workflow type", "YAML output", "Copy", "Explain steps"]],
  ["code-screenshot", "Code Screenshot Maker", "Beautiful code images.", "creative,web-apps", "Themed code PNG export.", ["Code input", "Theme", "Padding controls", "Export PNG"]],
  ["terminal-portfolio", "Terminal Portfolio", "Portfolio as fake shell.", "creative,web-apps,cli", "Type commands in terminal UI.", ["Terminal UI", "Command parser", "Responses", "Easter eggs"]],
  ["api-latency-chart", "API Latency Chart", "Ping URLs over time.", "apis,data,web-apps", "Fetch latency chart.", ["URL input", "Ping batch", "Line chart", "Error log"]],
  ["markdown-table-builder", "Markdown Table Builder", "Visual table to md.", "productivity,web-apps", "Grid editor to markdown.", ["Grid editor", "Add row/col", "Markdown out", "Copy"]],
  ["lorem-code-generator", "Lorem Code Generator", "Fake code for mockups.", "creative,web-apps", "Plausible code snippets.", ["Language select", "Line count", "Copy block", "Theme"]],
  ["invoice-generator-lite", "Invoice Generator Lite", "Simple printable invoice.", "productivity,web-apps,creative", "Client invoice preview.", ["Client/items form", "Totals", "Print layout", "Print/download"]],
];

for (const [id, title, tagline, interests, description, mvp] of expansions) {
  catalog.push(s(id, title, tagline, interests, description, mvp));
}

const TARGET = 112;
const selected = catalog.slice(0, TARGET);

if (selected.length < TARGET) {
  console.error(`Need ${TARGET} ideas, only have ${selected.length}`);
  process.exit(1);
}

function esc(v) {
  return String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function renderSeed(seed) {
  const lines = [
    "  {",
    `    id: "${seed.id}",`,
    `    title: "${esc(seed.title)}",`,
    `    tagline: "${esc(seed.tagline)}",`,
    `    interests: ${JSON.stringify(seed.interests)},`,
  ];
  if (seed.experience) lines.push(`    experience: ${JSON.stringify(seed.experience)},`);
  if (seed.time) lines.push(`    time: ${JSON.stringify(seed.time)},`);
  if (seed.motivation) lines.push(`    motivation: ${JSON.stringify(seed.motivation)},`);
  lines.push(`    description: "${esc(seed.description)}",`);
  lines.push(`    mvpFeatures: ${JSON.stringify(seed.mvpFeatures)},`);
  if (seed.suggestedStack) lines.push(`    suggestedStack: ${JSON.stringify(seed.suggestedStack)},`);
  if (seed.cursorPrompt) lines.push(`    cursorPrompt: "${esc(seed.cursorPrompt)}",`);
  lines.push("  },");
  return lines.join("\n");
}

const header = `import type { ProjectIdea } from "../types/ideaSpark";
import { createProjectIdea, type IdeaInput } from "../lib/createProjectIdea";

/** Auto-generated — run \`node scripts/generate-ideas.mjs\` to regenerate (${TARGET} ideas). */
const seeds: IdeaInput[] = [
`;

const footer = `];

export const generatedProjectIdeas: ProjectIdea[] = seeds.map((seed) => createProjectIdea(seed));
`;

writeFileSync(outPath, header + selected.map(renderSeed).join("\n") + footer);
console.log(`Wrote ${selected.length} generated ideas (${catalog.length} in catalog)`);
