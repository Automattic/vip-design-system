/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { Button } from '..';

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		children: {
			table: {
				type: { summary: 'node' },
			},
			control: { type: 'text' },
			type: { required: true },
		},
		variant: {
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'primary' },
			},
			control: {
				type: 'select',
				options: [ 'primary', 'secondary', 'text' ],
			},
		},
	},
};

const Template = args => <Button { ...args }>Submit</Button>;

export const Default = Template.bind( {} );

export const Link = Template.bind( {} );
Link.args = {
	variant: 'text',
	as: 'a',
	href: 'https://www.google.com',
};

export const WithOnClick = Template.bind( {} );
Link.args = {
	onClick: () => {
		// eslint-disable-next-line no-undef
		alert( 'Clicked' );
	},
};
