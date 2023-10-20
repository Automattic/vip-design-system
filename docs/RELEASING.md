# Releasing

The process to release to npm should be started when all pull requests intended for publishing have been merged and the software has been fully tested for publication. You can release either using GitHub Actions or locally.

## Versioning Guidelines

- `patch`: for non-breaking changes/bugfixes and small updates.
- `minor`: for some new features, bug fixes, and other non-breaking changes.
- `major`: for breaking changes.

## Note on NPM token

Publishing via the GitHub Action requires that the `NPM_TOKEN` be set correctly in GitHub Actions secrets. This should be an npm token generated for a bot user on [the npm @automattic org](https://www.npmjs.com/settings/automattic) that has publish access to this repo.

## Release Methods

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

## In case of problems

If you released a broken version, ensure to inform in the GitHub release entry about the breaking change, and follow the instructions provided by NPM in: [Deprecating and undeprecating packages or package versions
](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions).
