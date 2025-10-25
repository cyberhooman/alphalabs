# Repository Guidelines

## Project Structure & Module Organization
The app is a Vite + React + TypeScript SPA. Page-level routes live in `src/pages` and are mounted in `src/App.tsx` through React Router. Shared UI primitives sourced from shadcn/ui reside under `src/components/ui`; keep new reusable widgets there or nest feature-specific pieces inside `src/components`. Hooks belong in `src/hooks`, and cross-cutting helpers in `src/lib`. Global styles and Tailwind layers sit in `src/index.css` and `src/App.css`. Static assets go in `public/`, while production bundles appear in the gitignored `dist/`.

## Build, Test, and Development Commands
- `npm install` installs dependencies; run after pulling freshly generated UI modules from Lovable.
- `npm run dev` starts Vite on localhost with hot module reload.
- `npm run build` creates a production bundle under `dist/`; execute before publishing.
- `npm run build:dev` builds in development mode to debug bundler issues.
- `npm run preview` serves the latest build for stakeholder review.
- `npm run lint` runs ESLint with the TypeScript + React Hooks profiles.

## Coding Style & Naming Conventions
Write React components in TypeScript using 2-space indentation and Prettier-compatible formatting (even though Prettier is not enforced). Prefer PascalCase component files (`FeatureCard.tsx`) and camelCase utilities (`formatDate.ts`). Use the `@/` alias to reference `src/` and avoid brittle relative imports. Tailwind classes should stay in markup; extract shared tokens to `tailwind.config.ts`. Remove unused exports manually because ESLint disables the corresponding rule.

## Testing Guidelines
A formal spec runner is not yet wired in. For now, smoke-test critical flows via `npm run dev` and capture regressions with `npm run lint`. When you introduce automated tests, align with the team on adopting Vitest + Testing Library, keep files near the UI they cover (for example, `FeatureCard.test.tsx`), and target user-facing behaviors instead of implementation details.

## Commit & Pull Request Guidelines
Recent commits use short, imperative summaries (e.g., “Fix button animation”). Mirror that tone, keep each commit focused, and reference tickets in the body when relevant. PRs should describe the user impact, list test commands executed, and attach screenshots or recordings for visual updates. Ensure lint runs succeed before requesting review, and include a link to the Lovable preview when applicable.
