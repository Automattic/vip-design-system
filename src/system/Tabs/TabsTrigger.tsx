/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames, { Argument } from 'classnames';
import React from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */

interface ThemeProps extends Theme {
	outline?: Record< string, string >;
}

export interface TabsTriggerProps {
	/** Additional CSS class name(s) to apply to the trigger button. */
	className?: Argument;
	/** Unique identifier that associates this trigger with a TabsContent panel. */
	value: string;
	/**
	 * Whether the tab trigger is disabled and cannot be activated.
	 * @default false
	 */
	disabled?: boolean;
	/** The label content rendered inside the trigger button. */
	children: React.ReactNode;
}

const styles: ThemeUIStyleObject = {
	cursor: 'pointer',
	background: 'none',
	mr: 3,
	fontSize: 2,
	px: 0,
	pb: 3,
	border: 'none',
	color: 'heading',
	'&[data-state="active"]': {
		color: 'link',
		fontWeight: 'regular',
		position: 'relative',
		'&::after': {
			position: 'absolute',
			bottom: 0,
			display: 'block',
			width: '100%',
			content: '""',
			height: '0.125rem',
			backgroundColor: 'link',
		},
	},
	'&:disabled': {
		color: 'muted',
	},
	':hover': { fontWeight: 'regular', color: 'heading' },
	'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
};

/**
 * TabsTrigger — A button that activates its associated TabsContent panel.
 */
const TabsTrigger = React.forwardRef< HTMLButtonElement, TabsTriggerProps >(
	( { value, disabled = false, children, className = null }, forwardRef ) => (
		<TabsPrimitive.TabsTrigger
			className={ classNames( 'vip-tabs-trigger', `vip-tabs-trigger-${ value }`, className ) }
			value={ value }
			disabled={ disabled }
			sx={ {
				...styles,
			} }
			ref={ forwardRef }
		>
			{ children }
		</TabsPrimitive.TabsTrigger>
	)
);

TabsTrigger.displayName = 'TabsTrigger';
export { TabsTrigger };
