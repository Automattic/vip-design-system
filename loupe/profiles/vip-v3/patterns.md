# VIP Design System v3 patterns

The design-system half of `loupe-patterns`. Load that skill first.

v3 has **no JSON composite registry**. Loupe's signatures are trees of imported
React component names, and v3's composites are compositions of classes on
native elements, which a signature cannot see. So `patterns/*` rules are off
for this profile and this file is the registry: check it before assembling
any of the shapes below, and reuse the markup it names.

## Reach for

| Shape                                                | Markup                                                                                                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Page section**                                     | `section.region[data-region-space]` › `div.wrapper.flow[data-flow-space]`. Region and wrapper on separate elements                                                                  |
| **Page or panel header** (title left, actions right) | `.repel` › heading with a `.type-heading-*` class + `.cluster` of `.button`s                                                                                                        |
| **Action row** (Cancel / Save)                       | `.cluster[data-cluster-gap]` of `.button`s, secondary first. Never a margin on the second button                                                                                    |
| **Card**                                             | `.box[data-box-surface]` with `.stack` on the same element or its child for the contents                                                                                            |
| **Card grid**                                        | `.grid[data-grid-columns="auto-fill"][data-grid-min-item-size]` of `.box`es. Not a wrapping `.cluster`, whose last row does not line up                                             |
| **Detail layout** (side panel + main)                | `.sidebar[data-sidebar-width]`                                                                                                                                                      |
| **Form**                                             | `form.stack` of fields; each field is the `.input` anatomy from its story. Actions in a `.cluster` at the end                                                                       |
| **Notice, banner, snackbar**                         | The block's own anatomy (in the header comment of its stylesheet): icon, `__text` with `__heading` and body, `__actions`. Do not rebuild a message surface from `.box` + `.sidebar` |
| **Icon + label in running text**                     | `.with-icon` › `svg.icon` + text. Not inside `.button` / `.toolbar`, which align their own icons                                                                                    |
| **Horizontally scrolling row**                       | `.reel`                                                                                                                                                                             |
| **Equal columns that stack when narrow**             | `.switcher[data-switcher-threshold]`                                                                                                                                                |
| **Prose**                                            | `.flow` on the container; the type classes on the elements                                                                                                                          |

## When the shape is not here

Build it from compositions first, and only add CSS for what no composition
expresses. If the same assembly appears in a third place, it belongs in this
table, and possibly in the system as a block. Raise it rather than copying it
a fourth time.
