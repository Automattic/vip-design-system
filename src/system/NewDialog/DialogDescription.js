/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';

/**
 * Internal dependencies
 */

export const DialogDescription = ( { description, hidden = false } ) => {
	let text = description;

	if ( hidden ) {
		text = <ScreenReaderText>{ text }</ScreenReaderText>;
	}

	return <DialogPrimitive.Description>{ text }</DialogPrimitive.Description>;
};

DialogDescription.propTypes = {
	description: PropTypes.string,
	hidden: PropTypes.bool,
};
