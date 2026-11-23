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
- **Base UI** for accessible component primitives (where appropriate)
- **React 18** (peer dependency)

## Code Structure

```
src/
  components/          # Interactive components and optional generated CSS wrappers
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

## Before starting any work

**Sync with GitHub first.** Fetch, then bring your branch up to date with what
others have pushed. More than one person, and their agents, push to this
project. Building on a stale copy causes conflicts and duplicated work, and it
has happened here: a set of components was built on a copy of the branch three
weeks out of date.

## Working from Figma

The design work happens in Figma; the code follows it. For how to read the
Figma file with the connector, see `docs/FIGMA-WORKFLOW.md`.

- **Components: Figma wins. Do not ask.** If a component exists in both Figma
  and code, the code is out of date. Rebuild it to match Figma. Do not treat
  existing CSS blocks or component tokens as authoritative.
- **Tokens: show a full diff first, and change nothing until Emily approves it.**
  This covers every value in `tokens/` and every Figma variable, in either
  direction. One semantic token reaches many components, so token changes get a
  review that component markup does not.
- **Never settle a Figma-versus-code value difference inside a component file.**
  Wire the component to semantic tokens by name, and report the difference as
  part of the token diff.
- **Measure contrast and report failures, even when Figma specifies the
  colour.** A spec is not proof that it passes.
- **Read the token tier from the Figma variable name.** Figma cannot hold a
  separate component collection, so a leading hyphen on the group marks a
  component token living among the semantic ones:
  `color/-badge/red/background` → `tokens/component/badge.json`.
  Everything else under `color/` is semantic.

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
- Semantic tokens own theme-specific palette values. Component tokens may select different semantic references by theme, but must never introduce primitive references or raw color values.
- Component tokens are scoped to the component's root CSS class, not `:root`.

**Which tier to reach for, by where you are:**

| Writing                                         | Use                                                              | Why                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `global.css` — bare element styles              | semantic                                                         | the element is not inside any block, so component tokens are out of scope and will not resolve |
| configurable colors in a block (`blocks/*.css`) | that block's component tokens                                    | the tier exists so one component can diverge without affecting others                          |
| fixed block styles                              | existing semantic tokens or fixed CSS                            | fixed layout and typography do not need extra component tokens or configuration knobs          |
| a composition or utility                        | semantic where available; primitives for explicit numeric scales | they are content-agnostic and apply anywhere                                                   |

This is a mechanical constraint, not a preference. `--input-border` is defined on
`.input`, so on a bare `<input>` it is undefined — and an undefined custom
property with no fallback makes the **whole declaration** invalid at
computed-value time, not just the colour. `border: 1px solid var(--undefined)`
resets `border-style` to `none` and the border disappears entirely. That is a
silent failure: no error, no warning, just a missing border that reads as a
design choice. It shipped twice in this repo before being caught.

Nothing is lost by using the semantic token, because the component token is
usually an alias of it — `--input-border` _is_ `--color-border-control`. Both
resolve to the same value and theme identically.

Keep block configuration bounded to intentional variants. Following Badge,
variant selectors assign local variables; the handwritten block consumes them.
Component variant metadata belongs in the component token JSON, and generated
configuration CSS lives beside its handwritten block. Typography continues to
use the existing composite-token utility classes.

**After any token rename, re-check for dangling references.** Diff every
`var(--…)` in the authored CSS against the properties the generated CSS
actually defines; a rename that misses a consumer produces exactly the silent
failure above.

**Name button colour tokens for the variant they serve.** In
`tokens/semantic/button-background.json` and `button-foreground.json`, a fill is
the variant name alone (`danger`, never `danger-background`) and a hover state is
`hover-<variant>` (`hover-danger`, never `danger-hover`). Figma's names do not
always follow this; translate them rather than copying them.

### CSS traps

Both of these fail silently and have shipped before.

- **Never colour a themed mark with an SVG data URI.** A `background-image` data
  URI cannot read a custom property, so its fill is baked in and cannot follow
  the theme. Mask a `::before` to the shape and fill it with `background-color`
  from the token. Put the mask on the pseudo-element, never on the input itself:
  that clips the box and border away along with everything outside the mark.
- **Override a utility through a custom-property hook, not a selector.**
  Utilities sit in a later `@layer` than blocks, so a block selector never beats
  a utility, whatever its specificity. Expose a hook instead, the way `.icon`
  reads `--icon-size`.

### Theming

- Light/dark themes are differentiated by color only.
- Semantic color tokens and component theme selections use `light-dark()` with an `@supports` fallback to the light theme.
- OS-level dark mode (`prefers-color-scheme`) is the primary interface.
- `.theme-dark` / `.theme-light` on `<html>` override the OS setting.

### React components

- React provides complex interactive components and optional generated wrappers for typed CSS configuration. CSS remains independently usable.
- Generate CSS wrappers from `tokens/configuration` and opted-in component token metadata; never maintain separate handwritten option unions. Run `npm run build:tokens` to regenerate and `npm run check:configuration` to check freshness.
- Wrappers use numeric literals for numeric presets, forward native props and refs, and support Base UI’s `render` API through `useRender`. Keep CSS defaults and styling out of their runtime.
- Components apply CSS classes — no styling logic in JS.
- Use Base UI primitives where they earn their keep; roll your own when simpler.
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
