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

export const DialogTitle = ( { title, hidden = false } ) => {
	let titleNode = title;

	if ( hidden ) {
		titleNode = <ScreenReaderText>{ titleNode }</ScreenReaderText>;
	}

	return <DialogPrimitive.Title sx={ { margin: 0 } }>{ titleNode }</DialogPrimitive.Title>;
};

DialogTitle.propTypes = {
	title: PropTypes.string,
	hidden: PropTypes.bool,
};
