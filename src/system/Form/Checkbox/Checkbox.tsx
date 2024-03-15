/** @jsxImportSource theme-ui */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { checkboxIndicatorStyle, checkboxStyle } from './styles';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	disabled?: boolean;
	variant?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'disabled';
}

const StyledCheckbox = ( { variant = 'primary', ...rest }: CheckboxProps ) => (
	<CheckboxPrimitive.Root sx={ checkboxStyle( variant ) } { ...rest } />
);

const StyledIndicator = ( props: CheckboxPrimitive.CheckboxIndicatorProps ) => (
	<CheckboxPrimitive.Indicator sx={ checkboxIndicatorStyle } { ...props } />
);

export const Checkbox = ( { disabled, ...props }: CheckboxProps ) => (
	<StyledCheckbox
		sx={ {
			opacity: disabled ? 0.4 : 1,
		} }
		disabled={ disabled }
		{ ...props }
	>
		<StyledIndicator />
	</StyledCheckbox>
);
