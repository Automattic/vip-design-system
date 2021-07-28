/**
 * External dependencies
 */
import { Text as ThemeText } from 'theme-ui';
import PropTypes from 'prop-types';

const Text = ( { sx, ...props } ) => (
	<ThemeText
		as="p"
		sx={{
			lineHeight: 1.5,
			marginBottom: 2,
			...sx,
		}}
		{...props}
	/>
);

Text.propTypes = {
	sx: PropTypes.object,
};

export { Text };
