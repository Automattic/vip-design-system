/**
 * External dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

export default function ScreenReaderText( props ) {
	return (
		<span
			className="screen-reader-text"
			style={{
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
			}}
			{...props}
		>
			{props.children}
		</span>
	);
}

/**
 * propTypes
 */
ScreenReaderText.propTypes = {
	children: PropTypes.node.isRequired,
};
