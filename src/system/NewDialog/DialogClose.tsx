/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { Theme } from 'theme-ui';

interface DialogCloseProps {
	children: React.ReactNode;
}

const DialogClose = forwardRef< HTMLButtonElement, DialogCloseProps >( ( props, forwardedRef ) => (
	<DialogPrimitive.Close asChild { ...props } ref={ forwardedRef }>
		{ props.children }
	</DialogPrimitive.Close>
) );

interface ThemeProps extends Theme {
	outline?: Record< string, Record< string, string > >;
}

const DialogCloseDefault = forwardRef< HTMLButtonElement >( ( _, forwardedRef ) => (
	<DialogClose>
		<button
			ref={ forwardedRef }
			aria-label="Close"
			sx={ {
				all: 'unset',
				fontFamily: 'inherit',
				borderRadius: '100%',
				height: 25,
				width: 25,
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'icon.primary',
				position: 'absolute',
				top: 4,
				right: 4,
				'&:hover': {
					backgroundColor: 'borders.2',
					outlineStyle: 'solid',
					outlineColor: 'border.accent',
					outlineWidth: '2px',
				},
				'&:focus, &:focus-visible': ( theme: ThemeProps ) => theme.outline,
			} }
		>
			<IoClose aria-hidden="true" sx={ { fill: 'icon.primary' } } />
		</button>
	</DialogClose>
) );

export { DialogClose, DialogCloseDefault };