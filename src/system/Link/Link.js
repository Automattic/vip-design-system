/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Link as ThemeLink } from 'theme-ui';
import PropTypes from 'prop-types';

const Link = ( { active = false, sx, ...props } ) => (
	<ThemeLink
		{ ...props }
		sx={ {
			color: active ? 'heading' : 'link',
			textDecoration: 'none',
			borderBottom: '1px solid',
			borderBottomColor: 'border',
			'&:visited': {
				color: 'link',
			},
			'&:hover, &:focus': {
				color: 'heading',
			},
			...sx,
		} }
	/>
);

Link.propTypes = {
	active: PropTypes.bool,
	sx: PropTypes.object,
};

export { Link };
