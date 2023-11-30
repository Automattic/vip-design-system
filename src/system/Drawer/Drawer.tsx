/** @jsxImportSource theme-ui */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { Ref, forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogCloseDefault } from '../NewDialog/DialogClose';

export interface DrawerContentProps
	extends DialogPrimitive.DialogProps,
		DialogPrimitive.DialogContentProps {
	children?: React.ReactNode;
	variant?: 'top' | 'right' | 'bottom' | 'left' | 'left-header' | 'right-header';
	sx?: ThemeUIStyleObject;
}

const Content = React.forwardRef<
	React.ElementRef< typeof DialogPrimitive.Content >,
	DrawerContentProps
>( ( { children, sx, variant = 'left', ...props }, forwardedRef ) => (
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay sx={ drawerOverlayStyles( variant ) } />
		<DialogPrimitive.Content
			{ ...props }
			sx={ {
				...drawerContentStyles( variant ),
				...sx,
			} }
			ref={ forwardedRef }
		>
			<DialogCloseDefault />
			{ children }
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
) );

interface DrawerRootProps extends DialogPrimitive.DialogProps {
	title: string;
}

const DrawerRoot = forwardRef< HTMLDivElement, DrawerRootProps >(
	( { title, ...rest }, forwardedRef: Ref< HTMLDivElement > ) => (
		<DialogPrimitive.Root aria-label={ title } ref={ forwardedRef } { ...rest } />
	)
);

const Root = DrawerRoot;
const Trigger = DialogPrimitive.Trigger;

export { Root, Trigger, Content };
