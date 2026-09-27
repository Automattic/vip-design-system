/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { useCallback, useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import * as Form from '.';
import {
	FormAutocompleteMultiselectSentinel,
	type ComboboxItem,
} from './FormAutocompleteMultiselectSentinel';

export default {
	title: 'Form/AutocompleteMultiSentinel',
	component: FormAutocompleteMultiselectSentinel,
	argTypes: {
		// ── Async data fetching ──────────────────────────────────────────────────
		onFetchItems: {
			description:
				'Scroll-triggered pagination callback. Receives the zero-based page number and returns a promise that resolves to a page of items. Required to enable async mode.',
			table: { category: 'Async data fetching' },
		},
		onFetchLabels: {
			description:
				'Lightweight label-only fetch used by the two-stage type-ahead search. Returns `{ id, label }` pairs for one page. Provide alongside `onFetchByIds` to enable two-stage mode; if either is absent the component falls back to debounced `onFetchItems` calls.',
			table: { category: 'Async data fetching' },
		},
		onFetchByIds: {
			description:
				'Targeted full-item fetch for the second stage of type-ahead search. Receives an array of IDs whose labels matched the query and returns the corresponding full `ComboboxItem` objects.',
			table: { category: 'Async data fetching' },
		},
		pageSize: {
			description:
				'Number of items per page. The component detects end-of-results when a returned page contains fewer items than this value. Default: `100`.',
			control: { type: 'number' },
			table: { category: 'Async data fetching', defaultValue: { summary: 100 } },
		},
		debounce: {
			description:
				'Debounce delay in milliseconds applied to the type-ahead search in async mode. Increasing this value reduces the number of fetch calls made while the user is still typing. Default: `300`.',
			control: { type: 'number' },
			table: { category: 'Async data fetching', defaultValue: { summary: 300 } },
		},
		// ── Static options ───────────────────────────────────────────────────────
		options: {
			description:
				'Static list of `{ id, label }` items shown in the dropdown. Used when `onFetchItems` is not provided.',
			table: { category: 'Static options' },
		},
		initialValue: {
			description: 'Items that are pre-selected when the component first renders.',
			table: { category: 'Static options' },
		},
		// ── Field labelling & help ───────────────────────────────────────────────
		label: {
			description:
				'Label text displayed above the input, or inline when `isInline` is true. Accepts a string or any React node.',
			control: { type: 'text' },
			table: { category: 'Field labelling & help' },
		},
		forLabel: {
			description:
				'The `id` applied to the input element. Used to associate the input with its label and for ARIA attributes. Auto-generated if omitted.',
			control: { type: 'text' },
			table: { category: 'Field labelling & help' },
		},
		helperText: {
			description: 'Optional hint text rendered below the input.',
			control: { type: 'text' },
			table: { category: 'Field labelling & help' },
		},
		placeholder: {
			description:
				'Placeholder text shown inside the input when nothing has been typed. Default: `"Search…"`.',
			control: { type: 'text' },
			table: { category: 'Field labelling & help', defaultValue: { summary: 'Search…' } },
		},
		isInline: {
			description: 'Renders the label inline inside the input field rather than above it.',
			control: { type: 'boolean' },
			table: { category: 'Field labelling & help' },
		},
		// ── Validation & error ───────────────────────────────────────────────────
		required: {
			description:
				'Marks the field as required. Adds a required indicator to the label and sets `aria-required` on the input.',
			control: { type: 'boolean' },
			table: { category: 'Validation & error' },
		},
		hasError: {
			description:
				'When true, renders the input with an error border and displays the `errorMessage`.',
			control: { type: 'boolean' },
			table: { category: 'Validation & error' },
		},
		errorMessage: {
			description:
				'Validation error message displayed below the input. Only visible when `hasError` is true.',
			control: { type: 'text' },
			table: { category: 'Validation & error' },
		},
		// ── Appearance ───────────────────────────────────────────────────────────
		listType: {
			description:
				'Controls how selected items are displayed below the input. `"button"` renders removable pill buttons; `"badge"` renders compact inline badges. Default: `"button"`.',
			control: { type: 'radio' },
			options: [ 'button', 'badge' ],
			table: {
				category: 'Appearance',
				defaultValue: { summary: 'button' },
			},
		},
		searchIcon: {
			description: 'When true, shows a search icon on the left side of the input field.',
			control: { type: 'boolean' },
			table: { category: 'Appearance' },
		},
		loading: {
			description:
				'When true, shows a spinner inside the input to indicate an external loading state.',
			control: { type: 'boolean' },
			table: { category: 'Appearance' },
		},
		// ── Callbacks ────────────────────────────────────────────────────────────
		onChange: {
			description:
				'Called whenever the selection changes with two arguments: `selectedOptions` (full `ComboboxItem[]`) and `labels` (string array of selected labels). Matches the original two-argument signature for compatibility.',
			table: { category: 'Callbacks' },
		},
		noOptionsMessage: {
			description:
				'Function that returns the message shown in the dropdown when no options match the current input value. Default: `() => "No results found."`.',
			table: { category: 'Callbacks' },
		},
		// ── HTML passthrough ─────────────────────────────────────────────────────
		className: {
			description: 'Additional CSS class name applied to the root element.',
			control: { type: 'text' },
			table: { category: 'HTML passthrough' },
		},
	},
};

// ── Shared data ───────────────────────────────────────────────────────────────

const FLAVORS: ComboboxItem[] = [
	{ id: 1, label: 'Chocolate' },
	{ id: 2, label: 'Strawberry' },
	{ id: 3, label: 'Vanilla' },
	{ id: 4, label: 'Pistachio' },
	{ id: 5, label: 'Bubblegum' },
	{ id: 6, label: 'Ube' },
	{ id: 7, label: 'Mango' },
	{ id: 8, label: 'Buko' },
	{ id: 9, label: 'Durian' },
	{ id: 10, label: 'Leche Flan' },
];

const COUNTRIES: ComboboxItem[] = [
	{ id: 1, label: 'Afghanistan' },
	{ id: 2, label: 'Albania' },
	{ id: 3, label: 'Algeria' },
	{ id: 4, label: 'Andorra' },
	{ id: 5, label: 'Angola' },
	{ id: 6, label: 'Argentina' },
	{ id: 7, label: 'Armenia' },
	{ id: 8, label: 'Australia' },
	{ id: 9, label: 'Austria' },
	{ id: 10, label: 'Azerbaijan' },
	{ id: 11, label: 'Bahrain' },
	{ id: 12, label: 'Bangladesh' },
	{ id: 13, label: 'Belarus' },
	{ id: 14, label: 'Belgium' },
	{ id: 15, label: 'Bolivia' },
	{ id: 16, label: 'Bosnia and Herzegovina' },
	{ id: 17, label: 'Brazil' },
	{ id: 18, label: 'Bulgaria' },
	{ id: 19, label: 'Cambodia' },
	{ id: 20, label: 'Cameroon' },
	{ id: 21, label: 'Canada' },
	{ id: 22, label: 'Chile' },
	{ id: 23, label: 'China' },
	{ id: 24, label: 'Colombia' },
	{ id: 25, label: 'Croatia' },
	{ id: 26, label: 'Cuba' },
	{ id: 27, label: 'Cyprus' },
	{ id: 28, label: 'Czech Republic' },
	{ id: 29, label: 'Denmark' },
	{ id: 30, label: 'Dominican Republic' },
	{ id: 31, label: 'Ecuador' },
	{ id: 32, label: 'Egypt' },
	{ id: 33, label: 'Estonia' },
	{ id: 34, label: 'Ethiopia' },
	{ id: 35, label: 'Finland' },
	{ id: 36, label: 'France' },
	{ id: 37, label: 'Georgia' },
	{ id: 38, label: 'Germany' },
	{ id: 39, label: 'Ghana' },
	{ id: 40, label: 'Greece' },
	{ id: 41, label: 'Guatemala' },
	{ id: 42, label: 'Hungary' },
	{ id: 43, label: 'Iceland' },
	{ id: 44, label: 'India' },
	{ id: 45, label: 'Indonesia' },
	{ id: 46, label: 'Iran' },
	{ id: 47, label: 'Iraq' },
	{ id: 48, label: 'Ireland' },
	{ id: 49, label: 'Israel' },
	{ id: 50, label: 'Italy' },
	{ id: 51, label: 'Jamaica' },
	{ id: 52, label: 'Japan' },
	{ id: 53, label: 'Jordan' },
	{ id: 54, label: 'Kazakhstan' },
	{ id: 55, label: 'Kenya' },
	{ id: 56, label: 'Latvia' },
	{ id: 57, label: 'Lebanon' },
	{ id: 58, label: 'Lithuania' },
	{ id: 59, label: 'Luxembourg' },
	{ id: 60, label: 'Malaysia' },
	{ id: 61, label: 'Mexico' },
	{ id: 62, label: 'Morocco' },
	{ id: 63, label: 'Netherlands' },
	{ id: 64, label: 'New Zealand' },
	{ id: 65, label: 'Nigeria' },
	{ id: 66, label: 'Norway' },
	{ id: 67, label: 'Pakistan' },
	{ id: 68, label: 'Peru' },
	{ id: 69, label: 'Philippines' },
	{ id: 70, label: 'Poland' },
	{ id: 71, label: 'Portugal' },
	{ id: 72, label: 'Romania' },
	{ id: 73, label: 'Russia' },
	{ id: 74, label: 'Saudi Arabia' },
	{ id: 75, label: 'Serbia' },
	{ id: 76, label: 'Singapore' },
	{ id: 77, label: 'Slovakia' },
	{ id: 78, label: 'Slovenia' },
	{ id: 79, label: 'South Africa' },
	{ id: 80, label: 'South Korea' },
	{ id: 81, label: 'Spain' },
	{ id: 82, label: 'Sweden' },
	{ id: 83, label: 'Switzerland' },
	{ id: 84, label: 'Thailand' },
	{ id: 85, label: 'Tunisia' },
	{ id: 86, label: 'Turkey' },
	{ id: 87, label: 'Ukraine' },
	{ id: 88, label: 'United Arab Emirates' },
	{ id: 89, label: 'United Kingdom' },
	{ id: 90, label: 'United States' },
	{ id: 91, label: 'Uruguay' },
	{ id: 92, label: 'Venezuela' },
	{ id: 93, label: 'Vietnam' },
	{ id: 94, label: 'Yemen' },
	{ id: 95, label: 'Zimbabwe' },
];

const PAGE_SIZE = 20;

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Static list of options — no async fetching.
 */
export const Default = () => {
	const [ selected, setSelected ] = useState< ComboboxItem[] >( [] );
	return (
		<Form.Root>
			<div sx={ { width: 320 } }>
				<FormAutocompleteMultiselectSentinel
					forLabel="sentinel-default"
					label="Ice Cream Flavors"
					options={ FLAVORS }
					placeholder="Search flavors…"
					required
					onChange={ ( items, labels ) => {
						setSelected( items );
						// eslint-disable-next-line no-console
						console.log( 'onChange labels:', labels );
					} }
				/>
			</div>
			<div sx={ { mt: 3, fontSize: 1 } }>
				Selected: { selected.map( i => i.label ).join( ', ' ) || 'none' }
			</div>
		</Form.Root>
	);
};

/**
 * Pre-selected items supplied via initialValue.
 */
export const WithInitialValue = () => (
	<Form.Root>
		<div sx={ { width: 320 } }>
			<FormAutocompleteMultiselectSentinel
				forLabel="sentinel-initial"
				label="Ice Cream Flavors"
				options={ FLAVORS }
				initialValue={ FLAVORS.slice( 0, 2 ) }
			/>
		</div>
	</Form.Root>
);

/**
 * Selected items rendered as badges instead of buttons.
 */
export const WithBadges = () => (
	<Form.Root>
		<div sx={ { width: 320 } }>
			<FormAutocompleteMultiselectSentinel
				forLabel="sentinel-badges"
				label="Ice Cream Flavors"
				options={ FLAVORS }
				listType="badge"
			/>
		</div>
	</Form.Root>
);

/**
 * Error and validation message.
 */
export const WithValidationError = () => (
	<Form.Root>
		<div sx={ { width: 320 } }>
			<FormAutocompleteMultiselectSentinel
				forLabel="sentinel-error"
				label="Select domains"
				options={ FLAVORS }
				required
				hasError
				errorMessage="At least one selection is required."
				searchIcon
			/>
		</div>
	</Form.Root>
);

/**
 * Label rendered inline with the input.
 */
export const Inline = () => (
	<Form.Root>
		<div sx={ { width: 400 } }>
			<FormAutocompleteMultiselectSentinel
				forLabel="sentinel-inline"
				label="Flavors"
				options={ FLAVORS }
				isInline
			/>
		</div>
	</Form.Root>
);

/**
 * Async pagination — scroll to the bottom of the dropdown to load more items.
 * Each page has a simulated 800 ms delay.
 */
export const AsyncPagination = () => {
	const fetchItems = useCallback( async ( page: number ): Promise< ComboboxItem[] > => {
		await new Promise< void >( resolve => setTimeout( resolve, 800 ) );
		const start = page * PAGE_SIZE;
		return COUNTRIES.slice( start, start + PAGE_SIZE );
	}, [] );

	return (
		<Form.Root>
			<div sx={ { width: 320 } }>
				<FormAutocompleteMultiselectSentinel
					forLabel="sentinel-async"
					label="Select Countries"
					onFetchItems={ fetchItems }
					pageSize={ PAGE_SIZE }
					placeholder="Search countries…"
					helperText="Scroll to the bottom of the list to load more countries."
				/>
			</div>
		</Form.Root>
	);
};

/**
 * Two-stage type-ahead search — labels are scanned across all pages first,
 * then full items are fetched only for matching IDs.
 *
 * Try "vi" — Bolivia is in page 1 (already loaded), Vietnam is in page 5
 * (discovered via the label scan).
 */
export const AsyncTwoStageSearch = () => {
	const fetchItems = useCallback( async ( page: number ): Promise< ComboboxItem[] > => {
		await new Promise< void >( resolve => setTimeout( resolve, 1200 ) );
		const start = page * PAGE_SIZE;
		return COUNTRIES.slice( start, start + PAGE_SIZE );
	}, [] );

	const fetchLabels = useCallback(
		async ( page: number ): Promise< Array< { id: string | number; label: string } > > => {
			await new Promise< void >( resolve => setTimeout( resolve, 600 ) );
			const start = page * PAGE_SIZE;
			return COUNTRIES.slice( start, start + PAGE_SIZE ).map( ( { id, label } ) => ( {
				id,
				label,
			} ) );
		},
		[]
	);

	const fetchByIds = useCallback(
		async ( ids: Array< string | number > ): Promise< ComboboxItem[] > => {
			await new Promise< void >( resolve => setTimeout( resolve, 400 ) );
			return COUNTRIES.filter( c => ids.includes( c.id ) );
		},
		[]
	);

	return (
		<Form.Root>
			<div sx={ { width: 320 } }>
				<FormAutocompleteMultiselectSentinel
					forLabel="sentinel-two-stage"
					label="Select Countries"
					onFetchItems={ fetchItems }
					onFetchLabels={ fetchLabels }
					onFetchByIds={ fetchByIds }
					pageSize={ PAGE_SIZE }
					placeholder="Search countries…"
					helperText='Try "vi" — Bolivia loads from page 1, Vietnam is found via label scan.'
				/>
			</div>
		</Form.Root>
	);
};

/**
 * Demonstrates the fetch error sentinel state. On load, 5 items appear in the
 * dropdown immediately. The sentinel is visible at the bottom. After a short
 * pause it transitions to "Loading more results…", then to the error state
 * when the next page fetch fails.
 *
 * The dropdown opens and the pagination is triggered automatically so the full
 * sequence plays out without any user interaction.
 */
export const AsyncFetchError = () => {
	const fetchItems = useCallback( async ( page: number ): Promise< ComboboxItem[] > => {
		if ( page === 0 ) {
			// First page resolves immediately so items appear right away
			return COUNTRIES.slice( 0, 5 );
		}
		// Subsequent pages show "Loading…" briefly then fail
		await new Promise< void >( resolve => setTimeout( resolve, 1500 ) );
		throw new Error( 'Simulated network error' );
	}, [] );

	useEffect( () => {
		// Open the dropdown after the first page has loaded
		const openTimer = setTimeout( () => {
			document.getElementById( 'sentinel-fetch-error' )?.click();

			// Dispatch a scroll event on the listbox to trigger the sentinel fetch.
			// Since all 5 items fit within the max-height, distanceFromBottom is 0
			// which satisfies the < 60 px threshold in handleListScroll.
			const scrollTimer = setTimeout( () => {
				const listbox = document.getElementById( 'sentinel-fetch-error-listbox' );
				listbox?.dispatchEvent( new Event( 'scroll', { bubbles: true } ) );
			}, 150 );

			return () => clearTimeout( scrollTimer );
		}, 200 );

		return () => clearTimeout( openTimer );
	}, [] );

	return (
		<Form.Root>
			<div sx={ { width: 320 } }>
				<FormAutocompleteMultiselectSentinel
					forLabel="sentinel-fetch-error"
					label="Select Countries"
					onFetchItems={ fetchItems }
					pageSize={ 5 }
					placeholder="Search countries…"
					helperText="The dropdown opens automatically to demo the error sentinel state."
				/>
			</div>
		</Form.Root>
	);
};
