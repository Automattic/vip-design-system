/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdCheck, MdChevronLeft, MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { Flex, ThemeUIStyleObject } from 'theme-ui';

import {
	containerStyles,
	navigationStyles,
	pageButtonStyles,
	activePageButtonStyles,
	arrowButtonStyles,
	compactTextStyles,
	compactTriggerStyles,
} from './styles';
import { Box } from '../Box';
import { Button } from '../Button';
import * as Dropdown from '../Dropdown';
import { Text } from '../Text';
import { Select } from '../NewForm';

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
	const last =
		totalPages === undefined
			? hasNextPage === false
				? currentPage
				: undefined
			: Math.max( 1, Number( totalPages ) );

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

const ItemsPerPageDropdown = ( {
	itemsPerPage,
	pageSizeOptions,
	onItemsPerPageChange,
}: {
	itemsPerPage: number;
	pageSizeOptions: number[];
	onItemsPerPageChange: ( size: number ) => void;
} ) => (
	<Dropdown.Root
		trigger={
			<Button variant="ghost" sx={ { fontSize: 2, py: 1, px: 2, color: 'heading' } }>
				{ itemsPerPage } / page
				<MdKeyboardArrowDown sx={ { ml: 1 } } />
			</Button>
		}
	>
		<Dropdown.RadioGroup
			value={ String( itemsPerPage ) }
			onValueChange={ value => onItemsPerPageChange( Number( value ) ) }
		>
			{ pageSizeOptions.map( size => (
				<Dropdown.RadioItem key={ size } value={ String( size ) }>
					<Dropdown.ItemIndicator>
						<MdCheck size={ 14 } sx={ { mr: 2 } } />
					</Dropdown.ItemIndicator>
					{ size } / page
				</Dropdown.RadioItem>
			) ) }
		</Dropdown.RadioGroup>
	</Dropdown.Root>
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
		const isFirstPage = currentPage <= 1;
		const isLastPage = totalPages !== undefined ? currentPage >= totalPages : hasNextPage === false;

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
						<ItemsPerPageDropdown
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
							totalPages={ totalPages }
							hasNextPage={ hasNextPage }
							onPageChange={ onPageChange }
						/>
					) }

					{ variant === 'compact' && (
						<CompactPageSelector
							currentPage={ currentPage }
							totalPages={ totalPages }
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
