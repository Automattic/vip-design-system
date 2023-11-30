/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { DialogCloseDefault as DialogClose } from './DialogClose';
import { DialogDescription } from './DialogDescription';
import { DialogOverlay } from './DialogOverlay';
import { DialogTitle } from './DialogTitle';
import { contentStyles } from './styles';

export interface DialogContentProps extends DialogPrimitive.DialogContentProps {
	sx?: ThemeUIStyleObject;
	className?: string;
}

export interface NewDialogProps extends DialogPrimitive.DialogProps {
	trigger?: ReactNode;
	title: ReactNode;
	description: ReactNode;
	content?: ReactNode | ( ( { onClose }: { onClose: () => void } ) => ReactNode );
	showHeading?: boolean;
	disabled?: boolean;
	style?: ThemeUIStyleObject;
	className?: string;
	contentProps?: DialogContentProps;
}

export const NewDialog: React.FC< NewDialogProps > = ( {
	trigger = null,
	description,
	title,
	content = null,
	showHeading = true,
	disabled = false,
	style: extraStyles,
	contentProps = {},
	className = null,
	...props
} ) => {
	const closeRef = React.useRef< HTMLButtonElement >( null );

	if ( disabled ) {
		return null;
	}

	// if content is a function, pass in onClose
	const isContentFunction = typeof content === 'function';

	const onClose = () => {
		closeRef?.current?.click();
	};

	return (
		<DialogPrimitive.Root { ...props }>
			{ trigger && <DialogPrimitive.Trigger asChild>{ trigger }</DialogPrimitive.Trigger> }

			<DialogPrimitive.Portal>
				<DialogOverlay />

				<DialogPrimitive.Content
					className={ classNames( 'vip-dialog-component', className ) }
					sx={ { ...contentStyles, ...extraStyles } }
					{ ...contentProps }
				>
					<DialogClose ref={ closeRef } />
					<DialogTitle title={ title } hidden={ ! showHeading } />
					<DialogDescription description={ description } hidden={ ! showHeading } />

					<div role="document">{ isContentFunction ? content( { onClose } ) : content }</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};
