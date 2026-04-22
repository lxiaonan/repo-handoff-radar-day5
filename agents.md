# Agents Notes

## Purpose

Repo Handoff Radar is a local-first static web product that analyzes an imported project folder and turns it into a practical handoff radar with stack detection, TODO scanning, doc-gap detection, scoped change analysis, and exportable Markdown output.

## File Map

- `index.html`: four-step product structure, sidebar summaries, and all interactive controls.
- `styles.css`: visual system, layout, responsive behavior, and presentation details.
- `app.js`: state management, bilingual copy, local file parsing, deterministic repo analysis, scope reporting, history snapshots, and export logic.
- `.github/workflows/deploy.yml`: GitHub Pages deployment for the static site.
- `docs/`: screenshot, GIF, and demo assets.
- `README.md`: bilingual explanation, inspiration sources, and explicit “what actually works” section.

## Guardrails

- Keep the published build honestly usable without external APIs.
- Do not claim AI understanding unless a real integration is added and wired into the shipped flow.
- Preserve the visible CN/EN toggle in the UI.
- Keep folder import local-first and do not silently upload code anywhere.
- If you add more analysis rules, prefer deterministic parsing over vague or fake intelligence claims.

## Next-Step Ideas

- Add drag-and-drop zip import with a bundled unzip library.
- Support deeper config parsing for monorepos, pnpm workspaces, Gradle, and Maven modules.
- Add a richer diff report between two saved snapshots.
- Add optional model-assisted summaries only after the external integration genuinely works end to end.
