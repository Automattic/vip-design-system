/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';
import React from 'react';

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

DialogDescription.propTypes = {
	description: PropTypes.node,
	hidden: PropTypes.bool,
};
