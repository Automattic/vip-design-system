/** @jsxImportSource theme-ui */

import React, { Ref, forwardRef } from 'react';
import classNames from 'classnames';

import { VIP_TOOLBAR } from './index';
import { ThemeUIStyleObject } from 'theme-ui';
import { Flex } from '..';

export type ToolbarVariant = 'primary';

export interface ToolbarProps {
	className?: string;
	sx?: ThemeUIStyleObject;
	children?: React.ReactNode;
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
	( { className, sx = {}, children }: ToolbarProps, ref: Ref< HTMLElement > ) => (
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
				...sx,
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
