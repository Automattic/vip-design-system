/** @jsxImportSource theme-ui */

import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Pagination } from './Pagination';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { Text } from '../Text';

import type { StoryObj, Meta } from '@storybook/react-vite';

const meta: Meta< typeof Pagination > = {
	title: 'Pagination',
	component: Pagination,
	parameters: {
		docs: {
			description: {
				component: `
A Pagination component for navigating paged data.

## Variants

- **full** (default): Shows individual page number buttons with ellipsis for large page counts.
- **compact**: Shows a dropdown page selector instead of individual page numbers.
- **arrows**: Shows only prev/next arrow buttons. Designed for cursor-based pagination APIs with custom param names (e.g., \`after\`/\`before\`).

## Component Properties
`,
			},
		},
	},
};

export default meta;

type Story = StoryObj< typeof Pagination >;

const PaginationWithState = ( {
	initialPage = 1,
	totalItems = 200,
	initialItemsPerPage = 20,
	displayItemsPerPageSelector = false,
	...props
}: {
	initialPage?: number;
	totalItems?: number;
	initialItemsPerPage?: number;
	variant?: 'full' | 'compact';
	pageSizeOptions?: number[];
	displayItemsPerPageSelector?: boolean;
} ) => {
	const [ currentPage, setCurrentPage ] = useState( initialPage );
	const [ itemsPerPage, setItemsPerPage ] = useState( initialItemsPerPage );
	const totalPages = Math.ceil( totalItems / itemsPerPage );

	return (
		<Pagination
			currentPage={ currentPage }
			totalItems={ totalItems }
			itemsPerPage={ itemsPerPage }
			onPageChange={ setCurrentPage }
			displayItemsPerPageSelector={ displayItemsPerPageSelector }
			onItemsPerPageChange={ size => {
				setItemsPerPage( size );
				setCurrentPage( 1 );
			} }
			{ ...props }
		>
			<Flex sx={ { justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' } }>
				<Badge variant="gold" sx={ { mr: 2 } }>
					DEBUG
				</Badge>
				<Text>
					Page { currentPage } of { totalPages }
				</Text>
			</Flex>
		</Pagination>
	);
};

const OpenEndedPaginationWithState = ( {
	initialPage = 1,
	initialItemsPerPage = 20,
	hasNextPage,
	...props
}: {
	initialPage?: number;
	initialItemsPerPage?: number;
	hasNextPage?: boolean;
	variant?: 'full' | 'compact';
} ) => {
	const [ currentPage, setCurrentPage ] = useState( initialPage );
	const [ itemsPerPage, setItemsPerPage ] = useState( initialItemsPerPage );

	return (
		<Pagination
			currentPage={ currentPage }
			itemsPerPage={ itemsPerPage }
			onPageChange={ setCurrentPage }
			onItemsPerPageChange={ size => {
				setItemsPerPage( size );
				setCurrentPage( 1 );
			} }
			hasNextPage={ hasNextPage }
			{ ...props }
		>
			<Flex sx={ { justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' } }>
				<Badge variant="gold" sx={ { mr: 2 } }>
					DEBUG
				</Badge>
				<Text>Page { currentPage } (open-ended)</Text>
			</Flex>
		</Pagination>
	);
};

export const Primary: Story = {
	args: {
		currentPage: 1,
		totalItems: 200,
		itemsPerPage: 20,
		variant: 'full',
		displayItemsPerPageSelector: false,
	},
};

export const Default: Story = {
	render: () => <PaginationWithState />,
};

export const Compact: Story = {
	render: () => <PaginationWithState variant="compact" />,
};

export const FewPages: Story = {
	render: () => <PaginationWithState totalItems={ 200 } initialItemsPerPage={ 10 } />,
};

export const MiddlePage: Story = {
	render: () => (
		<PaginationWithState totalItems={ 500 } initialItemsPerPage={ 10 } initialPage={ 25 } />
	),
};

export const CustomPageSizes: Story = {
	render: () => (
		<PaginationWithState
			totalItems={ 1000 }
			initialItemsPerPage={ 25 }
			pageSizeOptions={ [ 25, 50, 100, 250 ] }
		/>
	),
};

export const WithItemsPerPageSelector: Story = {
	render: () => (
		<PaginationWithState
			totalItems={ 100 }
			initialItemsPerPage={ 25 }
			displayItemsPerPageSelector={ true }
		/>
	),
};

const CursorBasedPaginationWithState = () => {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ itemsPerPage, setItemsPerPage ] = useState( 20 );
	const [ maxVisited, setMaxVisited ] = useState( 1 );

	const handlePageChange = ( page: number ) => {
		setCurrentPage( page );
		setMaxVisited( prev => Math.max( prev, page ) );
	};

	const hasNextPage = true; // Simulate always having a next page
	const maxReachablePage = hasNextPage ? maxVisited + 1 : maxVisited;

	return (
		<Pagination
			currentPage={ currentPage }
			itemsPerPage={ itemsPerPage }
			onPageChange={ handlePageChange }
			onItemsPerPageChange={ size => {
				setItemsPerPage( size );
				setCurrentPage( 1 );
				setMaxVisited( 1 );
			} }
			hasNextPage={ hasNextPage }
			maxReachablePage={ maxReachablePage }
			displayItemsPerPageSelector
		>
			<Flex sx={ { justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' } }>
				<Badge variant="gold" sx={ { mr: 2 } }>
					DEBUG
				</Badge>
				<Text>
					Page { currentPage } — max reachable: { maxReachablePage }
				</Text>
			</Flex>
		</Pagination>
	);
};

export const OpenEndedCursorBased: Story = {
	render: () => <CursorBasedPaginationWithState />,
};

export const OpenEnded: Story = {
	render: () => <OpenEndedPaginationWithState />,
};

export const OpenEndedCompact: Story = {
	render: () => <OpenEndedPaginationWithState variant="compact" />,
};

export const OpenEndedLastPage: Story = {
	render: () => <OpenEndedPaginationWithState hasNextPage={ false } initialPage={ 15 } />,
};

const arrowsPageTokens = [ 'start', 'abc123', 'def456', 'ghi789', 'jkl012', 'end' ];

const ArrowsPaginationWithState = ( {
	initialHasPreviousPage = false,
	initialHasNextPage = true,
	displayItemsPerPageSelector = false,
}: {
	initialHasPreviousPage?: boolean;
	initialHasNextPage?: boolean;
	displayItemsPerPageSelector?: boolean;
} ) => {
	const [ index, setIndex ] = useState( initialHasPreviousPage ? 2 : 0 );
	const [ itemsPerPage, setItemsPerPage ] = useState( 20 );

	const hasPreviousPage = index > 0;
	const hasNextPage = initialHasNextPage && index < arrowsPageTokens.length - 1;

	return (
		<Pagination
			variant="arrows"
			hasNextPage={ hasNextPage }
			hasPreviousPage={ hasPreviousPage }
			nextParam={
				hasNextPage ? { param: 'after', value: arrowsPageTokens[ index + 1 ] } : undefined
			}
			previousParam={
				hasPreviousPage ? { param: 'before', value: arrowsPageTokens[ index ] } : undefined
			}
			onNavigate={ param => {
				if ( param === 'after' ) {
					setIndex( i => i + 1 );
				}
				if ( param === 'before' ) {
					setIndex( i => i - 1 );
				}
			} }
			displayItemsPerPageSelector={ displayItemsPerPageSelector }
			itemsPerPage={ displayItemsPerPageSelector ? itemsPerPage : undefined }
			onItemsPerPageChange={
				displayItemsPerPageSelector
					? size => {
							setItemsPerPage( size );
							setIndex( 0 );
					  }
					: undefined
			}
		>
			<Flex sx={ { justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' } }>
				<Badge variant="gold" sx={ { mr: 2 } }>
					DEBUG
				</Badge>
				<Text>
					Index: { index } — value: { arrowsPageTokens[ index ] }
				</Text>
			</Flex>
		</Pagination>
	);
};

export const Arrows: Story = {
	render: () => <ArrowsPaginationWithState />,
};
