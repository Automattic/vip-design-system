# Contributing

## Pull requests & issues

We welcome any contributions to this project.

If you have a small bugfix and already have the code available, feel free to [create a pull request](https://github.com/Automattic/vip-design-system/compare). If you have a feature suggestion, please [create an issue](https://github.com/Automattic/vip-design-system/issues/new). Please follow the instructions provided. Please assign a priority to the issue/pull request according to the definitions found below.

Before writing a patch or a larger chunk of code, please ensure to study the [ARCHITECTURE.md](ARCHITECTURE.md) and [TESTING.md](TESTING.md) files. Ensure that all tests pass before asking for a review of your pull request.

## Watching for changes

You can build it continuously so that every time you make a change, build files are automatically updated:

```bash
npm run watch
```

## Troubleshooting

### Dialog + Dropdown usage

If you are facing a Dialog overlaping a Dropdown content, add this CSS to your application:

```css
div[data-radix-popper-content-wrapper][data-aria-hidden='true'] {
	opacity: 0;
}
```

## Priorities

Each GitHub issue and pull request relating to this repository should have a priority label to make prioritizing easier. The definition of each priority is as follows:

- [Critical](https://github.com/Automattic/vip-design-system/labels/%5BPri%5D%20Critical): A bug currently affecting normal operation or a security problem that needs to be addressed urgently.
- [High](https://github.com/Automattic/vip-design-system/labels/%5BPri%5D%20High): An issue that is: a) relevant to current goals of the project, b) a bug that needs to addressed soon to maintain stability, or c) a feature often requested.
- [Normal](https://github.com/Automattic/vip-design-system/labels/%5BPri%5D%20Normal): Most issues belong here. These will include features less often requested, new lower priority features, documentation updates, etc.
- [Low](https://github.com/Automattic/vip-design-system/labels/%5BPri%5D%20Low): Features that are good to have belong here.

## Type of change labels

Each GitHub issue and pull-request should have a type of change label associated with it. The definition of these are as follows:

- [In Progress](https://github.com/Automattic/vip-design-system/labels/%5BStatus%5D%20In%20Progress): You can either use a draft pull request or keep as in-progress with this label.
- [Needs Review](https://github.com/Automattic/vip-design-system/labels/%5BStatus%5D%20Needs%20Review): Marked as needs review from others.
- [Has Feedback](https://github.com/Automattic/vip-design-system/labels/%5BStatus%5D%20Has%20Feedback): If you left feedback to the Pull request, mark with this label.
- [Ready to Merge](https://github.com/Automattic/vip-design-system/labels/%5BStatus%5D%20Ready%20to%20Merge): Approved and ready to be merged.
- [Bug](https://github.com/Automattic/vip-design-system/labels/%5BType%5D%20Bug): Code change to fix a bug, or a bug report.
- [Stale](https://github.com/Automattic/vip-design-system/labels/%5BStatus%5D%20Stale): Marked as stale because it has been inactive for some period.
- [Documentation](https://github.com/Automattic/vip-design-system/labels/%5BType%5D%20Documentation): Pull request to update documentation.
- [Enhancement](https://github.com/Automattic/vip-design-system/labels/%5BType%5D%20enhancement): A general enhancement – new feature, better implementation, new tests and so forth.
- [Update dependency](https://github.com/Automattic/vip-design-system/labels/dependencies): Pull request to update one or more dependencies.
- [NPM version update](https://github.com/Automattic/vip-design-system/labels/%5B%20Type%20%5D%20NPM%20version%20update): The GitHub action bot adds this label to automated dev or package release pull requests.
- [Question](https://github.com/Automattic/vip-design-system/labels/%5BType%5D%20Question): Prefer using the GitHub issues for asking questions.
