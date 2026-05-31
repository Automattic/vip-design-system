/** @jsxImportSource theme-ui */

import { useState } from 'react';

/**
 * Internal dependencies
 */
import { SimplePagination } from './SimplePagination';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { Text } from '../Text';

import type { StoryObj, Meta } from '@storybook/react-vite';

const meta: Meta< typeof SimplePagination > = {
	title: 'SimplePagination',
	component: SimplePagination,
	parameters: {
		docs: {
			description: {
				component: `
A pagination control with only previous/next arrow buttons.
Designed for cursor-based pagination APIs with custom param names (e.g., \`after\`/\`before\`).

For page-number based pagination, see \`Pagination\`.

## Component Properties
`,
			},
		},
	},
};

export default meta;

type Story = StoryObj< typeof SimplePagination >;

const pageTokens = [ 'start', 'abc123', 'def456', 'ghi789', 'jkl012', 'end' ];

const SimplePaginationWithState = ( {
	initialIndex = 0,
	displayItemsPerPageSelector = false,
}: {
	initialIndex?: number;
	displayItemsPerPageSelector?: boolean;
} ) => {
	const [ index, setIndex ] = useState( initialIndex );
	const [ itemsPerPage, setItemsPerPage ] = useState( 20 );

	const hasPreviousPage = index > 0;
	const hasNextPage = index < pageTokens.length - 1;

	return (
		<SimplePagination
			hasNextPage={ hasNextPage }
			hasPreviousPage={ hasPreviousPage }
			nextParam={ hasNextPage ? { param: 'after', value: pageTokens[ index + 1 ] } : undefined }
			previousParam={
				hasPreviousPage ? { param: 'before', value: pageTokens[ index ] } : undefined
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
					Index: { index } — token: { pageTokens[ index ] }
				</Text>
			</Flex>
		</SimplePagination>
	);
};

export const Default: Story = {
	render: () => <SimplePaginationWithState />,
};

export const FirstPage: Story = {
	render: () => <SimplePaginationWithState />,
	parameters: {
		docs: {
			description: {
				story: 'On the first page — Previous button is disabled.',
			},
		},
	},
};

export const LastPage: Story = {
	render: () => <SimplePaginationWithState initialIndex={ pageTokens.length - 1 } />,
	parameters: {
		docs: {
			description: {
				story: 'On the last page — Next button is disabled.',
			},
		},
	},
};

export const WithPageSize: Story = {
	render: () => <SimplePaginationWithState displayItemsPerPageSelector />,
	parameters: {
		docs: {
			description: {
				story: 'With an items-per-page selector.',
			},
		},
	},
};
