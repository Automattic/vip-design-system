/** @jsx jsx */
import { jsx, Spinner as ThemeSpinner } from 'theme-ui';

const Spinner = props => (
	<ThemeSpinner
		strokeWidth={2}
		sx={{
			fill: 'none',
			color: 'primary',
		}}
		{...props}
	/>
);

export { Spinner };
