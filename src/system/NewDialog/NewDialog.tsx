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
	/** Custom Theme UI styles for the dialog content. */
	sx?: ThemeUIStyleObject;
	/** Additional CSS class name for the dialog content. */
	className?: string;
}

export interface NewDialogProps extends DialogPrimitive.DialogProps {
	/** The element that opens the dialog when clicked. */
	trigger?: ReactNode;
	/** The title displayed at the top of the dialog. */
	title: ReactNode;
	/** A short description displayed below the title. */
	description: ReactNode;
	/** The main content of the dialog, or a render function receiving an `onClose` callback. */
	content?: ReactNode | ( ( { onClose }: { onClose: () => void } ) => ReactNode );
	/**
	 * Whether to display the title and description visually.
	 * @default true
	 */
	showHeading?: boolean;
	/**
	 * When true, the dialog renders nothing.
	 * @default false
	 */
	disabled?: boolean;
	/** Custom Theme UI styles applied to the dialog content wrapper. */
	style?: ThemeUIStyleObject;
	/** Additional CSS class name for the dialog content wrapper. */
	className?: string;
	/** Props forwarded to the underlying Radix Dialog.Content element. */
	contentProps?: DialogContentProps;
}

/**
 * A modal dialog component built on Radix UI Dialog primitives.
 * Supports a trigger element, title, description, and custom content with an optional close callback.
 */
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
