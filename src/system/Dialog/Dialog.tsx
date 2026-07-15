/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Internal dependencies
 */
import { DialogContent, DialogTrigger } from '.';
import { DialogContentProps } from './DialogContent';

export interface DialogProps extends Omit< DialogContentProps, 'onClose' | 'children' > {
	/** The element that toggles the dialog when clicked. */
	trigger?: React.ReactNode;
	/**
	 * Whether the dialog is open on initial render.
	 * @default false
	 */
	startOpen?: boolean;
	/** The dialog content, or a render function receiving an `onClose` callback. */
	content?: React.ReactNode | ( ( args: { onClose: () => void } ) => React.ReactNode );
	/**
	 * Whether the dialog trigger is disabled.
	 * @default false
	 */
	disabled?: boolean;
}

const Dialog = ( {
	trigger,
	position = 'left',
	startOpen = false,
	content,
	disabled = false,
	...props
}: DialogProps ) => {
	const [ isOpen, setIsOpen ] = useState( startOpen );
	const dialogRef = useRef< HTMLDivElement >( null );

	const closeDialog = ( e: MouseEvent ) => {
		if ( ! dialogRef.current?.contains( e.target as Node ) ) {
			setIsOpen( false );
		}
	};

	useEffect( () => {
		window.document.addEventListener( 'click', closeDialog, true );

		return () => window.document.removeEventListener( 'click', closeDialog, true );
	}, [] );

	// if content is a function, pass in onClose
	const isFunction = typeof content === 'function';

	const handleOpen = ( event: React.KeyboardEvent | React.MouseEvent | null = null ) => {
		const open = ! isOpen;

		if ( disabled ) {
			return;
		}

		const key = event && 'key' in event ? event.key : undefined;

		if ( key && key !== 'Enter' ) {
			return;
		}

		setIsOpen( open );
	};

	return (
		<div
			onClick={ e => e.stopPropagation() }
			sx={ { position: 'relative' } }
			ref={ dialogRef }
			className="vip-dialog-component"
		>
			<DialogTrigger
				tabIndex="0"
				sx={ { display: 'inline' } }
				onKeyPress={ handleOpen }
				onClick={ handleOpen }
				aria-haspopup="true"
				aria-expanded={ isOpen }
			>
				{ trigger }
			</DialogTrigger>
			<AnimatePresence>
				{ isOpen && (
					<DialogContent { ...props } position={ position } onClose={ () => setIsOpen( false ) }>
						{ isFunction ? content( { onClose: () => setIsOpen( false ) } ) : content }
					</DialogContent>
				) }
			</AnimatePresence>
		</div>
	);
};

export { Dialog };
