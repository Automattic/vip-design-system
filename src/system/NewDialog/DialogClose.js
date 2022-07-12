/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';

/**
 * Internal dependencies
 */
export const DialogClose = React.forwardRef( ( props, forwardedRef ) => (
	<DialogPrimitive.Close asChild { ...props } ref={ forwardedRef }>
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
				color: theme => `${ theme?.colors?.text }`,
				position: 'absolute',
				top: 10,
				right: 10,

				'&:hover': {
					backgroundColor: 'border',
					outlineStyle: 'solid',
					outlineColor: 'primary',
					outlineWidth: '2px',
				},
				'&:focus': { outlineStyle: 'solid', outlineColor: 'primary', outlineWidth: '2px' },
			} }
		>
			<IoClose aria-hidden="true" />
		</button>
	</DialogPrimitive.Close>
) );

DialogClose.displayName = 'DialogClose';
