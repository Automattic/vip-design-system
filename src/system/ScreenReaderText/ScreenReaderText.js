/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

export const ScreenReaderText = React.forwardRef( ( props, forwardRef ) => (
	<span
		className="screen-reader-text"
		sx={ {
			border: 'none',
			clip: 'rect(1px, 1px, 1px, 1px)',
			clipPath: 'inset(50%)',
			height: '1px',
			margin: '-1px',
			overflow: 'hidden',
			padding: '0',
			position: 'absolute',
			width: '1px',
			wordWrap: 'normal !important',
		} }
		{ ...props }
		ref={ forwardRef }
	>
		{ props.children }
	</span>
) );

ScreenReaderText.displayName = 'ScreenReaderText';

/**
 * propTypes
 */
ScreenReaderText.propTypes = {
	children: PropTypes.node.isRequired,
};
