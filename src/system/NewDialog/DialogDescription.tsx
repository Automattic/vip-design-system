/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode, forwardRef } from 'react';

import ScreenReaderText from '../ScreenReaderText';

export interface DialogDescriptionProps {
	/** The description content displayed below the dialog title. */
	description?: ReactNode;
	/** When true, the description is visually hidden but remains accessible to screen readers. */
	hidden?: boolean;
}

/**
 * The description element for a dialog, rendered as a styled Radix Dialog.Description.
 * Can be visually hidden while remaining accessible to screen readers.
 */
export const DialogDescription = forwardRef< HTMLDivElement, DialogDescriptionProps >(
	( { description, hidden, ...rest }, forwardedRef ) => {
		let text = description;

		if ( hidden ) {
			text = <ScreenReaderText>{ text }</ScreenReaderText>;
		}

		return (
			<DialogPrimitive.Description
				{ ...rest }
				ref={ forwardedRef }
				sx={ { margin: 0, color: 'text' } }
			>
				{ text }
			</DialogPrimitive.Description>
		);
	}
);

DialogDescription.displayName = 'DialogDescription';
