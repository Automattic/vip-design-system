/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import PropTypes from 'prop-types';
import { MdDone } from 'react-icons/md';

const StyledCheckbox = props => <CheckboxPrimitive.Root
	sx={ {
		all: 'unset',
		backgroundColor: 'grey.10',
		width: 16,
		height: 16,
		borderRadius: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': { backgroundColor: 'grey.20' },
		'&:focus': { boxShadow: '0 0 0 2px black' },
		'&[data-state=checked]': {
			backgroundColor: 'primary',
			color: 'brand.0',
		},
		svg: {
			display: 'block',
		},
	} }
	{ ...props }
/>;

const StyledIndicator = props => <CheckboxPrimitive.Indicator
	sx={ {
		color: 'brand.0',
	} }
	{ ...props }
/>;

const Checkbox = ( { disabled, ...props } ) => (
	<StyledCheckbox
		sx={ {
			opacity: disabled ? 0.4 : 1,
			border: 'none',
		} }
		disabled={ disabled }
		{ ...props }
	>
		<StyledIndicator>
			<MdDone />
		</StyledIndicator>
	</StyledCheckbox>
);

Checkbox.propTypes = {
	disabled: PropTypes.bool,
};

export { Checkbox };
