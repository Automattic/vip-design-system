/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Link as ThemeLink } from 'theme-ui';
import PropTypes from 'prop-types';

const Link = React.forwardRef( ( { active = false, sx, ...props }, forwardRef ) => (
	<ThemeLink
		sx={ {
			textDdecorationThickness: '0.1em',
			textUnderlineOffset: '0.1em',
			color: active ? 'links.active' : 'link',
			'&:visited': {
				color: 'links.visited',
			},
			'&:active': {
				color: 'links.active',
			},
			'&:hover, &:focus': {
				color: 'links.hover',
				textDecorationLine: 'underline',
				textDecorationThickness: '2px',
			},
			'&:focus-visible': theme => theme.outline,
			...sx,
		} }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Link.displayName = 'Link';

Link.propTypes = {
	active: PropTypes.bool,
	sx: PropTypes.object,
};

export { Link };
