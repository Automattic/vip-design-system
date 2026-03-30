/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */
import { Table, TableRow, Flex, Text, TableCell } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	title: 'Table',
	component: Table,
};

type Story = StoryObj< typeof Table >;

export const Primary: Story = {
	args: {
		caption: 'Example Table',
	},
	render: args => (
		<Table { ...args }>
			<thead>
				<TableRow head cells={ [ 'Name', 'Value', 'Status' ] } />
			</thead>
			<tbody>
				<TableRow cells={ [ 'Item A', '100', 'Active' ] } />
				<TableRow cells={ [ 'Item B', '200', 'Inactive' ] } />
			</tbody>
		</Table>
	),
};

interface ExampleTableProps {
	caption: string;
}

const ExampleTable = ( { caption }: ExampleTableProps ) => (
	<Table caption={ caption }>
		<thead>
			<TableRow head cells={ [ 'User', 'Command', 'Duration', 'Time' ] } />
		</thead>
		<tbody>
			<TableRow
				cells={ [
					<Flex sx={ { alignItems: 'center' } } key="user">
						kwaves
					</Flex>,
					<Flex key="command">wp rewrite flush</Flex>,
					<Text sx={ { mb: 0 } } key="duration">
						2s
					</Text>,
					<Text key="time">11th Mar 2020, 16:49:22</Text>,
				] }
			/>
			<TableRow>
				<TableCell>
					<Flex sx={ { alignItems: 'center' } } key="user">
						simon
					</Flex>
				</TableCell>
				<TableCell>wp posts list</TableCell>
				<TableCell>
					<Text sx={ { mb: 0 } } key="duration">
						3s
					</Text>
				</TableCell>
				<TableCell>
					<Text key="time">3rd May 2021, 13:22:13</Text>
				</TableCell>
			</TableRow>
		</tbody>
	</Table>
);

export const Default: Story = {
	render: () => <ExampleTable caption="Example Table" />,
};

export const WithHorizontalScroll: Story = {
	render: () => (
		<div sx={ { maxWidth: '800px' } }>
			<ExampleTable caption="Horizontal Scroll Example" />
		</div>
	),
};
