/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';

const Textarea = props => (
	<textarea
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
		} }
	/>
);

export { Textarea };
