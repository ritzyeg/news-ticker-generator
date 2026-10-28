# Malayala Manorama News Ticker Generation & Editorial Rundown System

A resilient, hybrid broadcast news ticker engine designed for television newsroom workflows. The system ingests long-form raw news dispatches (Malayalam or English), isolates editorial metadata, generates concise TV lower-third tickers conforming to strict broadcast length limits ($\le 10$ words), and provides an interactive editorial rundown console for real-time human verification, priority reordering, and multi-format broadcast exports.

## Architecture Overview

The system operates on a dual-engine architecture prioritizing zero downtime, operational resilience, and factual fidelity:


1. **Deterministic Extractive Fallback Engine (Offline Mode):**
   - Activates automatically when running offline, without an API key, or during network disruptions.
   - Strips internal wire editorial guidance (e.g., regex/prefix matching on reporter desk instructions like `ഡെസ്കിൽ പരിശോധിക്കേണ്ടത്`).
   - Extracts and bounds root headlines to $\le 10$ words deterministically.
3. **Editorial Control Surface (Human-in-the-Loop Frontend):**
   - Real-time word-boundary tracking with dynamic color status (Green $\le 9$, Amber $= 10$, Red $> 10$).
   - One-click `Trim to 10` truncation and `↺ Revert` recovery.
   - In-place rundown priority shifting (`▲ Up` / `▼ Down`).
   - Dynamic SVG-accented TV marquee simulation preview.
   - Dual-format export: Client-side generated JSON (`Blob` API) and server-streamed CSV (`io.StringIO`).

---

## Project Structure

```text
news-ticker-app/
├── app.py              # Flask server, API endpoints, AI & fallback logic
├── requirements.txt    # Python runtime dependencies
├── README.md           # Technical documentation and execution guide
├── templates/
│   └── index.html      # Responsive editorial dashboard layout
└── static/
    ├── style.css       # Newsroom dark-mode styling & marquee animations
    └── app.js          # DOM manipulation, live word regex counters, export handlers
