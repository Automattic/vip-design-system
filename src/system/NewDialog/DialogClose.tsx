/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { ThemeUIStyleObject } from 'theme-ui';

import { Button } from '..';

export interface DialogCloseProps {
	children?: React.ReactNode;
}

export const DialogClose = forwardRef< HTMLButtonElement, DialogCloseProps >(
	( props, forwardedRef ) => (
		<DialogPrimitive.Close asChild { ...props } ref={ forwardedRef }>
			{ props.children }
		</DialogPrimitive.Close>
	)
);

DialogClose.displayName = 'DialogClose';

export interface DialogCloseDefaultProps {
	variant?: 'primary' | 'inverse';
}

export const defaultCloseStyles = ( variant = 'primary' ): ThemeUIStyleObject => ( {
	position: 'absolute',
	top: 3,
	right: 3,
	minWidth: 38,
	minHeight: 38,
	color: variant === 'primary' ? 'icon.primary' : 'icon.inverse',
	svg: {
		'&:hover': {
			fill: 'inherit',
		},
	},
} );

export const DialogCloseDefault = forwardRef< HTMLButtonElement, DialogCloseDefaultProps >(
	( { variant = 'primary' }, forwardedRef ) => {
		return (
			<DialogClose>
				<Button
					ref={ forwardedRef }
					aria-label="Close"
					variant="tertiary"
					sx={ defaultCloseStyles( variant ) }
				>
					<IoClose aria-hidden="true" />
				</Button>
			</DialogClose>
		);
	}
);

DialogCloseDefault.displayName = 'DialogCloseDefault';
