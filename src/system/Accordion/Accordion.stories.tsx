/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { BiBookContent } from 'react-icons/bi';
import { RiUserAddLine, RiCodeSSlashFill } from 'react-icons/ri';

/**
 * Internal dependencies
 */
import { Box, Accordion } from '..';

import type { RootProps } from './Accordion';
import type { StoryObj } from '@storybook/react-vite';

type Story = StoryObj< typeof Accordion.Root >;

export default {
	title: 'Accordion',
	component: Accordion.Root,
	subcomponents: {
		'Accordion.Item': Accordion.Item,
		'Accordion.Trigger': Accordion.Trigger,
		'Accordion.TriggerWithIcon': Accordion.TriggerWithIcon,
		'Accordion.Content': Accordion.Content,
	},
};

const ExampleContent = () => (
	<Box>
		<p sx={ { mt: 0 } }>Add your key team members to the VIP Dashboard.</p>
		<p>Add developers to GitHub.</p>
		<p sx={ { mb: 0 } }>Add content editors and developers to WordPress admin.</p>
	</Box>
);

const ExampleAccordion = ( props: Partial< RootProps > ) => (
	<Accordion.Root defaultValue="teamPermissions" sx={ { width: '250px' } } { ...props }>
		<Accordion.Item value="teamPermissions">
			<Accordion.TriggerWithIcon
				icon={ <RiUserAddLine sx={ { color: 'support.accent.success' } } /> }
			>
				Team & Permissions
			</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="addContentMedia">
			<Accordion.TriggerWithIcon
				icon={ <BiBookContent sx={ { color: 'support.accent.success' } } /> }
			>
				Add Content & Media
			</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="addCode">
			<Accordion.TriggerWithIcon
				icon={ <RiCodeSSlashFill sx={ { color: 'support.accent.success' } } /> }
			>
				Add Code
			</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
);

export const Default: Story = {
	args: {
		defaultValue: 'teamPermissions',
	},
	render: args => <ExampleAccordion { ...args } />,
};

export const WithLargeText: Story = {
	args: {
		defaultValue: 'teamPermissions',
	},
	render: args => (
		<Box sx={ { '.vip-heading-component > button': { fontSize: 4 } } }>
			<ExampleAccordion { ...args } />
		</Box>
	),
};
