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
			color: active ? 'links.active' : 'link',
			textDdecorationThickness: '0.1em',
			textUnderlineOffset: '0.1em',
			'&:visited': {
				color: 'links.visited',
			},
			'&:active': {
				color: 'links.active',
			},
			'&:hover, &:focus': {
				color: 'links.hover',
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
