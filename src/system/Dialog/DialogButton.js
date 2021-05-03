/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Button } from '../';

const DialogButton = ( { label } ) => (
	<Button variant="text" sx={ { display: 'inline-flex', alignItems: 'center' } }>
		{ label }
		<MdExpandMore sx={ { ml: 1, top: 0 } } />
	</Button>
);

DialogButton.propTypes = {
	label: PropTypes.string,
};

export { DialogButton };
