/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { BiCalendarHeart } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import ScreenReaderText from '../ScreenReaderText';
import { Button } from '..';
import variants from './variants';

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
			options: variants,
		},
	},
};

const Template = args => (
	<React.Fragment>
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
	</React.Fragment>
);

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
		// eslint-disable-next-line no-alert
		alert( 'Clicked' );
	},
};
