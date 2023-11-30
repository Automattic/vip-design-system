/** @jsxImportSource theme-ui */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { ReactNode, forwardRef } from 'react';

import ScreenReaderText from '../ScreenReaderText';

export interface DialogDescriptionProps {
	description?: ReactNode;
	hidden?: boolean;
}

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
