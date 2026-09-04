# Session handoff — 2026-09-04

Written for whoever picks this up next. Covers where the CSS layer stands, the decisions that shaped it (and why, so they aren't silently reverted), what's still open, and the traps that cost real time.

Read `AGENTS.md` first for conventions, `docs/REBUILD-PLAN.md` for the overall plan, `docs/decisions-log.csv` for the decision record. This file is the delta.

---

## Where things stand

Branch `em/system-rebuild-v3`, **25 commits ahead of origin — nothing is pushed.**

The five commits from this session:

```
7cfc2592  Crop sprite symbols to the 20x20 design grid, use real icons in preview
36270ba0  Merge branch 'icon-system'
aa96ef8d  Update conventions, icon plan and decision log
84359193  Rebuild component preview on the design system's own compositions
7df33ecc  Add compositions and utilities, adopt logical-axis naming
```

`icon-system` (was `worktree-agent-af28894adf4280bce`) is merged and can be deleted once you're satisfied with the merge.

### The CSS layer now

**Compositions (12)** — `box cluster cover frame grid reel repel sidebar stack switcher with-icon wrapper`

**Utilities (7)** — `color flow gap icon region spacing visually-hidden`

**Blocks (14)** — unchanged this session except `global.css`. Note `console notice option-row radio-box slider toolbar` still exist in CSS but were removed from the preview to focus review on CSS-only atoms.

### Previews

`docs/component-preview-v2.html` is the live one — 26 sections, laid out entirely with the system's own compositions. **It now depends on `dist/sprite.svg`, which is gitignored**, so run `npm run build:icons` first or icons render empty.

`docs/component-preview.html` (v1) is the pre-rebuild original. It got the content removals but never the composition rebuild. Decide whether it's still wanted.

---

## Decisions that need to stick

These were reached by measurement, not preference. Reverting them will reintroduce specific bugs.

### `.stack` uses `gap`, not the owl selector

The owl form (`.stack > * + * { margin-block-start: var(--stack-gap) }`) resolves the property **against the child**, not the parent doing the spacing. A nested stack setting its own gap therefore silently overrode the gap its parent was applying. Measured: a 3-level nest wanting 64/24/12px produced 24/12/12.

`gap` lives on the container that owns it, so nesting can't collide.

### `.flow` is the margin-based one, and its scale is declared on children

`.flow` keeps the owl behaviour deliberately — it establishes no flex context, so children retain normal block behaviour (margin collapsing, floats, authored `display`). That's what makes it right for prose.

It avoids the nesting bug a different way: `data-flow-space="N"` sets the custom property on `> *` rather than on the container, so no element ever declares its own value. **Setting `--flow-space` directly on a nested `.flow` reintroduces the bug.**

### Alignment knobs are named for logical axes

`justify-content` and `align-items` map to _perpendicular_ physical axes depending on `flex-direction`. So:

|                               | `justify-content`         | `align-items`              |
| ----------------------------- | ------------------------- | -------------------------- |
| `.stack` (column)             | `--stack-block-alignment` | `--stack-inline-alignment` |
| `.cluster` / `.sidebar` (row) | `--*-inline-alignment`    | `--*-block-alignment`      |

`.stack` is the inversion of the other two. That's the whole reason for the naming — `--stack-justify` and `--cluster-justify` controlled perpendicular axes under one suffix.

`.switcher`, `.cover`, `.frame`, `.grid` have no alignment knobs yet. The table in `docs/REBUILD-PLAN.md` has the correct axis for each if you add them.

### Gap utilities are safe to name logically; alignment was not

Verified: `column-gap` is **always** the inline axis and `row-gap` **always** the block axis, regardless of `flex-direction` — in a flex column the between-items gap is `row-gap`. So `.gap-i-*` / `.gap-b-*` carry no caveat, unlike the alignment knobs.

### Spacing utilities are logical

`.p-i-* .p-b-* .p-is-* .p-ie-* .p-bs-* .p-be-*` and the `.m-` equivalents, steps 0–12, plus `auto` for margins. `.px-*` / `.py-*` / `.mx-*` / `.my-*` are gone.

### `.icon` is `1cap`, and the sprite is cropped

`1em` is the font _size_; an em-sized icon stands **42% taller** than the capitals beside it (16px vs 11.27px cap height at 16px text).

Boxicons draws on a 20×20 grid inside a 24×24 canvas, so a symbol at the full canvas sized to `1cap` renders the mark at 20/24 of cap height — visibly small. The build crops to `viewBox="2 2 20 20"`, the same thing the "padding" toggle on boxicons.com does.

Scaling the CSS box by 24/20 was rejected: identical optical size, but it inflates the box to 1.2cap and lifts the glyph ~1.1px off the baseline.

**Cost:** of 3,768 symbols, 2,667 fit inside the grid, 898 overhang by 0.5 units (~2%, imperceptible), **203 are clipped by 1–2 units**. If one of those is needed, compute each symbol's real bounds at build time and crop to `min(2, its own padding)` — needs a path-bounds dependency.

### `code` inherits its font size

`global.css` previously pinned `code, kbd, samp` to `--font-size-2`, rendering **14px inside a 2rem heading and 0.6rem helper text alike**. Now `font-size: inherit`. The `pre code` override that existed to undo this was removed as dead.

### Composition vs utility

`AGENTS.md` was amended: compositions are _content-agnostic structural patterns_ that arrange, constrain, or define a surface. The previous "no appearance" wording was falsified by `.box`.

The test used four times this session: **a composition combines several properties into one pattern; if it does a single job, it's a utility.** That put `.flow` and `.region` in utilities, `.wrapper` and `.box` in compositions.

---

## Open items

### Needs a design decision

**Sticker is broken in dark mode** — the gray variant measures **1.16:1** against its surface, effectively invisible. 18 sticker tokens are flat primitive references with no `light-dark()`, and all seven gray ones are among them (`--color-sticker-gray-background: var(--gray-90)` is pinned near-black in both themes). Some of the 18 are legitimately theme-independent (white text on a red chip), so this needs per-token judgement.

**Sticker uses a raw primitive for radius** — `border-radius: var(--border-radius-5)` in `blocks/sticker.css`. Tier violation; there's no semantic radius above `--radius-expressive` (`border-radius-3`), so the pill shape had nowhere legitimate to come from. Add a semantic step or drop to `radius-expressive`.

**The semantic space scale is unused** — `--space-comfortable`, `--space-relaxed`, `--space-loose`, `--space-spacious` etc. exist and **nothing references them**. Blocks, compositions and utilities all use `--space-0…12` directly. Make it load-bearing or delete it.

**`.switcher` has no alignment knobs** while stack/cluster/sidebar do. Possibly fine — its job is the row/column flip — but it's the lone holdout.

### Icon system

**The sprite is 1.4 MB** for all 3,768 icons. Subsetting to icons actually referenced is wanted before Dashboard adoption.

**`brands/` is not compiled** — the package has `basic`, `filled`, `brands`; the script reads only the first two. Confirm whether that's deliberate.

**Deferred, now unblocked by the merge:** error-state icon in `.input__helper`; button icon slots (leading, trailing, icon-only — a Figma variant set with no representation here); checkbox check/dash icons appearing inset.

### Cleanups

- `tokens/component/environment-switcher.json` survived the component's removal — the CSS went, the token file didn't.
- The preview's `html { background: var(--color-layer-1) }` is **dead** — `body` paints `--color-background-primary` over it. This caused a wrong contrast reading during the session.
- `@media (max-width: 400px)` in the preview must track `--chrome-sidebar-width` by hand; media queries can't read custom properties. Commented, still fragile.
- ESLint warns that TypeScript 5.9.3 exceeds `@typescript-eslint`'s supported range (`<5.6.0`). Passing, but noisy.

---

## Traps that cost time

**`document.hasFocus()` must be true or any `:focus` test is meaningless.** An unfocused document matches no `:focus` rule, so a programmatic `.focus()` looks like a broken selector. This invalidated four separate measurements. Click the page first, and assert `hasFocus()` in the probe.

**The browser pane is Chromium.** Anything Safari-specific is inference until the user runs it. A Safari skip-link "bug" this session turned out to be Safari's keyboard-navigation setting — and **Option+Tab applies the _opposite_ of that setting**, so with it on, Option+Tab is precisely the combination that skips links. The CSS was correct throughout.

**Screenshots come back blank at non-zero scroll** in this pane, intermittently. Not a page fault — verify with measurements, not images.

**Unlayered CSS beats every `@layer`.** The preview's `<style>` is unlayered, so a stale `.icon { width: 1rem }` placeholder there silently pinned every icon to 16px regardless of the layered rule. When a design-system rule seems not to apply in the preview, check for a local override first.

**`npm run format` ignores passed paths** and formats the whole project. Use `npx prettier --write <path>` to target one file.

**Prettier has no CSV parser**, so `docs/decisions-log.csv` is exempt from `format:check`. Edit it with a CSV writer, not `sed` — a blanket rename during this session rewrote prose inside a comment and produced false statements.

---

## Running things

```bash
npm run build:icons   # required before opening the preview
npm run dev           # Storybook on 6006 (.claude/launch.json now says 6006, was wrong)
npm run format:check  # plus lint and check-types — all three run as pre-commit hooks
```

The preview is a static file; serve the repo root and open `docs/component-preview-v2.html`.
