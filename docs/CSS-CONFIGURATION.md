# CSS configuration

Compositions, the badge block, and configurable utilities accept a finite set of `data-*` options.
Keep the class to activate the pattern; use prefixed attributes to configure it.
Attributes assign CSS custom properties, which remain the underlying API for
custom values. Fixed utilities such as `.p-5`, `.gap-4`, and `.text-primary` keep
their class APIs.

```html
<div class="stack" data-stack-gap="8" data-stack-inline-alignment="center">…</div>
<section class="region flow" data-region-space="11" data-flow-space="6">…</section>
<div class="grid" data-grid-columns="3" data-grid-min-item-size="12rem" data-grid-gap="7">…</div>
```

See the [complete option reference](./CSS-CONFIGURATION-OPTIONS.md). Attribute
values are exact, case-sensitive strings. Unsupported or missing values leave the
local default in place (or the selected box surface for individual box colors).
A length such as `12rem` is an enumerated preset, not arbitrary CSS parsing.
Spacing uses the `0`–`13` scale: **`0` is zero**, `1` is 2px, and `13` is 10rem.
`none` remains an alias for zero spacing. With-icon gaps retain their font-relative `em` scale.

The former spacing steps `0`–`12` have moved to `1`–`13`; numeric utility classes
and spacing attributes follow the same numbering. Update an old `p-5` to `p-6`,
for example, to preserve its 16px padding. Border-radius primitives likewise start
at zero, with the former steps `0`–`6` now at `1`–`7`. Responsive token names shift
both endpoints by one while retaining their values. Semantic spacing and radius
names retain their existing values. Border-width options are `0`, `1`, and `1.5`
(pixels), backed by the three stroke primitives.

## Prefer box surface presets

```html
<div class="box stack" data-box-surface="inverse" data-box-padding="7" data-stack-gap="4">
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

## Badge

Badge exposes only `data-badge-variant`: `gray`, `blue`, `green`, `red`, `gold`,
and `yellow`, with semantic aliases `system`, `info`, `success`, `error`, `brand`,
and `warning`, respectively. Both names select identical styles in each theme.
Missing or unsupported values use gray. The variant sets background,
text, and border colors together through three local `--badge-*` variables.
There are no individual color, spacing, border-width, radius, or typography knobs.
`data-color` is no longer supported for badges; migrate it to `data-badge-variant`.
The orange, salmon, and pink badge variants and their component tokens are removed.

```html
<span class="badge type-support-label-xs" data-badge-variant="success">Published</span>
<span class="badge type-support-label-xs" data-badge-variant="info">In review</span>
```

Height (22px), padding, border width, radius, and layout are fixed in `badge.css`, using
shared semantic tokens where appropriate. Apply `type-support-label-xs` to get
the fixed typography from the existing `support.label-xs` composite token. The
utility keeps that composite as the single source of truth without a separate
block typography generator. It requires the second class in each badge's markup.

Badge variants reference the existing `color.support.*`, text, and border semantic
tokens directly. Semantic tokens own the theme-specific palette. The background
uses its support background token in both color modes; in dark mode, the border
and label use the support text token. There is no additional label semantic group.
Each badge establishes its three color defaults locally, so an outer badge cannot
recolor a nested badge.
Badges are text-only.

## Typed React wrappers

The optional React exports are `Box`, `Cluster`, `Cover`, `Frame`, `Grid`, `Reel`,
`Repel`, `Sidebar`, `Stack`, `Switcher`, `WithIcon`, `Wrapper`, `Flow`, `Region`,
and `Badge`. The CSS classes and attributes remain independently usable.

```tsx
import { Badge, Box, Stack } from '@automattic/vip-design-system';
import '@automattic/vip-design-system/css';

<Box surface="layer-2" padding={6} render={<Stack gap={4} render={<section />} />}>
	<Badge variant="success">Published</Badge>
</Box>;
```

This renders one `section` with both `box` and `stack` classes. Badge renders a
`span` with `badge type-support-label-xs`; its typography is fixed automatically.
WithIcon also defaults to `span`; the other wrappers default to `div`.

Props use camelCase versions of catalog settings (`minItemSize`, `inlineAlignment`,
`borderWidth`). Numeric options are numeric literal unions: `gap={6}`,
`columns={3}`, `padding={0}`, `borderWidth={1.5}`. Strings such as `gap="6"` and
arbitrary numbers are rejected. Named options remain strings: `columns="auto-fit"`,
`space="none"`, `ratio="16/9"`, `width="20rem"`. Omitting a prop emits no setting,
so CSS owns the default and nested instances retain their own defaults.

Box supports its combined `surface` presets and individual settings. Badge
supports only `variant`, including both color names and semantic aliases.
Existing handwritten behavior attributes are described in the catalog too:

| Wrapper | Props                                                    | Existing CSS attributes                      |
| ------- | -------------------------------------------------------- | -------------------------------------------- |
| Sidebar | `position="start" \| "end"`, `order="reverse"`, `sticky` | `data-position`, `data-order`, `data-sticky` |
| Reel    | `scrollbar="hidden"`                                     | `data-scrollbar`                             |
| Repel   | `nowrap`                                                 | `data-nowrap`                                |

Omit `order` or `scrollbar` for normal behavior. Boolean `false` removes the
presence attribute; it never renders `data-sticky="false"` or `data-nowrap="false"`.

### Elements, composition and refs

`render` replaces the default element or composes wrappers on one element, using
Base UI's `useRender`. It accepts a React element or a render callback. The former
`as` and `asChild` APIs are no longer supported.

```tsx
<Box padding={4} render={<a href="/docs" />}>Documentation</Box>
<Region space={6} render={<Flow space={4} render={<article />} />}>
	<h2>Release notes</h2>
	<p>Region padding and Flow spacing on one article.</p>
</Region>
```

Native element-specific props and refs belong on the replacement: for example,
`render={<a href="/docs" ref={anchorRef} />}` checks both the link props and its
ref. Custom components must forward incoming props and refs to their DOM element.
Without `render`, native props and refs are typed for the wrapper's default tag.
With `render`, the wrapper ref accepts `HTMLElement`; JSX cannot reliably tell the
wrapper the concrete replacement type. Configuration props remain strict and take
precedence over same-named native props, such as Box's bounded `color` options.

Classes combine. Replacement styles and ordinary props win on overlapping keys.
Replacement event handlers run before wrapper handlers; `preventDefault()` alone
does not stop this chain. In Base UI handlers or handlers typed by `mergeProps`,
`event.preventBaseUIHandler()` can stop the earlier handlers in a merged chain. Both replacement and wrapper refs receive the
resulting element and are cleared on unmount.

Explicit typed configuration overrides conflicting raw data attributes on the
wrapper and on an element supplied to `render`, including zero values and boolean
`false`. If two wrappers configure the same pattern, the innermost wrapper's
explicit prop wins. This precedence is the one intentional addition to Base UI's
normal prop-merging rules.

Keep content in the wrapper's `children`. If a render element also supplies
children, Base UI gives those replacement children precedence. Fragments are not
valid element replacements because they cannot receive DOM attributes or refs.

The callback form receives prepared props, including children, attributes and the
merged ref. Spread them onto the destination element. When adding styles or
handlers in the callback, use Base UI's `mergeProps` instead of overwriting them:

```tsx
<Region space={6} render={(props) => <article {...props} />}>
	Content
</Region>
```

Callbacks control the returned markup; they can override or drop supplied props.
They must return a suitable element and forward the ref. These CSS wrappers expose
no interactive state to the callback.

Types cover the named configuration props. `className`, `style`, arbitrary
`data-*` attributes, and JavaScript callers remain escape hatches; this is not a
runtime validator for arbitrary CSS. Other native HTML and ARIA props are forwarded.

### Generation and type exports

`npm run build:tokens` generates `src/components/primitives.generated.ts` in the
same Style Dictionary pipeline as the CSS and option documentation.
`npm run check:configuration` also checks wrapper freshness. No separate prop
option catalog is maintained.

Each wrapper exports its configuration-only `*Options` and full `*Props` types,
for example `StackOptions` and `StackProps`. Use the exported props types when
building another component around a wrapper. Replacement elements carry their
own native or custom prop types; `StackProps` has no element-type parameter.
`npm run check-types` includes positive and negative JSX usage fixtures.

Composition/utility catalogs can specify `react.element` for a different default
tag. Component variants opt into React generation using
`$extensions["com.automattic.vip.react"]` on the variants group; Badge uses this
metadata for its default tag and typography class. The shared runtime only maps
props to attributes and delegates element composition to Base UI’s `useRender`.

## Storybook color modes

Every story canvas has an independent System / Light / Dark selector. System
follows the OS preference; explicit modes apply `color-scheme` and the semantic
background and text colors to that canvas. The surrounding documentation keeps
following the OS. Selections last while the canvas is mounted.

Stories normally start in System mode. To start an example in a specific mode,
set `parameters: { colorMode: 'dark' }` (or `'light'`) on the story. The selector
can still change it. Use this parameter instead of a hardcoded theme wrapper,
as in the badge's Dark Mode example.

## Nesting and custom CSS

Every instance establishes its own defaults, even with no attributes. Setting a
configuration variable on an arbitrary ancestor no longer configures all nested
instances. Shared design tokens still inherit normally.

Container properties (gap, padding, alignment, etc.) are configured on the
composition itself. Unconfigured nested containers use their own defaults:

```html
<div class="stack" data-stack-gap="10">
	<div class="stack">This stack uses the default gap of 6.</div>
	<div class="stack" data-stack-gap="4">This stack uses gap 4.</div>
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
		--stack-gap: var(--space-9);
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
  values use `{ "token": "space.comfortable" }`; CSS keywords use `{ "literal": "auto" }`.
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

Badge uses a smaller component path: `tokens/component/badge.json` contains an
explicit `variants` group with `$extensions["com.automattic.vip.css"].default` set
to `gray`. Its optional `aliases` map gives additional names to declared variants
(for example, `"info": "blue"`), without duplicating tokens. Alias targets must be
declared variants, not other aliases. The component name determines `.badge` and `data-badge-variant`; field
names (`background`, `color`, `border-color`) determine the local variables. Only
this marked group is public. Unrelated component tokens do not become options.
`scripts/style-dictionary/component-variants.mjs` validates the default, matching
variant fields, and semantic color references in **both** themes, then supplies
Style Dictionary's CSS and documentation formats. No separate badge settings,
option sets, property mappings, or generated palette-variable file are needed.

Run `npm run build:tokens` after editing either tokens or configuration. The build
writes one generated companion beside each handwritten stylesheet, such as
`box.config.generated.css` beside `box.css`. The handwritten file imports its
companion and owns structural styles; the generated file owns local defaults and
attribute selectors. Both remain in the pattern's existing layer.
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

The resolved catalog also supplies the public option keys and defaults for the
generated React prop types and wrappers described above.

## Storybook documentation

Storybook separates the CSS API into **Block Styles**, **Composition Styles**, and
**Utility Styles**. **React Components** has an individual page for each generated
component. Matching pages link to one another. CSS examples show rendered HTML;
React examples show JSX, numeric props, and composition through `render`.

Storybook controls read the configuration catalogs and Badge variant tokens through
`.storybook/helpers/catalog.ts`. Keep allowed values there in the source catalogs,
not in separate story option lists. Examples live in `src/stories/`; the existing
block stories remain beside their blocks in `src/components/`. Every canvas keeps
its own System / Light / Dark selector, including the Badge Dark Mode examples.

Run `npm run build:icons` before starting or building Storybook on a fresh checkout.
The story assets are bundled by Vite so images and sprites also work when the
static Storybook is hosted under a subdirectory.

## Browser regression checks

Serve the repository root (for example, `python3 -m http.server 8088`) and open
`http://localhost:8088/test/css-configuration.html` in a browser. The page reports
pass/fail results for nesting, utility precedence, custom variable overrides,
layout presets, sticky sidebars, and box colors in both themes. The tests use
computed browser styles because jsdom does not implement the required cascade
and layout behavior.

Badge checks are available at `http://localhost:8088/test/badge.html`. They compare
all six variants against the upstream badge colors in both themes, and cover
nesting, local color schemes, fixed dimensions, composite typography, and ignored
retired attributes. The baseline records upstream commit `09c404a0`.
