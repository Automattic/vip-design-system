# Architecture

## Basic functionality

`vip-design-system` is a React component released in the NPM registry. It's a [public package](https://www.npmjs.com/package/@automattic/vip-design-system) that anyone can install.

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

## Updating the Theme with VIP Design System Tokens

You need to update the tokens once the VIP Design System updates the core files. The Figma Studio plugin will push files into the [tokens/](https://github.com/Automattic/vip-design-system/tree/trunk/tokens) folder. Once these files are there, you can run the following: 
```bash
npm run theme-update
\``` 
to have an updated json theme under [src/system/theme/generated/](https://github.com/Automattic/vip-design-system/tree/trunk/src/system/theme/generated).

### How the theming works

We use the VIP Design System Tokens as our base theme structure. All colors, spaces, types should come from a dynamic token system provided by the VIP Design team, currently using Figma as the design software. When the design system is updated by the Design team, they push files to the [tokens/](https://github.com/Automattic/vip-design-system/tree/trunk/tokens) directory.

By using the [Token Transformer](https://docs.tokens.studio/sync/github#7-how-to-use-tokens-stored-in-github-in-development) and a custom npm script, we parse this file getting only the VIP Dashboard theme we need for the react components. The light theme is called: `wpvip-product-core`, and the dark theme is called `wpvip-product-dark`.

Once the new file is updated, we need to generate a custom theme file in [src/system/theme/generated/valet-theme-light.json](https://github.com/Automattic/vip-design-system/blob/trunk/src/system/theme/generated/valet-theme-light.json). It will also generate a Dark theme version. This operation generates JSON files with the colors we need already filled in.

Once the theme is updated, the file [src/system/theme/index.js](https://github.com/Automattic/vip-design-system/blob/trunk/src/system/theme/index.js) reads the colors and apply to all components.

Use the section below to run the script and update the theme.

_Important:_ If you change the `generated/valet-theme-light.json` or the `generated/valet-theme-dark.json`, or changes will be overwritten once someone runs `npm run theme-update` again.

### Update theme script

Run this command to update the VIP Valet Theme with the latest `tokens/**` files.

```bash
npm run theme-update
```

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
