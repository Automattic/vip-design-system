# Working with the Figma file

How to read the design from Figma with the Figma connector (MCP), and how its
names map onto the code. This is reference, not rules: the binding rules for
Figma work are in `AGENTS.md` under "Working from Figma". The connector's
behaviour can change, so check anything below that seems wrong before relying
on it.

## The files

| File                    | Key                      |
| ----------------------- | ------------------------ |
| VIP Design System, 2026 | `y6SBkX4P56nC0BuYecnW7L` |
| Icons library           | `b1kmSDzlAniC2N5YmpAqJt` |

## Ask for component-set node links

The file can't be browsed by an agent. Calling `get_metadata` without a node ID
returns only the cover page, so there is no page discovery. Ask Emily for a
link to each component's **component set**. The node ID is in the link:
`node-id=16008-13986` is node `16008:13986`.

## What works

- `get_metadata` and `get_variable_defs` on a component-set node. They don't
  need anything selected in the Figma desktop app.
- `get_design_context` on a component set, for structure and geometry.
- `get_screenshot` on a single variant, to compare against the code.
- `download_assets` with `defaultFormat: 'svg'` for icon artwork.

## What doesn't

- **Large documentation frames.** `get_metadata` truncates at a fixed size, and
  `get_variable_defs` misreports the failure as "You currently have nothing
  selected". Ask for a smaller node.
- **`search_design_system` searches published libraries, not the working
  file.** It finds published components such as `@wordpress/ui`'s Badge, not
  ours. It does find icons in the published Icons library, by name.
- **The variables REST endpoint** needs Figma Enterprise; Automattic is on
  `org`.

## Efficiency

- For measurements alone, use `get_metadata`, not `get_design_context`. Button's
  design context passed 25,000 tokens and truncated; its metadata answered the
  same question at once.
- A result too large to return is saved to a file. Query that file rather than
  requesting it again.
- `get_variable_defs` returns only the variables that node uses, so a variable
  missing from one node may still exist in the file.

## How Figma names map to code

A leading hyphen on a group marks a component token (see `AGENTS.md`):

| Figma                             | Code                                    |
| --------------------------------- | --------------------------------------- |
| `color/-badge/red/background`     | `tokens/component/badge.json`           |
| `color/support/system/background` | `tokens/semantic/support/system.json`   |
| `color/text/primary`              | `tokens/semantic/text.json`             |
| `space/micro`, `space/tight`      | `--space-micro`, `--space-tight`        |
| `space/static/4`                  | `--space-4` (Figma's `static/N` = `N`)  |
| `borderRadius/static/control`     | `--radius-control`                      |
| `fontSize/static/0`               | `--font-size-0`                         |
| `fontFamily/body`                 | `--font-family-default`                 |
| `support/label-xs`                | `.type-support-label-xs`                |
| `heading/4`, `text/default`       | `.type-heading-4`, `.type-body-default` |
| effect `Low`                      | `--shadow-low`                          |

## Icons

Icons come from the Icons library, curated to the set listed in
`src/icons/manifest.json`. To add one, add its name to the manifest and run
`npm run icons:sync`, which needs `FIGMA_TOKEN` set in your environment. Use
the name exactly as the Figma library spells it. The library is Boxicons v2,
and some of its names differ from the `@boxicons/core` npm package.
