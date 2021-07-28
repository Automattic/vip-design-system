/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const DialogMenu = ( { sx, ...props } ) => (
	<ul
		role="menu"
		sx={{ listStyleType: 'none', m: 0, px: 0, py: 1 }}
		{...props}
	/>
);

DialogMenu.propTypes = {
	sx: PropTypes.object,
}


export { DialogMenu };
