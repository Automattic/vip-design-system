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
				bg: `tag.${ variant }.background`,
				color: `tag.${ variant }.text`,
				py: 1,
				verticalAlign: 'middle',
				px: 2,
				display: 'inline-block',
				borderRadius: 1,
				fontWeight: 'heading',
				a: {
					color: `tag.${ variant }.text`,
					'&:hover, &:focus, &:active': {
						textDecoration: 'none',
					},
					'&:active, &:visited': {
						color: `tag.${ variant }.text`,
					},
				},
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
