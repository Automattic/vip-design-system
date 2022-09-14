/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Text } from '../';

const Badge = React.forwardRef(
	( { variant = 'blue', sx, className = null, ...props }, forwardRef ) => (
		<Text
			as="span"
			sx={ {
				fontSize: 0,
				padding: 0,
				bg: `${ variant }.20`,
				color: `${ variant }.100`,
				py: 1,
				verticalAlign: 'middle',
				px: 2,
				display: 'inline-block',
				borderRadius: 1,
				fontWeight: 'heading',
				...sx,
			} }
			className={ classNames( 'vip-badge-component', className ) }
			ref={ forwardRef }
			{ ...props }
		/>
	)
);

Badge.displayName = 'Badge';
Badge.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Badge };
