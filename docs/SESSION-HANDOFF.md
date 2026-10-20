# Session handoff — 2026-10-15

Written for whoever picks this up next. Covers where the token and CSS layers stand, the decisions that shaped them (and why, so they aren't silently reverted), what's still open, and the traps that cost real time.

Read `AGENTS.md` first for conventions, `docs/REBUILD-PLAN.md` for the overall plan, `docs/decisions-log.csv` for the decision record. This file is the delta.

Supersedes the 2026-09-04 handoff. The CSS-layer decisions from that session are still live and are repeated below — they were reached by measurement and reverting them reintroduces specific bugs.

---

## Where things stand

Branch `em/system-rebuild-v3`, **fully pushed** — local and `origin` are identical, working tree clean. (The previous handoff said nothing was pushed; that was already stale when written.)

The nine commits from this session:

```
3557a393  Remove the unreferenced environment semantic tokens
8aa976fd  Remove the orphaned environment-switcher token file
6aeda415  Move the preview server into the repo
e8dce2f1  Use a transparent border on danger-secondary hover
a2331c69  Remove the orange, salmon and pink badge variants
61113197  Restructure the support token sets
2249f4a8  Give button its own colour tokens, off the support palette
73ffe189  Load Aktiv Grotesk in the preview and Storybook
20c1c80d  Exclude nested git worktrees from Prettier
```

This session was token work driven by Figma, not CSS-layer work. The compositions and utilities are unchanged.

### The CSS layer

**Compositions (12)** — `box cluster cover frame grid reel repel sidebar stack switcher with-icon wrapper`

**Utilities (7)** — `color flow gap icon region spacing visually-hidden`

**Blocks (14)** — `badge button checkbox console input notice option-row radio-box radio slider sticker tag toggle toolbar`. `console notice option-row radio-box slider toolbar` still exist in CSS but are not in the preview.

### The token layer

**Semantic (16 files + `support/`)**. Two groups are new this session:

- `button-background` — fills: `primary secondary transparent display disabled danger`, hovers: `hover-default hover-transparent hover-display hover-danger`
- `button-foreground` — `ghost danger`

**`support/` now holds six sets**: `error info success warning brand system`. `accent` → `brand`, `neutral` → `system`, `feature` (purple) deleted.

The four status sets share one shape, driven by **usage**:

| key          | what it paints                                       |
| ------------ | ---------------------------------------------------- |
| `background` | fill for badges and inline notices                   |
| `inverse`    | icon accent on an inverted surface (snackbar)        |
| `accent`     | decorative, non-text marks — icons and flags         |
| `text`       | support text; badge text and border in **dark** mode |
| `link`       | link colour on notices                               |
| `hover`      | hover colour for those links                         |

`brand` keeps its older shape (`container-text`, `container-accent`, no `link`/`inverse`) and was ported as-specified; it is expected to change. `system` adds `recede`, and its `text` references `color.text.helper` — the only support token pointing at another semantic token rather than a ramp step.

### Previews

`docs/component-preview-v2.html` is the live one — 27 sections. It needs **both** `npm run build:icons` (sprite is gitignored) and a served repo root.

`docs/component-preview.html` (v1) is the pre-rebuild original. Still undecided whether it's wanted.

---

## Decisions that need to stick

### From this session

**The support sets define accent colours only.** Grey text in badges and notices comes from `color.text.*`, not from a support token. This is what replaced `container-text`, and it measures better than what it replaced — 13.9–14.6 light, 13.6–15.0 dark, against roughly 11 for the old hued container text. Pointing badge or notice body text back at `support.*.text` drops light mode to 3.8–4.6 and breaks AA.

**Font loading lives outside `src/css`.** Aktiv Grotesk is loaded by `docs/component-preview-v2.html` and `.storybook/preview-head.html` only. An `@import` in `src/css` would compile into the published `dist/css/index.css` and make every consumer fetch Adobe's kit. The package _names_ the font in `--font-family-default`; loading it is the consuming app's job. Both files sit outside the tarball, which `package.json` restricts to `"files": ["dist"]`.

**`button-foreground.danger` is `red.40` in dark, not the `red.45` Figma specifies.** Measured on the three most common dark surfaces, `red.45` gives 5.10 on background-primary, 4.84 on layer-1 and **4.16** on layer-2 — failing AA on the last. `red.40` gives 5.84 / 5.53 / 4.76. This is a deliberate, measured deviation. Do not "correct" it back.

**Button tokens are named for the variant they serve.** A fill is the variant name alone (`primary`, `danger` — never `danger-background`, since the group already says background). A hover state is `hover-<variant>`. This is why `hover-1/2/3` were renamed to `hover-default`/`hover-transparent`/`hover-display`.

**`danger-secondary`'s hover border is transparent, not a colour matching the fill.** `background-clip` is `border-box`, so the fill paints under the border and shows through — identical rendering, no second value to keep in sync. Assumes the hover fill stays opaque; if it ever became semi-transparent, the border area would show what is behind the button.

### From the 2026-09-04 session — still live

**`.stack` uses `gap`, not the owl selector.** The owl form resolves the property against the _child_, so a nested stack setting its own gap silently overrode its parent's. Measured: a 3-level nest wanting 64/24/12px produced 24/12/12.

**`.flow` is the margin-based one, and its scale is declared on children.** It keeps the owl deliberately — it establishes no flex context, so children retain normal block behaviour. `data-flow-space="N"` sets the custom property on `> *` rather than on the container. **Setting `--flow-space` directly on a nested `.flow` reintroduces the nesting bug.**

**Alignment knobs are named for logical axes.** `justify-content` and `align-items` map to _perpendicular_ physical axes depending on `flex-direction`:

|                               | `justify-content`         | `align-items`              |
| ----------------------------- | ------------------------- | -------------------------- |
| `.stack` (column)             | `--stack-block-alignment` | `--stack-inline-alignment` |
| `.cluster` / `.sidebar` (row) | `--*-inline-alignment`    | `--*-block-alignment`      |

**Gap utilities are safe to name logically; alignment was not.** `column-gap` is always the inline axis and `row-gap` always the block axis, regardless of `flex-direction`.

**`.icon` is `1cap`, and the sprite is cropped.** An em-sized icon stands 42% taller than the capitals beside it. The build crops symbols to `viewBox="2 2 20 20"`. Of 3,768 symbols, 2,667 fit, 898 overhang by 0.5 units, **203 are clipped by 1–2 units**.

**`code` inherits its font size.** `global.css` previously pinned `code, kbd, samp` to `--font-size-2`.

**Composition vs utility:** a composition combines several properties into one pattern; if it does a single job, it's a utility.

---

## Open items

### Accessibility, needs a design decision

**`button-foreground.danger` light mode is below AA.** `red.55` measures **4.35 on layer-1** and **3.99 on layer-3** (4.66 on background-primary, 4.83 on layer-2). `red.60` clears every light surface at 4.86–5.88. Left as specified deliberately — the dark value was fixed this session, the light one was not.

**`accent` icons are below 3:1 in light mode** on every support set but error: warning **2.04**, info 2.74, success 2.75, system 2.76, brand 2.82, error 3.84. Dark is fine everywhere (4.9–9.1). Defensible where the icon is decorative and the text carries the meaning, which is how the Figma examples read — but warning in particular is a pale amber mark on pale cream.

**Sticker is broken in dark mode** — the grey variant measures **1.16:1**. 18 sticker tokens are flat primitive references with no `light-dark()`. Some are legitimately theme-independent, so this needs per-token judgement. Untouched this session.

**Sticker uses a raw primitive for radius** — `border-radius: var(--border-radius-5)` in `blocks/sticker.css`. Tier violation; there's no semantic radius above `--radius-expressive`.

**The semantic space scale is unused** — `--space-comfortable`, `--space-relaxed` etc. exist and nothing references them. Make it load-bearing or delete it.

### Components not yet built

**inline-notice, snackbar, banner** don't exist. The existing `notice` block is structurally the **tinted inline-notice** — background, icon, link, link-hover, text. The white-card-with-left-accent-bar notice is a separate component. Figma specs exist for all of these; they were deliberately not built from the example screenshots.

The `brand` support set is expected to change once those are designed.

### Infrastructure

**Storybook is broken, and has been since `58afcc42`.** `postcss.config.cjs` uses ESM `export default` but the `.cjs` extension forces CommonJS, so `/iframe.html` returns 500:

```
Failed to load PostCSS config: [SyntaxError] Unexpected token 'export'
```

Fix is a rename to `postcss.config.mjs` — `package.json` already sets `"type": "module"`. Not done because it was outside the scope of the session. The static preview is unaffected: it loads `src/css/index.css` raw and the browser resolves the `@import`s natively, so only PostCSS consumers hit it.

**The library build emits nothing.** `dist/index.js` comes out at 0.00 kB and no `dist/css/` is produced, so the `"./css"` export points at a file the build doesn't emit. `src/index.ts` exports nothing yet.

**The sprite is 1.4 MB** for all 3,768 icons. Subsetting is wanted before Dashboard adoption. **`brands/` is not compiled** — confirm whether that's deliberate.

**Deferred icon work:** error-state icon in `.input__helper`; button icon slots (leading, trailing, icon-only); checkbox check/dash icons appearing inset.

**ESLint warns** that TypeScript 5.9.3 exceeds `@typescript-eslint`'s supported range (`<5.6.0`). Passing, but noisy.

---

## Traps that cost time

**A hidden Browser pane reports a 0×0 viewport, and measurements lie convincingly.** With `innerWidth` at 0, `html`/`body` compute to `width: 0`, so the reset's `svg { max-width: 100% }` resolves against a zero-width containing block and **every icon collapses to zero width while keeping its correct `1cap` height**. This looks exactly like a percentage-sizing bug in the design system. Size the viewport (`resize_window`) before trusting any measurement — not just screenshots.

**`npm run build:tokens` must be followed by a format pass.** The generator emits unformatted CSS; the committed files are Prettier'd. Without `npx prettier --write 'src/css/generated/**/*.css' 'src/tokens/*.ts'` the diff fills with line-wrapping and hex-case noise, and the pre-commit hook trips.

**`badge` has six variants, not nine.** `orange`, `salmon`, `pink` were removed this session. `tag` still has all nine and has **its own palette** (`tokens/semantic/tag.json`) — it references no support tokens at all, so support changes don't touch it.

**`document.hasFocus()` must be true or any `:focus` test is meaningless.** An unfocused document matches no `:focus` rule. Click the page first, and assert `hasFocus()` in the probe.

**The browser pane is Chromium.** Anything Safari-specific is inference until the user runs it.

**Screenshots come back blank at non-zero scroll** in this pane, intermittently. Verify with measurements, not images.

**Unlayered CSS beats every `@layer`.** The preview's `<style>` is unlayered. When a design-system rule seems not to apply in the preview, check for a local override first.

**`npm run format` ignores passed paths** and formats the whole project. Use `npx prettier --write <path>` to target one file.

**Prettier has no CSV parser**, so `docs/decisions-log.csv` is exempt from `format:check`. Edit it with a CSV writer, not `sed`.

---

## Running things

```bash
npm install           # @boxicons/core was declared but not installed — check this first
npm run build:icons   # required before opening the preview; dist/sprite.svg is gitignored
npm run build:tokens  # then format the generated output, see traps above
npm run preview       # static server on 8420, serves the repo root
npm run dev           # Storybook on 6006 — currently returns 500, see Infrastructure
npm run format:check  # plus lint and check-types — all three run as pre-commit hooks
```

Then open `http://localhost:8420/docs/component-preview-v2.html`.
