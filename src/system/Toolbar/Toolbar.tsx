/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';

import { VIP_TOOLBAR } from './index';
import { Flex } from '..';

export type ToolbarVariant = 'primary';

export interface ToolbarProps {
	className?: string;
	children: React.ReactNode;
}

const Toolbar = forwardRef< HTMLElement, ToolbarProps >(
	( { className, children }: ToolbarProps, ref: Ref< HTMLElement > ) => (
		<Flex
			ref={ ref }
			className={ classNames( VIP_TOOLBAR, className ) }
			as="header"
			role="banner"
			sx={ {
				display: 'flex',
				height: [ 56, null, null, 64 ],
				backgroundColor: 'toolbar.background',
				flexDirection: 'row',
				alignItems: 'center',
				px: [ 4, 4, 5 ],
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
