# VIP Design System

Design system components used throughout VIP.

[Storybook Components](https://vip-design-system-components.netlify.app/)

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

### Publish NPM Package Instructions

Once all the changes needed are merged to trunk, and you are ready to release a new version, follow these steps:

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

Note: You need to have two-factor enabled in your npm account. The publish command will request a two-factor code to complete the publishing process.

7. Push the tags to the repository and trunk updates.

```
git push --tags
git push origin trunk
```

8. For major versions or breaking changes, it's recommended to [create a RELEASE](https://github.com/Automattic/vip-design-system/releases) with the published tag.
