## DataViews refactor plan (from Gutenberg to VIP Design System)

### Goal and scope
- **Goal**: Make `DataViews` (and its submodules) consumable from this design system without any `@wordpress/*` dependencies while preserving the public API where practical.
- **Scope**: `src/system/dataviews/src/**` only. Remove Gutenberg-specific build files and types in this package, wire up to our DS components/utilities, and restyle to DS.

### High-level strategy
- Introduce a small adapter layer to replace Gutenberg packages with React/DS utilities.
- Replace UI with our DS components (`Button`, `Card`, `Flex`, `Grid`, `Text`, `Spinner`, `Dropdown`, etc.).
- Remove SCSS and restyle with DS primitives/tokens.
- Remove `@wordpress/data` usage; switch to prop/context callbacks.
- Keep API stable (props and exports) where possible.

### Replacement matrix
- **@wordpress/element** → React 18: `useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`, `forwardRef`, `Children`, `Fragment`, `useId`.
- **@wordpress/components** → VIP DS equivalents:
  - HStack/VStack → `Flex` with `direction`, `gap`, `justify`, `alignment`.
  - `Card`, `CardBody`, `CardHeader` → DS `Card`.
  - `Button`, `Dropdown`, `Spinner`, `Text`, `Grid` → DS components.
  - Gaps: `ToggleControl`, `RangeControl`, `TimePicker`, `FormTokenField`, `VisuallyHidden` → create minimal wrappers using DS primitives (Checkbox/Switch, Input[type=range], Input[type=time], tokens input, `ScreenReaderText`).
- **@wordpress/compose** → lightweight utilities:
  - `useResizeObserver` → `@react-hook/resize-observer` (or tiny hook).
  - `useDebounce`/`throttle` → `lodash.debounce`/`lodash.throttle`.
  - `usePrevious` → trivial custom hook.
  - `useInstanceId` → `React.useId()` with optional prefix.
- **@wordpress/i18n** (`__`, `_x`, `_n`, `sprintf`) → minimal i18n shim now; can swap to `i18next` later.
- **@wordpress/date** (`getDate`, `dateI18n`, `getSettings`) → `date-fns` helpers and a small `getSettings` shim (locale).
- **@wordpress/icons** → adopt one icon set (recommend `@radix-ui/react-icons` or `lucide-react`) and map: `arrowDown`, `arrowUp`, `moreVertical`, `funnel`, `chevronDown`, `chevronUp`, `arrowLeft`, `arrowRight`, `unseen` (eye-off).
- **@wordpress/keycodes** (`isAppleOS`) → tiny userAgent/platform utility.
- **@wordpress/data** (`useRegistry`) → remove; replace with prop/context callbacks.
- **@wordpress/primitives`/`@wordpress/private-apis`** → remove; reimplement tiny bits inline with DS primitives.
- **@wordpress/url** → native `URL` / `URLSearchParams` if needed.
- **@wordpress/warning** → `console.warn`.

### File system changes (adapters and wrappers)
- Add adapters under `src/system/dataviews/src/adapter/`:
  - `element.ts` – re-export React hooks
  - `compose.ts` – `throttle`, `debounce`, `useResizeObserver`, `usePrevious`, `useInstanceId`
  - `components.tsx` – DS component facades for controls previously from `@wordpress/components`
  - `i18n.ts` – `__`, `_x`, `_n`, `sprintf`
  - `date.ts` – date-fns wrappers (`getDate`, `format`, `getSettings`)
  - `icons.tsx` – icon mapping to chosen icon lib
  - `keycodes.ts` – `isAppleOS`
  - `url.ts` – URL helpers (only if needed)
  - `warning.ts` – `warn`
- Add minimal wrappers for missing controls under `src/system/dataviews/src/controls/`:
  - `ToggleControl`, `RangeControl`, `TimePicker`, `FormTokenField`, `VisuallyHidden`

### Styling strategy
- Remove SCSS imports (`src/system/dataviews/src/style.scss` and subimports). Do not rely on `@wordpress/base-styles`.
- Replace with DS primitives and inline styles where necessary. If a class hook is unavoidable (e.g., scroll container), add a small local CSS module or minimal inline style.
- Use DS spacing/tokens for gaps, paddings, and typography.

### Data/state management
- Remove `useRegistry` import from:
  - `dataviews-layouts/list/index.tsx`
  - `components/dataviews-item-actions/index.tsx`
  - `components/dataviews-bulk-actions/index.tsx`
- Introduce optional callbacks in `DataViews` props and context:
  - `onPerformAction(item, action)`
  - `onPerformBulkAction(ids, action)`
  - Keep defaults as no-ops so consumers can opt-in.

### Dates and i18n
- Replace date utilities in `filter-and-sort-data-view.ts` and `field-types/date*.{ts,tsx}` with adapter `date.ts` (date-fns under the hood).
- Replace all text translation helpers with adapter `i18n.ts`. Keep messages as pass-through for now.

### Icons
- Choose icon library once (default: `@radix-ui/react-icons`).
- Implement a mapping in `adapter/icons.tsx` and replace all icon imports to go through it.

### Build/tooling adjustments
- Ignore/remove `dataviews/build.js`, `dataviews/package.json`, and `dataviews/tsconfig.json` from build participation; compile via the repo’s root tooling.
- Add deps (dev/runtime) as needed: `lodash.throttle`, `lodash.debounce`, `@react-hook/resize-observer`, `date-fns`, and chosen icon lib.
- Ensure TS compiles with the repo’s `tsconfig`; remove Gutenberg types from this subtree.

### Stories and tests
- Update stories under `src/system/dataviews/src/components/**/stories` to use DS components.
- Remove SCSS story imports; rely on DS components and minimal inline styles if needed.
- Keep/adapt unit tests for:
  - `filterSortAndPaginate`
  - `validation.ts:isItemValid`
  - selection and pagination behavior

### Concrete refactor steps
1) Add adapter files and minimal control wrappers.
2) Flip imports throughout `src/system/dataviews/src/**` from `@wordpress/*` to adapters/DS.
3) Delete any usage of `@wordpress/private-apis` (e.g., `lock-unlock.ts`); inline or remove.
4) Remove `useRegistry`; thread new callbacks through `DataViewsContext` and consume where needed.
5) Strip SCSS imports and restyle critical containers/layouts with DS `Flex`, `Grid`, `Card`, `Text`, `Button`, `Dropdown`, `Spinner`.
6) Replace date/i18n/icon usages with adapters.
7) Ensure exports remain stable via `src/system/dataviews/src/index.ts`.
8) Wire `DataViews` export at the DS root if we want top-level import ergonomics.
9) Build and fix type/linter issues; iterate on missing components.
10) Validate the following stories render and behave: Default, Empty, MinimalUI, GroupByLayout, InfiniteScroll.

### MVP cut (smallest working path)
- Convert `components/dataviews/index.tsx` to adapters + DS.
- Convert one layout completely (table or grid) and shared pieces (`dataviews-layout`, search, footer, filters toggle).
- Remove `useRegistry` by introducing context callbacks (no-ops default).
- Replace icons via adapter; strip SCSS; provide minimal styles for layout and scroll.
- Keep i18n as no-ops, date via date-fns.

### Risks and mitigations
- **Missing DS equivalents**: ship minimal internal wrappers now; plan follow-up to replace with DS components later.
- **Visual drift after removing SCSS**: keep a tiny CSS module or inline styles for spacing/scroll where needed.
- **Icon mismatch**: centralize icon mapping to allow easy swap.

### Acceptance checklist
- No imports from `@wordpress/*` remain in `src/system/dataviews/src/**`.
- No SCSS imports remain; visuals rely on DS primitives/tokens.
- `DataViews` and subcomponents compile and render in Storybook.
- Interactions work: layout switching, search, filters, selection, pagination, infinite scroll demo.
- Typecheck passes; no linter errors introduced in edited files.
- `DataViews` export is accessible to consumers of the DS package.

### Open decisions
- Icon library choice: `@radix-ui/react-icons` vs `lucide-react`.
- Whether to introduce a proper i18n provider now or keep the shim until later.
- Whether to add richer DS components for `Toggle`, `Range`, `TimePicker`, `TokenField` vs. minimal wrappers for this package only.


