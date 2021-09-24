# VIP Design System

Design system components used throughout VIP.

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
