/**
 * Adapter dependencies
 */
import { useCallback } from '../../adapter/element';
import { __ } from '../../adapter/i18n';
import { Input, Label } from '../../../Form';

/**
 * Internal dependencies
 */
import type { DataFormControlProps } from '../types';

export default function Select< Item >( {
	data,
	field,
	onChange,
	hideLabelFromVision,
}: DataFormControlProps< Item > ) {
	const { id, label, type } = field;
	const isMultiple = type === 'array';
	const value = field.getValue( { item: data } ) ?? ( isMultiple ? [] : '' );
	const onChangeControl = useCallback(
		( newValue: any ) =>
			onChange( {
				[ id ]: newValue,
			} ),
		[ id, onChange ]
	);

	const fieldElements = field?.elements ?? [];
	const hasEmptyValue = fieldElements.some(
		( { value: elementValue } ) => elementValue === ''
	);

	const elements =
		hasEmptyValue || isMultiple
			? fieldElements
			: [
					/*
					 * Value can be undefined when:
					 *
					 * - the field is not required
					 * - in bulk editing
					 *
					 */
					{ label: __( 'Select item' ), value: '' },
					...fieldElements,
			  ];

	return (
		<div>
			{ !hideLabelFromVision && label && <Label>{label}</Label> }
			<select
				value={ value as any }
				multiple={ isMultiple }
				onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => {
					const newValue = isMultiple
						? Array.from(e.target.selectedOptions).map(o => o.value)
						: e.target.value;
					onChangeControl(newValue);
				} }
			>
				{ elements.map((opt) => (
					<option key={ String(opt.value) } value={ opt.value as any }>
						{ opt.label }
					</option>
				)) }
			</select>
			{ field.description && <small>{field.description}</small> }
		</div>
	);
}
