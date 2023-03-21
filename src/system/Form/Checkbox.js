/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import PropTypes from 'prop-types';
import MdDone from '~icons/mdi/done';
import { baseControlBorderStyle, baseControlFocusStyle, inputBaseBackground } from './Input.styles';

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
				backgroundColor: 'link',
				color: 'link',
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
			color: 'white',
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
