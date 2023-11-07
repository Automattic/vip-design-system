/** @jsxImportSource theme-ui */

import React, { Ref, forwardRef } from 'react';

export type ToolbarMainNavProps = {
	label?: string;
	children?: React.ReactNode;
};

const defaultLinkStyle = {
	color: 'toolbar.text.default',
	textDecoration: 'none',
	borderBottom: 'none',
	display: 'inline-flex',
	alignItems: 'center',
	fontWeight: 500,
	'&:hover': {
		color: 'toolbar.text.hover',
	},
};

// const responsiveStyles = {
// 	'@media screen and (min-width: 567px)': {
// 		display: 'flex',
// 	},
// };

export const ToolbarMainNav = forwardRef< HTMLElement, ToolbarMainNavProps >(
	( { label = 'Main', children }: ToolbarMainNavProps, ref: Ref< HTMLElement > ) => (
		<nav
			aria-label={ label }
			ref={ ref }
			sx={ {
				display: [ 'flex', 'none' ],
				height: '100%',
				ml: 0,
				'a[aria-current="page"]': {
					color: 'toolbar.text.default',
				},
				'a[aria-current="page"]:before': {
					display: 'block',
					content: '""',
					width: '100%',
					height: 3,
					overflow: 'hidden',
					backgroundColor: 'borders.accent',
					position: 'absolute',
					top: 0,
				},
				a: {
					...defaultLinkStyle,
					position: 'relative',
					ml: 3,
					mr: 3,
				},
			} }
		>
			{ children }
		</nav>
	)
);
