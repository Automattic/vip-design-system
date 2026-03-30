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

export const OpenEnded: Story = {
	render: () => <OpenEndedPaginationWithState />,
};

export const OpenEndedCompact: Story = {
	render: () => <OpenEndedPaginationWithState variant="compact" />,
};

export const OpenEndedLastPage: Story = {
	render: () => <OpenEndedPaginationWithState hasNextPage={ false } initialPage={ 15 } />,
};
