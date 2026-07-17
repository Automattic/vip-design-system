/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

/**
 * Internal dependencies
 */

export interface DialogOverlayProps
	extends React.ComponentPropsWithoutRef< typeof Dialog.Overlay > {
	/** Forwarded ref to the underlying overlay element. */
	ref?: React.Ref< HTMLDivElement >;
}

/**
 * A semi-transparent overlay that covers the page behind an open dialog.
 */
export const DialogOverlay = ( { ref, ...props }: DialogOverlayProps ) => (
	<Dialog.Overlay
		sx={ {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			inset: 0,
			opacity: 0.7,
			backgroundColor: 'backgrounds.overlay',
		} }
		{ ...props }
		ref={ ref }
	/>
);

DialogOverlay.displayName = 'DialogOverlay';
