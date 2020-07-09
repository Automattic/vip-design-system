/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

const Badge = ( { variant = 'brand', ...props } ) => (
	<div
		sx={ {
			fontSize: 0,
			padding: 0,
			bg: `${ variant }.20`,
			color: `${ variant }.80`,
			py: 1,
			verticalAlign: 'middle',
			px: 2,
			display: 'inline-block',
			borderRadius: 1,
			fontWeight: 'heading',
		} }
		{ ...props }
	/>
);

Badge.propTypes = {
	variant: PropTypes.string,
};

export { Badge };
