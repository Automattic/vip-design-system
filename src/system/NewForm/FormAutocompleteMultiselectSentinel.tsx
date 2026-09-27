/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React, {
	useState,
	useRef,
	useEffect,
	useId,
	useCallback,
	type KeyboardEvent,
	type ChangeEvent,
} from 'react';
import { MdClose, MdKeyboardArrowDown, MdSearch, MdWarning } from 'react-icons/md';
import { useThemeUI } from 'theme-ui';

/**
 * Internal dependencies
 */
import { FormAutocompleteMultiselectBadge } from './FormAutocompleteMultiselectBadge';
import { FormAutocompleteMultiselectButton } from './FormAutocompleteMultiselectButton';
import { Flex, Spinner } from '../';
import { Validation } from '../Form';
import { baseControlBorderStyle, inputBaseText } from '../Form/Input.styles';
import { Label } from '../Form/Label';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ComboboxItem {
	id: string | number;
	label: string;
}

export interface FormAutocompleteMultiselectSentinelProps {
	// --- Async data fetching (new capabilities) ---

	/**
	 * Scroll-triggered pagination. Receives the zero-based page number and
	 * returns a page of items. Required for async mode.
	 */
	onFetchItems?: ( page: number ) => Promise< ComboboxItem[] >;

	/**
	 * Lightweight label-only fetch used by the two-stage type-ahead search.
	 * Returns `{ id, label }` pairs for one page. Both onFetchLabels and
	 * onFetchByIds must be provided to enable two-stage mode; if either is
	 * absent the component falls back to debounced onFetchItems.
	 */
	onFetchLabels?: ( page: number ) => Promise< Array< { id: string | number; label: string } > >;

	/**
	 * Targeted full-item fetch. Receives an array of IDs whose labels matched
	 * the search query and returns the corresponding full items.
	 */
	onFetchByIds?: ( ids: Array< string | number > ) => Promise< ComboboxItem[] >;

	/** Items per page. Determines end-of-results when a page is shorter. Default: 100 */
	pageSize?: number;

	/** Optional hint text rendered below the input. */
	helperText?: string;

	/** Placeholder text shown inside the input when nothing has been typed. Default: 'Search…' */
	placeholder?: string;

	// --- Static options ---

	/** Static item list — used when onFetchItems is not provided. */
	options?: ComboboxItem[];

	/** Items that are pre-selected when the component first renders. */
	initialValue?: ComboboxItem[];

	// --- Retained compatibility props ---

	/** Additional CSS class name applied to the root element. */
	className?: string;

	/** Validation error message displayed below the input. Only visible when `hasError` is true. */
	errorMessage?: string;

	/**
	 * The `id` applied to the input element, used to associate it with its label and
	 * for aria attributes. Auto-generated if omitted.
	 */
	forLabel?: string;

	/** When true, renders the input with an error border and displays `errorMessage`. */
	hasError?: boolean;

	/** Renders the label inline inside the input field rather than above it. */
	isInline?: boolean;

	/** Label text displayed above the input, or inline when `isInline` is true. */
	label?: React.ReactNode;

	/** When true, shows a spinner inside the input to indicate an external loading state. */
	loading?: boolean;

	/**
	 * Function that returns the message shown in the dropdown when no options match
	 * the current input value. Default: `() => 'No results found.'`
	 */
	noOptionsMessage?: () => string;

	/**
	 * Called whenever the selection changes.
	 * Matches the original two-argument signature for compatibility:
	 *   selectedOptions — full ComboboxItem array
	 *   labels          — string array of selected labels
	 */
	onChange?: ( selectedOptions: ComboboxItem[], labels: string[] ) => void;

	/** Marks the field as required, adds a required indicator to the label and sets aria-required on the input. */
	required?: boolean;

	/** Controls how selected items are displayed below the input. `'button'` renders removable pill buttons; `'badge'` renders compact badges. Default: 'button' */
	listType?: 'button' | 'badge';

	/** When true, shows a search icon on the left side of the input field. */
	searchIcon?: boolean;

	/**
	 * Debounce delay in milliseconds applied to the type-ahead search when in async mode.
	 * Increasing this reduces the number of fetch calls made while the user is still typing.
	 * Default: 300
	 */
	debounce?: number;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const srOnly = {
	border: '0',
	clip: 'rect(0 0 0 0)',
	height: '1px',
	marginBottom: '-1px',
	marginRight: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute' as const,
	whiteSpace: 'nowrap' as const,
	width: '1px',
};

const inputWrapperStyles = {
	display: 'flex',
	alignItems: 'center',
	backgroundColor: 'layer.2',
	color: inputBaseText,
	...baseControlBorderStyle,
	borderRadius: 1,
	minHeight: '36px',
};

const inputStyles = {
	flex: '1 1 auto',
	minWidth: 0,
	px: 3,
	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
	fontSize: 'inherit',
	color: 'text',
	backgroundColor: 'transparent',
	borderWidth: 0,
	outline: 'none',
	'&:focus': { outline: 'none', boxShadow: 'none' },
	'&::placeholder': {
		color: 'input.text.placeholder',
		opacity: 1,
	},
};

const dropdownStyles = {
	position: 'absolute' as const,
	zIndex: 10,
	width: '100%',
	mt: 1,
	backgroundColor: 'layer.2',
	color: inputBaseText,
	...baseControlBorderStyle,
	borderRadius: 1,
	maxHeight: '240px',
	overflowY: 'auto' as const,
	listStyle: 'none',
	p: 0,
	m: 0,
};

const optionBaseStyles = {
	px: 3,
	py: 2,
	fontSize: 'inherit',
	cursor: 'pointer',
	userSelect: 'none' as const,
	color: 'text',
	borderBottomWidth: '1px',
	borderBottomStyle: 'solid' as const,
	borderBottomColor: 'input.border.default',
	'&:last-child': { borderBottomWidth: 0 },
};

const optionActiveStyles = {
	backgroundColor: 'input.background.primary',
	borderBottomColor: 'input.background.primary',
	color: '#ffffff',
};

// ── Selection status live region ───────────────────────────────────────────────

const SelectionStatus = ( { status }: { status: string } ) => (
	<div
		sx={ srOnly }
		id="vip-autocomplete-sentinel-status"
		role="status"
		aria-atomic="true"
		aria-live="assertive"
	>
		{ status }
	</div>
);

// ── Component ──────────────────────────────────────────────────────────────────

const FormAutocompleteMultiselectSentinel = React.forwardRef<
	HTMLInputElement,
	FormAutocompleteMultiselectSentinelProps
>(
	(
		{
			onFetchItems,
			onFetchLabels,
			onFetchByIds,
			pageSize = 100,
			helperText,
			placeholder = 'Search…',
			options = [],
			initialValue = [],
			className,
			errorMessage,
			forLabel: forLabelProp,
			hasError,
			isInline,
			label,
			loading: externalLoading,
			noOptionsMessage = () => 'No results found.',
			onChange = () => {},
			required,
			listType = 'button',
			searchIcon,
			debounce = 300,
		},
		forwardRef
	) => {
		// ── ARIA IDs ────────────────────────────────────────────────────────────
		const generatedId = useId();
		const forLabel = forLabelProp ?? `vip-autocomplete-sentinel-${ generatedId }`;
		const listboxId = `${ forLabel }-listbox`;
		const helperTextId = `${ forLabel }-helper`;

		// ── Core UI state ───────────────────────────────────────────────────────
		const [ isOpen, setIsOpen ] = useState( false );
		const [ inputValue, setInputValue ] = useState( '' );
		const [ selectedItems, setSelectedItems ] = useState< ComboboxItem[] >( initialValue );
		const [ activeIndex, setActiveIndex ] = useState< number | null >( null );
		const [ selectionAnnouncement, setSelectionAnnouncement ] = useState( '' );
		const [ loadAnnouncement, setLoadAnnouncement ] = useState( '' );

		// ── Browse-mode pagination state ────────────────────────────────────────
		const [ loadedItems, setLoadedItems ] = useState< ComboboxItem[] >( [] );
		const [ isLoadingMore, setIsLoadingMore ] = useState( false );
		const [ fetchError, setFetchError ] = useState( false );
		const [ hasMore, setHasMore ] = useState( true );

		// ── Two-stage search state ──────────────────────────────────────────────
		const [ isSearchMode, setIsSearchMode ] = useState( false );
		const [ searchResults, setSearchResults ] = useState< ComboboxItem[] >( [] );
		const [ isSearching, setIsSearching ] = useState( false );
		const [ searchError, setSearchError ] = useState( false );

		// ── Refs — safe access inside async callbacks & effects ─────────────────
		const loadingRef = useRef( false );
		const pageRef = useRef( 0 );
		const hasMoreRef = useRef( true );
		const isOpenRef = useRef( false );
		const isSearchModeRef = useRef( false );
		const loadedItemsRef = useRef< ComboboxItem[] >( [] );
		const searchGenRef = useRef( 0 );
		const debounceRef = useRef< ReturnType< typeof setTimeout > | null >( null );
		const isFirstRender = useRef( true );

		// ── DOM refs ────────────────────────────────────────────────────────────
		const inputRef = useRef< HTMLInputElement | null >( null );
		const listboxRef = useRef< HTMLUListElement >( null );
		const containerRef = useRef< HTMLDivElement >( null );
		const optionRefs = useRef< ( HTMLLIElement | null )[] >( [] );

		// ── Keyboard focus detection ─────────────────────────────────────────────
		// Track whether focus arrived via keyboard (Tab) or mouse click.
		// Browsers always apply :focus-visible to <input type="text"> on click,
		// so CSS alone cannot distinguish the two — we use a JS-based flag instead.
		const [ isKeyboardFocused, setIsKeyboardFocused ] = useState( false );
		const isMouseInteractionRef = useRef( false );

		// Access theme outline styles directly to avoid the problematic
		// `{ '&': fn }` sx pattern which can cause rendering issues.
		const { theme } = useThemeUI();
		const outlineStyles = ( theme as { outline?: Record< string, string > } ).outline ?? {};

		// ── Derived flags ───────────────────────────────────────────────────────
		const isAsync = Boolean( onFetchItems );
		const isTwoStage = Boolean( onFetchLabels && onFetchByIds );
		const sourceItems = isAsync ? loadedItems : options;

		/**
		 * Items visible in the dropdown:
		 * - Search mode: merge loaded items + search results, deduped by id
		 * - Browse mode: paginated source items
		 * Both filter out already-selected items and apply the current text filter.
		 */
		const itemPool = isSearchMode
			? [ ...loadedItems, ...searchResults.filter( r => ! loadedItems.some( l => l.id === r.id ) ) ]
			: sourceItems;

		const filteredItems = itemPool.filter( item => {
			const isSelected = selectedItems.some( s => s.id === item.id );
			const matchesFilter = item.label.toLowerCase().includes( inputValue.toLowerCase() );
			return ! isSelected && matchesFilter;
		} );

		/**
		 * Show the sentinel list item when there is anything to communicate:
		 * browse loading/error/trigger, or search in-progress/error.
		 */
		const showSentinel =
			isAsync &&
			( isLoadingMore ||
				fetchError ||
				( hasMore && ! isSearchMode ) ||
				isSearching ||
				searchError );

		// ── Ref sync effects ────────────────────────────────────────────────────
		useEffect( () => {
			loadedItemsRef.current = loadedItems;
		}, [ loadedItems ] );
		useEffect( () => {
			isSearchModeRef.current = isSearchMode;
		}, [ isSearchMode ] );

		// ── Browse pagination fetch ─────────────────────────────────────────────
		const fetchNextPage = useCallback( async () => {
			if ( ! onFetchItems || loadingRef.current || ! hasMoreRef.current ) return;

			loadingRef.current = true;
			setIsLoadingMore( true );
			setFetchError( false );
			setLoadAnnouncement( 'Loading more results.' );

			try {
				const newItems = await onFetchItems( pageRef.current );
				setLoadedItems( prev => [ ...prev, ...newItems ] );
				pageRef.current += 1;

				if ( newItems.length < pageSize ) {
					hasMoreRef.current = false;
					setHasMore( false );
				}
				setLoadAnnouncement(
					`${ newItems.length } more result${ newItems.length === 1 ? '' : 's' } loaded.`
				);
			} catch {
				setFetchError( true );
				setLoadAnnouncement( 'Error: failed to retrieve additional results.' );
			} finally {
				loadingRef.current = false;
				setIsLoadingMore( false );
			}
		}, [ onFetchItems, pageSize ] );

		// ── Two-stage search ────────────────────────────────────────────────────
		/**
		 * Runs a two-stage type-ahead search:
		 * 1. Fetch lightweight labels for all unloaded pages sequentially.
		 * 2. Client-side filter labels against the query to find matching IDs
		 *    not already in loadedItems.
		 * 3. Fetch full items only for those IDs.
		 *
		 * The `gen` parameter is a generation counter; the function aborts if a
		 * newer search has started (i.e. the user typed again).
		 */
		const runTwoStageSearch = useCallback(
			async ( query: string, gen: number ) => {
				if ( ! onFetchLabels || ! onFetchByIds ) return;

				setIsSearchMode( true );
				setIsSearching( true );
				setSearchError( false );
				setSearchResults( [] );
				setLoadAnnouncement( 'Searching for more results.' );

				try {
					// Stage 1: Scan all remaining pages for labels sequentially
					const allNewLabels: Array< { id: string | number; label: string } > = [];
					let labelPage = pageRef.current;
					let hasMoreLabels = true;

					while ( hasMoreLabels ) {
						if ( searchGenRef.current !== gen ) return;
						// eslint-disable-next-line no-await-in-loop
						const labels = await onFetchLabels( labelPage );
						allNewLabels.push( ...labels );
						labelPage++;
						if ( labels.length < pageSize ) {
							hasMoreLabels = false;
						}
					}

					if ( searchGenRef.current !== gen ) return;

					// Stage 2: Filter labels against query; exclude already-loaded IDs
					const loadedIds = new Set( loadedItemsRef.current.map( i => i.id ) );
					const matchingIds = allNewLabels
						.filter(
							l => l.label.toLowerCase().includes( query.toLowerCase() ) && ! loadedIds.has( l.id )
						)
						.map( l => l.id );

					// Stage 3: Fetch full items for the matches
					let newItems: ComboboxItem[] = [];
					if ( matchingIds.length > 0 ) {
						if ( searchGenRef.current !== gen ) return;
						newItems = await onFetchByIds( matchingIds );
					}

					if ( searchGenRef.current !== gen ) return;
					setSearchResults( newItems );
					setLoadAnnouncement(
						newItems.length > 0
							? `Search complete. ${ newItems.length } additional result${
									newItems.length === 1 ? '' : 's'
							  } found.`
							: 'Search complete. No additional results found.'
					);
				} catch {
					if ( searchGenRef.current === gen ) {
						setSearchError( true );
						setLoadAnnouncement( 'Error: search failed.' );
					}
				} finally {
					if ( searchGenRef.current === gen ) {
						setIsSearching( false );
					}
				}
			},
			[ onFetchLabels, onFetchByIds, pageSize ]
		);

		// ── Exit search mode ────────────────────────────────────────────────────
		const exitSearchMode = useCallback( () => {
			searchGenRef.current++; // cancel any in-flight search
			setIsSearchMode( false );
			setSearchResults( [] );
			setIsSearching( false );
			setSearchError( false );
		}, [] );

		// ── Initial fetch on mount ──────────────────────────────────────────────
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useEffect( () => {
			if ( onFetchItems ) void fetchNextPage();
		}, [] );

		// ── Scroll-triggered browse pagination ──────────────────────────────────
		const handleListScroll = useCallback( () => {
			const el = listboxRef.current;
			if (
				! el ||
				loadingRef.current ||
				! hasMoreRef.current ||
				! isAsync ||
				isSearchModeRef.current
			)
				return;
			const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
			if ( distanceFromBottom < 60 ) void fetchNextPage();
		}, [ isAsync, fetchNextPage ] );

		// ── Debounced type-ahead ────────────────────────────────────────────────
		useEffect( () => {
			if ( isFirstRender.current ) {
				isFirstRender.current = false;
				return;
			}

			const gen = ++searchGenRef.current;

			// Empty query — immediately exit search mode, no debounce needed
			if ( ! inputValue ) {
				exitSearchMode();
				return;
			}

			if ( ! isAsync || ! isOpenRef.current ) return;

			if ( isTwoStage && hasMoreRef.current ) {
				debounceRef.current = setTimeout(
					() => void runTwoStageSearch( inputValue, gen ),
					debounce
				);
			} else if ( hasMoreRef.current && ! loadingRef.current ) {
				debounceRef.current = setTimeout( () => void fetchNextPage(), debounce );
			}

			return () => {
				if ( debounceRef.current ) clearTimeout( debounceRef.current );
			};
		}, [ inputValue, isAsync, isTwoStage, fetchNextPage, runTwoStageSearch, exitSearchMode ] );

		// ── Misc side effects ───────────────────────────────────────────────────

		// Clear load live-region after screen readers consume it
		useEffect( () => {
			if ( ! loadAnnouncement ) return;
			const id = setTimeout( () => setLoadAnnouncement( '' ), 1500 );
			return () => clearTimeout( id );
		}, [ loadAnnouncement ] );

		// Trim stale option refs when filtered list shrinks
		useEffect( () => {
			optionRefs.current = optionRefs.current.slice( 0, filteredItems.length );
		}, [ filteredItems.length ] );

		// Scroll keyboard-focused option into view
		useEffect( () => {
			if ( activeIndex !== null ) {
				optionRefs.current[ activeIndex ]?.scrollIntoView( { block: 'nearest' } );
			}
		}, [ activeIndex ] );

		// Close dropdown on outside click
		useEffect( () => {
			const handle = ( e: MouseEvent ) => {
				if ( containerRef.current && ! containerRef.current.contains( e.target as Node ) ) {
					setIsOpen( false );
					isOpenRef.current = false;
					setActiveIndex( null );
				}
			};
			document.addEventListener( 'mousedown', handle );
			return () => document.removeEventListener( 'mousedown', handle );
		}, [] );

		// ── Helpers ─────────────────────────────────────────────────────────────
		const openDropdown = useCallback( () => {
			setIsOpen( true );
			isOpenRef.current = true;
		}, [] );

		const closeDropdown = useCallback( () => {
			setIsOpen( false );
			isOpenRef.current = false;
			setActiveIndex( null );
		}, [] );

		const selectItem = useCallback(
			( item: ComboboxItem ) => {
				const next = [ ...selectedItems, item ];
				setSelectedItems( next );
				onChange(
					next,
					next.map( i => i.label )
				);
				setInputValue( '' );
				exitSearchMode();
				closeDropdown();
				setSelectionAnnouncement( `${ item.label } added to the list.` );
				inputRef.current?.focus();
			},
			[ selectedItems, onChange, closeDropdown, exitSearchMode ]
		);

		const removeItem = useCallback(
			( item: ComboboxItem ) => {
				const next = selectedItems.filter( s => s.id !== item.id );
				setSelectedItems( next );
				onChange(
					next,
					next.map( i => i.label )
				);
				setSelectionAnnouncement( `${ item.label } removed from the list.` );
			},
			[ selectedItems, onChange ]
		);

		const clearInputText = useCallback( () => {
			setInputValue( '' );
			setActiveIndex( null );
			exitSearchMode();
			inputRef.current?.focus();
		}, [ exitSearchMode ] );

		// ── Event handlers ───────────────────────────────────────────────────────
		const handleInputChange = ( e: ChangeEvent< HTMLInputElement > ) => {
			setInputValue( e.target.value );
			setActiveIndex( null );
			openDropdown();
		};

		const handleChevronClick = () => {
			if ( isOpen ) closeDropdown();
			else {
				openDropdown();
				inputRef.current?.focus();
			}
		};

		const handleInputKeyDown = ( e: KeyboardEvent< HTMLInputElement > ) => {
			switch ( e.key ) {
				case 'ArrowDown':
					e.preventDefault();
					if ( ! isOpen ) {
						openDropdown();
						setActiveIndex( 0 );
					} else {
						setActiveIndex( prev => {
							if ( filteredItems.length === 0 ) return null;
							if ( prev === null || prev >= filteredItems.length - 1 ) return 0;
							return prev + 1;
						} );
					}
					break;

				case 'ArrowUp':
					e.preventDefault();
					if ( isOpen && filteredItems.length > 0 ) {
						setActiveIndex( prev => {
							if ( prev === null || prev === 0 ) return filteredItems.length - 1;
							return prev - 1;
						} );
					}
					break;

				case 'Enter':
					e.preventDefault();
					if ( isOpen && activeIndex !== null && filteredItems[ activeIndex ] ) {
						selectItem( filteredItems[ activeIndex ] );
					} else {
						openDropdown();
					}
					break;

				case 'Escape':
					e.preventDefault();
					if ( isOpen ) {
						closeDropdown();
						setInputValue( '' );
						exitSearchMode();
					}
					break;

				case 'Tab':
					closeDropdown();
					break;

				case 'Home':
					if ( isOpen && filteredItems.length > 0 ) {
						e.preventDefault();
						setActiveIndex( 0 );
					}
					break;

				case 'End':
					if ( isOpen && filteredItems.length > 0 ) {
						e.preventDefault();
						setActiveIndex( filteredItems.length - 1 );
					}
					break;
			}
		};

		const activeDescendant =
			activeIndex !== null && filteredItems[ activeIndex ]
				? `${ listboxId }-option-${ filteredItems[ activeIndex ].id }`
				: undefined;

		const ListComponent =
			listType === 'badge' ? FormAutocompleteMultiselectBadge : FormAutocompleteMultiselectButton;

		const SelectLabel = () => (
			<Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
		);

		const inlineLabel = Boolean( isInline && label );

		// ── Sentinel content ─────────────────────────────────────────────────────
		let sentinelContent: React.ReactNode;
		if ( isLoadingMore ) {
			sentinelContent = (
				<Flex sx={ { alignItems: 'center', gap: 2, color: 'input.text.placeholder' } }>
					<Spinner size={ 14 } />
					Loading more results…
				</Flex>
			);
		} else if ( fetchError ) {
			sentinelContent = (
				<Flex sx={ { alignItems: 'center', gap: 2, color: 'error' } }>
					<MdWarning size={ 14 } aria-hidden="true" />
					Error loading additional results.
				</Flex>
			);
		} else if ( isSearching ) {
			sentinelContent = (
				<Flex sx={ { alignItems: 'center', gap: 2, color: 'input.text.placeholder' } }>
					<Spinner size={ 14 } />
					Searching for more results…
				</Flex>
			);
		} else if ( searchError ) {
			sentinelContent = (
				<Flex sx={ { alignItems: 'center', gap: 2, color: 'error' } }>
					<MdWarning size={ 14 } aria-hidden="true" />
					Error — search failed. Please try again.
				</Flex>
			);
		} else {
			// Invisible scroll trigger when idle with more browse pages remaining
			sentinelContent = <span sx={ srOnly } aria-hidden="true" />;
		}

		// ── Render ───────────────────────────────────────────────────────────────
		return (
			<div
				className={ classNames( 'vip-form-autocomplete-sentinel-component', className ) }
				ref={ containerRef }
			>
				{ /* Polite live region for load/search announcements */ }
				<div role="status" aria-live="polite" aria-atomic="true" sx={ srOnly }>
					{ loadAnnouncement }
				</div>

				{ label && ! isInline && <SelectLabel /> }

				<div sx={ { position: 'relative' } }>
					{ /* Input wrapper */ }
					<div
						onMouseDown={ () => {
							isMouseInteractionRef.current = true;
							// Clear after the focus event has fired so subsequent
							// Tab presses are detected correctly.
							setTimeout( () => {
								isMouseInteractionRef.current = false;
							}, 0 );
						} }
						sx={ {
							...inputWrapperStyles,
							...( isKeyboardFocused ? outlineStyles : {} ),
							...( hasError ? { borderColor: 'input.border.error' } : {} ),
						} }
					>
						{ inlineLabel && (
							<span sx={ { flexShrink: 0, pl: 3, fontSize: 'inherit' } }>
								<SelectLabel />
							</span>
						) }

						{ searchIcon && (
							<MdSearch
								sx={ { ml: 3, flexShrink: 0, color: 'input.text.placeholder' } }
								aria-hidden="true"
							/>
						) }

						<input
							ref={ node => {
								inputRef.current = node;
								if ( typeof forwardRef === 'function' ) {
									forwardRef( node );
								} else if ( forwardRef ) {
									forwardRef.current = node;
								}
							} }
							id={ forLabel }
							type="text"
							role="combobox"
							aria-expanded={ isOpen }
							aria-controls={ isOpen ? listboxId : undefined }
							aria-autocomplete="list"
							aria-activedescendant={ activeDescendant }
							aria-required={ required }
							aria-describedby={
								[ `describe-${ forLabel }-validation`, helperText ? helperTextId : '' ]
									.filter( Boolean )
									.join( ' ' ) || undefined
							}
							value={ inputValue }
							onChange={ handleInputChange }
							onKeyDown={ handleInputKeyDown }
							onClick={ openDropdown }
							onFocus={ () => {
								if ( ! isMouseInteractionRef.current ) setIsKeyboardFocused( true );
							} }
							onBlur={ () => setIsKeyboardFocused( false ) }
							placeholder={ placeholder }
							autoComplete="off"
							spellCheck={ false }
							sx={ {
								...inputStyles,
								...( searchIcon ? { pl: 2 } : {} ),
							} }
						/>

						{ /* Clear typed text button */ }
						{ inputValue && (
							<button
								type="button"
								onClick={ clearInputText }
								aria-label="Clear search text"
								sx={ {
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '32px',
									height: '32px',
									mr: 1,
									color: 'input.text.placeholder',
									backgroundColor: 'transparent',
									border: 'none',
									borderRadius: 1,
									cursor: 'pointer',
									flexShrink: 0,
									'&:hover': { color: 'text' },
									'&:focus-visible': outlineStyles,
								} }
							>
								<MdClose size={ 14 } aria-hidden="true" />
							</button>
						) }

						{ /* Chevron toggle — decorative, excluded from tab order */ }
						<button
							type="button"
							onClick={ handleChevronClick }
							tabIndex={ -1 }
							aria-hidden="true"
							sx={ {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '32px',
								height: '32px',
								mr: 1,
								color: 'input.text.placeholder',
								backgroundColor: 'transparent',
								border: 'none',
								borderRadius: 1,
								cursor: 'pointer',
								flexShrink: 0,
								transition: 'transform 150ms ease',
								transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
								'&:hover': { color: 'text' },
							} }
						>
							<MdKeyboardArrowDown size={ 18 } aria-hidden="true" />
						</button>

						{ /* External loading spinner inside the input */ }
						{ externalLoading && <Spinner size={ 16 } sx={ { mr: 3, flexShrink: 0 } } /> }
					</div>

					{ /* Dropdown listbox */ }
					{ isOpen && (
						<ul
							ref={ listboxRef }
							id={ listboxId }
							role="listbox"
							aria-label={ typeof label === 'string' ? label : undefined }
							aria-busy={ isLoadingMore || isSearching }
							aria-multiselectable="true"
							onScroll={ handleListScroll }
							sx={ dropdownStyles }
						>
							{ /* Empty state */ }
							{ filteredItems.length === 0 && ! isLoadingMore && ! isSearching && (
								<li
									role="option"
									aria-selected={ false }
									aria-disabled="true"
									sx={ {
										px: 3,
										py: 2,
										fontSize: 'inherit',
										color: 'input.text.placeholder',
										cursor: 'default',
										userSelect: 'none',
									} }
								>
									{ noOptionsMessage() }
								</li>
							) }

							{ /* Option items */ }
							{ filteredItems.map( ( item, index ) => {
								const isActive = index === activeIndex;
								return (
									<li
										key={ item.id }
										ref={ el => {
											optionRefs.current[ index ] = el;
										} }
										id={ `${ listboxId }-option-${ item.id }` }
										role="option"
										aria-selected={ false }
										sx={ {
											...optionBaseStyles,
											...( isActive
												? optionActiveStyles
												: {
														'&:hover': {
															backgroundColor: 'input.background.primary',
															color: '#ffffff',
														},
												  } ),
										} }
										onClick={ () => selectItem( item ) }
										onMouseEnter={ () => setActiveIndex( index ) }
										onMouseDown={ e => e.preventDefault() }
									>
										{ item.label }
									</li>
								);
							} ) }

							{ /* Sentinel — loading, searching, error, or invisible scroll trigger */ }
							{ showSentinel && (
								<li
									aria-hidden="true"
									sx={ { px: 3, py: 2, fontSize: 'inherit', cursor: 'default' } }
								>
									{ sentinelContent }
								</li>
							) }
						</ul>
					) }
				</div>

				{ /* Helper text */ }
				{ helperText && (
					<p id={ helperTextId } sx={ { mt: 1, fontSize: 1, color: 'input.text.placeholder' } }>
						{ helperText }
					</p>
				) }

				{ /* Error + item count row */ }
				<Flex sx={ { mt: 2, justifyContent: 'space-between' } }>
					{ hasError && errorMessage && (
						<Validation isValid={ false } describedId={ forLabel }>
							{ errorMessage }
						</Validation>
					) }
					<div sx={ { fontSize: 1 } }>
						{ selectedItems.length } item{ selectedItems.length === 1 ? '' : 's' } selected
					</div>
				</Flex>

				{ /* Assertive live region for add/remove announcements */ }
				{ selectionAnnouncement && <SelectionStatus status={ selectionAnnouncement } /> }

				{ /* Selected item chips */ }
				<div sx={ { display: 'inline-flex', flexWrap: 'wrap', maxWidth: '100%' } }>
					{ selectedItems.map( ( item, idx ) => (
						<ListComponent
							key={ item.id }
							index={ idx }
							option={ item.label }
							unselectValue={ ( _label, index ) => {
								const target = selectedItems[ index ];
								if ( target ) removeItem( target );
							} }
						/>
					) ) }
				</div>
			</div>
		);
	}
);

FormAutocompleteMultiselectSentinel.displayName = 'FormAutocompleteMultiselectSentinel';

export { FormAutocompleteMultiselectSentinel };
