/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Heading as ThemeHeading } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Heading = ( { variant = 'h3', sx, className = null, ...props } ) => (
	<ThemeHeading
		as={variant}
		sx={{
			color: 'heading',
			// pass variant prop to sx
			variant: `text.${ variant }`,
			...sx,
		}}
		className={ classNames( 'vip-heading-component', className ) }
		{...props}
	/>
);

Heading.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Heading };
