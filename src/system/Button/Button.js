/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Button as ThemeButton } from 'theme-ui';

const Button = props => (
	<ThemeButton
		sx={ {
			verticalAlign: 'middle',
			display: 'inline-block',
			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed',
				pointerEvents: 'all',
			},
		} }
		{ ...props }
	/>
);

export { Button };
