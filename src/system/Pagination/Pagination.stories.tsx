/** @jsxImportSource theme-ui */

import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Pagination } from './Pagination';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { Text } from '../Text';

import type { StoryObj, Meta } from '@storybook/react';

export default {
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
} as Meta< typeof Pagination >;

type Story = StoryObj< typeof Pagination >;

const PaginationWithState = ( {
	initialPage = 1,
	totalItems = 200,
	initialItemsPerPage = 20,
	...props
}: {
	initialPage?: number;
	totalItems?: number;
	initialItemsPerPage?: number;
	variant?: 'full' | 'compact';
	pageSizeOptions?: number[];
} ) => {
	const [ currentPage, setCurrentPage ] = useState( initialPage );
	const [ itemsPerPage, setItemsPerPage ] = useState( initialItemsPerPage );
	const totalPages = Math.ceil( totalItems / itemsPerPage );

	return (
		<>
			<Flex sx={ { justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' } }>
				<Badge variant="gold" sx={ { mr: 2 } }>
					DEBUG
				</Badge>
				<Text>
					Page { currentPage } of { totalPages }
				</Text>
			</Flex>
			<Pagination
				currentPage={ currentPage }
				totalItems={ totalItems }
				totalPages={ totalPages }
				itemsPerPage={ itemsPerPage }
				onPageChange={ setCurrentPage }
				onItemsPerPageChange={ size => {
					setItemsPerPage( size );
					setCurrentPage( 1 );
				} }
				{ ...props }
			/>
		</>
	);
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
