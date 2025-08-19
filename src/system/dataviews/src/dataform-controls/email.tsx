/**
 * WordPress dependencies
 */
import { useCallback, useState } from '../../adapter/element';

/**
 * Internal dependencies
 */
import type { DataFormControlProps } from '../types';
import { Input, Label } from '../../../Form';

export default function Email< Item >( {
	data,
	field,
	onChange,
	hideLabelFromVision,
}: DataFormControlProps< Item > ) {
	const { id, label, placeholder, description } = field;
	const value = field.getValue( { item: data } );
	const [ customValidity ] = useState< { type: 'invalid'; message: string } | undefined >( undefined );

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
				type="email"
				required={ !! field.isValid?.required }
				value={ value ?? '' }
				placeholder={ placeholder }
				onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeControl(e.target.value) }
				aria-invalid={ customValidity?.type === 'invalid' }
			/>
			{ description && <small>{description}</small> }
		</div>
	);
}
