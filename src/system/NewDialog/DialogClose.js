/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';

/**
 * Internal dependencies
 */

export const DialogClose = () => (
	<DialogPrimitive.Close asChild>
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
				color: 'icon',
				position: 'absolute',
				top: 10,
				right: 10,

				'&:hover': { backgroundColor: 'border' },
				'&:focus': { boxShadow: '0 0 0 2px border' },
			} }
		>
			<IoClose />
		</button>
	</DialogPrimitive.Close>
);
