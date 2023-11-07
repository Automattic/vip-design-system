/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

/**
 * Internal dependencies
 */

export const DialogOverlay = React.forwardRef( ( props, forwardedRef ) => (
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
		ref={ forwardedRef }
	/>
) );

DialogOverlay.displayName = 'DialogOverlay';
