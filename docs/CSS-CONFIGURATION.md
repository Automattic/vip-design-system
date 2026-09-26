# CSS configuration

Compositions and configurable utilities accept a finite set of `data-*` options.
Keep the class to activate the pattern; use prefixed attributes to configure it.
Attributes assign CSS custom properties, which remain the underlying API for
custom values. Fixed utilities such as `.p-4`, `.gap-3`, and `.text-primary` keep
their class APIs.

```html
<div class="stack" data-stack-gap="7" data-stack-inline-alignment="center">…</div>
<section class="region flow" data-region-space="10" data-flow-space="5">…</section>
<div class="grid" data-grid-columns="3" data-grid-min-item-size="12rem" data-grid-gap="6">…</div>
```

See the [complete option reference](./CSS-CONFIGURATION-OPTIONS.md). Attribute
values are exact, case-sensitive strings. Unsupported or missing values leave the
local default in place (or the selected box surface for individual box colors).
A length such as `12rem` is an enumerated preset, not arbitrary CSS parsing.
Spacing uses the existing `0`–`12` scale: **`0` is 2px**, not zero. Use `none` for
no spacing. With-icon gaps retain their font-relative `em` scale.

## Prefer box surface presets

```html
<div class="box stack" data-box-surface="inverse" data-box-padding="6" data-stack-gap="3">
	<h2>Inverted surface</h2>
	<p>The preset chooses foreground, background, and border together.</p>
</div>

<div class="box" data-box-surface="layer-3" data-box-border-color="border-control">
	An individual control can override one part of the preset.
</div>
```

`default` / `layer-2`, `layer-1`, `layer-3`, `layer-4`, and `inverse` are combined
presets. The inverse preset preserves the existing box behavior: it swaps the
normal foreground and surface colors in both themes. The existing
`data-variant="inverse"` remains supported, with an explicit `data-box-surface`
taking precedence. Existing behavior attributes such as `data-sticky`,
`data-position`, `data-order`, `data-nowrap`, and `data-scrollbar` also remain.

Prefer presets in application code. Independent `data-box-color`,
`data-box-background`, and `data-box-border-color` controls accept semantic color
names. Check the contrast of custom combinations in both themes. The inverse
preset also honors `data-box-color-inverse`, `data-box-background-inverse`, and
`data-box-border-color-inverse`, matching the existing inverse custom properties.

## Nesting and custom CSS

Every instance establishes its own defaults, even with no attributes. Setting a
configuration variable on an arbitrary ancestor no longer configures all nested
instances. Shared design tokens still inherit normally.

Container properties (gap, padding, alignment, etc.) are configured on the
composition itself. Unconfigured nested containers use their own defaults:

```html
<div class="stack" data-stack-gap="9">
	<div class="stack">This stack uses the default gap of 5.</div>
	<div class="stack" data-stack-gap="3">This stack uses gap 3.</div>
</div>
```

Child properties are configured on direct children. This applies to flow space,
sidebar width/content minimum/sticky settings, switcher threshold, and reel item
width. Attributes still go on the **parent**; their CSS selectors target `> *`.
This keeps a nested composition's settings for its children separate from the
settings its parent applies to it.

For custom values, assign variables where they are consumed:

```css
.custom-stack {
	--stack-gap: 1.25rem;
}

.custom-sidebar > * {
	--sidebar-width: 18rem;
	--sidebar-sticky-offset: var(--app-header-height);
}

.article.flow > * {
	--flow-space: 1.25rem;
}
```

**Migration:** move existing parent-level custom CSS assignments for child
properties to direct-child rules, or replace them with attributes on the parent.
For example, replace `style="--sidebar-width: 20rem"` on `.sidebar` with
`data-sidebar-width="20rem"`. A variable set directly on a nested `.flow` affects
its incoming margin; use its attributes or a direct-child rule to configure its
own children. Do not put child-facing overrides inline on the container.

Responsive overrides follow the same rule:

```css
@media (min-width: 60rem) {
	.custom-stack {
		--stack-gap: var(--space-8);
	}
	.custom-sidebar > * {
		--sidebar-width: 24rem;
	}
}
```

## Cascade

Defaults and attribute assignments stay in the composition or utility's existing
layer. They configure variables instead of assigning the layout properties again.
This preserves `.gap-*`, `.p-*`, and other property utilities as overrides.
For flow and region, the spacing utilities imported later still win.

Within box configuration, individual color choices override presets regardless
of HTML attribute order. Inline variables on the element that consumes the value
and ordinary unlayered consumer CSS override layered attribute assignments.
Forced-colors mode still substitutes `currentColor` for a box border.

## Maintaining the options

Configuration is part of the Style Dictionary token build:

- `tokens/configuration/option-sets.json` defines curated option sets. Token-backed
  values use `{ "token": "space.5" }`; CSS keywords use `{ "literal": "auto" }`.
  Option sets can extend other sets, so layout lengths are defined once.
- `tokens/configuration/compositions/*.json` and `utilities/*.json` define each
  class's settings, expected types, default **option keys**, targets, and presets.
- Reusable dimensions live in `tokens/primitives/size.json`, with semantic aliases
  in `tokens/semantic/layout.json`. Attribute strings such as `20rem` remain stable
  option names even if a consumer customizes the corresponding token.
- `scripts/style-dictionary/catalog.mjs` validates the metadata against the
  transformed token dictionary. Missing tokens, incompatible token types, unknown
  defaults, and invalid preset references fail the build. Configuration metadata
  is loaded separately and is excluded from token-source globs.
- `scripts/style-dictionary/configuration.mjs` registers CSS and Markdown formats.
  Token references emit the dictionary's transformed CSS variable names rather
  than resolved raw values, preserving consumer overrides and theming.

Run `npm run build:tokens` after editing either tokens or configuration. The build
writes one generated companion beside each handwritten stylesheet, such as
`box.config.generated.css` beside `box.css`. The handwritten file imports its
companion and owns structural styles; the generated file owns local defaults and
attribute selectors. Both remain in the composition or utility's existing layer.
The build also generates the [option reference](./CSS-CONFIGURATION-OPTIONS.md).
Generated files are committed so direct CSS consumers work without building.

`npm run check:configuration` runs the same Style Dictionary formats without
writing files and fails if configuration CSS or documentation is missing or stale.
`npm run test` checks catalog validation. Adding a token does not automatically
expose it as a new attribute option: allowed options are deliberately curated.

Templates such as `{ "template": "calc(100vh - {sticky-offset})" }` refer to
another setting on the same class and target. Presets assign a setting's allowed
`option`, or reference another compatible `setting` (as inverse box colors do).
This keeps token references, local settings, and literal CSS distinct.

The resolved catalog preserves the public option keys and defaults for future
TypeScript option lists and React prop types. Those outputs and wrappers are a
separate slice; there is no React-specific generation here.

## Browser regression checks

Serve the repository root (for example, `python3 -m http.server 8088`) and open
`http://localhost:8088/test/css-configuration.html` in a browser. The page reports
pass/fail results for nesting, utility precedence, custom variable overrides,
layout presets, sticky sidebars, and box colors in both themes. The tests use
computed browser styles because jsdom does not implement the required cascade
and layout behavior.
