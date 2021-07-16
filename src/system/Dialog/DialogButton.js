/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Button } from '../';

const DialogButton = ( { children, ...props } ) => (
	<Button variant="secondary" sx={ { textAlign: 'left', display: 'inline-flex', py: 2, pl: 3, pr: 2, alignItems: 'center' } } { ...props } >
		{ children }
		<MdExpandMore sx={ { ml: 2, top: 0, display: 'block', flex: '0 0 auto' } } />
	</Button>
);

DialogButton.propTypes = {
	children: PropTypes.array,
};

export { DialogButton };
