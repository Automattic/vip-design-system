# VIP Design System v3 — Project Direction Notes

Nov 23, 2026 · Emily Maurer

> Exported from the working doc on claude.ai, before the move to the company Claude Code account. This repo copy is the one that travels; the claude.ai doc stays in the personal account.

## Setting Up this Project in the Company Account

Before we start working on anything else, we'll have to reconnect a few things.

- reconnect the Figma connector;
- install the Loupe plugin;
- set `FIGMA_TOKEN`;
- confirm the agent reads `AGENTS.md`.

## Progress Visibility

The audience for now is designers on Emily's team, who will later use the system.

- **Deploy Storybook to a URL** so anyone can look without installing anything. Host it on Spacefast, next to the status page.
- **One status data file in the repo** is the only place status is edited, by people or agents. It feeds two outputs:
  - a status page, an HTML file Spacefast publishes from the repo, with every change saved as a new version;
  - Storybook: a status badge on each component and an overview page.
- **The status page covers every workstream,** not just components: infrastructure, rules, account transfer, milestones.
- **Three statuses:** In progress, Needs review, Done. Agents may set the first two; only a person sets Done.
- **Updates are enforced** by an agent rule and a check that flags component changes with no matching status update.

## Where Rules Live

- **`AGENTS.md` holds every binding rule,** for people and agents alike. If a rule isn't there, it doesn't bind.
- **Rules are written as steps, not descriptions.**
- **`REBUILD-PLAN.md`, the decision log and the handoff are background:** useful for understanding why, but not required reading for following the rules.
- **Sync with GitHub before starting any work,** not only before component work. Added to `AGENTS.md`.

### Moving rules out of personal agent memory

Six memory files are sorted three ways:

- **Binding rules → `AGENTS.md`:**
  - Figma is the source of truth for components.
  - Show a full diff before changing tokens or Figma variables.
  - In Figma, a leading hyphen (`color/-badge/…`) marks a component token.
  - Keep reporting measured contrast failures, even when Figma specifies the colour.
  - Theme-able SVG marks use a mask, not a data-URI fill.
  - Override a utility through a custom-property hook, not a selector.
  - Token naming patterns.
- **How-to reference → a separate Figma workflow doc:** how the Figma connector behaves and how to get node links.
- **Decision history → the token files themselves:** e.g. the warning not to change button danger's dark value back to Figma's red.45 goes in that token's own description.

### Procedure for adding or changing a component

Goes into `AGENTS.md` as steps.

1. **Sync with GitHub** before starting.
2. **Get the Figma component-set node links** and read the component's measurements and variables.
3. **Component design:** Figma always wins. Rebuild to match without asking. **Tokens:** any token change needs a full diff and Emily's approval before it is made.
4. **Plan before writing CSS.** List the compositions and utilities the component uses. The block declares only what none of them provide.
5. **Write the block, token file and story.** The story is a usage test: editable content, long text, optional parts.
6. **Verify.** All of these must pass:
   - the pre-commit checks: types, lint, formatting, unit tests, the token configuration check, and the CSS convention check (Loupe);
   - the shared agent hook, which runs the fast checks before an agent can finish its turn;
   - the package check, and the component rendering correctly in the test app from the built package;
   - a visual match with Figma in light and dark mode;
   - measured contrast, with any failures reported.
7. **Run `/simplify` or `/code-review`** on the changes and act on the findings.
8. **Set status to Needs review,** never Done.
9. **Commit,** and open a pull request if that workflow is adopted.

### Application testing

Runs automatically in CI:

**Package check:** build the package and confirm every file `package.json` promises exists and loads.

**Test app:** a small app in the repo installs the built package and renders each component from it, checking for missing styles, broken token references and accessibility. Builds on the collaborator's existing Badge browser tests.

Proposed implementation for tests step 6 depends on, in build order:

1. **Make the package build its CSS.** A prerequisite: today `vite build` only builds JavaScript, and nothing writes `dist/css/index.css` or `dist/tokens/vars.css`. Compile `src/css/index.css` into one file with its imports inlined (`postcss-import` is already configured but never run on it), and have Style Dictionary write the token variables into `dist/tokens/`.
2. **Package check** (`npm run check:package`): a short script that runs after the build. It reads `main`, `module`, `types` and `exports` from `package.json` and fails if any promised file is missing or empty. It also checks the CSS has no leftover imports, and uses `npm pack --dry-run` to confirm the files actually ship.
3. **Test app** (`test/consumer/`): a minimal app that installs the packed tarball, the way a product would. It renders each component two ways, plain HTML with classes and the React wrapper where one exists. The component list comes from the status file, so new components are covered automatically.
4. **Headless browser runner:** the existing Badge browser tests are opened by hand. Add a runner (Playwright, or Vitest's browser mode) so they and the test app run automatically. Checks: computed styles against baselines, unresolved custom properties, and an accessibility scan. Visual screenshot comparison can come later.
5. **Pre-commit additions:** unit tests, `check:configuration`, a Loupe check on changed files, and a status-update check. Keep the hook fast; the package check and test app run in CI only.
6. **Status-update check:** a script that flags changes under `src/css/blocks/`, `tokens/component/` or `src/components/` when the matching entry in the status file wasn't updated.
7. **Shared agent hook:** a `.claude/settings.json` committed to the repo, with a hook that runs the fast checks before an agent finishes a turn. It runs commands on each contributor's machine, so it has to be fast and safe. It depends on the Loupe plugin, which must be documented in the setup instructions.
8. **CI workflow** (GitHub Actions): runs everything above on every push or pull request. It can block merges only if the pull-request workflow is adopted.

CSS convention enforcement:

- Loupe enforces the CSS conventions. It's already set up in the repo, with a v3 profile in `loupe/` and the repo's own config in `loupe.config.json`.

## Outstanding questions

- [ ] **Should changes land through pull requests that must pass checks, instead of being pushed straight to the branch?** PRs would give CI somewhere to run, a review point, and a visible record of who changed what.

**Why it matters: layers of enforcement, most to least reliable.**

| Layer                                                 | Who it catches            | Can it be skipped?                 |
| ----------------------------------------------------- | ------------------------- | ---------------------------------- |
| CI check on GitHub                                    | Everyone, human or agent  | No, if merging requires it to pass |
| Pre-commit hook (Lefthook)                            | Anyone committing locally | Yes, with `--no-verify`            |
| Claude Code hook, e.g. Loupe before an agent finishes | Agents only               | Depends on each person's setup     |
| Step-by-step checklist in `AGENTS.md`                 | Agents that read it       | Yes                                |
| Descriptive rules                                     | Almost no one reliably    | Yes                                |

Today the project relies almost entirely on the bottom two rows. The top row only works if changes land through pull requests.

- [ ] **Can `docs/component-inventory.csv` be retired?** The new status file would replace it.

## Still to discuss

- **Milestones before collaboration.** Not discussed yet. A first draft:
  1. The package builds and is proven in a test app.
  2. The rules are enforced by CI.
  3. Core components are reviewed against Figma in light and dark mode.
  4. A written contribution path and a PR template exist.
  5. A versioned pre-release is used by one real app.
- **Order of work.** Revised draft:
  - [ ] Pack up in this account.
  - [ ] Move to the company account and reconnect the tools.
  - [ ] **Update the development dependencies (added 2026-11-23).** Storybook to 10.6.2 or later first, then Vitest, Vite, ESLint, PostCSS and Style Dictionary, re-running every check after each. Remove `@boxicons/core` if nothing uses it. This comes before the guardrails, so the new checks and tests are built on current tools rather than re-verified after an upgrade.
  - [ ] Guardrails: the rules in `AGENTS.md`, then the checks and tests, starting with making the package build its CSS.
  - [ ] Visibility: Storybook and the status page on Spacefast.
  - [ ] Redo the notice family under the new rules.
