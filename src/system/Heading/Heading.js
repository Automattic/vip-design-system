/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Heading as ThemeHeading } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Heading = React.forwardRef(
	( { variant = 'h3', sx, className = null, ...props }, forwardRef ) => (
		<ThemeHeading
			as={ variant }
			sx={ {
				color: 'heading',
				// pass variant prop to sx
				variant: `text.${ variant }`,
				...sx,
			} }
			className={ classNames( 'vip-heading-component', className ) }
			ref={ forwardRef }
			{ ...props }
		/>
	)
);

Heading.displayName = 'Heading';

Heading.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Heading };
