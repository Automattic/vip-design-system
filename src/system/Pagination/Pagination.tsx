/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { forwardRef } from 'react';
import { MdCheck, MdChevronLeft, MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { Flex, ThemeUIStyleObject } from 'theme-ui';

import {
	containerStyles,
	navigationStyles,
	pageButtonStyles,
	activePageButtonStyles,
	arrowButtonStyles,
	ellipsisStyles,
	compactTextStyles,
	compactTriggerStyles,
} from './styles';
import { Button } from '../Button';
import * as Dropdown from '../Dropdown';
import { Text } from '../Text';

export type PaginationVariant = 'full' | 'compact';

export interface PaginationProps {
	currentPage: number;
	totalItems: number;
	totalPages: number;
	itemsPerPage: number;
	onPageChange: ( page: number ) => void;
	onItemsPerPageChange: ( itemsPerPage: number ) => void;
	variant?: PaginationVariant;
	pageSizeOptions?: number[];
	className?: string;
	sx?: ThemeUIStyleObject;
}

export type PageNumberItem = number | 'ellipsis';

export function getPageNumbers( currentPage: number, totalPages: number ): PageNumberItem[] {
	if ( totalPages <= 7 ) {
		return Array.from( { length: totalPages }, ( _, i ) => i + 1 );
	}

	const pages: PageNumberItem[] = [];
	const siblings = new Set< number >( [
		1,
		totalPages,
		currentPage,
		currentPage - 1,
		currentPage + 1,
	] );

	const sorted = [ ...siblings ].filter( p => p >= 1 && p <= totalPages ).sort( ( a, b ) => a - b );

	for ( let i = 0; i < sorted.length; i++ ) {
		if ( i > 0 && sorted[ i ] - sorted[ i - 1 ] > 1 ) {
			pages.push( 'ellipsis' );
		}
		pages.push( sorted[ i ] );
	}

	return pages;
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
			<Button variant="ghost" sx={ { fontSize: 1, py: 1, px: 2, color: 'heading' } }>
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
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: ( page: number ) => void;
} ) => {
	const pages = getPageNumbers( currentPage, totalPages );

	return (
		<>
			{ pages.map( ( page, index ) => {
				if ( page === 'ellipsis' ) {
					return (
						<span key={ `ellipsis-${ index }` } sx={ ellipsisStyles }>
							&hellip;
						</span>
					);
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
	totalPages: number;
	onPageChange: ( page: number ) => void;
} ) => {
	const pageOptions = Array.from( { length: totalPages }, ( _, i ) => i + 1 );

	return (
		<Flex sx={ compactTextStyles }>
			<Text as="span" sx={ { fontSize: 1, color: 'heading', mb: 0 } }>
				Page
			</Text>
			<Dropdown.Root
				trigger={
					<Button type="button" sx={ compactTriggerStyles }>
						{ currentPage }
						<MdKeyboardArrowDown size={ 16 } />
					</Button>
				}
			>
				<Dropdown.RadioGroup
					value={ String( currentPage ) }
					onValueChange={ value => onPageChange( Number( value ) ) }
				>
					{ pageOptions.map( page => (
						<Dropdown.RadioItem key={ page } value={ String( page ) }>
							<Dropdown.ItemIndicator>
								<MdCheck size={ 14 } sx={ { mr: 2 } } />
							</Dropdown.ItemIndicator>
							{ page }
						</Dropdown.RadioItem>
					) ) }
				</Dropdown.RadioGroup>
			</Dropdown.Root>
			<Text as="span" sx={ { fontSize: 1, color: 'heading', mb: 0 } }>
				of { totalPages }
			</Text>
		</Flex>
	);
};

export const Pagination = forwardRef< HTMLElement, PaginationProps >(
	(
		{
			currentPage,
			totalItems,
			totalPages,
			itemsPerPage,
			onPageChange,
			onItemsPerPageChange,
			variant = 'full',
			pageSizeOptions = [ 10, 20, 50, 100 ],
			className,
			sx,
			...rest
		},
		ref
	) => {
		const isFirstPage = currentPage <= 1;
		const isLastPage = currentPage >= totalPages;

		return (
			<nav
				ref={ ref }
				aria-label="Pagination"
				className={ classNames( 'vip-pagination-component', className ) }
				sx={ { ...containerStyles, ...sx } }
				{ ...rest }
			>
				<ItemsPerPageDropdown
					itemsPerPage={ itemsPerPage }
					pageSizeOptions={ pageSizeOptions }
					onItemsPerPageChange={ onItemsPerPageChange }
				/>

				<Flex sx={ navigationStyles }>
					{ variant === 'full' && (
						<PageNumbers
							currentPage={ currentPage }
							totalPages={ totalPages }
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
