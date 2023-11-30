/** @jsxImportSource theme-ui */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogCloseDefault } from '../NewDialog/DialogClose';
import { DialogTitle } from '../NewDialog/DialogTitle';

export interface DrawerProps
	extends DialogPrimitive.DialogProps,
		DialogPrimitive.DialogContentProps {
	children?: ReactNode;
	trigger: ReactNode;
	label?: string;
	variant?: 'top' | 'right' | 'bottom' | 'left' | 'left-header' | 'right-header';
	sx?: ThemeUIStyleObject;
}

export const Drawer = React.forwardRef<
	React.ElementRef< typeof DialogPrimitive.Content >,
	DrawerProps
>( ( { children, sx, variant = 'left', label, trigger, ...rest }, forwardedRef ) => (
	<DialogPrimitive.Root>
		{ trigger && <DialogPrimitive.Trigger asChild>{ trigger }</DialogPrimitive.Trigger> }
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay sx={ drawerOverlayStyles( variant ) } />
			<DialogPrimitive.Content
				{ ...rest }
				sx={ {
					...drawerContentStyles( variant ),
					...sx,
				} }
				ref={ forwardedRef }
			>
				<DialogTitle title={ label } hidden />
				<DialogCloseDefault />
				{ children }
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	</DialogPrimitive.Root>
) );
