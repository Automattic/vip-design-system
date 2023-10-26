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
\``` 

You can then visit [http://localhost:60006/](http://localhost:60006/) to view.
