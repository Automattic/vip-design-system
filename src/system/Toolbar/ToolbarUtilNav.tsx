/** @jsxImportSource theme-ui */

import React, { Ref, forwardRef } from 'react';
import { Flex } from '..';

export type ToolbarUtilNavProps = {
	children: React.ReactNode;
	label?: string;
};

export const ToolbarUtilNav = forwardRef< HTMLElement, ToolbarUtilNavProps >(
	( { label = 'Utility', children }: ToolbarUtilNavProps, ref: Ref< HTMLElement > ) => (
		<nav
			aria-label={ label }
			ref={ ref }
			sx={ {
				marginLeft: 'auto',
				alignItems: 'center',
				flexDirection: 'row',
				display: 'flex',
				gap: 4,
			} }
		>
			{ children }
		</nav>
	)
);

export const ToolbarIconHolder = ( { children } ) => (
	<Flex
		sx={ {
			width: 38,
			height: 38,
			alignItems: 'center',
			justifyItems: 'center',
			color: 'icon.inverse',
		} }
	>
		{ children }
	</Flex>
);

export const ToolbarUtilNavSeparator = () => (
	<span
		aria-hidden="true"
		sx={ {
			display: [ 'block', 'none', 'none', 'block', 'block' ],
			'&:after': {
				display: 'block',
				backgroundColor: 'borders.inverse',
				width: 1,
				height: 30,
				overflow: 'hidden',
				content: '""',
			},
			position: 'relative',
		} }
	></span>
);
