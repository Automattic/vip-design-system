# Architecture

## Basic functionality

`vip-design-system` is a React component released in the NPM registry. It's a [public package](https://www.npmjs.com/package/@automattic/vip-design-system) that anyone can install.

## Languages & coding standard

Both JavaScript and TypeScript are used to implement the software.

We require that the WPVIP defined coding style to be used, defined in [.eslintrc.js](https://github.com/Automattic/vip-design-system/blob/trunk/.eslintrc.js).

We also use [.prettierrc](https://github.com/Automattic/vip-design-system/blob/trunk/.prettierrc) to have a standard on coding formatting. It's recommended to set your Editor to apply "Format on Save".

[JEST](https://github.com/Automattic/vip-design-system/blob/readme-update/package.json#L16-L17) is the test-runnner used in this application.

## Code structure

The code is structured in the following way:

- [.github/](https://github.com/Automattic/vip-design-system/tree/trunk/.github) — configuration and templates for GitHub actions.
- [.storybook/](https://github.com/Automattic/vip-design-system/tree/trunk/.storybook) — configuration files for Storybook
- [src/](https://github.com/Automattic/vip-design-system/tree/trunk/src) — Javascript and Typescript react component files + Theme configuration + Components tests (on each component folder).
- [test/](https://github.com/Automattic/vip-design-system/tree/trunk/test) — Test utilities, mocks or configuration for the test suite.
- [tokens/](https://github.com/Automattic/vip-design-system/tree/trunk/test) — VIP Design Sytem tokens exported using [Figma Studio](https://docs.tokens.studio/). This is the source of truth for the Design team tokens, variables, etc.

### Components structure

Components lives under the `src/system/ComponentName` directory. Each component folder contains a similar set of files. Let's use the [Avatar](https://github.com/Automattic/vip-design-system/tree/trunk/src/system/Avatar) component as an example:

- **Avatar.stories.tsx**: This is the documentation file of the component. The `*.stories` is related to the Storybook story files.
- **Avatar.test.tsx**: This is the test file for this component. We run `jest` as a runner in this application.
- **Avatar.tsx**: This is the TypeScript component itself.
- **index.ts**: Some components has a index file to export different files. This is not recommended anymore.

### Theme UI & Radix UI Primitives

Most of our components are based on [https://theme-ui.com/](https://theme-ui.com/) components. We try to write our own components as much as we can. Other components are based on [Radix UI Primitives](https://www.radix-ui.com/primitives) components. Radix usually has some solid and accessible components that we can use as a base.

## Updating the Theme with VIP Design System Tokens

Token sources live under [tokens/](https://github.com/Automattic/vip-design-system/tree/trunk/tokens) in [W3C DTCG](https://www.designtokens.org/) format (`.tokens.json`). Figma writes these files directly. Run:

```bash
npm run theme-update
```

to regenerate `src/system/theme/generated/valet-theme-{light,dark}.json` from the sources.

### Source layout

- `tokens/primitives.tokens.json` — raw color ramps, spacing, type, breakpoints (the `valet-core` layer).
- `tokens/semantic.tokens.json` — intent-based aliases for the light theme.
- `tokens/semantic.dark.tokens.json` — overrides applied on top of the semantic layer to produce the dark theme.

### Pipeline

[Style Dictionary v4](https://styledictionary.com/) (configured in [`style-dictionary/`](https://github.com/Automattic/vip-design-system/tree/trunk/style-dictionary)) reads the DTCG sources, resolves references, evaluates math expressions, converts inline `rgba(...)` calls to 8-char hex, and emits JSON in the legacy `{value, type}` shape that [`src/system/theme/index.ts`](https://github.com/Automattic/vip-design-system/blob/trunk/src/system/theme/index.ts) consumes via `getPropValue` / `getVariants`. Components import the assembled `theme` object from `@automattic/vip-design-system` and mount it with `<ThemeUIProvider>`.

### Snapshot regression gate

Generated themes are pinned to [`tests/fixtures/theme-snapshot/`](https://github.com/Automattic/vip-design-system/tree/trunk/tests/fixtures/theme-snapshot). Run:

```bash
npm run theme-verify
```

to diff the current build against the snapshot. CI fails on any mismatch. Update the snapshot intentionally when token output is meant to change.

_Important:_ Do not hand-edit `generated/valet-theme-{light,dark}.json` — they're overwritten on every `theme-update`.

## Feature flags

No feature flags are currently in use.

## Database

This project has no database storage.

## Dependencies

This is a standalone NPM package. Currently there's no API communication. All the code dependencies are listed in the [package.json](https://github.com/Automattic/vip-design-system/blob/trunk/package.json) file of this project.

Major dependencies of this project are:

- Storybook — Dev dependency for previewing our components and documentation
- Theme UI — Base theme and components structure
- Radix — React primitives components used to build some of our custom components
