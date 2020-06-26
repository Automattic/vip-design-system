/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Link as ThemeLink } from 'theme-ui';
import PropTypes from 'prop-types';

const Link = ( { active = false, ...props } ) => (
	<ThemeLink
		{ ...props }
		sx={ {
			color: active ? 'heading' : 'link',
			textDecoration: 'none',
			'&:hover, &:focus': {
				color: 'heading',
			},
		} }
	/>
);

Link.propTypes = {
	active: PropTypes.bool,
};

export { Link };
