/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box } from '..';
import classNames from 'classnames';

const Card = React.forwardRef( ( { variant = 'primary', sx = {}, className, ...props }, ref ) => {
	return (
		<Box
			ref={ ref }
			sx={ {
				// pass variant prop to sx
				variant: `cards.${ variant }`,
				overflow: 'hidden',
				...sx,
			} }
			className={ classNames( 'vip-card-component', className ) }
			{ ...props }
		/>
	);
} );

Card.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
	className: PropTypes.any,
};

Card.displayName = 'Card';

export { Card };
