/** @jsxImportSource theme-ui */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogCloseDefault } from '../NewDialog/DialogClose';

export interface DrawerContentProps extends DialogPrimitive.DialogContentProps {
	children?: React.ReactNode;
	variant?: 'top' | 'right' | 'bottom' | 'left';
	sx?: ThemeUIStyleObject;
}

const DrawerContent = React.forwardRef<
	React.ElementRef< typeof DialogPrimitive.Content >,
	DrawerContentProps
>( ( { children, sx, variant = 'left', ...props }, forwardedRef ) => (
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay sx={ drawerOverlayStyles } />
		<DialogPrimitive.Content
			{ ...props }
			sx={ {
				...drawerContentStyles( variant ),
				...sx,
			} }
			ref={ forwardedRef }
		>
			{ children }
			<DialogCloseDefault />
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
) );

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;

export { Drawer, DrawerTrigger, DrawerContent };
