import React from 'react';

import { action } from '@storybook/addon-actions';
import { Table, TableRow, Flex, Heading, Text } from '..';

export default {
	title: 'Table',
	component: Table,
};

export const Default = () => (
	<Table>
		<thead>
			<TableRow head cells={[ 'User', 'Command', 'Duration', 'Time' ]} />
		</thead>
		<tbody>
			<TableRow
				cells={[
					<Flex sx={{ alignItems: 'center' }}>
						<Heading variant="h4" sx={{ mb: 0 }}>
							kwaves
						</Heading>
					</Flex>,
					<Heading
						variant="h4"
						sx={{ mb: 0, display: 'flex', alignItems: 'center' }}
					>
						wp rewrite flush
					</Heading>,
					<Text sx={{ mb: 0 }}>2s</Text>,
					<Text sx={{ mb: 0, color: 'muted' }}>
						11th Mar 2020, 16:49:22
					</Text>,
				]}
			/>
		</tbody>
	</Table>
);
