# Agents

Instructions for AI agents working on this codebase.

## Project Overview

This is `@automattic/vip-design-system`, a React component library and design token system published to npm. It provides 40+ reusable UI components for VIP projects.

## Tech Stack

- **React 18** with **TypeScript 5.2**
- **Theme UI 0.16** for styling (CSS-in-JS via Emotion)
- **Radix UI** for accessible primitive components (accordion, checkbox, dialog, dropdown, switch, tabs, tooltip)
- **Babel 7** for compilation (output to `build/`)
- **Jest 29** + **@testing-library/react** + **jest-axe** for testing
- **Storybook 7.6** for component documentation
- **ESLint 8** with `@automattic/eslint-plugin-wpvip` + **Prettier** (`wp-prettier`)

## Code Structure

```
src/system/              # All components, theme, and utilities
src/system/<Component>/  # Individual component directories
  ComponentName.tsx      # Component implementation
  ComponentName.test.tsx # Unit tests
  ComponentName.stories.tsx # Storybook documentation
  index.ts               # Re-exports (optional)
src/system/theme/        # Theme configuration and generated tokens
src/system/utils/        # Shared utility functions
src/system/index.js      # Package entry point (re-exports all components)
tokens/                  # Design token source files (from Figma Studio)
.storybook/              # Storybook configuration and decorators
docs/                    # Detailed documentation (architecture, contributing, testing, releasing)
build/                   # Compiled output (generated, do not edit)
```

## Commands

| Command                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `npm run test`         | Run Jest unit tests                    |
| `npm run lint`         | Run ESLint                             |
| `npm run lint:fix`     | Auto-fix ESLint issues                 |
| `npm run format:check` | Check Prettier formatting              |
| `npm run format`       | Auto-format with Prettier              |
| `npm run check-types`  | TypeScript type checking               |
| `npm run build`        | Full production build                  |
| `npm run dev`          | Start Storybook dev server (port 6006) |

## Component Conventions

### Creating Components

- Place new components in `src/system/<ComponentName>/`.
- Each component needs at minimum: `ComponentName.tsx`, `ComponentName.test.tsx`, and `ComponentName.stories.tsx`.
- Export the component from `src/system/index.js`.

### Coding Standards

- Follow the WPVIP ESLint configuration defined in `.eslintrc.js`.
- Use Prettier formatting (`wp-prettier`). Run `npm run format` before committing.
- Use TypeScript for all new code. Define prop interfaces with explicit types.
- Use `forwardRef` when wrapping HTML elements or Theme UI components.

### Styling

- Use Theme UI's `sx` prop for styling. Do not use inline styles or CSS modules.
- Reference theme tokens for colors, spacing, and typography (do not hardcode values).
- Support both light and dark themes through the token system.

### Accessibility

- Accessibility is a priority. Use Radix UI primitives when building interactive components (dialogs, dropdowns, tooltips, etc.).
- Include `jest-axe` tests (`toHaveNoViolations`) in component test files.
- Ensure proper ARIA attributes, keyboard navigation, and screen reader support.

### Testing

- Write tests using `@testing-library/react`. Test user-visible behavior, not implementation details.
- Include accessibility tests with `jest-axe`.
- Place test files next to the component: `ComponentName.test.tsx`.
- All tests must pass before submitting a PR: `npm run test`.

### Storybook Stories

- Write stories using the CSF3 format (Component Story Format).
- Include multiple variants and states of the component.
- Place stories next to the component: `ComponentName.stories.tsx`.

## Theme and Design Tokens

- Tokens are managed via Figma Studio and stored in `tokens/`.
- Run `npm run theme-update` to regenerate theme files from tokens.
- Do not manually edit files in `src/system/theme/generated/` — they are overwritten by the theme update script.
- Light theme: `wpvip-product-core`. Dark theme: `wpvip-product-dark`.

## Git Workflow

- Main branch: `trunk`.
- Versioning follows semver (`major.minor.patch`).
- Releases are published to npm via GitHub Actions (preferred) or locally.
- PRs require passing CI checks: lint, format, type checking, and tests.
