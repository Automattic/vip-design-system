/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Label as ThemeLabel } from 'theme-ui'

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Label = ( { sx, ...props } ) => (
	<ThemeLabel
		{...props}
	/>
);

export { Label };
