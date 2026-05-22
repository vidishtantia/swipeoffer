# SwipeOffer

A mobile-first investment banking interview prep app with a Tinder-style swipe interface. Study 5 core IB topic decks, track your progress, bookmark cards, and generate new questions from your own PDF guides using AI.

![SwipeOffer](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

---

## Features

- **Swipe to study** — swipe right for correct, left for incorrect (or use the on-screen buttons)
- **5 topic decks** — Accounting, Equity/EV, Valuation, Merger Models, LBO
- **Tap to reveal** — cards show the question first, tap to flip and see the answer
- **Undo** — undo your last swipe at any time
- **Star / bookmark** — star any card to save it to your personal Starred list
- **Session modes** — study a single topic, pick multiple topics, or Mixed Mode (all topics)
- **Difficulty filter** — filter by Beginner, Intermediate, or Advanced
- **Shuffle toggle** — randomize card order each session
- **End-of-session summary** — score breakdown, accuracy grade, retry wrong answers
- **Statistics page** — per-topic accuracy bars with drill-down to see exactly which questions you got right, wrong, or haven't reviewed
- **Starred cards page** — browse and review all bookmarked cards, filterable by topic
- **PDF upload + AI generation** — upload any PDF guide and generate a custom number of flashcard questions using AI (powered by OpenRouter)
- **Persistent progress** — all results and starred cards are saved to localStorage
- **Reset to defaults** — one-click restore of the original question bank

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + PostCSS |
| Animations | Framer Motion |
| Database | Node.js built-in `node:sqlite` (no native compilation) |
| AI Generation | OpenRouter API (`openai/gpt-4o-mini`) |
| PDF Parsing | `pdf-parse` |
| Storage | Browser localStorage |

---

## Getting Started

### Prerequisites

- Node.js v22.5+ (required for built-in `node:sqlite`)
- An [OpenRouter](https://openrouter.ai) API key (for AI question generation — optional)

### Installation

```bash
git clone https://github.com/vidishtantia/swipeoffer.git
cd swipeoffer
npm install
```

### Environment Setup

Copy the example env file and add your API key:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
ANTHROPIC_API_KEY=your-openrouter-api-key-here
```

> The variable is named `ANTHROPIC_API_KEY` for legacy reasons but holds your OpenRouter key.
> AI generation is optional — the app ships with 57 built-in questions across all 5 topics.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
swipeoffer/
├── app/
│   ├── page.tsx              # Home / topic selector
│   ├── study/page.tsx        # Study session + swipe deck
│   ├── stats/page.tsx        # Statistics + drill-down
│   ├── starred/page.tsx      # Starred cards
│   ├── admin/page.tsx        # Upload Guide (PDF + AI)
│   └── api/
│       ├── cards/            # GET cards by topic/difficulty
│       ├── cards/starred/    # POST fetch starred cards by ID
│       ├── config/           # GET API key status
│       ├── ingest/           # POST PDF upload + AI generation
│       ├── reset/            # POST reset to default questions
│       └── stats/            # GET card counts per topic
├── components/
│   ├── SwipeCard.tsx         # Draggable flashcard with overlays
│   ├── CardDeck.tsx          # Session state manager
│   ├── TopicSelector.tsx     # Home screen UI
│   └── SessionSummary.tsx    # End-of-session results
├── lib/
│   ├── db.ts                 # SQLite database layer
│   ├── seed-data.ts          # 57 built-in IB questions
│   ├── ai-generator.ts       # OpenRouter AI question generation
│   ├── pdf-parser.ts         # PDF text extraction
│   ├── storage.ts            # localStorage helpers
│   └── types.ts              # Shared TypeScript types
└── .env.local.example        # Environment variable template
```

---

## Default Question Bank

The app ships with 57 hand-crafted questions sourced from BIWS Investment Banking Interview Guide content:

| Topic | Questions |
|---|---|
| Accounting | 21 |
| Equity / Enterprise Value | 10 |
| Valuation & DCF | 10 |
| Merger Models | 8 |
| LBO Models | 9 |

Use the **Upload Guide** page to add more questions from your own PDFs using AI.

---

## AI Question Generation

1. Go to `/admin` (Upload Guide link on the home screen)
2. Select a topic and difficulty
3. Set the number of AI-generated questions (slider: 0–30)
4. Upload a PDF guide
5. Hit **Upload & Parse**

The AI reads the full PDF content and generates the requested number of questions, which are permanently added to that topic's deck.

To remove uploaded questions and restore defaults, use the **Reset to default questions** button at the bottom of the Upload Guide page.

---

## Deployment

Deploy to [Vercel](https://vercel.com) in one click:

1. Push to GitHub (already done)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` as an environment variable in Vercel settings
4. Deploy

> **Note:** The SQLite database is file-based and local to each server instance. On Vercel (serverless), the database resets on each deployment. For persistent storage in production, swap `lib/db.ts` for a hosted database like [Turso](https://turso.tech) (LibSQL) or [PlanetScale](https://planetscale.com).

---

## License

MIT
