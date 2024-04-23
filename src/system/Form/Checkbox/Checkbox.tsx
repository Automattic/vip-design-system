/** @jsxImportSource theme-ui */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import React from 'react';

import { checkboxIndicatorStyle, checkboxStyle } from './styles';
import { Validation, Label } from '../';
import { Flex } from '../../Flex';
import { RadioOptionProps } from '../Radio/RadioOption';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
	disabled?: boolean;
	variant?: 'primary' | 'success' | 'brand' | 'disabled';
	hasError?: boolean;
	errorMessage?: string;
	forLabel?: string;
	label?: string;
	required?: boolean;
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

const Checkbox = ( {
	disabled = false,
	onCheckedChange,
	variant = 'primary',
	hasError = false,
	errorMessage,
	forLabel,
	label,
	required,
	...props
}: CheckboxProps ) => {
	if ( disabled === true || disabled === undefined ) {
		variant = 'disabled';
	}

	return (
		<React.Fragment>
			{ hasError && errorMessage ? (
				<React.Fragment>
					<Flex>
						<StyledCheckbox
							onCheckedChange={ disabled ? undefined : onCheckedChange }
							aria-disabled={ disabled }
							aria-labelledby={ `label-${ forLabel }` }
							aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
							variant={ variant }
							{ ...props }
						>
							<StyledIndicator variant={ variant } />
						</StyledCheckbox>
						{ label && (
							<Label required={ required } htmlFor={ forLabel } id={ `label-${ forLabel }` }>
								{ label }
							</Label>
						) }
					</Flex>
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				</React.Fragment>
			) : (
				<StyledCheckbox
					onCheckedChange={ disabled ? undefined : onCheckedChange }
					aria-disabled={ disabled }
					variant={ variant }
					{ ...props }
				>
					<StyledIndicator variant={ variant } />
				</StyledCheckbox>
			) }
		</React.Fragment>
	);
};

export { Checkbox };
