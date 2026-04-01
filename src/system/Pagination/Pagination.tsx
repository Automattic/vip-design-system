/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Flex, ThemeUIStyleObject } from 'theme-ui';

import {
	containerStyles,
	navigationStyles,
	pageButtonStyles,
	activePageButtonStyles,
	arrowButtonStyles,
	compactTextStyles,
} from './styles';
import { Box } from '../Box';
import { Button } from '../Button';
import { Select } from '../NewForm';
import { Text } from '../Text';

export type PaginationVariant = 'full' | 'compact' | 'arrows';

/** A navigation parameter for the arrows pagination variant. */
export interface ArrowsNavigationParam {
	/** The query parameter name (e.g., 'after', 'before'). */
	param: string;
	/** The parameter token value. */
	value: string;
}

interface PaginationBaseProps {
	/** Whether to show the items-per-page dropdown selector.
	 * @default false
	 */
	displayItemsPerPageSelector?: boolean;
	/** Available page size options for the items-per-page selector.
	 * @default [20, 50, 100]
	 */
	pageSizeOptions?: number[];
	/** Additional CSS class name for the pagination container. */
	className?: string;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
	/** Optional content rendered between the items-per-page selector and page navigation. */
	children?: React.ReactNode;
}

/** Props for page-number based variants ('full' | 'compact'). */
interface PageNumberPaginationProps extends PaginationBaseProps {
	/** The display variant: 'full' shows page number buttons, 'compact' shows a page dropdown.
	 * @default 'full'
	 */
	variant?: 'full' | 'compact';
	/** The currently active page number (1-based). */
	currentPage: number;
	/** Total number of items across all pages. Used to compute totalPages if not provided. */
	totalItems?: number;
	/** Total number of pages. Takes precedence over totalItems for page count. */
	totalPages?: number;
	/** Number of items displayed per page. */
	itemsPerPage: number;
	/** Callback fired when the user navigates to a different page. */
	onPageChange: ( page: number ) => void;
	/** Callback fired when the user changes the items-per-page value. */
	onItemsPerPageChange: ( itemsPerPage: number ) => void;
	/** Whether there is a next page available. Used for open-ended pagination without totalPages. */
	hasNextPage?: boolean;
	/** The maximum page number that can be reached. Used for open-ended pagination without totalPages. */
	maxReachablePage?: number;
	nextParam?: never;
	previousParam?: never;
	onNavigate?: never;
	hasPreviousPage?: never;
}

/** Props for the 'arrows' variant. Only shows prev/next arrow buttons. */
interface ArrowsPaginationProps extends PaginationBaseProps {
	/** The 'arrows' variant renders only previous/next arrow buttons. */
	variant: 'arrows';
	/** Whether there is a next page available. */
	hasNextPage?: boolean;
	/** Whether there is a previous page available. */
	hasPreviousPage?: boolean;
	/** Navigation parameter for the next page. */
	nextParam?: ArrowsNavigationParam;
	/** Navigation parameter for the previous page. */
	previousParam?: ArrowsNavigationParam;
	/** Callback fired when the user navigates. Receives the param name and value. */
	onNavigate: ( param: string, value: string ) => void;
	/** Number of items displayed per page. Optional for arrows variant. */
	itemsPerPage?: number;
	/** Callback fired when the user changes the items-per-page value. Optional for arrows variant. */
	onItemsPerPageChange?: ( itemsPerPage: number ) => void;
	currentPage?: never;
	totalItems?: never;
	totalPages?: never;
	onPageChange?: never;
	maxReachablePage?: never;
}

export type PaginationProps = PageNumberPaginationProps | ArrowsPaginationProps;

export type PageNumberItem = number | 'ellipsis';

function range( start: number, end: number ): number[] {
	return Array.from( { length: end - start + 1 }, ( _, i ) => start + i );
}

/** Total number of visible items (page numbers + ellipsis indicators) in the pagination bar. */
const VISIBLE_PAGE_SLOTS = 8;

/** When currentPage <= this value, the "near start" layout is used (no leading ellipsis). */
const NEAR_START_THRESHOLD = 5;

/** Pages shown before the current page in the middle layout. */
const PAGES_BEFORE_CURRENT = 1;

/** Pages shown after the current page in the bounded middle layout. */
const PAGES_AFTER_CURRENT = 2;

export function getPageNumbers(
	currentPage: number,
	totalPages?: number,
	hasNextPage?: boolean,
	maxReachablePage?: number
): PageNumberItem[] {
	// Resolve the last known page
	let last: number | undefined;
	if ( totalPages !== undefined ) {
		last = Math.max( 1, Number( totalPages ) );
	} else if ( hasNextPage === false ) {
		last = currentPage;
	}

	if ( last !== undefined && ( ! Number.isFinite( last ) || last < 1 ) ) {
		return [];
	}

	// Effective end anchor: known last page, or capped reachable page
	const end =
		last ??
		( maxReachablePage !== undefined ? Math.max( currentPage, maxReachablePage ) : undefined );

	// Small page count — show all without ellipsis
	if ( end !== undefined && end <= VISIBLE_PAGE_SLOTS ) {
		return range( 1, end );
	}

	// Near start
	if ( currentPage <= NEAR_START_THRESHOLD ) {
		if ( end !== undefined ) return [ ...range( 1, NEAR_START_THRESHOLD + 1 ), 'ellipsis', end ];
		return [ ...range( 1, VISIBLE_PAGE_SLOTS - 1 ), 'ellipsis' ];
	}

	// Near end (bounded only — open-ended has no "end zone")
	if ( last !== undefined && currentPage >= last - ( NEAR_START_THRESHOLD - 1 ) ) {
		return [ 1, 'ellipsis', ...range( last - NEAR_START_THRESHOLD, last ) ];
	}

	// Middle
	if ( end !== undefined ) {
		const rangeEnd = Math.min( currentPage + PAGES_AFTER_CURRENT, end );
		const middle = range( currentPage - PAGES_BEFORE_CURRENT, rangeEnd );
		if ( rangeEnd >= end ) return [ 1, 'ellipsis', ...middle ];
		return [ 1, 'ellipsis', ...middle, 'ellipsis', end ];
	}

	// Fully open-ended middle
	return [
		1,
		'ellipsis',
		...range( currentPage - PAGES_BEFORE_CURRENT, currentPage + PAGES_AFTER_CURRENT + 1 ),
		'ellipsis',
	];
}

const ItemsPerPageSelect = ( {
	itemsPerPage,
	pageSizeOptions,
	onItemsPerPageChange,
}: {
	itemsPerPage: number;
	pageSizeOptions: number[];
	onItemsPerPageChange: ( size: number ) => void;
} ) => (
	<Select
		id="items-per-page"
		aria-label="Items per page"
		separator={ false }
		value={ itemsPerPage }
		options={ pageSizeOptions.map( size => ( {
			value: size,
			label: `${ size.toString() } / page`,
		} ) ) }
		onChange={ option => onItemsPerPageChange( Number( option?.value ) ) }
	/>
);

const PageNumbers = ( {
	currentPage,
	totalPages,
	hasNextPage,
	maxReachablePage,
	onPageChange,
}: {
	currentPage: number;
	totalPages?: number;
	hasNextPage?: boolean;
	maxReachablePage?: number;
	onPageChange: ( page: number ) => void;
} ) => {
	const pages = getPageNumbers( currentPage, totalPages, hasNextPage, maxReachablePage );

	return (
		<>
			{ pages.map( ( page, index ) => {
				if ( page === 'ellipsis' ) {
					return <BiDotsHorizontalRounded key={ `ellipsis-${ index }` } />;
				}

				const isActive = page === currentPage;

				return (
					<Button
						key={ page }
						type="button"
						onClick={ () => onPageChange( page ) }
						aria-label={ `Go to page ${ page }` }
						aria-current={ isActive ? 'page' : undefined }
						sx={ isActive ? activePageButtonStyles : pageButtonStyles }
					>
						{ page }
					</Button>
				);
			} ) }
		</>
	);
};

const CompactPageSelector = ( {
	currentPage,
	totalPages,
	maxReachablePage,
	onPageChange,
}: {
	currentPage: number;
	totalPages?: number;
	maxReachablePage?: number;
	onPageChange: ( page: number ) => void;
} ) => {
	const isOpenEnded = totalPages === undefined;
	const upperBound: number = isOpenEnded ? maxReachablePage ?? currentPage + 1 : totalPages;
	const pageOptions = Array.from( { length: upperBound }, ( _, i ) => i + 1 );

	return (
		<Flex sx={ compactTextStyles }>
			<Text as="span" sx={ { fontSize: 2, color: 'heading', mb: 0 } }>
				Page
			</Text>
			<Select
				id="page"
				aria-label="Page"
				separator={ false }
				value={ currentPage }
				onChange={ option => onPageChange( Number( option?.value ) ) }
				options={ pageOptions.map( page => ( { value: page, label: page.toString() } ) ) }
				sx={ { minWidth: '70px', mx: 1 } }
			/>
			{ ! isOpenEnded && (
				<Text as="span" sx={ { fontSize: 2, color: 'heading', mb: 0 } }>
					of { totalPages }
				</Text>
			) }
		</Flex>
	);
};

/**
 * A pagination control for navigating through paged content.
 * Supports full page-number buttons and compact dropdown modes, with optional items-per-page selection.
 */
export const Pagination = forwardRef< HTMLElement, PaginationProps >(
	(
		{
			displayItemsPerPageSelector = false,
			pageSizeOptions = [ 20, 50, 100 ],
			className,
			sx,
			children,
			...rest
		},
		ref
	) => {
		const isArrows = rest.variant === 'arrows';

		// Page-number variant values
		const currentPage = isArrows ? undefined : rest.currentPage;
		const totalItems = isArrows ? undefined : rest.totalItems;
		const totalPages = isArrows ? undefined : rest.totalPages;
		const itemsPerPage = rest.itemsPerPage;
		const onPageChange = isArrows ? undefined : rest.onPageChange;
		const onItemsPerPageChange = rest.onItemsPerPageChange;
		const maxReachablePage = isArrows ? undefined : rest.maxReachablePage;
		const variant = rest.variant ?? 'full';

		// Arrows variant values
		const hasNextPage = rest.hasNextPage;
		const hasPreviousPage = isArrows ? rest.hasPreviousPage : undefined;
		const nextParam = isArrows ? rest.nextParam : undefined;
		const previousParam = isArrows ? rest.previousParam : undefined;
		const onNavigate = isArrows ? rest.onNavigate : undefined;

		const resolvedTotalPages =
			totalPages ??
			( totalItems !== undefined && itemsPerPage
				? Math.ceil( totalItems / itemsPerPage )
				: undefined );

		const isPrevDisabled = isArrows
			? ! hasPreviousPage || ! previousParam?.value
			: ( currentPage ?? 1 ) <= 1;

		let isNextDisabled: boolean;
		if ( isArrows ) {
			isNextDisabled = ! hasNextPage || ! nextParam?.value;
		} else if ( resolvedTotalPages !== undefined ) {
			isNextDisabled = ( currentPage ?? 1 ) >= resolvedTotalPages;
		} else {
			isNextDisabled = hasNextPage === false;
		}

		const handlePrevClick = () => {
			if ( isArrows && onNavigate && previousParam ) {
				onNavigate( previousParam.param, previousParam.value );
			} else if ( onPageChange && currentPage !== undefined ) {
				onPageChange( currentPage - 1 );
			}
		};

		const handleNextClick = () => {
			if ( isArrows && onNavigate && nextParam ) {
				onNavigate( nextParam.param, nextParam.value );
			} else if ( onPageChange && currentPage !== undefined ) {
				onPageChange( currentPage + 1 );
			}
		};

		return (
			<nav
				ref={ ref }
				aria-label="Pagination"
				className={ classNames( 'vip-pagination-component', className ) }
				sx={ { ...containerStyles, ...sx } }
			>
				<Box>
					{ displayItemsPerPageSelector && itemsPerPage && onItemsPerPageChange && (
						<ItemsPerPageSelect
							itemsPerPage={ itemsPerPage }
							pageSizeOptions={ pageSizeOptions }
							onItemsPerPageChange={ onItemsPerPageChange }
						/>
					) }
				</Box>
				<Box sx={ { flex: 1 } }>{ children }</Box>
				<Flex sx={ navigationStyles }>
					{ variant === 'full' && currentPage !== undefined && onPageChange && (
						<PageNumbers
							currentPage={ currentPage }
							totalPages={ resolvedTotalPages }
							hasNextPage={ hasNextPage }
							maxReachablePage={ maxReachablePage }
							onPageChange={ onPageChange }
						/>
					) }

					{ variant === 'compact' && currentPage !== undefined && onPageChange && (
						<CompactPageSelector
							currentPage={ currentPage }
							totalPages={ resolvedTotalPages }
							maxReachablePage={ maxReachablePage }
							onPageChange={ onPageChange }
						/>
					) }

					<Button
						aria-label="Previous page"
						disabled={ isPrevDisabled }
						onClick={ handlePrevClick }
						sx={ { ...arrowButtonStyles, ml: variant === 'arrows' ? 0 : 4 } }
					>
						<MdChevronLeft size={ 20 } />
					</Button>

					<Button
						aria-label="Next page"
						disabled={ isNextDisabled }
						onClick={ handleNextClick }
						sx={ arrowButtonStyles }
					>
						<MdChevronRight size={ 20 } />
					</Button>
				</Flex>
			</nav>
		);
	}
);

Pagination.displayName = 'Pagination';
