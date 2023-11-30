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

interface DialogTitleProps {
	title?: ReactNode;
	hidden?: boolean;
}

export const DialogTitle: React.FC< DialogTitleProps > = ( { title, hidden = false } ) => {
	let titleNode = title;

	if ( hidden ) {
		titleNode = <ScreenReaderText>{ titleNode }</ScreenReaderText>;
	}

	return (
		<DialogPrimitive.Title
			sx={ { margin: 0, fontSize: 3, fontWeight: 'medium', color: 'heading' } }
		>
			{ titleNode }
		</DialogPrimitive.Title>
	);
};
