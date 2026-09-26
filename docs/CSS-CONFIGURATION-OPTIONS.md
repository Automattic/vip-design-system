<!-- Generated from tokens/configuration by Style Dictionary. Do not edit. Run npm run build:tokens. -->

# Configuration options

See [the configuration guide](./CSS-CONFIGURATION.md) for examples, nesting, and overrides.
Attribute values are exact strings; unlisted values apply no override.

| Attribute                        | Allowed options               | Default option   | Default CSS value                            | Variable location |
| -------------------------------- | ----------------------------- | ---------------- | -------------------------------------------- | ----------------- |
| `data-box-padding`               | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-box-border-width`          | [border-width](#border-width) | `1`              | `1px`                                        | Container         |
| `data-box-radius`                | [radius](#radius)             | `container`      | `var(--radius-container)`                    | Container         |
| `data-box-color`                 | [color](#color)               | `text-primary`   | `var(--color-text-primary)`                  | Container         |
| `data-box-background`            | [color](#color)               | `layer-2`        | `var(--color-layer-2)`                       | Container         |
| `data-box-border-color`          | [color](#color)               | `border-default` | `var(--color-border-default)`                | Container         |
| `data-box-color-inverse`         | [color](#color)               | `layer-2`        | `var(--color-layer-2)`                       | Container         |
| `data-box-background-inverse`    | [color](#color)               | `text-primary`   | `var(--color-text-primary)`                  | Container         |
| `data-box-border-color-inverse`  | [color](#color)               | `text-primary`   | `var(--color-text-primary)`                  | Container         |
| `data-cluster-gap`               | [space](#space)               | `4`              | `var(--space-4)`                             | Container         |
| `data-cluster-inline-alignment`  | [distribute](#distribute)     | `start`          | `flex-start`                                 | Container         |
| `data-cluster-block-alignment`   | [align](#align)               | `center`         | `center`                                     | Container         |
| `data-cover-padding`             | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-cover-min-height`          | [min-height](#min-height)     | `viewport`       | `100vh`                                      | Container         |
| `data-frame-ratio`               | [ratio](#ratio)               | `16/9`           | `16/9`                                       | Container         |
| `data-grid-gap`                  | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-grid-columns`              | [columns](#columns)           | `auto-fill`      | `auto-fill`                                  | Container         |
| `data-grid-min-item-size`        | [length](#length)             | `16rem`          | `var(--layout-size-16)`                      | Container         |
| `data-reel-gap`                  | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-reel-block-alignment`      | [align](#align)               | `stretch`        | `stretch`                                    | Container         |
| `data-reel-block-size`           | [block-size](#block-size)     | `auto`           | `auto`                                       | Container         |
| `data-reel-item-inline-size`     | [item-size](#item-size)       | `auto`           | `auto`                                       | Direct children   |
| `data-repel-gap`                 | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-repel-block-alignment`     | [align](#align)               | `center`         | `center`                                     | Container         |
| `data-sidebar-gap`               | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-sidebar-inline-alignment`  | [distribute](#distribute)     | `start`          | `flex-start`                                 | Container         |
| `data-sidebar-block-alignment`   | [align](#align)               | `stretch`        | `stretch`                                    | Container         |
| `data-sidebar-width`             | [length](#length)             | `20rem`          | `var(--layout-size-20)`                      | Direct children   |
| `data-sidebar-content-min`       | [content-min](#content-min)   | `50%`            | `50%`                                        | Direct children   |
| `data-sidebar-sticky-offset`     | [space](#space)               | `none`           | `0px`                                        | Direct children   |
| `data-sidebar-sticky-block-size` | [sticky-size](#sticky-size)   | `viewport`       | `calc(100vh - var(--sidebar-sticky-offset))` | Direct children   |
| `data-stack-gap`                 | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-stack-block-alignment`     | [distribute](#distribute)     | `start`          | `flex-start`                                 | Container         |
| `data-stack-inline-alignment`    | [align](#align)               | `stretch`        | `stretch`                                    | Container         |
| `data-switcher-gap`              | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-switcher-threshold`        | [length](#length)             | `40rem`          | `var(--layout-size-40)`                      | Direct children   |
| `data-with-icon-gap`             | [icon-gap](#icon-gap)         | `0.5em`          | `0.5em`                                      | Container         |
| `data-wrapper-max-inline-size`   | [length](#length)             | `70rem`          | `var(--layout-size-70)`                      | Container         |
| `data-wrapper-padding-inline`    | [space](#space)               | `5`              | `var(--space-5)`                             | Container         |
| `data-flow-space`                | [space](#space)               | `5`              | `var(--space-5)`                             | Direct children   |
| `data-region-space`              | [space](#space)               | `10`             | `var(--space-10)`                            | Container         |

## box surface

Prefer `data-box-surface` to select these values together. Individual attributes override the preset.

| Option    | color                       | background                      | border-color                      |
| --------- | --------------------------- | ------------------------------- | --------------------------------- |
| `layer-1` | `var(--color-text-primary)` | `var(--color-layer-1)`          | `var(--color-border-default)`     |
| `layer-2` | `var(--color-text-primary)` | `var(--color-layer-2)`          | `var(--color-border-default)`     |
| `layer-3` | `var(--color-text-primary)` | `var(--color-layer-3)`          | `var(--color-border-default)`     |
| `layer-4` | `var(--color-text-primary)` | `var(--color-layer-4)`          | `var(--color-border-default)`     |
| `default` | `var(--color-text-primary)` | `var(--color-layer-2)`          | `var(--color-border-default)`     |
| `inverse` | `var(--box-color-inverse)`  | `var(--box-background-inverse)` | `var(--box-border-color-inverse)` |

`data-variant="inverse"` remains an alias for `data-box-surface="inverse"`. An explicit preset takes precedence.

## space

| Option | CSS value         |
| ------ | ----------------- |
| `0`    | `var(--space-0)`  |
| `1`    | `var(--space-1)`  |
| `2`    | `var(--space-2)`  |
| `3`    | `var(--space-3)`  |
| `4`    | `var(--space-4)`  |
| `5`    | `var(--space-5)`  |
| `6`    | `var(--space-6)`  |
| `7`    | `var(--space-7)`  |
| `8`    | `var(--space-8)`  |
| `9`    | `var(--space-9)`  |
| `10`   | `var(--space-10)` |
| `11`   | `var(--space-11)` |
| `12`   | `var(--space-12)` |
| `none` | `0px`             |

## align

| Option     | CSS value    |
| ---------- | ------------ |
| `start`    | `flex-start` |
| `center`   | `center`     |
| `end`      | `flex-end`   |
| `stretch`  | `stretch`    |
| `baseline` | `baseline`   |

## distribute

| Option          | CSS value       |
| --------------- | --------------- |
| `start`         | `flex-start`    |
| `center`        | `center`        |
| `end`           | `flex-end`      |
| `space-between` | `space-between` |
| `space-around`  | `space-around`  |
| `space-evenly`  | `space-evenly`  |

## length

| Option  | CSS value               |
| ------- | ----------------------- |
| `8rem`  | `var(--layout-size-8)`  |
| `9rem`  | `var(--layout-size-9)`  |
| `10rem` | `var(--layout-size-10)` |
| `12rem` | `var(--layout-size-12)` |
| `16rem` | `var(--layout-size-16)` |
| `20rem` | `var(--layout-size-20)` |
| `24rem` | `var(--layout-size-24)` |
| `30rem` | `var(--layout-size-30)` |
| `40rem` | `var(--layout-size-40)` |
| `50rem` | `var(--layout-size-50)` |
| `60rem` | `var(--layout-size-60)` |
| `70rem` | `var(--layout-size-70)` |
| `80rem` | `var(--layout-size-80)` |

## block-size

| Option     | CSS value               |
| ---------- | ----------------------- |
| `8rem`     | `var(--layout-size-8)`  |
| `9rem`     | `var(--layout-size-9)`  |
| `10rem`    | `var(--layout-size-10)` |
| `12rem`    | `var(--layout-size-12)` |
| `16rem`    | `var(--layout-size-16)` |
| `20rem`    | `var(--layout-size-20)` |
| `24rem`    | `var(--layout-size-24)` |
| `30rem`    | `var(--layout-size-30)` |
| `40rem`    | `var(--layout-size-40)` |
| `50rem`    | `var(--layout-size-50)` |
| `60rem`    | `var(--layout-size-60)` |
| `70rem`    | `var(--layout-size-70)` |
| `80rem`    | `var(--layout-size-80)` |
| `auto`     | `auto`                  |
| `viewport` | `100vh`                 |

## min-height

| Option     | CSS value               |
| ---------- | ----------------------- |
| `8rem`     | `var(--layout-size-8)`  |
| `9rem`     | `var(--layout-size-9)`  |
| `10rem`    | `var(--layout-size-10)` |
| `12rem`    | `var(--layout-size-12)` |
| `16rem`    | `var(--layout-size-16)` |
| `20rem`    | `var(--layout-size-20)` |
| `24rem`    | `var(--layout-size-24)` |
| `30rem`    | `var(--layout-size-30)` |
| `40rem`    | `var(--layout-size-40)` |
| `50rem`    | `var(--layout-size-50)` |
| `60rem`    | `var(--layout-size-60)` |
| `70rem`    | `var(--layout-size-70)` |
| `80rem`    | `var(--layout-size-80)` |
| `none`     | `0px`                   |
| `viewport` | `100vh`                 |

## columns

| Option      | CSS value   |
| ----------- | ----------- |
| `1`         | `1`         |
| `2`         | `2`         |
| `3`         | `3`         |
| `4`         | `4`         |
| `5`         | `5`         |
| `6`         | `6`         |
| `7`         | `7`         |
| `8`         | `8`         |
| `9`         | `9`         |
| `10`        | `10`        |
| `11`        | `11`        |
| `12`        | `12`        |
| `auto-fill` | `auto-fill` |
| `auto-fit`  | `auto-fit`  |

## ratio

| Option | CSS value |
| ------ | --------- |
| `1/1`  | `1/1`     |
| `4/3`  | `4/3`     |
| `3/4`  | `3/4`     |
| `3/2`  | `3/2`     |
| `2/3`  | `2/3`     |
| `16/9` | `16/9`    |
| `9/16` | `9/16`    |
| `21/9` | `21/9`    |

## content-min

| Option    | CSS value |
| --------- | --------- |
| `25%`     | `25%`     |
| `33.333%` | `33.333%` |
| `50%`     | `50%`     |
| `66.667%` | `66.667%` |
| `75%`     | `75%`     |
| `100%`    | `100%`    |

## sticky-size

| Option     | CSS value                       |
| ---------- | ------------------------------- |
| `viewport` | `calc(100vh - {sticky-offset})` |
| `auto`     | `auto`                          |

## icon-gap

| Option   | CSS value |
| -------- | --------- |
| `0`      | `0`       |
| `0.25em` | `0.25em`  |
| `0.5em`  | `0.5em`   |
| `0.75em` | `0.75em`  |
| `1em`    | `1em`     |

## radius

| Option       | CSS value                  |
| ------------ | -------------------------- |
| `none`       | `0px`                      |
| `subtle`     | `var(--radius-subtle)`     |
| `control`    | `var(--radius-control)`    |
| `container`  | `var(--radius-container)`  |
| `expressive` | `var(--radius-expressive)` |

## border-width

| Option | CSS value |
| ------ | --------- |
| `0`    | `0px`     |
| `1`    | `1px`     |
| `2`    | `2px`     |
| `4`    | `4px`     |

## color

| Option                   | CSS value                             |
| ------------------------ | ------------------------------------- |
| `background-primary`     | `var(--color-background-primary)`     |
| `background-overlay`     | `var(--color-background-overlay)`     |
| `border-default`         | `var(--color-border-default)`         |
| `border-disabled`        | `var(--color-border-disabled)`        |
| `border-control`         | `var(--color-border-control)`         |
| `border-control-hover`   | `var(--color-border-control-hover)`   |
| `border-inverse`         | `var(--color-border-inverse)`         |
| `border-transparent`     | `var(--color-border-transparent)`     |
| `layer-1`                | `var(--color-layer-1)`                |
| `layer-2`                | `var(--color-layer-2)`                |
| `layer-3`                | `var(--color-layer-3)`                |
| `layer-4`                | `var(--color-layer-4)`                |
| `layer-inverse`          | `var(--color-layer-inverse)`          |
| `layer-accent`           | `var(--color-layer-accent)`           |
| `text-primary`           | `var(--color-text-primary)`           |
| `text-secondary`         | `var(--color-text-secondary)`         |
| `text-helper`            | `var(--color-text-helper)`            |
| `text-placeholder`       | `var(--color-text-placeholder)`       |
| `text-disabled`          | `var(--color-text-disabled)`          |
| `text-inverse-primary`   | `var(--color-text-inverse-primary)`   |
| `text-inverse-secondary` | `var(--color-text-inverse-secondary)` |
| `current`                | `currentColor`                        |

## item-size

| Option  | CSS value               |
| ------- | ----------------------- |
| `8rem`  | `var(--layout-size-8)`  |
| `9rem`  | `var(--layout-size-9)`  |
| `10rem` | `var(--layout-size-10)` |
| `12rem` | `var(--layout-size-12)` |
| `16rem` | `var(--layout-size-16)` |
| `20rem` | `var(--layout-size-20)` |
| `24rem` | `var(--layout-size-24)` |
| `30rem` | `var(--layout-size-30)` |
| `40rem` | `var(--layout-size-40)` |
| `50rem` | `var(--layout-size-50)` |
| `60rem` | `var(--layout-size-60)` |
| `70rem` | `var(--layout-size-70)` |
| `80rem` | `var(--layout-size-80)` |
| `auto`  | `auto`                  |

Values containing `{setting-name}` are templates expanded to the composition's local CSS variable.
