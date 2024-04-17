/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { BiCalendarHeart } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { Button, ButtonVariant } from '..';
import { Flex } from '../Flex/Flex';
import ScreenReaderText from '../ScreenReaderText';

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		children: {},
		disabled: {
			control: { type: 'boolean' },
		},
		variant: {
			type: 'select',
			options: Object.values( ButtonVariant ),
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
A button draws attention to important actions with a large selectable surface.

## Guidance

### When to use the button component

**Important actions**. Use buttons for the most important actions you want users to take on your site, such as Download, Toggle states or submitting forms.

### When to consider something else

Linking between a site’s pages. Use regular links instead.
If the action is less popular or less important. Less popular or less important actions may be visually styled as links.

## Using the component

- Keep button text short. Button text should be as short as possible with action words that clearly explain what will happen when the button is selected (for example, Download, View, or Sign up).

### Accessibility

- Buttons should display a visible focus state when users tab to them.

- Screen readers handle buttons and links differently. When styling links to look like buttons, remember that screen readers handle links slightly differently than they do buttons. Pressing the Space key triggers a button, but pressing the Enter key triggers a link.

- Icons can be helpful. Consider adding an icon to signal specific actions (Download, Open in a new window, etc).

-------

This documentation is heavily inspired by the [U.S Web Design System (USWDS)](https://designsystem.digital.gov/components/button/#package). We use USWDS as trusted source of truth for accessibility and usability best practices.

## Component Properties
`,
			},
		},
	},
};

const Template = args => (
	<Flex sx={ { gap: 2 } }>
		<Button { ...args }>Primary</Button>

		<Button variant="secondary" sx={ { ml: 2 } } { ...args }>
			Secondary
		</Button>

		<Button variant="tertiary" sx={ { ml: 2 } } { ...args }>
			Tertiary
		</Button>

		<Button variant="ghost" sx={ { ml: 2 } } { ...args }>
			Ghost
		</Button>

		<Button variant="display" sx={ { ml: 2 } } { ...args }>
			Display
		</Button>

		<Button variant="danger" sx={ { ml: 2 } } { ...args }>
			Danger
		</Button>

		<Button variant="primary" disabled={ true } sx={ { ml: 2 } } { ...args }>
			Disabled
		</Button>

		<Button variant="text" sx={ { ml: 2 } } as="a" href="https://google/com" { ...args }>
			Button link
		</Button>

		<Button variant="icon" sx={ { ml: 2 } } type="button" { ...args }>
			<BiCalendarHeart size={ 24 } />
			<ScreenReaderText>domain.com</ScreenReaderText>
		</Button>

		<div sx={ { maxWidth: '100px', mt: 3 } }>
			<Button variant="secondary" href="https://google/com" { ...args }>
				Button with constrained width
			</Button>
		</div>
	</Flex>
);

export const Default = Template.bind( {} );
