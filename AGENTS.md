# Repository Guidelines

## Project Structure & Module Organization
- Next.js 15 routes live in `src/app`, grouped by locale-aware segments and server/client components.
- Shared UI primitives live in `src/components`; domain data sits in `src/data`; cross-cutting utilities are under `src/lib`; reusable TypeScript definitions live in `src/types`.
- Static assets ship from `public/`. Build outputs land in `.next/` during development and `out/` after exporting—never commit either directory.

## Build, Test, and Development Commands
- `npm run dev` — launch the Turbopack dev server with hot reload.
- `npm run build` — create an optimized production build; Netlify also calls this via `npm run build:netlify`.
- `npm run start` — serve the previous production build locally.
- `npm run lint` — run `next lint` across TypeScript/TSX; fix issues before opening a PR.
- `npm run clean` — clear build and cache artifacts when the dev server behaves inconsistently.
- `npx playwright test` — execute E2E specs in `tests/` using `playwright.config.ts`.

## Coding Style & Naming Conventions
- TypeScript is strict; favor explicit interfaces and types in `src/types` and import via the `@/` path alias.
- Use functional React components, 2-space indentation, and keep Tailwind utility classes grouped by layout → spacing → color.
- Localized strings should flow through the helpers in `src/lib/i18n.ts`; avoid hardcoding text inside components.

## Testing Guidelines
- Keep Playwright specs colocated in `tests/*.spec.ts` and describe scenarios with concise `test.describe` blocks.
- Name tests after the user journey they cover (e.g. `bias-calculator-navigation.spec.ts`).
- Run `npx playwright test --ui` while authoring for interactive debugging; commit only passing specs.

## Commit & Pull Request Guidelines
- Recent history favors short, imperative messages (e.g. `업데이트`). Match the direct style but add enough context: `feat: 업데이트 bias 요약`. Dual-language summaries are welcome when touching user-facing copy.
- Reference linked issues, note any Playwright coverage, and attach UI screenshots or recordings when visual changes occur.
- Ensure Netlify deploy previews stay green before requesting review; document any env variable changes in the PR body.

## Development Environment Tips
- Run `npx playwright install` once to provision browsers locally.
- Tailwind tokens live in `tailwind.config.js`; reuse defined colors and font stacks instead of ad hoc values.
