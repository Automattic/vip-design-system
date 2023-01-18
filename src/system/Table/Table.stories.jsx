/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Table, TableRow, Flex, Text, TableCell } from '..';

export default {
	title: 'Table',
	component: Table,
};

export const Default = () => (
	<Table caption="Storybook Example">
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
				gbc
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
