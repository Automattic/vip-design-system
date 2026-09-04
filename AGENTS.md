# Agents

Instructions for AI agents working on this codebase.

## Project Overview

This is `@automattic/vip-design-system` v3 — a CSS/token-first design system for VIP projects. It provides design tokens, utility classes, layout compositions, and React components for complex interactive patterns.

See `docs/REBUILD-PLAN.md` for full architectural decisions and rationale.

## Tech Stack

- **Vite 8** for building (library mode, ES + CJS output)
- **TypeScript 5.8** for all source files
- **PostCSS** with postcss-import and autoprefixer
- **Style Dictionary v4** for token transformation
- **Vitest 3** + **@testing-library/react** + **jest-axe** for testing
- **Storybook 10** with **@storybook/react-vite** for documentation
- **Lefthook** for pre-commit hooks (check-types, lint, format:check)
- **ESLint 8** + **Prettier 3**
- **Radix UI** for accessible component primitives (where appropriate)
- **React 18** (peer dependency)

## Code Structure

```
src/
  components/          # React components (complex interactive only)
    ComponentName/
      ComponentName.tsx
      ComponentName.test.tsx
      ComponentName.stories.tsx
  css/
    index.css          # Root CSS file — imports all layers in order
    reset.css
    global.css
    compositions/      # Layout patterns (.stack, .cluster, .grid, etc.)
    blocks/            # Component-specific CSS
    utilities/         # Single-purpose utility classes
  index.ts             # Package entry point (React component exports)
tokens/
  primitives/          # Raw value tokens (color, space, type scale, etc.)
  semantic/            # Meaning tokens — reference primitives
  component/           # Component tokens — reference semantic tokens
  themes/
    light.json         # Light theme semantic overrides
    dark.json          # Dark theme semantic overrides
.storybook/            # Storybook configuration
docs/                  # Documentation and tutorials
dist/                  # Compiled output (generated — do not edit)
```

## Commands

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `npm run build`        | Build tokens then compile library                |
| `npm run build:tokens` | Run Style Dictionary to generate CSS from tokens |
| `npm run dev`          | Start Storybook dev server (port 6006)           |
| `npm run test`         | Run Vitest unit tests                            |
| `npm run lint`         | Run ESLint                                       |
| `npm run lint:fix`     | Auto-fix ESLint issues                           |
| `npm run format`       | Auto-format with Prettier                        |
| `npm run format:check` | Check Prettier formatting                        |
| `npm run check-types`  | TypeScript type checking                         |

## Key Conventions

### CUBE CSS methodology

Styles follow four layers in this strict order (enforced via `@layer`):

1. **Compositions** — content-agnostic structural patterns. They arrange elements (`.stack`, `.cluster`, `.grid`), constrain them (`.wrapper`, `.frame`), or define a surface (`.box`). A composition combines several properties into one pattern; if it does a single job, it belongs in utilities instead.
2. **Blocks** — component-specific styles (`.button`, `.dialog`, etc.)
3. **Utilities** — single-purpose classes (`.type-heading-1`, `.bg-layer-2`, `.flow`, `.p-b-4`, etc.)
4. **Exceptions** — states and variants via `data-*` attributes (`[data-variant="danger"]`, `[data-state="open"]`)

**Class names are reserved for compositions, utilities, and blocks. Never use class names for exceptions/states — always use `data-*` attributes.**

### Token inheritance

Three tiers, strictly enforced:

```
Raw value → Primitive token → Semantic token → Component token
```

- Component tokens reference semantic tokens only — never primitives or raw values.
- Semantic tokens are what change between themes.
- Component tokens are scoped to the component's root CSS class, not `:root`.

### Theming

- Light/dark themes are differentiated by color only.
- Semantic color tokens use `light-dark()` with an `@supports` fallback.
- OS-level dark mode (`prefers-color-scheme`) is the primary interface.
- `.theme-dark` / `.theme-light` on `<html>` override the OS setting.

### React components

- React is used only for complex interactive components (dialogs, dropdowns, etc.).
- Components apply CSS classes — no styling logic in JS.
- Use Radix UI primitives where they earn their keep; roll your own when simpler.
- Native HTML elements first (e.g. `<details>/<summary>` over a custom accordion).
- Components accept a `labels` prop for translatable strings (no i18n library in the system).
- Components accept `className` for consumer overrides — no `sx` prop.

### Accessibility

Priority order: native HTML → ARIA enhancement → custom implementation.
All interactive components must have keyboard navigation, correct ARIA patterns, and a jest-axe test.

### Testing

- Tests use Vitest + @testing-library/react. Test user-visible behavior, not implementation details.
- Every interactive React component must include a jest-axe accessibility test.
- Place test files next to the component: `ComponentName.test.tsx`.

### Storybook

- CSF3 format for all stories.
- Autodocs enabled — JSDoc on components and props generates docs pages.
- MDX docs pages in `docs/` are also surfaced in Storybook.
