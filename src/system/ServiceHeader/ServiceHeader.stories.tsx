/**
 * External dependencies
 */
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { ServiceHeader, Button, Dropdown } from '..';

import type { ServiceStatus } from './ServiceHeader';
import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'ServiceHeader',
	component: ServiceHeader,
};

type Story = StoryObj< typeof ServiceHeader >;

const title = 'Performance Monitoring';
const description = 'This service monitors your application environment and reports on it.';

export const Primary: Story = {
	args: {
		title,
		description,
		status: 'enabled',
		message: 'Available on non-production environments only.',
		actions: <Button variant="secondary">Disable</Button>,
	},
};

/** The actions slot takes any number of controls, so a menu can sit beside the primary action. */
export const WithActionsMenu: Story = {
	args: {
		title,
		description,
		status: 'enabled',
		actions: (
			<React.Fragment>
				<Button variant="primary">Open ↗</Button>
				<Dropdown.Root
					contentProps={ { align: 'end', sx: { minWidth: 'auto' } } }
					trigger={
						<Button variant="secondary" sx={ { px: 2 } } aria-label="More actions">
							<BiDotsVerticalRounded aria-hidden="true" size={ 20 } />
						</Button>
					}
				>
					<Dropdown.Item>Disable service</Dropdown.Item>
				</Dropdown.Root>
			</React.Fragment>
		),
	},
};

const statuses: ServiceStatus[] = [
	'loading',
	'unavailable',
	'disabled',
	'enabling',
	'enabled',
	'disabling',
	'error',
];

export const Statuses: Story = {
	render: () => (
		<React.Fragment>
			{ statuses.map( status => (
				<ServiceHeader
					key={ status }
					title={ title }
					description={ description }
					status={ status }
					sx={ { mb: 5 } }
					actions={ <Button variant="secondary">Enable</Button> }
				/>
			) ) }
		</React.Fragment>
	),
};
