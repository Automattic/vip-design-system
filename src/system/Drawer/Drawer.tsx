/** @jsxImportSource theme-ui */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { drawerContentStyles, drawerOverlayStyles } from './styles';
import { DialogCloseDefault } from '../NewDialog/DialogClose';
import { DialogTitle } from '../NewDialog/DialogTitle';

export interface DrawerContentProps
	extends DialogPrimitive.DialogProps,
		DialogPrimitive.DialogContentProps {
	children?: React.ReactNode;
	label?: string;
	variant?: 'top' | 'right' | 'bottom' | 'left' | 'left-header' | 'right-header';
	sx?: ThemeUIStyleObject;
}

const Content = React.forwardRef<
	React.ElementRef< typeof DialogPrimitive.Content >,
	DrawerContentProps
>( ( { children, sx, variant = 'left', label, ...rest }, forwardedRef ) => (
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
) );

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;

export { Root, Trigger, Content };
