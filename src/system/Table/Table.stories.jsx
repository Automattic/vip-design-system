/**
 * Internal dependencies
 */
import { Table, TableRow, Flex, Heading, Text, TableCell } from '..';

export default {
	title: 'Table',
	component: Table,
};

export const Default = () => (
	<Table>
		<thead>
			<TableRow head cells={ [ 'User', 'Command', 'Duration', 'Time' ] } />
		</thead>
		<tbody>
			<TableRow
				cells={ [
					<Flex sx={ { alignItems: 'center' } } key="user">
						<Heading variant="h4" sx={ { mb: 0 } }>
							kwaves
						</Heading>
					</Flex>,
					<Heading
						variant="h4"
						key="command"
						sx={ { mb: 0, display: 'flex', alignItems: 'center' } }
					>
						wp rewrite flush
					</Heading>,
					<Text sx={ { mb: 0 } } key="duration">
						2s
					</Text>,
					<Text sx={ { mb: 0, color: 'muted' } } key="time">
						11th Mar 2020, 16:49:22
					</Text>,
				] }
			/>
			<TableRow>
				<TableCell sx={ { backgroundColor: 'gray' } }>
					<Flex sx={ { alignItems: 'center' } } key="user">
						<Heading variant="h4" sx={ { mb: 0 } }>
							simon
						</Heading>
					</Flex>
				</TableCell>
				<TableCell>
					<Heading
						variant="h4"
						key="command"
						sx={ { mb: 0, display: 'flex', alignItems: 'center' } }
					>
						wp posts list
					</Heading>
				</TableCell>
				<TableCell>
					<Text sx={ { mb: 0 } } key="duration">
						3s
					</Text>
				</TableCell>
				<TableCell>
					<Text sx={ { mb: 0, color: 'muted' } } key="time">
						3rd May 2021, 13:22:13
					</Text>
				</TableCell>
			</TableRow>
		</tbody>
	</Table>
);
