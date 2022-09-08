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
			'&:visited': {
				color: 'link',
			},
			'&:hover, &:focus': {
				color: 'heading',
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
