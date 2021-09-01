/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Button as ThemeButton } from 'theme-ui';
import PropTypes from 'prop-types';

const Button = ({ sx, ...props }) => (
	<ThemeButton
		sx={{
			verticalAlign: 'middle',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '36px',
			py: 0,
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
