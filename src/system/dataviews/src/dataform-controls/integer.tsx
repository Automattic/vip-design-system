/**
 * Adapter dependencies
 */
import { useCallback, useState } from '../../adapter/element';
import { __ } from '../../adapter/i18n';
import { Input, Label } from '../../../Form';

/**
 * Internal dependencies
 */
import { OPERATOR_BETWEEN } from '../constants';
import type { DataFormControlProps } from '../types';
// replaced ValidatedNumberControl with DS Input + simple validation

function BetweenControls< Item >( {
	id,
	value,
	onChange,
	hideLabelFromVision,
}: {
	id: string;
	value: any;
	onChange: DataFormControlProps< Item >[ 'onChange' ];
	hideLabelFromVision?: boolean;
} ) {
	const [ min = '', max = '' ] = Array.isArray( value ) ? value : [];

	const onChangeMin = useCallback(
		( newValue: string | undefined ) =>
			onChange( {
				[ id ]: [ Number( newValue ), max ],
			} ),
		[ id, onChange, max ]
	);

	const onChangeMax = useCallback(
		( newValue: string | undefined ) =>
			onChange( {
				[ id ]: [ min, Number( newValue ) ],
			} ),
		[ id, onChange, min ]
	);

	return (
		<div>
			<div style={{ display: 'flex', gap: 16 }}>
				<label>
					{ !hideLabelFromVision && <Label>{ __( 'Min.' ) }</Label> }
					<Input type="number" value={ min } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeMin(e.target.value) } />
				</label>
				<label>
					{ !hideLabelFromVision && <Label>{ __( 'Max.' ) }</Label> }
					<Input type="number" value={ max } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeMax(e.target.value) } />
				</label>
			</div>
			<small>{ __( 'The max. value must be greater than the min. value.' ) }</small>
		</div>
	);
}

export default function Integer< Item >( {
	data,
	field,
	onChange,
	hideLabelFromVision,
	operator,
}: DataFormControlProps< Item > ) {
	const { id, label, description } = field;
	const value = field.getValue( { item: data } ) ?? '';
	const [ customValidity, setCustomValidity ] =
		useState<
			React.ComponentProps<
				typeof ValidatedNumberControl
			>[ 'customValidity' ]
		>( undefined );

	const onChangeControl = useCallback(
		( newValue: string | undefined ) => {
			onChange( {
				// Do not convert an empty string or undefined to a number,
				// otherwise there's a mismatch between the UI control (empty)
				// and the data relied by onChange (0).
				[ id ]: [ '', undefined ].includes( newValue )
					? undefined
					: Number( newValue ),
			} );
		},
		[ id, onChange ]
	);

	if ( operator === OPERATOR_BETWEEN ) {
		return (
			<BetweenControls
				id={ id }
				value={ value }
				onChange={ onChange }
				hideLabelFromVision={ hideLabelFromVision }
			/>
		);
	}

	return (
		<div>
			{ label && !hideLabelFromVision && <Label>{label}</Label> }
			<Input
				type="number"
				value={ value }
				onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeControl(e.target.value) }
				aria-invalid={ customValidity?.type === 'invalid' }
			/>
			{ description && <small>{description}</small> }
			{ customValidity?.message && (
				<div role="alert" style={{ color: 'var(--ds-danger, #c00)' }}>{customValidity.message}</div>
			) }
		</div>
	);
}
