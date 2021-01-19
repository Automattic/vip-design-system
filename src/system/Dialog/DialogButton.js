/**
 * External dependencies
 */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
/** @jsx jsx */
import { jsx } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Button } from '../';

const DialogButton = ( { label, ...props } ) => (
	<Button variant="text" sx={ { display: 'inline-flex', alignItems: 'center' } }>
		{ label }
		<MdExpandMore sx={ { ml: 1, top: 0 } } />
	</Button>
);

DialogButton.propTypes = {
	label: PropTypes.string,
};

export { DialogButton };
