/** @jsxImportSource theme-ui */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { checkboxIndicatorStyle, checkboxStyle } from './styles';
import { RadioOptionProps } from '../Radio/RadioOption';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	disabled?: boolean;
	variant?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'disabled';
}

const StyledCheckbox = ( { variant = 'primary', ...rest }: CheckboxProps ) => (
	<CheckboxPrimitive.Root sx={ checkboxStyle( variant ) } { ...rest } />
);

interface StyledIndicatorProps extends CheckboxPrimitive.CheckboxIndicatorProps {
	variant: RadioOptionProps[ 'variant' ];
}

const StyledIndicator = ( { variant, ...rest }: StyledIndicatorProps ) => (
	<CheckboxPrimitive.Indicator sx={ checkboxIndicatorStyle( variant ) } { ...rest } />
);

export const Checkbox = ( {
	disabled = false,
	onCheckedChange,
	variant = 'primary',
	...props
}: CheckboxProps ) => {
	if ( disabled === true || disabled === undefined ) {
		variant = 'disabled';
	}

	return (
		<StyledCheckbox
			sx={ {
				opacity: disabled ? 0.4 : 1,
			} }
			onCheckedChange={ disabled ? undefined : onCheckedChange }
			aria-disabled={ disabled }
			variant={ variant }
			{ ...props }
		>
			<StyledIndicator variant={ variant } />
		</StyledCheckbox>
	);
};
