/**
 * External dependencies
 */
import { Input as ThemeInput } from 'theme-ui';
import PropTypes from 'prop-types';

const Input = ( { variant, sx, ...props } ) => (
	<ThemeInput
		{ ...props }
		sx={ {
			border: '1px solid',
			borderColor: 'border',
			backgroundColor: 'card',
			borderRadius: 1,
			lineHeight: 'inherit',
			px: 3,
			py: 2,
			fontSize: 2,
			mb: 2,
			color: 'text',
			display: 'block',
			width: '100%',
			'&:focus': {
				borderColor: 'brand.60',
				outline: 'none',
			},
			...sx,
		} }
	/>
);

Input.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Input };
