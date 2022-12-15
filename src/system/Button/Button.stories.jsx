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
	as: 'a',
	href: 'https://www.google.com',
};
