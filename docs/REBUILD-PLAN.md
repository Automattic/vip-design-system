# Design System Rebuild Plan

A plan for rebuilding `@automattic/vip-design-system` from the ground up using modern tools and the CUBE CSS methodology. The goal is a system that is simple enough for the Product Design team to contribute to and take ownership of, while being well-crafted, lean, logical, scalable, and extensible.

---

## Table of Contents

- [Project Goals](#project-goals)
- [Key Decisions](#key-decisions)
- [Architecture](#architecture)
- [Infrastructure](#infrastructure)
- [Token Architecture](#token-architecture)
- [Style Dictionary](#style-dictionary)
- [CSS Layer — CUBE CSS](#css-layer--cube-css)
- [React Components](#react-components)
- [Theming](#theming)
- [Internationalization](#internationalization)
- [Accessibility](#accessibility)
- [Documentation](#documentation)
- [Migration Strategy](#migration-strategy)
- [Measuring Success](#measuring-success)
- [Execution Plan](#execution-plan)

---

## Project Goals

- The system should be simple enough for the Product Design team to contribute to and take ownership of without much engineering experience or expertise
- The system should be well-crafted, lean, logical, scalable, and extensible
- The system should be thoroughly documented for both technical and non-technical contributors

---

## Key Decisions

Decisions made during planning that shape the approach.

### CSS/token-first

The new system is CSS and token-first. CSS variables, utility classes, and layout compositions are the core deliverable. React components are an additive layer on top — used only where interactive behavior genuinely requires them.

### Rebuild, not refactor

The existing system is tightly coupled to Theme UI and Emotion (CSS-in-JS), which conflicts with the CSS/token-first CUBE approach at a foundational level. Refactoring would mean fighting the existing architecture at every step. A clean branch is the right call. All existing knowledge (tokens, component inventory, Figma relationships) is preserved and used to inform the rebuild.

### Remove Theme UI

Theme UI and its Emotion dependency are removed completely. Styling uses PostCSS and CSS custom properties. This eliminates a large transitive dependency and makes styles inspectable in DevTools without hashed class names.

### React for complex interactive components only

React components are included for complex interactive patterns where JS is genuinely needed — focus trapping, keyboard navigation, ARIA state management. Simple layout and typographic patterns become CSS-only.

### Radix is a tool, not a requirement

Radix UI primitives are used where they earn their keep (dialogs, dropdowns, tooltips, etc.). Simpler components can be rolled with plain React or native HTML. There is no requirement to use Radix for every interactive component.

### Native HTML first

The accessibility hierarchy is: **native HTML element first**, then ARIA enhancement, then custom implementation. Use `<details>/<summary>` for disclosure, `<dialog>` for modals where it fits, `<button>` over `<div onClick>`. Reach for Radix or custom ARIA patterns only when the native element genuinely cannot do the job.

### TypeScript throughout

All source files use TypeScript. Type safety is maintained across the system.

### ESLint: standard rules

Standard ESLint rules are used for now. The configuration is structured so that `@automattic/eslint-plugin-wpvip` can be added in a one-line change if required by team policy.

---

## Architecture

### Token inheritance — three tiers, strict

```
Raw value → Primitive token → Semantic token → Component token
```

- **Primitives** name _what_ a value is: `color-blue-500: #3B82F6`
- **Semantics** name _what it means_: `color-interactive: {color-blue-500}`
- **Component tokens** name _where it's used_: `button-bg: {color-interactive}`

**Rule:** Component tokens may only reference semantic tokens, never primitives or raw values. If a component token has no appropriate semantic token to reference, a new semantic token must be created first. This is the constraint that keeps theming maintainable as the system grows.

### Token scoping

| Token tier | CSS scope                                |
| ---------- | ---------------------------------------- |
| Primitive  | `:root`                                  |
| Semantic   | `:root` (+ theme overrides)              |
| Component  | `.block-class` (scoped to the component) |

Component tokens belong on the component's own root element, not on `:root`. This keeps the global namespace clean and creates a simple customization API:

```css
.button {
	--button-bg: var(--color-interactive);
	background: var(--button-bg);
}

/* Consumer override — no specificity tricks needed */
.my-context .button {
	--button-bg: var(--color-brand);
}
```

### CUBE CSS selector convention

| Layer       | Selector type  | Example                                             |
| ----------- | -------------- | --------------------------------------------------- |
| Composition | Class          | `.stack`, `.cluster`, `.grid`                       |
| Utility     | Class          | `.type-heading-1`, `.bg-interactive`                |
| Block       | Class          | `.button`, `.dialog`                                |
| Exception   | Data attribute | `[data-variant="danger"]`, `[data-state="loading"]` |

Class names are reserved for compositions, utilities, and blocks. Exceptions and states always use `data-*` attributes — never class names. This aligns with Radix UI, which already exposes `data-state` attributes for component state (`data-state="open"`, `data-state="checked"`).

Composition names do not carry a `composition-` prefix — `.stack`, `.cluster` etc. are self-descriptive.

### CSS layer order

```css
@layer reset, global, compositions, blocks, utilities, exceptions;
```

This declaration lives in one file and never changes. It ensures specificity is always predictable — utility classes beat block styles, exceptions beat utilities — without resorting to `!important`.

---

## Infrastructure

**Package:** `@automattic/vip-design-system` — v3.0.0 (major version bump signals breaking changes)

| Tool                      | Purpose                 | Replaces                        |
| ------------------------- | ----------------------- | ------------------------------- |
| Vite                      | Build + bundling        | Babel                           |
| PostCSS + postcss-import  | CSS processing          | —                               |
| Vitest                    | Unit testing            | Jest                            |
| Storybook 10 (react-vite) | Component documentation | Same                            |
| Lefthook                  | Git hooks               | — (new)                         |
| Style Dictionary v4       | Token transformation    | token-transformer               |
| ESLint (standard rules)   | Linting                 | @automattic/eslint-plugin-wpvip |
| Prettier                  | Formatting              | Same                            |
| TypeScript 5.8            | Type checking           | Same                            |

**Removed dependencies:** Theme UI, Emotion, Babel, Jest, token-transformer, framer-motion, i18n-calypso

**Lefthook pre-commit hooks (blocking):**

- `npm run check-types`
- `npm run lint`
- `npm run format:check`

---

## Token Architecture

### File structure

```
tokens/
  primitives/
    color.json
    space.json
    font-size.json
    font-weight.json
    line-height.json
    letter-spacing.json
    border-radius.json
    shadow.json
    breakpoint.json
    font-family.json
  semantic/
    color.json        ← references primitives
    typography.json   ← references primitives
    space.json        ← references primitives
    shadow.json
  component/
    button.json
    input.json
    link.json
    dialog.json
    ... (one file per interactive component)
  themes/
    light.json        ← overrides semantic color tokens only
    dark.json         ← overrides semantic color tokens only
```

### Format

All tokens use the W3C Design Token Community Group (DTCG) format:

```json
{
	"color-blue-500": {
		"$value": "#3B82F6",
		"$type": "color",
		"$description": "Blue, step 500"
	}
}
```

---

## Style Dictionary

Style Dictionary v4 transforms tokens into CSS and TypeScript outputs.

### Outputs

| Output                | Location                      | Contents                               |
| --------------------- | ----------------------------- | -------------------------------------- |
| CSS custom properties | `dist/tokens/vars.css`        | Primitive + semantic tokens on `:root` |
| Theme overrides       | Inlined via `light-dark()`    | See [Theming](#theming)                |
| Component token files | `dist/css/blocks/*.css`       | Component tokens scoped to block class |
| Type style classes    | `dist/css/utilities/type.css` | Generated from typography token groups |
| TypeScript token map  | `dist/tokens/index.ts`        | Editor autocomplete for token names    |
| Breakpoints JS        | `dist/tokens/breakpoints.ts`  | For use in React components            |

### Type style bundle generation

For each typography token group (`heading.1`, `heading.2`, `body`, `caption`, etc.), Style Dictionary generates a CSS class that bundles all font properties:

```css
.type-heading-1 {
	font-family: var(--font-family-heading);
	font-size: var(--font-size-heading-1);
	font-weight: var(--font-weight-heading-1);
	line-height: var(--line-height-heading-1);
	letter-spacing: var(--letter-spacing-heading-1);
}
```

A single class applies the full type style. No need to compose multiple utility classes for typography.

---

## CSS Layer — CUBE CSS

### Reset

A minimal modern reset (based on Andy Bell's CSS reset) that normalizes cross-browser inconsistencies without over-resetting.

### Global styles

Bare HTML elements are styled using token references. Headings receive type style tokens, links receive semantic color tokens. This means a page has reasonable default styling before any classes are applied.

### Compositions

Layout patterns as CSS classes. These handle structure, not appearance.

| Class       | Purpose                                     |
| ----------- | ------------------------------------------- |
| `.stack`    | Vertical rhythm with consistent spacing     |
| `.cluster`  | Horizontal grouping with wrapping           |
| `.grid`     | Auto-fill grid                              |
| `.sidebar`  | Main content + fixed-width sidebar          |
| `.switcher` | Switches from row to column at a breakpoint |
| `.cover`    | Vertically centered content                 |
| `.frame`    | Maintains aspect ratio                      |

### Utilities

Single-purpose classes generated from tokens:

- Spacing: `.p-{n}`, `.m-{n}`, `.gap-{n}` using space tokens
- Color: `.text-{semantic-name}`, `.bg-{semantic-name}` using semantic color tokens
- Typography: `.font-{weight}`, `.text-{size}` using scale tokens
- Type bundles: `.type-heading-{n}`, `.type-body`, `.type-caption`, etc.

### Blocks

Component-specific CSS. Each block:

- Defines its component tokens as CSS custom properties on the root element
- Uses those tokens for all appearance properties
- Lives in its own file (`dist/css/blocks/button.css`, etc.)

### Exceptions

State and variant modifiers using `data-*` attributes:

```css
.button[data-variant='danger'] {
	--button-bg: var(--color-destructive);
}

.button[data-state='loading'] {
	opacity: 0.7;
	pointer-events: none;
}
```

---

## React Components

React components are included only for patterns where interactive behavior requires JS. The full list is determined during implementation, but candidates from the existing system include:

- Dialog / Confirmation Dialog
- Dropdown
- Tooltip
- Tabs
- Accordion
- Checkbox
- Switch (currently Toggle)
- Mobile Menu

Each React component:

- Wraps a Radix primitive **or** is hand-rolled, depending on which approach is simpler and more appropriate
- Applies CSS block/exception classes — no styling logic in JS
- Accepts `className` for consumer overrides (no `sx` prop)
- Accepts a `labels` prop for internationalization (see [Internationalization](#internationalization))
- Has Vitest + @testing-library/react tests
- Has a jest-axe accessibility test
- Has Storybook stories in CSF3 format
- Is exported from `src/index.ts`

Simple components (badges, notices, spinners, etc.) become CSS-only and are documented in Storybook as HTML + class name examples with no React wrapper.

---

## Theming

### Mechanism

Themes are differentiated by color only. No other token values differ between themes.

**Default (OS-level):** `@media (prefers-color-scheme: dark)` applies dark theme automatically. This is the primary interface — the system should respect the user's OS setting by default.

**User override:** A `.theme-light` or `.theme-dark` class on `<html>` overrides the OS setting when the user has explicitly set a preference in the application.

### Implementation — `light-dark()`

Semantic color tokens are defined once using the CSS `light-dark()` function, which eliminates the need to duplicate token definitions across a media query block and theme override classes.

```css
:root {
	color-scheme: light dark; /* follows OS by default */
	--color-interactive: light-dark(#3b82f6, #60a5fa);
}

/* User explicit overrides */
:root.theme-dark {
	color-scheme: dark;
}
:root.theme-light {
	color-scheme: light;
}
```

### Older browser fallback

`light-dark()` is gated behind `@supports` so older browsers receive a flat light theme:

```css
:root {
	/* Fallback: light theme for browsers that don't support light-dark() */
	--color-interactive: #3b82f6;
}

@supports (color: light-dark(red, blue)) {
	:root {
		color-scheme: light dark;
		--color-interactive: light-dark(#3b82f6, #60a5fa);
	}
	:root.theme-dark {
		color-scheme: dark;
	}
	:root.theme-light {
		color-scheme: light;
	}
}
```

Older browsers get a permanently light theme with no dark mode support. This is a documented, intentional trade-off — dark mode is an enhancement, not a requirement.

**Browser support for `light-dark()`:** Chrome 123+ (March 2024), Firefox 120+ (November 2023), Safari 17.5+ (May 2024).

---

## Internationalization

`i18n-calypso` is removed from the design system. Translation responsibility belongs in consuming apps.

### Labels prop pattern

Each React component that contains built-in copy (aria-labels, button text, screen reader strings) exposes a `labels` prop typed as a partial object of all translatable strings. All strings have English defaults so monolingual apps need no extra work.

```ts
interface DialogLabels {
	close?: string; // default: 'Close'
}

interface DialogProps {
	labels?: DialogLabels;
}
```

Consuming apps pass translated strings using their own i18n library:

```tsx
<Dialog labels={{ close: __('Close', 'my-app') }} />
```

This approach is compatible with any i18n library and adds no transitive dependencies to the design system.

---

## Accessibility

The accessibility hierarchy, in order of preference:

1. **Native HTML element** — use `<details>/<summary>`, `<dialog>`, `<button>`, `<select>` etc. where they fit. Native elements carry built-in accessibility at no JS cost.
2. **ARIA enhancement** — augment native elements with ARIA attributes when the native semantics are insufficient.
3. **Custom implementation** — Radix primitives or hand-rolled components when native elements genuinely cannot do the job.

All interactive components must have:

- Full keyboard navigation
- Correct ARIA roles, states, and properties per WAI-ARIA spec
- jest-axe test (`toHaveNoViolations`)
- Visible focus indicators using semantic focus tokens

---

## Documentation

### Location

All documentation lives in `/docs` as Markdown files, readable directly on GitHub without a separate docs site. Interactive component documentation lives in Storybook.

### Docs to produce

**Reference docs (Storybook + `/docs`):**

- _Getting Started_ — install, import the CSS, start using classes
- _How Tokens Work_ — visual diagram of the three-tier inheritance chain; how to add or update a token
- _CUBE CSS Primer_ — plain-language explanation of the four layers and what goes in each
- _Type Styles_ — table of all `.type-*` classes with live examples
- _Compositions_ — each layout pattern with an interactive demo
- _Utilities_ — searchable table of all utility classes
- _Components_ — one page per component (auto-generated from JSDoc + Storybook stories)
- _Themes_ — how light/dark works; how to toggle; browser support
- _Internationalization_ — how to pass translated strings to components

**Contributing docs (`/docs`):**

- _Contributing_ — how to add a component; how to add a token; PR checklist
- _Migration from v2_ — what changed, find-and-replace mappings, what needs rewriting

**Tutorials (`/docs/tutorials`):**
Practical, worked examples walking through how to build using the CUBE CSS methodology and the system's concepts. Written for both technical and non-technical audiences. Components and patterns are chosen from real system examples. Topics to be determined during implementation.

**Documentation principles:**

- Every doc page shows code
- Every doc page has a live example where applicable
- If a designer can't follow it, it needs to be simpler
- Scannable over comprehensive — short sections, clear headings, no walls of text

---

## Migration Strategy

The new system ships as v3.0.0 (major version bump signals breaking changes). With 1–3 actively maintained consuming apps, a coordinated migration is feasible.

### Steps for consuming apps

1. Install `@automattic/vip-design-system@^3.0.0`
2. Import `dist/tokens/vars.css` and `dist/css/index.css` in the app root
3. Remove `theme-ui` peer dependency and `ThemeProvider` wrapper
4. Replace `sx` prop usage with CSS class names (migration doc maps old → new)
5. Replace simple React component imports (`Box`, `Flex`, `Text`, `Heading`) with HTML + CSS classes
6. Keep complex interactive component imports — same component names, no Theme UI underneath
7. Remove `i18n-calypso` calls from design system components; pass `labels` props instead

### What is not being done

| Removed                                        | Reason                                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `i18n-calypso`                                 | Translations belong in consuming apps                                                          |
| `framer-motion`                                | CSS transitions handle animation needs without 30KB dependency                                 |
| `@apply` for type bundles                      | Non-standard; PostCSS implementations have edge cases that bite non-technical maintainers      |
| Compound component pattern for simple elements | `Box`, `Flex`, `Grid`, `Text`, `Heading` become CSS classes — simpler to maintain and document |

---

## Measuring Success

| Metric                           | How to measure                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Bundle size                      | Before/after comparison; expect significant reduction from removing Theme UI + Emotion     |
| Time to add a new token          | Target: < 5 minutes, no engineer required                                                  |
| Time to build a new component    | Developer experience benchmark against the old system                                      |
| Lighthouse scores                | Run on a representative consuming app before and after migration                           |
| Accessibility violations         | jest-axe / axe-core baseline established at launch                                         |
| Override count in consuming apps | Track frequency of custom CSS overrides — lower over time indicates better system adoption |

---

## Execution Plan

### Phase 1 — Repository foundation

1. Create blank branch from trunk
2. Initialize `package.json` with new stack; remove Theme UI, Emotion, Babel, Jest, token-transformer, framer-motion, i18n-calypso
3. Configure Vite for library build mode (ES module + CJS output, TypeScript declarations)
4. Configure TypeScript (strict mode, paths, declaration output)
5. Configure ESLint + Prettier (standard rules; structured for easy addition of @automattic plugin)
6. Configure Lefthook with three pre-commit hooks (check-types, lint, format:check)
7. Configure Vitest (jsdom environment, @testing-library/react, jest-axe)
8. Configure PostCSS (postcss-import, autoprefixer)

### Phase 2 — Token architecture

9. Audit all tokens in `valet-core.json`, `wpvip-product-core.json`, `wpvip-product-dark.json`
10. Split into logical files per category (see [Token Architecture](#token-architecture))
11. Convert all tokens to DTCG format
12. Validate all cross-file token references resolve correctly

### Phase 3 — Style Dictionary

13. Install and configure Style Dictionary v4
14. Define transforms: primitive/semantic tokens → `:root` CSS custom properties with `light-dark()` values; component tokens → block-scoped CSS custom properties; breakpoints → TypeScript export
15. Define type style bundle generation
16. Build and verify all outputs

### Phase 4 — CSS layer

17. CSS reset
18. Global HTML element styles
19. Composition classes (`.stack`, `.cluster`, `.grid`, `.sidebar`, `.switcher`, `.cover`, `.frame`)
20. Utility classes (spacing, color, typography, type bundles)
21. Block styles (per-component CSS with scoped component tokens)
22. Exception styles (`data-*` attribute selectors for states and variants)

### Phase 5 — React components

23. Implement complex interactive components (Dialog, Dropdown, Tooltip, Tabs, Accordion, Checkbox, Switch, and others as identified)
24. Each component: Radix primitive or hand-rolled as appropriate, CSS classes only, `labels` prop, Vitest tests, jest-axe test, Storybook stories
25. Export all components from `src/index.ts`

### Phase 6 — Documentation

26. Storybook: stories and autodocs for all components
27. `/docs`: reference docs, contributing guide, migration guide
28. `/docs/tutorials`: at least one worked example walking through building a component with CUBE CSS
