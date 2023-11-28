/** @jsxImportSource theme-ui */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogCloseDefault } from '../NewDialog/DialogClose';

export interface DrawerContentProps extends DialogPrimitive.DialogContentProps {
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
			{ children }
			<DialogCloseDefault />
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
) );

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;

export { Root, Trigger, Content };
