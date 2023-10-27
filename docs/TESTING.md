# Testing

Testing is an integral part of creating new features and maintaining the software.

## Automated testing

A [few actions](https://github.com/Automattic/vip-design-system/tree/trunk/.github/workflows) are automatically run via Github Actions when a pull request is created or updated.

### Linting

We run the following checks:

- linting (`npm run lint`)
- format checking (`npm run format:check`)
- type checks (`npm run check-types`)

### Dependency checks

We use the [dependaban action](https://github.com/Automattic/vip-actions/tree/trunk/dependaban) from [Automattic/vip-actions](https://github.com/Automattic/vip-actions/) to verify that no dependencies have install scripts.

### Unit tests

The tests are located inside of of each component. For example: [src/system/Accordion/Accordion.test.tsx](https://github.com/Automattic/vip-design-system/tree/trunk/src/system/Accordion/Accordion.test.tsx).

We recommend you to write tests close to the component implementation.

#### Adding new unit tests

When creating a new component, please consider adding a new unit test. Please ensure that the file name of the test matches the file name of the job. Example: `Button.test.tsx`. Put the test in the same folder as the component.

### Manual tests

We can test three ways:

**Storybook**

For components that include storybooks, we can run `npm run dev` to view the components in a sandbox-ed storybook environment.

**Pull Request Preview (Easy and recommended)**

Once you create a Pull request, a netlify bot will add a comment to your Pull Request with a preview link of the Storybook preview. This is helpful to share with other folks.

### External Applications tests

**npm link (not reliable)**

1. Run `npm link` in your checkout of this repo.
2. Spin up a local copy of [the VIP Dashboard](https://github.com/automattic/vip-dashboard) and navigate to a page using the linked components from `@automattic/vip-design-system`

Note: it's super useful to run `npm run watch` in another process, so any changes will be almost immediately available / testable.

**Manual Github Commit (More work, but reliable)**

1. Create your local changes and push to origin a new branch.
2. In a local copy of the [the VIP Dashboard](https://github.com/automattic/vip-dashboard) edit the vip-design-system line inside of the `package.json` file. Change the line with this:

```bash
"@automattic/vip-design-system": "github:automattic/vip-design-system#YOUR_PUSHED_COMMIT_HASH",
```

3. Run `npm install` in the vip-dashboard
4. Run `npm run dev`
5. You should have your changes available.
