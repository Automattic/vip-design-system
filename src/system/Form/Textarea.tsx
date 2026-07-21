/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlStyle } from './Input.styles';
import { Label } from './Label';
import { Validation } from './Validation';
import { Box } from '../Box/Box';

const textareaStyles: ThemeUIStyleObject = {
	unset: 'all',
	...baseControlStyle,
	lineHeight: 'inherit',
	minHeight: '36px',
	px: 3,
	py: 2,
	mb: 0,
	fontSize: 2,
	variant: 'inputs.default',
};

export interface TextareaProps extends React.TextareaHTMLAttributes< HTMLTextAreaElement > {
	/** Label rendered above the textarea. */
	label?: React.ReactNode;
	/** `htmlFor`/`id` value tying the label to the textarea. */
	forLabel?: string;
	/**
	 * Whether the field is in an error state.
	 * @default false
	 */
	hasError?: boolean;
	/** Validation message shown when `hasError` is true. */
	errorMessage?: React.ReactNode;
	/** Theme UI style overrides applied to the textarea. */
	sx?: ThemeUIStyleObject;
	/** Theme UI style overrides applied to the outer wrapper. */
	wrapperSx?: ThemeUIStyleObject;
}

export const Textarea = React.forwardRef< HTMLTextAreaElement, TextareaProps >(
	(
		{
			label,
			forLabel,
			hasError = false,
			required,
			sx = {},
			wrapperSx = {},
			errorMessage,
			...props
		},
		ref
	) => (
		<Box sx={ { ...wrapperSx } }>
			{ label && (
				<Label required={ required } htmlFor={ forLabel }>
					{ label }
				</Label>
			) }
			<Box sx={ { mb: 2 } }>
				<textarea
					ref={ ref }
					aria-describedby={ hasError && forLabel ? `describe-${ forLabel }-validation` : undefined }
						...textareaStyles,
						...sx,
						...( hasError ? { borderColor: 'input.border.error' } : {} ),
					} }
					{ ...props }
				/>
				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</Box>
		</Box>
	)
);

Textarea.displayName = 'Textarea';
