/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Text, Dropdown, Button, Avatar } from '../../system';
import { Toolbar } from '.';
import ScreenReaderText from '../ScreenReaderText';

export default {
	title: 'Navigation/Toolbar',
	component: Toolbar,
	parameters: {
		docs: {
			description: {
				component: `
A description of the Toolbar component.

## Guidance

### When to use the Toolbar component

- TBD

### When to consider something else

- TBD

## Accessibility Considerations guidance

- TBD
### Usability guidance

- TBD

-------

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Toolbar >;

export const Default: Story = {
	render: () => (
		<>
			<Toolbar.Primary>
				<Toolbar.Logo href="https://wpvip.com/" />
				<Toolbar.MainNav label="Main">
					<a aria-current="page" href="/">
						My Applications
					</a>

					<a href="/orgs/1">My Organization</a>
				</Toolbar.MainNav>

				<Toolbar.UtilNav>
					<Text sx={ { color: 'toolbar.text.default', mb: 0 } }>Utility</Text>
				</Toolbar.UtilNav>
			</Toolbar.Primary>
		</>
	),
};

export const RawBar: Story = {
	render: () => (
		<>
			<Toolbar.Primary>
				<Toolbar.Logo href="https://wpvip.com/" />
				<Toolbar.MainNav label="Main" />
			</Toolbar.Primary>
		</>
	),
};

export const VIPDashboardLike: Story = {
	render: () => (
		<>
			<Toolbar.Primary>
				<Toolbar.Logo href="https://wpvip.com/" />

				<Toolbar.MainNav label="Main">
					<a href="/">My Applications</a>

					<a aria-current="page" href="/orgs/1">
						My Organization
					</a>
				</Toolbar.MainNav>

				<Toolbar.UtilNav>
					<Toolbar.Separator />

					<a href="/">
						<Avatar isVIP name="John Doe" src="https://i.pravatar.cc/80" />
						<ScreenReaderText>John Doe</ScreenReaderText>
					</a>
				</Toolbar.UtilNav>
			</Toolbar.Primary>
		</>
	),
};
