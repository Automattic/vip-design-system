/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';

/**
 * Internal dependencies
 */
import { VIP_TOOLBAR } from './index';
import { Flex } from '..';

export type ToolbarVariant = 'primary';

export interface ToolbarProps {
	className?: string;
	children: React.ReactNode;
}

const HEADER_HEIGHT = 56;

const responsiveStyles = {
	'@media screen and (min-width: 567px)': {
		px: 5,
	},
	'@media screen and (min-width: 1049px)': {
		height: 64,
	},
};

const Toolbar = forwardRef< HTMLElement, ToolbarProps >(
	( { className, children }: ToolbarProps, ref: Ref< HTMLElement > ) => (
		<Flex
			ref={ ref }
			className={ classNames( VIP_TOOLBAR, className ) }
			as="header"
			role="banner"
			sx={ {
				display: 'flex',
				height: HEADER_HEIGHT,
				backgroundColor: 'toolbar.background',
				flexDirection: 'row',
				alignItems: 'center',
				px: 4,
				...responsiveStyles,
			} }
		>
			{ children }
		</Flex>
	)
);

// Variant: Primary (TODO)
export const ToolbarPrimary = forwardRef< HTMLElement, ToolbarProps >(
	( props: ToolbarProps, ref: Ref< HTMLElement > ) => <Toolbar { ...props } ref={ ref } />
);
