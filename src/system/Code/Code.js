/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

const Code = ( { prompt = false, ...props } ) => (
	<code
		sx={ {
			fontSize: 1,
			display: 'block',
			bg: 'modes.dark.card',
			color: 'modes.dark.heading',
			borderRadius: 2,
			py: 2,
			px: 3,
			verticalAlign: 'middle',
			fontFamily: 'monospace',
			'&:before': {
				content: prompt ? '"$"' : 'none',
				marginRight: 2,
				userSelect: 'none',
			},
		} }
		{ ...props }
	/>
);

Code.propTypes = {
	prompt: PropTypes.bool,
};

export { Code };
