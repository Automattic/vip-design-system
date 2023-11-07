/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MdDone } from 'react-icons/md';

import { baseControlBorderStyle, baseControlFocusStyle, inputBaseBackground } from './Input.styles';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	disabled?: boolean;
}
const StyledCheckbox = ( props: CheckboxProps ) => (
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

const StyledIndicator = ( props: CheckboxPrimitive.CheckboxIndicatorProps ) => (
	<CheckboxPrimitive.Indicator
		sx={ {
			color: 'white',
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
