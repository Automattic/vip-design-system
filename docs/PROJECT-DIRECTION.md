# VIP Design System v3 — Project Direction Notes

Nov 23, 2026 · Emily Maurer

> Exported from the working doc on claude.ai at the end of the 2026-11-23 session, before the move to the company Claude Code account. This repo copy is the one that travels; the claude.ai doc stays in the personal account.

## Purpose

Notes from a working session on how to move the v3 rebuild forward. Topics are discussed one at a time; nothing changes in the code until a plan is agreed.

The five topics Emily raised:

1. Make progress easy for others to see (short term).
2. Get the project ready for collaboration, and agree the milestones before it is (longer term).
3. Stronger rules and systems that agents must follow, because recent component work did not follow the conventions already defined.
4. Package everything for the move to the company Claude Code account.
5. Agree a plan for next steps before committing anything.

## Where the project stands

The branch `em/system-rebuild-v3` has diverged: 4 local commits are unpushed, and GitHub has 4 commits from Emily's collaborator that are not local. A dry-run merge shows one trivial conflict, in `docs/decisions-log.csv`.

**Update, end of 2026-11-23:** the branch is synced and pushed. The collaborator's work is merged (`9d611198`), the Loupe setup is committed (`6a42d9b3`), and the Notice experiment was discarded. The rest of this section describes the state at the start of the session.

**Local, unpushed (agent work):**

- Notice, Notice-inline, Banner and Snackbar: CSS blocks, token sets and Storybook stories.
- Test and tooling fixes that came with them.

**On GitHub, not local (collaborator's work, all deliberate):**

- Generated, typed React wrappers over the CSS, for example `<Box padding={6}>` or `<Badge variant="error">`. They only apply classes and `data-*` attributes; the CSS still works on its own. Components opt in through their token files.
- Base UI replaces Radix as the library for complex interactive components.
- A Badge colour fix and Storybook documentation fixes.

**Problems Emily found reviewing the notice family:**

- The package ships nothing usable: `dist/css` and `dist/tokens/vars.css` are never built.
- The blocks re-create layout that the compositions already provide (`.stack`, `.cluster`, `.box`, possibly `.sidebar`).
- Stories are showcases rather than usage tests, for example hard-coded list content in Notice.
- The agent built on a copy of the branch 3 weeks out of date.

**Uncommitted in the working tree:**

- An unapproved experiment moving Notice onto the compositions.
- Loupe conformance setup (`loupe/`, `loupe.config.json`, a `flow.css` comment), not made by the agent.
- A status section in `docs/SESSION-HANDOFF.md`.

## Agreed so far

- **No code changes or commits** until the plan is agreed.
- **Discuss one topic at a time.**
- **Collaboration is human plus agent.** Emily has one collaborator who also works through Claude Code agents. Assume every current and future contributor is both a person and their agents.
- **The collaborator's commits stay.** The Base UI change and the generated React wrappers were deliberate. They add a typed layer over the CSS rather than changing the CSS-first direction.
- **Rules must live in the repo, not in any one person's setup.** Some binding rules currently exist only in one agent's personal memory. Other contributors' agents can't see them, and they will not survive the account move.
- **Probable first step, once a plan is agreed:** merge the collaborator's 4 commits, resolve the decision-log conflict, then push.

**Progress visibility (agreed 2026-11-23).** The audience for now is designers on Emily's team, who will later use the system.

- **Deploy Storybook to a URL** so anyone can look without installing anything. Host it on Spacefast, next to the status page.
- **One status data file in the repo** is the only place status is edited, by people or agents. It feeds two outputs:
  - a status page, an HTML file Spacefast publishes from the repo, with every change saved as a new version;
  - Storybook: a status badge on each component and an overview page.
- **The status page covers every workstream,** not just components: infrastructure, rules, account transfer, milestones.
- **Three statuses:** In progress, Needs review, Done. Agents may set the first two; only a person sets Done.
- **Updates are enforced** by an agent rule and a check that flags component changes with no matching status update.

**Where rules live (agreed 2026-11-23).**

- **`AGENTS.md` holds every binding rule,** for people and agents alike. If a rule isn't there, it doesn't bind.
- **Rules are written as steps, not descriptions.**
- **`REBUILD-PLAN.md`, the decision log and the handoff are background:** useful for understanding why, but not required reading for following the rules.

**Moving rules out of personal agent memory (agreed 2026-11-23).** Six memory files are sorted three ways:

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

**Procedure for adding or changing a component (agreed 2026-11-23).** Goes into `AGENTS.md` as steps.

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

**Application testing (agreed 2026-11-23).** Runs automatically in CI:

- **Package check:** build the package and confirm every file `package.json` promises exists and loads.
- **Test app:** a small app in the repo installs the built package and renders each component from it, checking for missing styles, broken token references and accessibility. Builds on the collaborator's existing Badge browser tests.

**Decision: build the checks and tests step 6 depends on (agreed 2026-11-23).** None of them exist yet. Proposed implementation, in build order:

1. **Make the package build its CSS.** A prerequisite: today `vite build` only builds JavaScript, and nothing writes `dist/css/index.css` or `dist/tokens/vars.css`. Compile `src/css/index.css` into one file with its imports inlined (`postcss-import` is already configured but never run on it), and have Style Dictionary write the token variables into `dist/tokens/`.
2. **Package check** (`npm run check:package`): a short script that runs after the build. It reads `main`, `module`, `types` and `exports` from `package.json` and fails if any promised file is missing or empty. It also checks the CSS has no leftover imports, and uses `npm pack --dry-run` to confirm the files actually ship.
3. **Test app** (`test/consumer/`): a minimal app that installs the packed tarball, the way a product would. It renders each component two ways, plain HTML with classes and the React wrapper where one exists. The component list comes from the status file, so new components are covered automatically.
4. **Headless browser runner:** the existing Badge browser tests are opened by hand. Add a runner (Playwright, or Vitest's browser mode) so they and the test app run automatically. Checks: computed styles against baselines, unresolved custom properties, and an accessibility scan. Visual screenshot comparison can come later.
5. **Pre-commit additions:** unit tests, `check:configuration`, a Loupe check on changed files, and a status-update check. Keep the hook fast; the package check and test app run in CI only.
6. **Status-update check:** a script that flags changes under `src/css/blocks/`, `tokens/component/` or `src/components/` when the matching entry in the status file wasn't updated.
7. **Shared agent hook:** a `.claude/settings.json` committed to the repo, with a hook that runs the fast checks before an agent finishes a turn. It runs commands on each contributor's machine, so it has to be fast and safe. It depends on the Loupe plugin, which must be documented in the setup instructions.
8. **CI workflow** (GitHub Actions): runs everything above on every push or pull request. It can block merges only if the pull-request workflow is adopted.

**CSS convention enforcement (agreed 2026-11-23).** Loupe enforces the CSS conventions. It's already set up in the repo, with a v3 profile in `loupe/` and the repo's own config in `loupe.config.json`.

**Move to the company Claude Code account (agreed 2026-11-23).** As soon as possible, and before the visibility work. Storybook and the status page live in the repo and Spacefast, so they don't depend on the account. Setting them up first would mean configuring connectors and plugins twice. Same Mac, but everything is still pushed and nothing left uncommitted before moving.

Pack up in this account:

1. Sync the branch: merge the collaborator's 4 commits and resolve the decision-log conflict. Done, and pushed.
2. Decide on the Notice experiment: discard it, or move it to its own branch. Done: discarded.
3. Get the agent's personal memory into the repo: binding rules into `AGENTS.md`, the Figma how-to into a workflow doc, the red.40 warning into its token's description. Rough is fine; nothing may be lost. Done: AGENTS.md, a new docs/FIGMA-WORKFLOW.md, the token description and the decision log.
4. Export these notes into the repo as Markdown. Done: docs/PROJECT-DIRECTION.md.
5. Update the handoff.
6. Commit and push until nothing is uncommitted.

Then in the company account:

- reconnect the Figma connector;
- install the Loupe plugin;
- set `FIGMA_TOKEN`;
- confirm the agent reads `AGENTS.md`.

## Rules and enforcement (in discussion)

The conventions existed; they just weren't in a form that holds. Rules need to be checked by machines, not only written down.

**Why the conventions weren't followed:**

- **The rules describe rather than instruct.** `AGENTS.md` explains what compositions are, but never says "list the compositions a block uses before writing it."
- **The rules are scattered.** They're spread across `AGENTS.md`, `REBUILD-PLAN.md`, the decision log, a long handoff document, and one agent's private memory.
- **Almost nothing enforces them.** The pre-commit hook checks types, lint and formatting only, and there is no CI.
- **No review step before committing.**

**Layers of enforcement, most to least reliable:**

| Layer                                                 | Who it catches            | Can it be skipped?                 |
| ----------------------------------------------------- | ------------------------- | ---------------------------------- |
| CI check on GitHub                                    | Everyone, human or agent  | No, if merging requires it to pass |
| Pre-commit hook (Lefthook)                            | Anyone committing locally | Yes, with `--no-verify`            |
| Claude Code hook, e.g. Loupe before an agent finishes | Agents only               | Depends on each person's setup     |
| Step-by-step checklist in `AGENTS.md`                 | Agents that read it       | Yes                                |
| Descriptive rules                                     | Almost no one reliably    | Yes                                |

Today the project relies almost entirely on the bottom two rows. The top row only works if changes land through pull requests.

**Ideas raised, not yet agreed:**

- A step-by-step "add a component" checklist in `AGENTS.md`, with gates: show the token diff before changing tokens, name the compositions used, write the story as a usage test, check light and dark mode against Figma, run `/simplify` or `/code-review` before committing.
- A rule to sync with GitHub before starting any work.
- Loupe in the pre-commit hook and in CI. Add `npm test` and `check:configuration` to the hook.
- A shared `.claude/settings.json` with agent hooks, instead of only personal settings.
- Move the binding rules from personal agent memory into `AGENTS.md`.

## Outstanding questions

- [ ] **Should changes land through pull requests that must pass checks, instead of being pushed straight to the branch?** Emily is open to it and wants the collaborator's view before deciding. Today both people push directly to `em/system-rebuild-v3`, so nothing stands between a commit and the shared history. PRs would give CI somewhere to run, a review point, and a visible record of who changed what.
- [ ] **Should the collaborator commit under their own name?** All four are authored as "Emily Maurer", so the history can't show who did what.
- [ ] **Should the notice family opt into the generated React wrappers, as Badge does?**
- [ ] **Can `docs/component-inventory.csv` be retired?** The new status file would replace it. The collaborator edited it in the Base UI commit, so ask them first.

## Still to discuss

These came up in passing but haven't been discussed yet.

- **Visibility.** Agreed (see Agreed so far).
- **Account transfer.** Agreed (see Agreed so far).
- **Milestones before collaboration.** Not discussed yet. A first draft:
  1. The package builds and is proven in a test app.
  2. The rules are enforced by CI.
  3. Core components are reviewed against Figma in light and dark mode.
  4. A written contribution path and a PR template exist.
  5. A versioned pre-release is used by one real app.
- **Order of work.** Revised draft:
  1. Pack up in this account.
  2. Move to the company account and reconnect the tools.
  3. **Update the development dependencies (added 2026-11-23).** Storybook to 10.6.2 or later first, then Vitest, Vite, ESLint, PostCSS and Style Dictionary, re-running every check after each. Remove `@boxicons/core` if nothing uses it. This comes before the guardrails, so the new checks and tests are built on current tools rather than re-verified after an upgrade.
  4. Guardrails: the rules in `AGENTS.md`, then the checks and tests, starting with making the package build its CSS.
  5. Visibility: Storybook and the status page on Spacefast.
  6. Redo the notice family under the new rules.

**Security alerts (found 2026-11-23, not yet discussed).**

- **GitHub's 66 Dependabot alerts are on `trunk`, not v3.** 65 are in `tokens/utilities/colors/`, an old v2 colour-ramp generator that doesn't exist on the v3 branch. Its plotting tool pulls in server libraries. The remaining alert is `minimatch`, a development dependency. Whoever maintains v2 should decide what happens to that folder.
- **The v3 branch has its own 34 findings,** including 4 critical, which Dependabot doesn't show because it only scans `trunk`. All are in development tools: Storybook, Vitest, Vite, ESLint, PostCSS, Style Dictionary. Nothing the package ships to apps is affected, and every finding has a fix available.
- **Update Storybook before deploying it.** Versions 10.0 to 10.6.1 have a critical flaw that lets malicious websites inject code into the Storybook preview, plus a high-severity one in the dev server. v3 is on 10.4; 10.6.2 fixes both. Check whether the critical one affects a static build.
- **`@boxicons/core` is still a runtime dependency,** although icons now come from the curated Figma set. If nothing uses it, consumers install the whole icon package for no reason.
