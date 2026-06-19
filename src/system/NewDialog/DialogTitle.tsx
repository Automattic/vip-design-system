/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

export interface DialogTitleProps {
	/** The title content to display in the dialog header. */
	title?: ReactNode;
	/**
	 * When true, the title is visually hidden but remains accessible to screen readers.
	 * @default false
	 */
	hidden?: boolean;
}

/**
 * The title element for a dialog, rendered as a styled Radix Dialog.Title.
 * Can be visually hidden while remaining accessible to screen readers.
 */
export const DialogTitle: React.FC< DialogTitleProps > = ( { title, hidden = false } ) => {
	let titleNode = title;

	if ( hidden ) {
		titleNode = <ScreenReaderText>{ titleNode }</ScreenReaderText>;
	}

	return (
		<DialogPrimitive.Title sx={ { margin: 0, variant: 'text.h3', color: 'heading' } }>
			{ titleNode }
		</DialogPrimitive.Title>
	);
};
