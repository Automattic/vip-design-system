/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

import ScreenReaderText from '../ScreenReaderText';

export interface DialogDescriptionProps {
	/** The description content displayed below the dialog title. */
	description?: ReactNode;
	/** When true, the description is visually hidden but remains accessible to screen readers. */
	hidden?: boolean;
	/** Forwarded ref to the underlying description element. */
	ref?: React.Ref< HTMLDivElement >;
}

/**
 * The description element for a dialog, rendered as a styled Radix Dialog.Description.
 * Can be visually hidden while remaining accessible to screen readers.
 */
export const DialogDescription = ( {
	description,
	hidden,
	ref,
	...rest
}: DialogDescriptionProps ) => {
	let text = description;

	if ( hidden ) {
		text = <ScreenReaderText>{ text }</ScreenReaderText>;
	}

	return (
		<DialogPrimitive.Description { ...rest } ref={ ref } sx={ { margin: 0, color: 'text' } }>
			{ text }
		</DialogPrimitive.Description>
	);
};

DialogDescription.displayName = 'DialogDescription';
