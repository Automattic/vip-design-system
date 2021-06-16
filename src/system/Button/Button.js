/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Button as ThemeButton } from 'theme-ui';
import PropTypes from 'prop-types';

const Button = props => (
	<ThemeButton
		sx={ {
			verticalAlign: 'middle',
			display: props.hidden ? 'none' : 'inline-block',
			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed',
				pointerEvents: 'all',
			},
		} }
		{ ...props }
	/>
);

/**
 * propTypes
 */
Button.propTypes = {
	hidden: PropTypes.boolean,
};

export { Button };
