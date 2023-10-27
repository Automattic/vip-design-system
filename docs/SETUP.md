# Setup

## Language & requirements

- Implemented in JavaScript and TypeScript.
- Requirements are:
  - Node, see version in [package.json](https://github.com/Automattic/vip-design-system/blob/trunk/package.json)
  - A few NPM packages are needed, those are listed in the same file.
  - The software is fairly lightweight, no special hardware requirements.
  - Network access.

## Installation & setup instructions

### Fetching & installing

This will fetch the package and install all dependencies:

```bash
git clone git@github.com:Automattic/vip-design-system.git && \
cd vip-design-system && npm install
```

### Building

This will build all TypeScript files so they can be executed:

```bash
cd vip-design-system && \
npm run build
```

## Usage

The best experience is to use Storybook preview for set up and development.

### Starting up locally

Run:

```bash
npm run dev
```

You can then visit [http://localhost:60006/](http://localhost:60006/) to view.

## Updating dependencies

Dependencies should be updated by merging [pull requests from dependabot](https://github.com/Automattic/vip-design-system/pulls/app%2Fdependabot). However, great care should be taken before merging as updating dependencies can cause errors with the `vip-design-system` components. There can also be effects to the [RELEASING](https://github.com/Automattic/vip-design-system/blob/trunk/docs/RELEASING.md) process. This can happen silently.

### Before merging

Consider removing the dependency. Can the functionality needed from the dependency be implemented directly into `vip-design-system` or our own common libraries? If not, evaluate the following:

1. If the dependency is one of the [development dependencies](https://github.com/Automattic/vip-design-system/blob/trunk/package.json) (`devDependencies`), and/or only used by one of those, the likelihood of customer-impacting failure is low.
2. Is the package used in the [RELEASING](https://github.com/Automattic/vip-design-system/blob/trunk/docs/RELEASING.md) process? If it is, evaluate if any failure is likely to be silent. If that seems not to be the case, the risk of customer-impacting failure is low.
3. Is the package used in one or more [components](https://github.com/Automattic/vip-design-system/blob/trunk/src/system)? If it is, evaluate if any failure is likely to be silent. Take a look at the [TESTING](https://github.com/Automattic/vip-design-system/blob/trunk/docs/RELEASING.md) strategies to ensure the update is good.

#### Low risk dependencies

If the risk of merging is low, you can go a head and merge without doing anything further (given that all tests succeed).

#### Higher risk dependencies

For higher risk dependencies, the jobs using the dependency [will have to be tested locally](https://github.com/Automattic/vip-design-system/blob/trunk/docs/TESTING.md#locally) and the results verified. You can [run it locally](https://github.com/Automattic/vip-design-system/blob/trunk/docs/SETUP.md#starting-up-locally) and verify that all affected components are working normally.

### After merging

Test any [external Applications tests](https://github.com/Automattic/vip-design-system/blob/trunk/docs/TESTING.md#external-applications-tests) using the `vip-design-system` as a dependency, for example, [the VIP Dashboard](https://github.com/automattic/vip-dashboard).
