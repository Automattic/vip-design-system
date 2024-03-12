/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MdDone } from 'react-icons/md';

import {
	baseControlBorderStyle,
	baseControlFocusStyle,
	inputBaseBackground,
} from '../Input.styles';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	disabled?: boolean;
	variant?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'disabled';
}
const StyledCheckbox = ( { variant = 'primary', ...rest }: CheckboxProps ) => (
	<CheckboxPrimitive.Root
		sx={ {
			all: 'unset',
			backgroundColor: inputBaseBackground,
			...baseControlBorderStyle,
			...baseControlFocusStyle,
			width: 14,
			height: 14,
			borderRadius: 1,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			'&[data-state=checked]': {
				backgroundColor: variant,
				color: variant,
				borderColor: variant,
			},
			svg: {
				display: 'block',
			},
		} }
		{ ...rest }
	/>
);

const StyledIndicator = ( props: CheckboxPrimitive.CheckboxIndicatorProps ) => (
	<CheckboxPrimitive.Indicator
		sx={ {
			color: 'icon.inverse',
			fontWeight: 'bold',
		} }
		{ ...props }
	/>
);

export const Checkbox = ( { disabled, ...props }: CheckboxProps ) => (
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
