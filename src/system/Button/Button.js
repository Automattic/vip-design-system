/** @jsx jsx */
import { jsx, Button as ThemeButton } from 'theme-ui';

const Button = props => (
	<ThemeButton
		sx={{
			verticalAlign: 'middle',
			display: 'inline-block',
		}}
		{...props}
	/>
);

export { Button };
