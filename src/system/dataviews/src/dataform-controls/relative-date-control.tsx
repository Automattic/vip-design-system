/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Adapter dependencies
 */
import { HStack } from '../../adapter/components';
import { useCallback } from '../../adapter/element';
import { __ } from '../../adapter/i18n';
import { Input, Label } from '../../../Form';

/**
 * Internal dependencies
 */
import { OPERATOR_IN_THE_PAST, OPERATOR_OVER } from '../constants';

interface RelativeDateControlProps {
	id: string;
	value: { value?: string | number; unit?: string };
	onChange: ( value: any ) => void;
	label: string;
	hideLabelFromVision?: boolean;
	options: { value: string; label: string }[];
	className?: string;
}

export const TIME_UNITS_OPTIONS = {
	[ OPERATOR_IN_THE_PAST ]: [
		{ value: 'days', label: __( 'Days' ) },
		{ value: 'weeks', label: __( 'Weeks' ) },
		{ value: 'months', label: __( 'Months' ) },
		{ value: 'years', label: __( 'Years' ) },
	],
	[ OPERATOR_OVER ]: [
		{ value: 'days', label: __( 'Days ago' ) },
		{ value: 'weeks', label: __( 'Weeks ago' ) },
		{ value: 'months', label: __( 'Months ago' ) },
		{ value: 'years', label: __( 'Years ago' ) },
	],
};

export default function RelativeDateControl( {
	id,
	value,
	onChange,
	label,
	hideLabelFromVision,
	options,
	className,
}: RelativeDateControlProps ) {
	const { value: relValue = '', unit = options[ 0 ].value } = value;

	const onChangeValue = useCallback(
		( newValue: string | undefined ) =>
			onChange( {
				[ id ]: { value: Number( newValue ), unit },
			} ),
		[ id, onChange, unit ]
	);

	const onChangeUnit = useCallback(
		( newUnit: string | undefined ) =>
			onChange( {
				[ id ]: { value: relValue, unit: newUnit },
			} ),
		[ id, onChange, relValue ]
	);

	return (
		<div id={ id } className={ clsx( className, 'dataviews-controls__relative-date' ) }>
			{ !hideLabelFromVision && <Label>{label}</Label> }
			<HStack spacing={ 2 }>
				<Input
					type="number"
					value={ String(relValue) }
					onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value) }
				/>
				<select
					value={ unit }
					onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => onChangeUnit(e.target.value) }
				>
					{ options.map((opt) => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					)) }
				</select>
			</HStack>
		</div>
	);
}
