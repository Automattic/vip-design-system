/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

export const DialogDescription = React.forwardRef(
	( { description, hidden, ...rest }, forwardedRef ) => {
		let text = description;

		if ( hidden ) {
			text = <ScreenReaderText>{ text }</ScreenReaderText>;
		}

		return (
			<DialogPrimitive.Description { ...rest } ref={ forwardedRef } sx={ { margin: 0 } }>
				{ text }
			</DialogPrimitive.Description>
		);
	}
);

DialogDescription.displayName = 'DialogDescription';

DialogDescription.propTypes = {
	description: PropTypes.string,
	hidden: PropTypes.bool,
};
