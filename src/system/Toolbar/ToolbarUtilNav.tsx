/** @jsxImportSource theme-ui */
import React, { Ref } from 'react';

import { Flex } from '../Flex/Flex';

export type ToolbarUtilNavProps = {
	/** Navigation items rendered inside the utility nav. */
	children: React.ReactNode;
	/**
	 * Accessible label for the `<nav>` landmark.
	 * @default 'Utility'
	 */
	label?: string;
	/** Ref forwarded to the underlying `<nav>` element. */
	ref?: Ref< HTMLElement >;
};

/** Right-aligned utility navigation area within the Toolbar. */
export const ToolbarUtilNav = ( { label = 'Utility', children, ref }: ToolbarUtilNavProps ) => (
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
);

export const ToolbarIconHolder = ( { children } ) => (
	<Flex
		sx={ {
			width: 38,
			height: 38,
			alignItems: 'center',
			justifyContent: 'center',
			color: 'icon.inverse',
			'&:hover': { color: 'icon.primary' },
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
