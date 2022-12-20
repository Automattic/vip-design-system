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
import { getVariants } from '../theme/getColor';

const Badge = React.forwardRef(
	( { variant = 'blue', sx, className = null, ...props }, forwardRef ) => {
		const colorVariant = getVariants( `tag.${ variant }` );

		return (
			<Text
				as="span"
				sx={ {
					fontSize: 0,
					padding: 0,
					bg: colorVariant.background,
					color: colorVariant.text,
					py: 1,
					verticalAlign: 'middle',
					px: 2,
					display: 'inline-block',
					borderRadius: 1,
					fontWeight: 'heading',
					'&:hover, &:focus': {
						backgroundColor: colorVariant.hover,
					},
					a: {
						color: colorVariant.text,
						'&:hover, &:focus, &:active': {
							textDecoration: 'none',
						},
						'&:active': {
							color: colorVariant.active,
						},
					},
					...sx,
				} }
				className={ classNames( 'vip-badge-component', className ) }
				ref={ forwardRef }
				{ ...props }
			/>
		);
	}
);

Badge.displayName = 'Badge';
Badge.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Badge };
