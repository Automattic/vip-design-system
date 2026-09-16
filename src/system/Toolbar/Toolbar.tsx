/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref } from 'react';

import { VIP_TOOLBAR } from './index';
import { Flex } from '../Flex/Flex';

export type ToolbarVariant = 'primary';

export interface ToolbarProps {
	/** Additional CSS class name for the toolbar element. */
	className?: string;
	/** Content to display within the toolbar (logo, nav items, actions, etc.). */
	children: React.ReactNode;
	/** Ref forwarded to the underlying header element. */
	ref?: Ref< HTMLElement >;
}

const Toolbar = ( { className, children, ref }: ToolbarProps ) => (
	<Flex
		ref={ ref }
		className={ classNames( VIP_TOOLBAR, className ) }
		as="header"
		role="banner"
		sx={ {
			display: 'flex',
			height: 64,
			backgroundColor: 'toolbar.background',
			flexDirection: 'row',
			alignItems: 'center',
			px: [ 4, 4, 5 ],
		} }
	>
		{ children }
	</Flex>
);

// Variant: Primary (TODO)
/**
 * A horizontal toolbar header bar used as the top-level application banner.
 * Contains the logo, navigation items, and action buttons.
 */
export const ToolbarPrimary = ( { ref, ...props }: ToolbarProps ) => (
	<Toolbar { ...props } ref={ ref } />
);
