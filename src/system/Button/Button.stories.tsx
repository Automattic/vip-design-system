/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { BiCalendarHeart } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { Button, ButtonVariant, Table, TableCell, TableRow } from '..';
import ScreenReaderText from '../ScreenReaderText';

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		children: {},
		disabled: {
			control: { type: 'boolean' },
		},
		danger: {
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
	<div>
		<h3>Default</h3>
		<Table>
			<TableRow>
				<TableCell head>Variant</TableCell>
				<TableCell head>Primary</TableCell>
				<TableCell head>Secondary</TableCell>
				<TableCell head>Tertiary</TableCell>
				<TableCell head>Ghost</TableCell>
				<TableCell head>Display</TableCell>
				<TableCell head>Icon</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Default</TableCell>
				<TableCell>
					<Button { ...args }>Primary</Button>
				</TableCell>
				<TableCell>
					<Button variant="secondary" { ...args }>
						Secondary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="tertiary" { ...args }>
						Tertiary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="ghost" { ...args }>
						Ghost
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="display" { ...args }>
						Display
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="icon" type="button" { ...args }>
						<BiCalendarHeart size={ 24 } />
						<ScreenReaderText>domain.com</ScreenReaderText>
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Disabled</TableCell>
				<TableCell>
					<Button variant="primary" disabled { ...args }>
						Primary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="secondary" disabled={ true } { ...args }>
						Secondary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="tertiary" disabled { ...args }>
						Tertiary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="ghost" disabled { ...args }>
						Ghost
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="display" disabled { ...args }>
						Display
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="icon" type="button" disabled { ...args }>
						<BiCalendarHeart size={ 24 } />
						<ScreenReaderText>domain.com</ScreenReaderText>
					</Button>
				</TableCell>
			</TableRow>
		</Table>

		<div sx={ { mt: 3 } }>
			<Button variant="secondary" href="https://google/com" { ...args } full>
				Button with full width
			</Button>
		</div>

		<div sx={ { mt: 3, display: 'flex' } }>
			<Button variant="secondary" href="https://google/com" { ...args } grow>
				Button with grow width
			</Button>
		</div>

		<h3>Danger</h3>
		<Table>
			<TableRow>
				<TableCell head>Variant</TableCell>
				<TableCell head>Primary</TableCell>
				<TableCell head>Secondary</TableCell>
				<TableCell head>Ghost</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Default</TableCell>
				<TableCell>
					<Button danger { ...args }>
						Primary
					</Button>
				</TableCell>
				<TableCell>
					<Button danger variant="secondary" { ...args }>
						Secondary
					</Button>
				</TableCell>
				<TableCell>
					<Button danger variant="ghost" { ...args }>
						Ghost
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Disabled</TableCell>
				<TableCell>
					<Button variant="primary" danger disabled { ...args }>
						Primary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="secondary" danger disabled { ...args }>
						Secondary
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="ghost" disabled { ...args }>
						Ghost
					</Button>
				</TableCell>
			</TableRow>
		</Table>
	</div>
);

const PreferAriaDisabledTemplate = args => (
	<div>
		<Button { ...args } disabled preferAriaDisabled>
			Primary
		</Button>
	</div>
);

export const Default = Template.bind( {} );
export const PreferAriaDisabled = PreferAriaDisabledTemplate.bind( {} );
