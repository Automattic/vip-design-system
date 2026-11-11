# Migration notes

What is deprecated in the current major, what replaces it, and what the next major will change. Per-release details live in the [GitHub releases](https://github.com/Automattic/vip-design-system/releases).

## Deprecated in 2.x

Everything below still works in 2.x. Typed APIs carry an `@deprecated` tag where possible; for string literals such as `variant="danger"`, this guide is the migration signal. All of it is removed in 3.0.

| Deprecated                                                                                                                                                       | Use instead                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Flat form exports at the package root: `Checkbox`, `Input`, `Label`, `Radio`, `RadioBoxGroup`, `RadioGroupChip`, `Textarea`, `Toggle`, `ToggleRow`, `Validation` | The same components from the `Form` namespace: `Form.Checkbox`, `Form.Input`, `Form.Label`, and so on |
| `Dialog`, `DialogButton`, `DialogContent`, `DialogDivider`, `DialogMenu`, `DialogMenuItem`, `DialogTrigger`                                                      | `NewDialog` for modal and sidebar dialogs, `Dropdown` for menus                                       |
| `ConfirmationDialog`, `ConfirmationDialogContent`                                                                                                                | `NewConfirmationDialog`                                                                               |
| `Tooltip`                                                                                                                                                        | `NewTooltip`                                                                                          |
| `ButtonVariant.danger` and `variant="danger"` on `Button`                                                                                                        | The `danger` prop with another variant                                                                |
| The `body` prop of `NewConfirmationDialog`                                                                                                                       | The `description` prop                                                                                |
| The legacy Pagination prop marked `@deprecated`                                                                                                                  | The `compact` prop, or `SimplePagination` for cursor-based navigation                                 |

Deep imports from `@automattic/vip-design-system/build/...` are not deprecated yet but are not a stable contract either. Prefer the package root; `baseControlStyle`, `HeadingProps` and `ServiceStatus` are exported from it since 2.24.

## Upcoming in 3.0

Breaking changes planned for the next major, so consumers can prepare. Each will carry a migration note in its release.

- React 19 becomes the minimum peer dependency. Components already take `ref` as a plain prop, which React 18 does not support.
- The deprecations above are removed. `NewDialog`, `NewConfirmationDialog` and `NewTooltip` take the plain names `Dialog`, `ConfirmationDialog` and `Tooltip`.
- `variant` becomes a string union on every component and `size` uses one scale. `LinkExternal` becomes a named export. Hooks such as `useScrollableTabs` are exported.
- An `exports` map restricts imports to the package root plus `./theme` and `./ServiceHeader`; deep `build/...` paths stop resolving.
- framer-motion, i18n-calypso and react-icons are dropped as dependencies. Strings that came from i18n-calypso become props with English defaults.
