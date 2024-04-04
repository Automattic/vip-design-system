/** @jsxImportSource theme-ui */

import { MobileMenu, MobileMenuTrigger, MobileMenuWrapper } from './MobileMenu';
import { Flex, NavItem } from '..';
import { CustomLink } from '../utils/stories/CustomLink';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Navigation/MobileMenu',
	component: MobileMenu,
	parameters: {
		docs: {
			description: {
				component: `
The MobileMenu component is a navigation component that is hidden by default and can be toggled open and closed. It opens a panel that can contain any content. The base of this component is a Drawer.

## Guidance

### When to use the Drawer component

- Use the MobileMenu component to displaying a drawer with mobile content.

### When to consider something else

- If you need something that is not a menu on a mobile view, consider using another component.

## Accessibility Considerations guidance

- The MobileMenu is based on the Drawer component and inherits all of its accessibility considerations.

## Using the component

- Look at the examples below to see how the MobileMenu component is used.
- You can use the \`toolbarItems\` prop to pass the content that will be in the header
- You can pass \`display\` prop to the MobileMenuTrigger to control the display of the trigger. The array must match the ThemeUI breakpoints.

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof MobileMenu >;

export const Default: Story = {
	render: () => (
		<>
			<MobileMenuWrapper>
				<MobileMenuTrigger label="Menu" variant="primary" display={ [ 'flex', 'flex', 'flex' ] } />
				<MobileMenu
					toolbarItems={
						<>
							<NavItem.MenuInverse href="/apps" active as={ CustomLink }>
								My Applications
							</NavItem.MenuInverse>

							<NavItem.MenuInverse href="/orgs" as={ CustomLink }>
								My Organizations
							</NavItem.MenuInverse>
						</>
					}
				>
					<Flex
						sx={ {
							flex: 1,
							backgroundColor: 'layer.1',
							height: 'max-content',
							px: 4,
						} }
					>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor tellus tortor,
							sed tempus mauris bibendum sit amet. Aliquam et purus faucibus, pretium quam ut,
							dictum dui. Sed laoreet hendrerit sapien. Ut sed augue at orci bibendum convallis.
							Vestibulum non ultricies lectus. Nunc massa metus, ornare eu cursus vitae, cursus ac
							velit. Praesent mattis dolor a turpis sagittis varius. Phasellus id libero a augue
							lacinia fringilla. Cras euismod justo sit amet urna dignissim accumsan. Vestibulum
							orci nisl, cursus ac suscipit quis, fermentum vitae tortor. Duis consectetur diam sit
							amet rhoncus posuere. Duis sollicitudin commodo blandit. Praesent volutpat quam at
							molestie gravida. Aliquam a lectus eget mauris mattis tincidunt a et nulla.
							Pellentesque mollis turpis vitae ex luctus, non lacinia ex rutrum. Sed consectetur
							tortor diam, vitae volutpat tortor ornare at. Donec laoreet aliquam sollicitudin. In
							pulvinar odio nec nisl ornare cursus. Aenean at augue sodales, pulvinar nulla sed,
							sagittis dui. Suspendisse eu justo ac ligula tincidunt venenatis id et massa. Ut
							luctus, turpis in vestibulum interdum, sem nulla rhoncus leo, et dapibus ligula enim
							at odio. Fusce lorem risus, imperdiet eget dui eget, viverra blandit nisl. Etiam
							scelerisque massa eu urna auctor convallis vitae vitae orci. Sed at dui et leo maximus
							varius. Nulla gravida nisl quis sodales interdum. Donec scelerisque leo id felis
							vestibulum iaculis. Vivamus sit amet convallis eros. Proin maximus massa ac tortor
							pellentesque, vel feugiat libero elementum. Proin mattis arcu facilisis est pulvinar,
							sed suscipit enim dictum. Sed semper mollis rhoncus. Vivamus faucibus fermentum magna
							in tincidunt. Quisque tincidunt, massa eu placerat efficitur, diam neque lobortis
							magna, ut accumsan urna ligula id urna. Donec vitae consequat libero, luctus cursus
							ipsum. Nam efficitur, felis eu commodo dictum, ex magna venenatis orci, nec feugiat
							nisi urna vel urna. Fusce tristique ultricies accumsan. Maecenas quis ullamcorper
							erat. Donec rhoncus risus magna, eu blandit enim commodo vel. Vestibulum volutpat,
							nulla sit amet porttitor congue, urna elit iaculis mi, eu venenatis nibh diam a arcu.
							Mauris pharetra tincidunt odio non mollis. Praesent suscipit et lectus id mattis.
							Maecenas vitae posuere nunc, at blandit velit. Nulla placerat vehicula nisi sed
							commodo. Proin tempus dui sed ante sollicitudin, at vehicula erat suscipit. Maecenas
							rutrum venenatis quam non fermentum. Aliquam vitae dolor tellus. Nulla in metus nec
							neque condimentum eleifend. Integer et purus sollicitudin, vestibulum ligula sit amet,
							viverra urna. Vestibulum mattis posuere eros sed euismod. Aenean ultrices dolor nibh,
							at posuere turpis lobortis vitae.
						</p>
					</Flex>
				</MobileMenu>
			</MobileMenuWrapper>
		</>
	),
};
