/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { ThemeUIStyleObject } from 'theme-ui';

import { Button } from '../Button/Button';

export interface DialogCloseProps {
	/** The custom close trigger element to render inside the dialog. */
	children?: React.ReactNode;
	/** Ref forwarded to the close trigger. */
	ref?: React.Ref< HTMLButtonElement >;
}

/**
 * A wrapper around Radix Dialog.Close that renders a custom close trigger element.
 */
export const DialogClose = ( { ref, ...props }: DialogCloseProps ) => (
	<DialogPrimitive.Close asChild { ...props } ref={ ref }>
		{ props.children }
	</DialogPrimitive.Close>
);

DialogClose.displayName = 'DialogClose';

export interface DialogCloseDefaultProps {
	/**
	 * The visual style variant of the close button.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'inverse';
	/** Ref forwarded to the close button. */
	ref?: React.Ref< HTMLButtonElement >;
}

export const defaultCloseStyles = ( variant = 'primary' ): ThemeUIStyleObject => ( {
	position: 'absolute',
	top: 3,
	right: 3,
	width: 38,
	height: 38,
	p: 0,
	color: variant === 'primary' ? 'icon.primary' : 'icon.inverse',
	svg: {
		'&:hover': {
			fill: 'inherit',
		},
	},
} );

/**
 * A pre-styled close button for the dialog with an X icon.
 */
export const DialogCloseDefault = ( { variant = 'primary', ref }: DialogCloseDefaultProps ) => {
	return (
		<DialogClose>
			<Button ref={ ref } aria-label="Close" variant="ghost" sx={ defaultCloseStyles( variant ) }>
				<IoClose aria-hidden="true" width={ 20 } height={ 20 } />
			</Button>
		</DialogClose>
	);
};

DialogCloseDefault.displayName = 'DialogCloseDefault';
