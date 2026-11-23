# Authoring for the VIP Design System v3

The design-system half of `loupe-authoring`. Load that skill first: it carries
the order of resort, gap over margin, the inline-style rule and the escape
hatch, and they all apply here unchanged. This file says what those rules mean
in v3 terms.

v3 is a rebuild. If `package.json` pins `@automattic/vip-design-system` below
3.0.0, you are on v2 (Theme UI, `sx`, `Flex`/`Box`/`Text`), and the `vip`
profile is the right one, not this.

v3 is **CSS- and token-first**. The package ships a stylesheet
(`@automattic/vip-design-system/css`) and token custom properties
(`@automattic/vip-design-system/tokens`). React is reserved for complex
interactive components (dialogs, dropdowns), and none ship yet. Almost
everything is native HTML with system classes on it:

```html
<button class="button type-support-label-default" data-variant="secondary" data-size="compact">
	Save
</button>
```

## The four layers

Styles follow CUBE CSS, enforced with `@layer`:
`reset, global, compositions, blocks, utilities, exceptions`.

| Layer            | What it is                                                                                                                                               | How you use it                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Compositions** | Content-agnostic layout: `.stack`, `.cluster`, `.repel`, `.grid`, `.sidebar`, `.switcher`, `.reel`, `.cover`, `.frame`, `.wrapper`, `.box`, `.with-icon` | A class, configured with `data-<composition>-*` attributes                                      |
| **Blocks**       | One component's styles: `.button`, `.badge`, `.notice`, `.input`, …                                                                                      | A class on the native element, with parts as `block__part`                                      |
| **Utilities**    | One job each: `.type-*`, `.bg-*`, `.text-*`, `.gap-*`, `.p-*`, `.m-*`, `.flow`, `.region`, `.icon`, `.visually-hidden`                                   | Add the class                                                                                   |
| **Exceptions**   | States and variants                                                                                                                                      | **Always `data-*` attributes, never classes**: `data-variant="danger"`, `data-state="disabled"` |

Class names are reserved for compositions, blocks and utilities. A
`.button--danger` or `.is-open` is drift, because the system expresses that as
`[data-variant="danger"]` and `[data-state="open"]`.

## Native HTML first

`<button class="button">`, not a `<div role="button">`. `<details>`/`<summary>`,
not a custom accordion. A raw element is **correct** in v3, because the class
is what makes it a system component. Loupe's `system/raw-element` is off for
this profile for that reason.

## Which block

| Need                             | Markup                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An action                        | `<button class="button type-support-label-default">`. `data-variant`: (none = primary) `secondary` `tertiary` `ghost` `display` `danger` `danger-secondary` `danger-ghost`. `data-size="compact"`. `data-icon`: `leading` `trailing` `only` |
| A status or category label       | `.badge`, `data-badge-variant`: `gray` `blue` `gold` `green` `red` `yellow` `brand` `info` `success` `warning` `error` `system`                                                                                                             |
| A message that stays on the page | `.notice`, a white card with a shadow and accent flag (`data-notice-variant`: `info` `success` `warning` `error` `system`). `.notice-inline` is the same anatomy on a flat tinted surface (`data-notice-inline-variant`)                    |
| A site-wide message              | `.banner`, a full-bleed strip; `data-banner-variant`: `brand` `info` `warning` `error` `system`                                                                                                                                             |
| A message that leaves on its own | `.snackbar`, inverted in both themes; `data-snackbar-variant`                                                                                                                                                                               |
| A text field, textarea or select | `.input` on the wrapper, with `.input__label`, `.input__field`, `.input__helper` inside; `data-state`: `disabled` `read-only` `error`                                                                                                       |
| A choice                         | `.checkbox`, `.radio`, `.radio-box` (options with descriptions), `.toggle` (an immediate on/off)                                                                                                                                            |
| A row the user drills into       | `.option-row` (`data-variant="alt"`)                                                                                                                                                                                                        |
| A tag or sticker                 | `.tag` / `.sticker`, `data-color`: `blue` `gold` `green` `orange` `pink` `red` `salmon` `yellow`; `data-interactive` when clickable                                                                                                         |
| A row of tools                   | `.toolbar`                                                                                                                                                                                                                                  |
| A range                          | `.slider`                                                                                                                                                                                                                                   |
| Code output                      | `.console`                                                                                                                                                                                                                                  |

Each block's stylesheet opens with its anatomy as a markup comment, and the
Storybook story shows it rendered. Copy the anatomy rather than reconstructing
it.

## Layout: compositions, then gap

Spacing between siblings belongs to the container. Each composition carries
its own gap, set with a data attribute that takes a **step of the space
scale** (`0`–`13`, or `none`):

```html
<div class="cluster" data-cluster-gap="4">
	<button class="button type-support-label-default" data-variant="secondary">Cancel</button>
	<button class="button type-support-label-default">Save</button>
</div>
```

| Shape                                                | Composition                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A vertical column of siblings                        | `.stack` (`data-stack-gap`, `-block-alignment`, `-inline-alignment`)                                                                             |
| A wrapping row (tags, buttons, meta)                 | `.cluster` (`data-cluster-gap`, `-inline-alignment`, `-block-alignment`)                                                                         |
| Two things pushed to opposite ends (title + actions) | `.repel` (`data-nowrap` to stop wrapping)                                                                                                        |
| Cells lined up in columns                            | `.grid` (`data-grid-columns`: `1`–`12`, `auto-fill`, `auto-fit`; `data-grid-min-item-size`)                                                      |
| A fixed-width side beside a fluid main               | `.sidebar` (`data-sidebar-width`, `data-sidebar-content-min`, `data-position="end"`)                                                             |
| Row that becomes a column below a threshold          | `.switcher` (`data-switcher-threshold`)                                                                                                          |
| A row that scrolls instead of wrapping               | `.reel`                                                                                                                                          |
| Vertically centred content in a min-height           | `.cover`                                                                                                                                         |
| Media cropped to a ratio                             | `.frame` (`data-frame-ratio`)                                                                                                                    |
| A centred column with a max measure                  | `.wrapper` (`data-wrapper-max-inline-size`, `-padding-inline`)                                                                                   |
| A padded surface with a border                       | `.box` (`data-box-surface`: `default` `inverse` `layer-1`…`layer-4`; `data-box-padding`, `data-box-radius`). Pair with `.stack` for its contents |
| An icon on a text baseline                           | `.with-icon` + `.icon` on the `<svg>`                                                                                                            |

Where a composition's element already exists and only the gap needs changing,
`.gap-<step>` / `.gap-i-<step>` / `.gap-b-<step>` set it.

**Margins.** `.flow` is the sanctioned margin rhythm for prose and document
flow (`data-flow-space`). `.region` owns a page section's block padding. The
`.m-*` utilities exist for the rare one-off: `.m-i-auto` to centre, `.m-is-auto`
to push a flex item to the end. A margin on a child to space it from its
sibling is the drift every composition above exists to end.

The canonical page section:

```html
<section class="region" data-region-space="11">
	<div class="wrapper flow" data-flow-space="6">…</div>
</section>
```

`.region` and `.wrapper` go on **separate** elements, so the band spans full
width while the content stays at the measure.

## Typography: one class per role

There is no text component. Type is a **composite utility class** that sets
family, weight, size, line-height and letter-spacing together:

| Role      | Classes                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headings  | `.type-heading-1` … `.type-heading-5`, `.type-heading-caps`                                                                                          |
| Body      | `.type-body-large`, `.type-body-default`, `.type-body-default-bold`, `.type-body-small`, `.type-body-mono`, `.type-body-mono-bold`                   |
| UI labels | `.type-support-label-default`, `-default-loud`, `-default-quiet`, `.type-support-label-small`, `.type-support-label-xs`, `.type-support-helper-text` |

Never set `font-size`, `font-weight`, `line-height`, `letter-spacing` or
`font-family` on their own. Pick the role. Blocks do not bake type in: a
`.button` needs `.type-support-label-default` added alongside it. A heading is
still an `<h2>`, so the element sets the outline and the class sets the style.
Choose the element by its place in the outline, never for its size.

## Tokens by role

Tokens are unprefixed custom properties in three tiers:
**primitive → semantic → component**.

- In your own CSS, use **semantic** tokens. They are what themes move.
- Component tokens (`--button-*`, `--notice-*`, …) are scoped to their block's
  root class and **do not resolve outside it**. `var(--input-border)` on a
  bare `<input>` is undefined. An undefined custom property with no fallback
  invalidates the _whole_ declaration, so `border: 1px solid var(--undefined)`
  loses its border entirely, with no error. Outside a block, use the semantic
  token the component token aliases.
- Primitives (`--gray-45`, `--space-6`) are for explicit numeric scales in
  compositions and utilities, not for colour decisions.

| Need         | Tokens                                                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text         | `--color-text-primary` `-secondary` `-helper` `-placeholder` `-disabled` `-inverse-primary` `-inverse-secondary`                                                                        |
| Surfaces     | `--color-layer-1` … `--color-layer-4`, `--color-layer-accent`, `--color-layer-inverse`, `--color-background-primary`, `--color-background-overlay`                                      |
| Borders      | `--color-border-default` `-control` `-control-hover` `-disabled` `-inverse` `-transparent`                                                                                              |
| Icons        | `--color-icon-primary` `-secondary` `-helper` `-disabled` `-inverse`                                                                                                                    |
| Links        | `--color-link-default` `-hover` `-active` `-visited`                                                                                                                                    |
| Status       | `--color-support-<status>-{text,background,accent,hover,inverse,link}`, status ∈ `info` `success` `warning` `error` `system`; plus `--color-support-brand-*`                            |
| Focus        | `--color-focus-outline`, `--color-focus-inset`                                                                                                                                          |
| Space        | `--space-hairline` (2px) `micro` (4) `tight` (6) `close` (8) `modest` (12) `comfortable` (16) `relaxed` (24) `loose` (32) `open` (40) `spacious` (56); steps `--space-0` … `--space-13` |
| Radius       | `--radius-0`, `--radius-subtle`, `--radius-control`, `--radius-container`, `--radius-expressive`                                                                                        |
| Shadow       | `--shadow-low`, `--shadow-medium`, `--shadow-high`                                                                                                                                      |
| Border width | `--border-width-none`, `--border-width-thin`, `--border-width-medium`                                                                                                                   |

For colour on markup, prefer the utilities `.text-<role>` and `.bg-<layer>` (for
example `.text-helper`, `.bg-layer-2`) over new CSS.

The data-attribute steps (`data-stack-gap="6"`) are the space scale by number.
`6` is `--space-comfortable`.

## Theming

Light and dark differ by colour only. Semantic colours use `light-dark()`, and
the OS setting drives it, with `.theme-dark` / `.theme-light` on `<html>` to
override. A hex, an `rgb()`, or a palette primitive like `--gray-70` stays
fixed when the theme moves. Use the semantic role.

## The escape hatch

The keyword is `vip-allow`:

```css
/* vip-allow layout/negative-margin -- pulls the close button's hit area into the notice padding */
.notice__close {
	margin-inline-end: -8px;
}
```

`vip-disable` and `ds-disable` are blanket forms and are themselves blocking
findings.
