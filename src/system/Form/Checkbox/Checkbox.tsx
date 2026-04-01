/** @jsxImportSource theme-ui */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { checkboxIndicatorStyle, checkboxStyle } from './styles';
import { RadioOptionProps } from '../Radio/RadioOption';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	/**
	 * Whether the checkbox is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The color variant of the checkbox.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'success' | 'brand' | 'disabled';
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

/**
 * A styled checkbox input built on Radix UI Checkbox primitives.
 * Supports multiple color variants and disabled state.
 */
const Checkbox = ( {
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
			onCheckedChange={ disabled ? undefined : onCheckedChange }
			aria-disabled={ disabled }
			variant={ variant }
			{ ...props }
		>
			<StyledIndicator variant={ variant } />
		</StyledCheckbox>
	);
};

export { Checkbox };
