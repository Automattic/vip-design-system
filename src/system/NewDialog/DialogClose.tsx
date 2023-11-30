/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';

import { Button } from '..';

export interface DialogCloseProps {
	children: React.ReactNode;
}

export const DialogClose = forwardRef< HTMLButtonElement, DialogCloseProps >(
	( props, forwardedRef ) => (
		<DialogPrimitive.Close asChild { ...props } ref={ forwardedRef }>
			{ props.children }
		</DialogPrimitive.Close>
	)
);

DialogClose.displayName = 'DialogClose';

export const DialogCloseDefault = forwardRef< HTMLButtonElement >( ( _, forwardedRef ) => (
	<DialogClose>
		<Button
			ref={ forwardedRef }
			aria-label="Close"
			variant="tertiary"
			sx={ {
				position: 'absolute',
				top: 4,
				right: 4,
				color: 'icon.inverse',
				svg: {
					'&:hover': {
						fill: 'inherit',
					},
				},
			} }
		>
			<IoClose aria-hidden="true" />
		</Button>
	</DialogClose>
) );

DialogCloseDefault.displayName = 'DialogCloseDefault';
