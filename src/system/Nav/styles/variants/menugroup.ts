import { keyframes } from '@emotion/react';
import { ThemeUIStyleObject } from 'theme-ui';

import { NavProps, NavVariant } from '../../Nav';

export const navItemGroupStyles = (
	orientation: NavProps[ 'orientation' ],
	variant?: NavVariant
): ThemeUIStyleObject => {
	const defaultStyle = {
		li: {
			mb: 1,
		},
		'li:last-of-type': {
			mr: orientation === 'horizontal' ? 0 : undefined,
			mb: orientation === 'vertical' ? 0 : undefined,
		},
	};

	switch ( variant ) {
		case 'menu': {
			return {
				...defaultStyle,
				mr: 0,
				width: '100%',
			};
		}

		default: {
			return defaultStyle;
		}
	}
};

export const navItemGroupTriggerStyles: ThemeUIStyleObject = {
	'svg[data-arrow-indicator]': {
		position: 'absolute',
		right: 3,
		top: 2,
		transform: 'rotate(0deg)',
	},
	'&[data-open]': {
		'svg[data-arrow-indicator]': {
			transform: 'rotate(180deg)',
			transition: 'transform 200ms',
		},
	},
	'&:focus:not(&[data-active]), &:hover:not(&[data-active])': {
		// This will make the trigger button look like a link
		cursor: 'pointer',
		textDecorationLine: 'underline',
		textDecorationThickness: '2px',
	},
};

export const navItemGroupContentUlStyles: ThemeUIStyleObject = {
	m: 0,
	p: 0,
	pl: 3,
	listStyle: 'none',
	pt: 1,
};

const slideDown = keyframes( {
	from: { height: 0 },
	to: { height: 'var(--radix-collapsible-content-height)' },
} );

const slideUp = keyframes( {
	from: { height: 'var(--radix-collapsible-content-height)' },
	to: { height: 0 },
} );

export const navItemGroupContentStyles: ThemeUIStyleObject = {
	overflow: 'hidden',
	'&[data-state="open"]': {
		animation: `${ slideDown } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
	},
	'&[data-state="closed"]': {
		animation: `${ slideUp } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
	},
};
