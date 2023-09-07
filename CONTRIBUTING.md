## Development

### Prerequisites

Make sure you have [node.js](https://nodejs.org/) and [NPM](https://docs.npmjs.com/getting-started/what-is-npm) installed. Here's a [handy installer](https://nodejs.org/download/) for Windows, Mac, and Linux.

### Install

To get setup run the following command in the `vip-design-system` directory:

```
npm install
```

### Watching for changes

You can build it continuously so that every time you make a change, build files are automatically updated:

```
npm run watch
```

### Testing

We can test two ways:

**Storybook**

For components that include storybooks, we can run `npm run storybook` to view the components in a sandbox-ed storybook environment.

**npm link**

1. Run `npm link` in your checkout of this repo.
2. Spin up a local copy of [the VIP Dashboard](https://github.com/automattic/vip-ui) and navigate to a page using the linked components from `@automattic/vip-design-system`

Note: it's super useful to run `npm run watch` in another process, so any changes will be almost immediately available / testable.

### Updating the Theme with VIP Design System Tokens

You need to update the tokens once the VIP Design System updates the core files.

#### How the theming works

We use the VIP Design System Tokens as our base theme structure. All colors, spaces, types should come from a dynamic token system provided by the VIP Design team, currently using Figma as the design software. When the design system is updated by the Design team, they push a file to the root of this repository: `tokens/valet-core.json`.

By using the [Token Transformer](https://docs.tokens.studio/sync/github#7-how-to-use-tokens-stored-in-github-in-development) and a custom npm script, we parse this file getting only the VIP Dashboard theme we need for the react components. The light theme is called: `wpvip-productive-color`, and the dark theme is called `wpvip-productive-color-dark`.

Once the new file is updated, we need to generate a custom theme file in `src/generated/valet-theme-light.json`. This operation generates a small json file with the colors we need already filled in.

Once the theme is updated, the file `src/system/theme/index.js` reads the colors and apply to all components.

Use the section below to run the script and update the theme.

_Important:_ If you change the `generated/valet-theme.json`, make it sure to open a new pull request with these changes and release a new version if needed.

#### Update theme script

Run this command to update the VIP Valet Theme with the latest `tokens/**` files.

```bash
npm run theme-update
```

## Publishing new version

The process to release to npm should be started when all pull requests intended for publishing have been merged and the software has been fully tested for publication. You can release either using GitHub Actions or locally.

### Versioning Guidelines

- `patch`: for non-breaking changes/bugfixes and small updates.
- `minor`: for some new features, bug fixes, and other non-breaking changes.
- `major`: for breaking changes.

### Note on NPM token

Publishing via the GitHub Action requires that the `NPM_TOKEN` be set correctly in GitHub Actions secrets. This should be an npm token generated for a bot user on [the npm @automattic org](https://www.npmjs.com/settings/automattic) that has publish access to this repo.

### GitHub Actions (Preferred)

This is the preferred method for pushing out the latest release. The workflow runs a bunch of validations, generates a build, bump versions + tags, pushes out to npm, and bumps to the next dev version.

1. Initiate the [release process here](https://github.com/Automattic/vip-design-system/actions/workflows/npm-prepare-release.yml).
1. On the right-hand side, select "Run Workflow".
1. Pick your preferred version bump.
1. Click `Run Workflow`.
1. Wait for a pull request to appear. The pull request will update the version number and shall be assigned to you.
1. When ready, merge the pull request. This will lead to a new version to be [published on npmjs.com](https://www.npmjs.com/package/@automattic/vip-design-system).
1. Another pull request will be created to bump to a development version, also assigned to you. Merge it to finish the process.

### Local

Follow these steps to publish locally:

1. Make sure you have NPM access to our @automattic organization. Ask for #vip-platform-pâtisserie help in case you need it.
2. Pull all the changes to your local trunk. Make sure you have the latest trunk locally.
3. We follow the [https://semver.org/](https://semver.org/) versioning. You should run the specific version you are trying to publish:

```bash
npm version major|minor|patch
```

4. You should see a version bump in the `package.json` file.
5. Build the application:

```bash
npm run build
```

6. Publish the application

```
npm publish
```

Note: You need to have two-factor enabled in your npm account. The publish command will request a two-factor code to complete the publishing process. You can also add `--otp=CODE` to the `npm publish` command if you already have the code.

7. Push the tags to the repository and trunk updates.

```
git push --tags
git push origin trunk
```

8. For major versions or breaking changes, it's recommended to [create a RELEASE](https://github.com/Automattic/vip-design-system/releases) with the published tag.

Ps: Add a `BREAKING CHANGES` section to the release. This will avoid folks trying to figure out why their code is not working on the VIP Dashboard or any other system.

## Troubleshooting

### Dialog + Dropdown usage

If you are facing a Dialog overlaping a Dropdown content, add this CSS to your application:

```css
div[data-radix-popper-content-wrapper][data-aria-hidden='true'] {
	opacity: 0;
}
```
