/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogClose } from '../NewDialog/DialogClose';
import { DialogTitle } from '../NewDialog/DialogTitle';

/** Props for the Drawer.Content sub-component. */
export interface DrawerContentProps extends DialogPrimitive.DialogContentProps, DrawerProps {}

/** A value that can be a single number/string or a responsive array. */
export type responsiveProp = number | string | number[] | string[];

/** Responsive dimension overrides for the drawer panel. */
export type responsiveDimensionsProp = {
	/** Width of the drawer panel. */
	width?: responsiveProp;
	/** Height of the drawer panel. */
	height?: responsiveProp;
	/** Minimum width of the drawer panel. */
	minWidth?: responsiveProp;
	/** Minimum height of the drawer panel. */
	minHeight?: responsiveProp;
	/** Maximum width of the drawer panel. */
	maxWidth?: responsiveProp;
	/** Maximum height of the drawer panel. */
	maxHeight?: responsiveProp;
};

/** Props for the main Drawer component. */
export interface DrawerProps extends DialogPrimitive.DialogProps {
	/** The content rendered inside the drawer panel. */
	children?: ReactNode;
	/** The element that opens the drawer when clicked. */
	trigger?: ReactNode;
	/** Accessible label for the drawer dialog. */
	label?: string;
	/**
	 * The side or position from which the drawer slides in.
	 * @default 'left'
	 */
	variant?: 'top' | 'right' | 'bottom' | 'left' | 'left-header' | 'right-header';
	/** Responsive width/height dimensions for the drawer panel. */
	dimensions?: responsiveDimensionsProp;
	/** Custom render function for the close button. Returns null to hide it. */
	renderClose?: () => JSX.Element | null;
}

/** The panel content area of the Drawer, rendered inside a portal with an overlay. */
export const Content = React.forwardRef< HTMLDivElement, DrawerContentProps >(
	( { children, variant = 'left', label, dimensions, renderClose, ...rest }, forwardedRef ) => (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay sx={ drawerOverlayStyles( variant ) } />
			<DialogPrimitive.Content
				{ ...rest }
				sx={ drawerContentStyles( variant, dimensions ) }
				ref={ forwardedRef }
			>
				<DialogTitle title={ label } hidden />
				{ renderClose ? renderClose() : <DialogClose /> }
				{ children }
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	)
);

/**
 * A slide-out panel component built on Radix Dialog.
 * Supports multiple positions and responsive dimensions.
 */
export const Drawer = React.forwardRef< HTMLDivElement, DrawerProps >(
	( { children, dimensions, variant = 'left', trigger, label, ...rest }, forwardedRef ) => (
		<Root trigger={ trigger }>
			<Content
				dimensions={ dimensions }
				variant={ variant }
				label={ label }
				ref={ forwardedRef }
				{ ...rest }
			>
				{ children }
			</Content>
		</Root>
	)
);

/** Props for the Drawer.Root sub-component. */
export interface DrawerRootProps {
	/** The drawer content and any additional elements. */
	children: ReactNode;
	/** The element that opens the drawer when clicked. */
	trigger?: ReactNode;
}

/** Props for the Drawer.Trigger sub-component. */
export interface DrawerTriggerProps {
	/** The clickable element that opens the drawer. */
	children: ReactNode;
}

/** Wraps the element that triggers opening the drawer. */
export const Trigger = ( { children }: DrawerTriggerProps ) => (
	<DialogPrimitive.Trigger asChild>{ children }</DialogPrimitive.Trigger>
);

/** The root wrapper that provides the dialog context for the drawer. */
export const Root = ( { children, trigger }: DrawerRootProps ) => (
	<DialogPrimitive.Root>
		{ trigger && <Trigger>{ trigger }</Trigger> }
		{ children }
	</DialogPrimitive.Root>
);
