/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';

import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

export const DialogTitle = ( { title, hidden = false } ) => {
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

DialogTitle.propTypes = {
	title: PropTypes.node,
	hidden: PropTypes.bool,
};
