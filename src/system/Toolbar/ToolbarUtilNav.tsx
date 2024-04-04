/** @jsxImportSource theme-ui */

import React, { Ref, forwardRef } from 'react';

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

export const ToolbarUtilNavSeparator = () => (
	<span
		aria-hidden="true"
		sx={ {
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
