/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogClose } from '../NewDialog/DialogClose';
import { DialogTitle } from '../NewDialog/DialogTitle';

export interface DrawerContentProps extends DialogPrimitive.DialogContentProps, DrawerProps {}

export type responsiveProp = number | string | number[] | string[];
export type responsiveDimensionsProp = {
	width?: responsiveProp;
	height?: responsiveProp;
	minWidth?: responsiveProp;
	minHeight?: responsiveProp;
	maxWidth?: responsiveProp;
	maxHeight?: responsiveProp;
};

export interface DrawerProps extends DialogPrimitive.DialogProps {
	children?: ReactNode;
	trigger?: ReactNode;
	label?: string;
	variant?: 'top' | 'right' | 'bottom' | 'left' | 'left-header' | 'right-header';
	dimensions?: responsiveDimensionsProp;
	renderClose?: () => JSX.Element | null;
}

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

export interface DrawerRootProps {
	children: ReactNode;
	trigger?: ReactNode;
}

export const Trigger = ( { children } ) => (
	<DialogPrimitive.Trigger asChild>{ children }</DialogPrimitive.Trigger>
);

export const Root = ( { children, trigger }: DrawerRootProps ) => (
	<DialogPrimitive.Root>
		{ trigger && <Trigger>{ trigger }</Trigger> }
		{ children }
	</DialogPrimitive.Root>
);
