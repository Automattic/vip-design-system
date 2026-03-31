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

export type PaginationVariant = 'full' | 'compact';

export interface PaginationProps {
	displayItemsPerPageSelector?: boolean;
	currentPage: number;
	totalItems?: number;
	totalPages?: number;
	itemsPerPage: number;
	onPageChange: ( page: number ) => void;
	onItemsPerPageChange: ( itemsPerPage: number ) => void;
	hasNextPage?: boolean;
	maxReachablePage?: number;
	variant?: PaginationVariant;
	pageSizeOptions?: number[];
	className?: string;
	sx?: ThemeUIStyleObject;
	children?: React.ReactNode;
}

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

export const Pagination = forwardRef< HTMLElement, PaginationProps >(
	(
		{
			displayItemsPerPageSelector = false,
			currentPage,
			totalItems,
			totalPages,
			itemsPerPage,
			onPageChange,
			onItemsPerPageChange,
			hasNextPage,
			maxReachablePage,
			variant = 'full',
			pageSizeOptions = [ 20, 50, 100 ],
			className,
			sx,
			children,
			...rest
		},
		ref
	) => {
		const resolvedTotalPages =
			totalPages ??
			( totalItems !== undefined ? Math.ceil( totalItems / itemsPerPage ) : undefined );

		const isFirstPage = currentPage <= 1;
		const isLastPage =
			resolvedTotalPages !== undefined ? currentPage >= resolvedTotalPages : hasNextPage === false;

		return (
			<nav
				ref={ ref }
				aria-label="Pagination"
				className={ classNames( 'vip-pagination-component', className ) }
				sx={ { ...containerStyles, ...sx } }
				{ ...rest }
			>
				<Box>
					{ displayItemsPerPageSelector && (
						<ItemsPerPageSelect
							itemsPerPage={ itemsPerPage }
							pageSizeOptions={ pageSizeOptions }
							onItemsPerPageChange={ onItemsPerPageChange }
						/>
					) }
				</Box>
				<Box sx={ { flex: 1 } }>{ children }</Box>
				<Flex sx={ navigationStyles }>
					{ variant === 'full' && (
						<PageNumbers
							currentPage={ currentPage }
							totalPages={ resolvedTotalPages }
							hasNextPage={ hasNextPage }
							maxReachablePage={ maxReachablePage }
							onPageChange={ onPageChange }
						/>
					) }

					{ variant === 'compact' && (
						<CompactPageSelector
							currentPage={ currentPage }
							totalPages={ resolvedTotalPages }
							maxReachablePage={ maxReachablePage }
							onPageChange={ onPageChange }
						/>
					) }

					<Button
						aria-label="Previous page"
						disabled={ isFirstPage }
						onClick={ () => onPageChange( currentPage - 1 ) }
						sx={ { ...arrowButtonStyles, ml: 4 } }
					>
						<MdChevronLeft size={ 20 } />
					</Button>

					<Button
						aria-label="Next page"
						disabled={ isLastPage }
						onClick={ () => onPageChange( currentPage + 1 ) }
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
