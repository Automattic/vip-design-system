# Architecture

## Basic functionality

`vip-design-system` is a React component released in the NPM registry. It's a public package that anyone can install.

## Languages & coding standard

Both JavaScript and TypeScript are used to implement the software.

We require that the WPVIP defined coding style to be used, defined in [.eslintrc.js](https://github.com/Automattic/vip-design-system/blob/trunk/.eslintrc.js).

We also use [.prettierrc](https://github.com/Automattic/vip-design-system/blob/trunk/.prettierrc) to have a standard on coding formatting. It's recommended to set your Editor to apply "Format on Save".

## Code structure

The code is structured in the following way:

- [.github/](https://github.com/Automattic/vip-design-system/tree/trunk/.github) — configuration and templates for GitHub actions.
- [.storybook/](https://github.com/Automattic/vip-design-system/tree/trunk/.storybook) — configuration files for Storybook
- [src/](https://github.com/Automattic/vip-design-system/tree/trunk/src) — Javascript and Typescript react component files + Theme configuration
- [test/](https://github.com/Automattic/vip-design-system/tree/trunk/test) — Unit tests
- [tokens/](https://github.com/Automattic/vip-design-system/tree/trunk/test) — VIP Design Sytem tokens exported using [Figma Studio](https://docs.tokens.studio/). This is the source of truth for the Design team tokens, variables, etc.

## Feature flags

No feature flags are currently in use.

## Database

This project has no database storage.

## Dependencies

This is a standalone NPM package. Currently there's no API communication. All the code dependencies are listed in the `package.json` file of this project.

Major dependencies of this project are:

- Storybook — Dev dependency for previewing our components and documentation
- Theme UI — Base theme and components structure
- Radix — React primitives components used to build some of our custom components
