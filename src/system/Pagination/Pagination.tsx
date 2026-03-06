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

export function getPageNumbers(
	currentPage: number,
	totalPages?: number,
	hasNextPage?: boolean
): PageNumberItem[] {
	let last: number | undefined;
	if ( totalPages === undefined ) {
		if ( hasNextPage === false ) {
			last = currentPage;
		} else {
			last = undefined;
		}
	} else {
		last = Math.max( 1, Number( totalPages ) );
	}

	if ( last !== undefined && ( ! Number.isFinite( last ) || last < 1 ) ) {
		return [];
	}
	if ( last !== undefined && last <= 8 ) {
		return range( 1, last );
	}

	// Bounded (last is a known page number)
	if ( last !== undefined ) {
		if ( currentPage <= 5 ) return [ ...range( 1, 6 ), 'ellipsis', last ];
		if ( currentPage >= last - 4 ) return [ 1, 'ellipsis', ...range( last - 5, last ) ];
		return [ 1, 'ellipsis', ...range( currentPage - 1, currentPage + 2 ), 'ellipsis', last ];
	}

	// Open-ended (no known last page)
	if ( currentPage <= 5 ) return [ ...range( 1, 7 ), 'ellipsis' ];
	return [ 1, 'ellipsis', ...range( currentPage - 1, currentPage + 3 ), 'ellipsis' ];
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
	onPageChange,
}: {
	currentPage: number;
	totalPages?: number;
	hasNextPage?: boolean;
	onPageChange: ( page: number ) => void;
} ) => {
	const pages = getPageNumbers( currentPage, totalPages, hasNextPage );

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
	onPageChange,
}: {
	currentPage: number;
	totalPages?: number;
	onPageChange: ( page: number ) => void;
} ) => {
	const isOpenEnded = totalPages === undefined;
	const pageOptions = isOpenEnded
		? Array.from( { length: currentPage + 1 }, ( _, i ) => i + 1 )
		: Array.from( { length: totalPages }, ( _, i ) => i + 1 );

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
			variant = 'full',
			pageSizeOptions = [ 10, 20, 50, 100 ],
			className,
			sx,
			children,
			...rest
		},
		ref
	) => {
		const resolvedTotalPages =
			totalPages ?? ( totalItems !== undefined ? Math.ceil( totalItems / itemsPerPage ) : undefined );

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
							onPageChange={ onPageChange }
						/>
					) }

					{ variant === 'compact' && (
						<CompactPageSelector
							currentPage={ currentPage }
							totalPages={ resolvedTotalPages }
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
