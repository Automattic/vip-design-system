# Loupe

[Loupe](https://github.com/dabowman/loupe) checks UI code against a design
system. This folder holds the v3 setup in two parts, laid out the way Loupe's
own repository lays them out so it can be upstreamed as-is.

```
loupe/
  presets/vip-v3.json        rules, token families, suppression keyword (for consumers)
  profiles/vip-v3/
    profile.json             id, packages, preset
    authoring.md             which class / composition / token to reach for
    patterns.md              the sanctioned composites, as markup
    remediation.md           what each finding means in v3 terms
../loupe.config.json         the self-check for this repo, extending the preset
```

## Checking this repo

```bash
loupe check --all
```

`loupe` is on PATH inside Claude Code while the plugin is enabled. To see the
v3 profile as an agent would, name it explicitly:

```bash
loupe status --profiles loupe/profiles --profile vip-v3
```

What the self-check covers: `tokens/unknown-token` (every `var(--…)` in
`src/css` against what `src/css/generated` defines, which is the dangling
reference failure in AGENTS.md), `tokens/hardcoded-value`,
`layout/margin-on-child`, `layout/negative-margin` and
`typography/untokenized`. The component-correlation rules are off because v3
ships no React components yet.

Three deliberate departures from the preset in `loupe.config.json`:

- **`designSystem.packages` is empty.** Loupe picks profiles by package name,
  and its bundled `vip` profile, which describes v2 (Theme UI), claims
  `@automattic/vip-design-system` too. Declaring the package here would load
  the v2 guidance.
- **`src/css/utilities/spacing.css` is ignored.** Its `.m-*` classes are the
  system's own margin API, and Loupe can only silence them one rule at a time
  (98 comments). The cost: dangling `var()`s in that file go unchecked.
- **Token sources point at `src/css/generated`** instead of the published
  `dist`.

`.flow` carries one inline `vip-allow` for the same reason as `spacing.css`.

**Known noise:** the engine treats `cursor` as token-backed in every system.
v3 has no cursor scale, so `cursor: pointer` / `not-allowed` findings are
correct code. Baseline them with `/loupe-baseline` rather than suppressing
each one.

## Upstreaming

To make the profile available to v3 consumers (and to Loupe's hooks and
skills, which only read profiles that ship with the plugin):

1. Copy `profiles/vip-v3/` to Loupe's `profiles/`, and `presets/vip-v3.json` to
   its `engine/presets/`.
2. Resolve the package collision with the v2 `vip` profile. Both claim
   `@automattic/vip-design-system`, and Loupe's detection matches dependency
   names, not versions. It needs either version-aware detection or v2's
   retirement.
3. Give the preset a `detect` block once (2) is settled.
