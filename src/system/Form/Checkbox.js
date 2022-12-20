/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import PropTypes from 'prop-types';
import { MdDone } from 'react-icons/md';
import { getColor } from '../theme/getColor';
import { baseControlBorderStyle, baseControlFocusStyle, inputBaseBackground } from './Input';

const StyledCheckbox = props => (
	<CheckboxPrimitive.Root
		sx={ {
			all: 'unset',
			backgroundColor: inputBaseBackground,
			...baseControlBorderStyle,
			...baseControlFocusStyle,
			width: 16,
			height: 16,
			borderRadius: 1,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			'&[data-state=checked]': {
				backgroundColor: getColor( 'layer', 'accent' ),
				color: getColor( 'layer', 'accent' ),
			},
			svg: {
				display: 'block',
			},
		} }
		{ ...props }
	/>
);

const StyledIndicator = props => (
	<CheckboxPrimitive.Indicator
		sx={ {
			color: 'brand.0',
		} }
		{ ...props }
	/>
);

const Checkbox = ( { disabled, ...props } ) => (
	<StyledCheckbox
		sx={ {
			opacity: disabled ? 0.4 : 1,
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
