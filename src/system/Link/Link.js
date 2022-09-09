/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Link as ThemeLink } from 'theme-ui';
import PropTypes from 'prop-types';
import { getColor } from '../theme/getColor';

const Link = ( { active = false, sx, ...props } ) => (
	<ThemeLink
		{ ...props }
		sx={ {
			color: active ? getColor( 'link', 'active' ) : 'link',
			textDdecorationThickness: '0.1em',
			textUnderlineOffset: '0.1em',
			'&:visited': {
				color: getColor( 'link', 'visited' ),
			},
			'&:active': {
				color: getColor( 'link', 'active' ),
			},
			'&:hover, &:focus': {
				color: getColor( 'link', 'hover' ),
			},
			'&:focus': theme => theme.outline,
			'&:focus-visible': theme => theme.outline,
			...sx,
		} }
	/>
);

Link.propTypes = {
	active: PropTypes.bool,
	sx: PropTypes.object,
};

export { Link };
