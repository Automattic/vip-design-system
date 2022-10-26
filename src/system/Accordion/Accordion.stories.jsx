/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { RiUserAddLine, RiCodeSSlashFill } from 'react-icons/ri';
import { BiBookContent } from 'react-icons/bi';
/**
 * Internal dependencies
 */
import { Box, Accordion } from '..';

export default {
	title: 'Accordion',
	component: Accordion,
};

export const Default = () => (
	<Box>
		<Accordion.Root defaultValue="teamPermissions" sx={ { width: '400px' } }>
			<Accordion.Item value="teamPermissions">
				<Accordion.Trigger>
					<RiUserAddLine sx={ { color: theme => theme.colors.grey[ '70' ], fontSize: 20 } } />
					Team & Permissions
				</Accordion.Trigger>
				<Accordion.Content>
					<p>Add your key team members to the VIP Dashboard.</p>
					<p>Add developers to GitHub.</p>
					<p>Add content editors and developers to WordPress admin.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="addContentMedia">
				<Accordion.Trigger>
					<BiBookContent sx={ { color: theme => theme.colors.grey[ '70' ], fontSize: 20 } } />
					Add Content & Media
				</Accordion.Trigger>
				<Accordion.Content>
					<p>Add your key team members to the VIP Dashboard.</p>
					<p>Add developers to GitHub.</p>
					<p>Add content editors and developers to WordPress admin.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="addCode">
				<Accordion.Trigger>
					<RiCodeSSlashFill sx={ { color: theme => theme.colors.grey[ '70' ], fontSize: 20 } } />
					Add Code
				</Accordion.Trigger>
				<Accordion.Content>
					<p>Add your key team members to the VIP Dashboard.</p>
					<p>Add developers to GitHub.</p>
					<p>Add content editors and developers to WordPress admin.</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Box>
);
