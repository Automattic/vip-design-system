/** @jsx jsx */
import { jsx, Select as ThemeSelect } from 'theme-ui';

const Select = props => (
	<ThemeSelect
		{...props}
		sx={{
			border: '1px solid',
			borderColor: 'border',
			backgroundColor: 'card',
			borderRadius: 1,
			lineHeight: 'inherit',
			px: 3,
			py: 2,
			fontSize: 2,
			color: 'text',
			width: '100%',
			'&:focus': {
				borderColor: 'brand.60',
				outline: 'none',
			},
		}}
	/>
);

export { Select };
