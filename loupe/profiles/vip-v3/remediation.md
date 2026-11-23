# Fixing VIP Design System v3 findings

The design-system half of `loupe-remediation`. Load that skill first: it
carries the order to work in and the rules for suppressing well.
`authoring.md` beside this file has the token roles every remedy assumes.

## `tokens/unknown-token`

The finding that matters most in v3. An undefined custom property with no
fallback invalidates its whole declaration at computed-value time, silently.

1. A typo: the finding usually names the intended token. `loupe fix` applies
   unambiguous ones.
2. A component token used outside its block (`--input-border` in
   `global.css`, or on an element without `.input`): replace it with the
   semantic token it aliases (`--color-border-control`).
3. A token renamed upstream: diff every `var(--…)` the file uses against what
   the generated CSS defines, and update every consumer, not just this one.
4. An undeclared knob with a fallback (`var(--button-gap, var(--space-micro))`):
   not a silent failure, but an unbounded configuration surface. Prefer a
   bounded variant (`data-*` selecting from the component's token JSON). If the
   knob is deliberate public API, define it in the component's tokens so it
   is known.

## `tokens/hardcoded-value`

Replace the literal with the semantic token for its **role**, not the one whose
value matches. Colours become `--color-*` roles, lengths a `--space-*` step,
radii a `--radius-*` role, shadows `--shadow-*`. Inside a block's configurable
colours, use that block's own component token.

`cursor` is reported because the engine assumes every system ships a cursor
scale. v3 does not, so `cursor: pointer` / `not-allowed` are correct as
written. Baseline them rather than inventing tokens.

## `layout/margin-on-child`

Move the spacing to the parent's gap: put the children in the composition that
matches the shape (`.stack`, `.cluster`, …) with its `data-*-gap`, or add a
`.gap-*` utility to a flex or grid container you already have. In document
flow with no flex container, `.flow` is the remedy.

A small margin that optically aligns an icon with the first line of text
(`margin-block-start: 2px`) is not sibling spacing. Suppress it with that
reason instead of converting it.

## `layout/negative-margin`

Confirm the bleed is deliberate, such as pulling a close button's hit area into
its container's padding, and suppress it with that reason. Otherwise it is
fighting a gap or padding that should be smaller.

## `typography/untokenized`

Delete the loose `font-*` / `line-height` / `letter-spacing` declarations and
add the `.type-*` class for the role to the element. Inside a block's own CSS,
use the typography tokens as a complete set for one role, never one longhand.

## Exceptions written as classes

Not a Loupe rule, but the drift this system sees most: `.button--danger`,
`.is-disabled`, `.notice-error`. Convert them to the `data-*` attribute the
block already reads (`data-variant`, `data-state`, `data-<block>-variant`).
