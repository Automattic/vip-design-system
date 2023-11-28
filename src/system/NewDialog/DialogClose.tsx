/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { Ref, forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { Theme } from 'theme-ui';

/**
 * Internal dependencies
 */

interface DialogCloseProps {
	children: React.ReactNode;
}

export const DialogClose = forwardRef<
	React.ElementRef< typeof DialogPrimitive.Close >,
	DialogCloseProps
>(
	(
		{ children, ...rest }: DialogCloseProps,
		forwardedRef: Ref< React.ElementRef< typeof DialogPrimitive.Close > >
	) => (
		<DialogPrimitive.Close asChild { ...rest } ref={ forwardedRef }>
			{ children }
		</DialogPrimitive.Close>
	)
);

export interface ThemeProps extends Theme {
	outline?: Record< string, Record< string, string > >;
}

export const DialogCloseDefault = forwardRef< React.ElementRef< typeof DialogClose > >(
	( props, forwardedRef: Ref< React.ElementRef< typeof DialogClose > > ) => (
		<DialogClose { ...props } ref={ forwardedRef }>
			<button
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
					'&:focus': ( theme: ThemeProps ) => theme.outline,
					'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
				} }
			>
				<IoClose aria-hidden="true" sx={ { fill: 'icon.primary' } } />
			</button>
		</DialogClose>
	)
);
