/**
 * External dependencies
 */
import React from 'react';
import { BiCalendarHeart } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { ButtonSubmit } from '..';
import { variants } from '.';

export default {
	title: 'ButtonSubmit',
	component: ButtonSubmit,
	argTypes: {
		label: { defaultValue: 'Load more items' },
		disabled: {
			control: { type: 'boolean' },
		},
		show: {
			control: { type: 'boolean', default: true },
		},
		variant: {
			type: 'select',
			options: variants,
		},
	},
};

const Template = args => (
	<React.Fragment>
		{ variants.map( v => (
			<ButtonSubmit sx={ { m: 3 } } key={ v } variant={ v } { ...args } />
		) ) }
	</React.Fragment>
);

export const Default = Template.bind( {} );
