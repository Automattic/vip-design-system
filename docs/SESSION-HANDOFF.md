# Session handoff — 2026-10-20

Written for whoever picks this up next. Covers where the system stands after the first Figma-driven build pass, the decisions that shaped it (and why, so they aren't silently reverted), what's still open, and the traps that cost real time.

Read `AGENTS.md` first for conventions, `docs/REBUILD-PLAN.md` for the overall plan, `docs/decisions-log.csv` for the decision record. This file is the delta.

Supersedes the 2026-10-15 handoff. Decisions from earlier sessions are repeated below where they still bind.

---

## Where things stand

Branch `em/system-rebuild-v3`. Upstream through `0eb4d476` has been fetched and
merged locally for review; the merge is not yet committed. Check `git status`
and the branch log for the current state before continuing.

The local commits also include token-driven composition/utility configuration,
the simplified Badge variant generator and semantic aliases, and Storybook's
independent System / Light / Dark controls. These remain intact after the merge.
See `docs/CSS-CONFIGURATION.md` for the current configuration contract.

Badge exposes only `data-badge-variant`. Its component token JSON owns the six
color variants and their semantic aliases; generated rules assign three local
color variables. Fixed layout and the `type-support-label-xs` utility remain in
place. Semantic tokens own palette values, while component tokens may select
different semantic references by theme. There is no additional label token group.

The new Input select chevron applies only to `select.input__field` inside
`.input__control`. Storybook's color-mode selectors keep their native browser UI.

Two upstream issues were fixed locally during merge review:

- **Input story IDs:** each `Input` instance now uses React `useId()`, with its
  helper ID derived from that value. Labels and `aria-describedby` references
  stay within their own instance when multiple canvases render the same state.
- **Toggle RTL:** the thumb now animates `inset-inline-start` instead of a
  physical translation. Checked positioning uses `calc(100% - 1rem - 2px)`,
  preserving the 2px inset in both directions. Browser checks cover LTR and RTL,
  on/off and enabled/disabled states, and reduced-motion behavior.

This session connected the Figma MCP and ported six components from the design file. The token layer is now verified against Figma; the component layer is about half done.

### Built from Figma, with Storybook stories

| Component | Stories                                           | Notes                                     |
| --------- | ------------------------------------------------- | ----------------------------------------- |
| Badge     | Default, AllVariants, SemanticAliases, DarkMode   | 6 variants and aliases, fixed 22px height |
| Button    | Default, Variants, Danger, Icons, Sizes, Disabled | 8 variants × 2 sizes × 4 icon slots       |
| Checkbox  | Default, States, Indeterminate                    |                                           |
| Radio     | Default, States, Group                            |                                           |
| Toggle    | Default, States, Motion                           |                                           |
| Input     | Default, States, Textarea, Select, LabelVariants  | also covers textarea and select           |

### Not built

Select's **custom dropdown**, Notice, Notice-inline, Banner, Snackbar, Checkbox-list, Radio-list. Figma node links are in the conversation history and listed under Open items.

### Icons

Sourced from the **Figma icon library**, not `@boxicons/core`. 12 curated icons in `src/icons/`, committed, built into a 6.3 KB sprite (was 1.4 MB for 3,768).

---

## How the Figma workflow works

**Connector:** the Figma MCP connector (42 tools). A second server, `plugin:figma:figma`, may appear needing auth — it is not needed.

**What the MCP can and cannot read.** This cost time to establish:

- `get_metadata` with no node → returns only the "Cover" page. **Page discovery does not work.** You cannot crawl the file.
- `get_metadata` / `get_variable_defs` on a **component set** → works reliably, no selection needed.
- Either on a **large documentation frame** → fails. `get_metadata` truncates at a fixed byte offset; `get_variable_defs` misreports it as "You currently have nothing selected". Neither actually depends on the desktop selection.
- `get_design_context` on a large component set → may exceed 25,000 tokens and truncate. For geometry alone, **prefer `get_metadata`** — it returns frame dimensions for a fraction of the payload. That is how Button-Compact's 32px was confirmed.
- `search_design_system` searches **published org libraries**, not the working file. It returns Badges from `@wordpress/ui` and Parse.ly, not yours.

**So: ask Emily for component-set node links.** She sends them; that is the workflow.

**Variables have no node link.** `get_variable_defs` takes a _node_ and returns the variables that node consumes. Absence from one node is not absence from the file.

### Figma's token conventions

Figma cannot hold a separate component-token collection, so the tier is encoded in the name: **a leading hyphen marks a component token.**

```
color/-badge/red/background      → tokens/component/badge.json   (component)
color/support/system/background  → tokens/semantic/support/      (semantic)
```

Other parallels, all verified by value:

| Figma                        | Code                             |
| ---------------------------- | -------------------------------- |
| `space/micro`, `space/tight` | `--space-micro`, `--space-tight` |
| `space/static/N`             | `--space-N`                      |
| `borderRadius/static/N`      | `--border-radius-N`              |
| `fontSize/static/N`          | `--font-size-N`                  |
| `support/label-xs`           | `.type-support-label-xs`         |

---

## Decisions that need to stick

### Working agreement with Emily

- **Components: Figma wins.** If a component exists in both, the code is out of date. Rebuild to match without asking.
- **Variables: full diff first.** No change to tokens on either side until she has seen a diff.
- Four standing defaults she approved: a Figma component referencing a token that doesn't exist → build the rest, wire the nearest semantic token, list it as blocking in the diff. Figma hardcoding a raw value → use the nearest semantic token and flag it. Figma's design measuring below AA → **build it as designed and report the number**; she decides. Figma silent on focus/keyboard/ARIA/reduced-motion → fill from the system's own patterns and say what was added.

### From this session

**Icons come from Figma, as a committed curated set.** The Figma library is Boxicons **v2**; `@boxicons/core` is a later generation. Names diverge — v2's `bx-right-arrow-alt` is v3's `bx-arrow-right`, v2's `bx-error` is v3's `bx-alert-triangle`. A name that does not resolve renders an **invisible box that measures 16×16 and draws nothing**. Adding an icon: name + node id into `src/icons/manifest.json`, `npm run icons:sync`, commit the SVG. Both the build and the sync fail loudly on an unresolved name.

**Figma exports carry three things that must be stripped** — a background `<rect>` the size of the frame, hardcoded fills that defeat `currentColor`, and `preserveAspectRatio="none"` which stretches the glyph to any non-square box. `scripts/clean-icon-svg.mjs` does this.

**Do not crop the Figma icons.** The old `2 2 20 20` crop existed to recover the design grid from the _package's_ canvas. These masters are drawn on 24×24 with their own padding; cropping would scale every glyph 20% beyond what Figma shows.

**Both numeric scales gained a zero step** so their indices match Figma. `--space-N` and `--border-radius-N` are each shifted one from where they were. `.p-3` was 8px and is now 6px — a breaking change to the utility class API.

**The semantic space scale is load-bearing.** Blocks and compositions use `--space-micro` / `--space-close` etc., not `--space-N`. Figma is built on these names. This is also what made the zero-step renumbering safe: components were insulated and nothing moved.

**`button-foreground.danger` is red.40 in dark, not Figma's red.45.** Measured, red.45 fails AA on layer-2 (4.16). Deliberate deviation; do not "correct" it back.

**Toggle's thumb slides; Figma's does not.** Figma draws the thumb at `cx=10` in all four variants and the indicator on the right in all four. Built literally that is a switch whose position says nothing about its state. Read as an authoring slip — had the thumb moved for "on", the indicator would have had to move too. Everything else is Figma's.

**Radio is 17×17 where checkbox is 16×16.** That is what the file specifies. Reproduced as drawn; may be a stroke-alignment artifact. Worth a look if the two ever sit together.

### From earlier sessions — still live

**`.stack` uses `gap`, not the owl selector.** The owl form resolves the property against the _child_, so a nested stack silently overrode its parent. Measured: a 3-level nest wanting 64/24/12px produced 24/12/12.

**`.flow` keeps the owl deliberately** — it establishes no flex context, so children keep normal block behaviour. `data-flow-space="N"` sets the property on `> *`, never on the container. Setting `--flow-space` on a nested `.flow` reintroduces the bug.

**Alignment knobs are named for logical axes.** `justify-content` and `align-items` map to _perpendicular_ physical axes depending on `flex-direction`; `.stack` is the inversion of `.cluster`/`.sidebar`.

**`.icon` is `1cap`** — an em-sized icon stands 42% taller than the capitals beside it. Buttons override to a fixed 16px via the `--icon-size` hook, because Figma specifies 16px there.

**Composition vs utility:** a composition combines several properties into one pattern; if it does a single job, it's a utility.

---

## Traps that cost time

**A dangling custom property silently deletes the whole declaration.** `var(--undefined)` with no fallback makes the declaration invalid at computed-value time — the entire shorthand is discarded, not just the colour. `border: 1px solid var(--undefined)` resets `border-style` to `none` and **no border renders**. No error, no warning. This shipped three times: two in `global.css` from Phase 4, and one I introduced by renaming `support.*.symbol` to `.text`.

**After any token rename, diff every `var()` against what the generated CSS defines.** This is now in `AGENTS.md`. It is the only thing that catches the above.

**A `background-image` data URI cannot reference a custom property.** Its fill is baked in. This left `--checkbox-foreground`, `--radio-foreground`, `--toggle-icon` and their disabled pairs defined but **read by nothing** — the marks were a hardcoded `#FBFBFB` where the token said `#ffffff`, and disabled marks did not change colour at all. Fixed by masking a `::before` and filling it with the token. The mask cannot go on the input itself: it would clip the box and border away along with everything outside the mark.

**Component tokens do not resolve outside their block.** `--input-border` is defined on `.input`, so on a bare `<input>` it is empty. Global element styles must use semantic tokens. See the table in `AGENTS.md`.

**A hidden Browser pane reports a 0×0 viewport.** `html`/`body` compute to `width: 0`, so the reset's `svg { max-width: 100% }` collapses **every icon to zero width** while keeping its correct `1cap` height. This looks exactly like a design-system bug. Size the viewport before trusting any measurement — not just screenshots.

**`document.hasFocus()` must be true or any `:focus` test is meaningless.** An unfocused document matches no `:focus` rule. Click the page first via the `computer` tool, then Tab — a programmatic `.focus()` does not reliably trigger `:focus-visible`.

**`npm run build:tokens` must be followed by a format pass.** The generator emits unformatted CSS; the committed files are Prettier'd. Without `npx prettier --write 'src/css/generated/**/*.css' 'src/tokens/*.ts'` the diff fills with wrapping noise and the pre-commit hook trips.

**Prettier has no parser for `.svg` or `.csv`.** `prettier --check .` skips them when globbing a directory, but errors if you name them explicitly. Edit `docs/decisions-log.csv` with a CSV writer, never `sed`.

**Unlayered CSS beats every `@layer`**, and utilities beat blocks. A block cannot override a utility by specificity — that is why `.icon` needed the `--icon-size` custom-property hook rather than a `.button .icon` rule.

**The browser pane is Chromium.** Anything Safari-specific is inference.

---

## Open items

### Needs a decision

**Select's custom dropdown.** The native `<select>`'s open panel is drawn by the OS and cannot be styled, so it will never match Figma. Matching it means a custom listbox — the **first component in this system needing JavaScript**, and the first real entry in `src/components/`. `REBUILD-PLAN` anticipates this ("Radix where they earn their keep"). What is given up: the OS picker on mobile, no-JS operation, and ARIA that every assistive technology already understands. Figma nodes: Select-dropdown `15794:4246`, `.dropdown` `15793:3306`, `.item-core` `15793:3293`, `.list-item` `15793:3300`, `.select-dropdown-item` `15794:3387`. Emily's screenshot shows a **separator between option groups** — confirm whether that is `<optgroup>`-shaped.

**Notice needs a second text slot.** Figma splits `heading` (`text.primary`) from body (`text.secondary`); `notice.json` has one slot mapped to primary.

**Banner shares inline-notice's tokens.** Recommendation given and not yet acted on: one shared set, Banner as its own block, both referencing `color.support.*` directly. The `-notice-inline/*` tokens are pure aliases of the support tokens.

**`button-foreground.danger` light mode is below AA** — red.55 measures 4.35 on layer-1 and 3.99 on layer-3. red.60 clears every light surface. Left as specified.

**`accent` icons are below 3:1 in light mode** on every support set but error; warning lowest at **2.04**. Defensible if the icon is decorative and the text carries the meaning.

**Sticker dark mode** — grey variant measures **1.16:1**. 18 tokens are flat primitive references with no `light-dark()`. Untouched for several sessions.

**No semantic radius above `expressive`.** Tag, sticker and slider reach for `--border-radius-6` (40px) directly for pill shapes; Toggle now uses a fixed `50vh` track radius. Figma's radius scale stops at `static/4` (16px), so neither side names a pill radius.

### Not yet diffed

The two **shadows** — `Low` on Notice and `shadow/medium` on dropdown — against `tokens/semantic/shadow.json`. Toggle's thumb shadow (dy 1, blur 3, 8%) is none of the three and sits in the block.

### Infrastructure

**The library build emits nothing.** `dist/index.js` is 0 kB and no `dist/css/` is produced, so the `"./css"` export points at a file the build never writes. `src/index.ts` exports nothing.

**`.claude/launch.json` is tracked in the merged branch.** `scripts/preview-server.mjs` is committed and `npm run preview` works without the launch configuration.

**`npm run icons:sync` needs `FIGMA_TOKEN`.** The initial icons were fetched through the MCP, which needs no token but cannot be scripted. The script fails with setup instructions.

**ESLint warns** that TypeScript 5.9.3 exceeds `@typescript-eslint`'s supported range. Passing, but noisy.

---

## Running things

```bash
npm install           # @boxicons/core is still a dependency but no longer the icon source
npm run build:icons   # builds the sprite from src/icons/; required before the preview
npm run build:tokens  # then format the generated output, see traps above
npm run preview       # static server on 8420, serves the repo root
npm run dev           # Storybook on 6006
npm run icons:sync    # refresh icons from Figma; needs FIGMA_TOKEN
npm run format:check  # plus lint and check-types — all three are pre-commit hooks
```

Preview: `http://localhost:8420/docs/component-preview-v2.html`. Storybook: `http://localhost:6006`.
