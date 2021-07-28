/**
 * External dependencies
 */
import { Button as ThemeButton } from 'theme-ui';
import PropTypes from 'prop-types';

const Button = ({ sx, ...props }) => (
	<ThemeButton
		sx={{
			verticalAlign: 'middle',
			display: 'inline-block',
			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed',
				pointerEvents: 'all',
			},
			...sx,
		}}
		{...props}
	/>
);

Button.propTypes = {
	sx: PropTypes.object,
};

export { Button };
