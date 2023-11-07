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

export default {
	title: 'Accordion',
	component: Accordion,
};

const ExampleContent = () => (
	<Box>
		<p sx={ { mt: 0 } }>Add your key team members to the VIP Dashboard.</p>
		<p>Add developers to GitHub.</p>
		<p sx={ { mb: 0 } }>Add content editors and developers to WordPress admin.</p>
	</Box>
);

const ExampleAccordion = () => (
	<Accordion.Root defaultValue="teamPermissions" sx={ { width: '250px' } }>
		<Accordion.Item value="teamPermissions">
			<Accordion.TriggerWithIcon icon={ <RiUserAddLine /> }>
				Team & Permissions
			</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="addContentMedia">
			<Accordion.TriggerWithIcon icon={ <BiBookContent /> }>
				Add Content & Media
			</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="addCode">
			<Accordion.TriggerWithIcon icon={ <RiCodeSSlashFill /> }>Add Code</Accordion.TriggerWithIcon>
			<Accordion.Content>
				<ExampleContent />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
);

export const Default = () => <ExampleAccordion />;

export const WithLargeText = () => (
	<Box sx={ { '.vip-heading-component > button': { fontSize: 4 } } }>
		<ExampleAccordion />
	</Box>
);
