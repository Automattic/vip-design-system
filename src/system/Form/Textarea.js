/**
 * External dependencies
 */
import { Textarea as ThemeTextarea } from 'theme-ui';
import PropTypes from 'prop-types';

const Textarea = ( { sx, ...props } ) => (
	<ThemeTextarea
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
			'&:disabled': {
				backgroundColor: 'background',
			},
			...sx,
		} }
	/>
);

Textarea.propTypes = {
	sx: PropTypes.object
}

export { Textarea };
