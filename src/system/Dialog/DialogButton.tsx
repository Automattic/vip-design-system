/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface DialogButtonProps extends React.ComponentProps< typeof Button > {
	/** Label text rendered before the value. */
	label?: string;
	/** Value text rendered after the label, truncated with an ellipsis when it overflows. */
	value?: string;
}

const DialogButton = ( {
	label,
	variant = 'secondary',
	value,
	children,
	...props
}: DialogButtonProps ) => (
	<Button
		variant={ variant }
		sx={ {
			textAlign: 'left',
			display: 'inline-flex',
			py: 2,
			pl: 3,
			pr: 2,
			alignItems: 'center',
		} }
		{ ...props }
	>
		{ children }
		{ label && (
			<Text as="span" sx={ { mb: 0, color: 'heading', mr: 2, flex: '0 0 auto' } }>
				{ label }:
			</Text>
		) }
		{ value && (
			<Text
				as="span"
				sx={ {
					mb: 0,
					flex: '1 1 auto',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					color: 'input.text.default',
					textOverflow: 'ellipsis',
				} }
			>
				{ value }
			</Text>
		) }
		<MdExpandMore sx={ { ml: 2, top: 0, display: 'block', flex: '0 0 auto' } } />
	</Button>
);

export { DialogButton };
