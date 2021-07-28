/**
 * External dependencies
 */
import { Select as ThemeSelect } from 'theme-ui';
import PropTypes from 'prop-types';

const Select = ( { sx, ...props } ) => (
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
			...sx,
		}}
	/>
);

Select.propTypes = {
	disabled: PropTypes.bool,
	sx: PropTypes.object,
};

export { Select };
