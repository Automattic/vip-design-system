# Contributing

## Pull requests & issues

We welcome any contributions to this project.

If you have a small bugfix and already have the code available, feel free to [create a pull request](https://github.com/Automattic/vip-design-system/compare). If you have a feature suggestion, please [create an issue](https://github.com/Automattic/vip-design-system/issues/new). Please follow the instructions provided. Please assign a priority to the issue/pull request according to the definitions found below.

Before writing a patch or a larger chunk of code, please ensure to study the [ARCHITECTURE.md](ARCHITECTURE.md) and [TESTING.md](TESTING.md) files. Ensure that all tests pass before asking for a review of your pull request.

## Watching for changes

You can build it continuously so that every time you make a change, build files are automatically updated:

```
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
