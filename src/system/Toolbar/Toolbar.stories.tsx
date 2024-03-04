import { Toolbar } from '.';
import { Text, Avatar, Nav, NavItem } from '../../system';
import ScreenReaderText from '../ScreenReaderText';
import { CustomLink } from '../utils/stories/CustomLink';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Navigation/Toolbar',
	component: Toolbar,
	parameters: {
		docs: {
			description: {
				component: `
The Toolbar component provides a way to users reach the main sections of a website, and also provides a way to users identify where they are. It is usually placed in a prominent position at the top of a site, or anywhere that needs a linked-navigation.

## Guidance

### When to use the Toolbar component

- When you need a main Header, and a navigation for your website.

### When to consider something else

- If you need a navigation, but not a header for your page, use the [Nav](/docs/navigation-nav--docs) component instead.

## Accessibility Considerations guidance

- This component uses the \`header\` as the main landmark HTML element
- The Nav.Toolbar uses the same accessibility features from the Nav component.

## Using the component

- It's not recommended to have two Toolbars on a page. If you use two instances of this component, you will probably get landmarks errors in your accessibility tests.

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
					<Text sx={ { color: 'toolbar.text.default', mb: 0 } }>Utility Item</Text>
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

export const VIPDashboardLike: Story = {
	render: () => (
		<>
			<Toolbar.Primary>
				{ /* Next.js customization of this link */ }
				<Toolbar.Logo as={ CustomLink } />

				<Nav.Toolbar label="Main">
					<NavItem.Toolbar href="https://googles.com">My Applications</NavItem.Toolbar>
					{ /* Example below if you have Next.js <Link /> */ }
					<NavItem.Toolbar active href="https://google.com" as={ CustomLink }>
						Custom Link
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
