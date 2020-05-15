/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Heading as ThemeHeading } from 'theme-ui';
import PropTypes from 'prop-types';

const Heading = ( { variant = 'h3', ...props } ) => (
	<ThemeHeading
		as={variant}
		sx={{
			color: 'heading',
			// pass variant prop to sx
			variant: `text.${ variant }`,
		}}
		{...props}
	/>
);

Heading.propTypes = {
	variant: PropTypes.string,
};

export { Heading };
