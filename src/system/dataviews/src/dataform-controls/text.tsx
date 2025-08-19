/**
 * Adapter dependencies
 */
import { useCallback, useState } from '../../adapter/element';

/**
 * Internal dependencies
 */
import type { DataFormControlProps } from '../types';
import { Input, Label } from '../../../Form';

export default function Text< Item >( {
	data,
	field,
	onChange,
	hideLabelFromVision,
}: DataFormControlProps< Item > ) {
	const { id, label, placeholder, description } = field;
	const value = field.getValue( { item: data } );
	const [ customValidity, setCustomValidity ] =
		useState<
			React.ComponentProps<
				typeof ValidatedTextControl
			>[ 'customValidity' ]
		>( undefined );

	const onChangeControl = useCallback(
		( newValue: string ) =>
			onChange( {
				[ id ]: newValue,
			} ),
		[ id, onChange ]
	);

	return (
		<div>
			{ !hideLabelFromVision && label && <Label>{label}</Label> }
			<Input
				required={ !! field.isValid?.required }
				aria-invalid={ customValidity?.type === 'invalid' }
				aria-describedby={ description ? `${id}-help` : undefined }
				placeholder={ placeholder }
				value={ value ?? '' }
				onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeControl(e.target.value) }
			/>
			{ description && (
				<small id={`${id}-help`}>{description}</small>
			) }
			{ customValidity?.message && (
				<div role="alert" style={{ color: 'var(--ds-danger, #c00)' }}>
					{customValidity.message}
				</div>
			) }
		</div>
	);
}
