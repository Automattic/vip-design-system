/**
 * External dependencies
 */
import { Heading as ThemeHeading } from 'theme-ui';
import PropTypes from 'prop-types';

const Heading = ( { variant = 'h3', sx, ...props } ) => (
	<ThemeHeading
		as={variant}
		sx={{
			color: 'heading',
			// pass variant prop to sx
			variant: `text.${ variant }`,
			...sx,
		}}
		{...props}
	/>
);

Heading.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Heading };
