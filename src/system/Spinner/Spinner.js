/**
 * External dependencies
 */
import { Spinner as ThemeSpinner } from 'theme-ui';
import PropTypes from 'prop-types';

const Spinner = ( { sx, ...props } ) => (
	<ThemeSpinner
		strokeWidth={2}
		sx={{
			fill: 'none',
			color: 'primary',
		}}
		{...props}
	/>
);

Spinner.propTypes = {
	sx: PropTypes.object,
};

export { Spinner };
