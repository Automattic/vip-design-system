/**
 * External dependencies
 */
import { Link } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Toolbar } from '.';
import { Text, Avatar, Nav, NavItem } from '../../system';
import ScreenReaderText from '../ScreenReaderText';

import type { StoryObj } from '@storybook/react';

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
				<Nav.Toolbar label="Main">
					<NavItem.Toolbar active href="https://googles.com">
						My Applications
					</NavItem.Toolbar>
					<NavItem.Toolbar href="https://google.com">My Organization</NavItem.Toolbar>
				</Nav.Toolbar>

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
				<Nav.Toolbar label="Main" />
			</Toolbar.Primary>
		</>
	),
};

const CustomLink = props => <Link { ...props } href="https://google.com" />;

export const VIPDashboardLike: Story = {
	render: () => (
		<>
			<Toolbar.Primary>
				{ /* Next.js customization of this link */ }
				<Toolbar.Logo as={ CustomLink } />

				<Nav.Toolbar label="Main">
					<NavItem.Toolbar href="https://googles.com">My Applications</NavItem.Toolbar>
					{ /* Example below if you have Next.js <Link /> */ }
					<NavItem.Toolbar active href="https://google.com" asChild>
						<a href="https://google.com">Custom Link</a>
					</NavItem.Toolbar>
				</Nav.Toolbar>

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
