/**
 * WordPress dependencies
 */
import { useState } from '../../adapter/element';

/**
 * Internal dependencies
 */
import type { DataFormControlProps } from '../types';
import CheckboxControl from '../controls/CheckboxControl';

export default function Boolean< Item >( {
	field,
	onChange,
	data,
	hideLabelFromVision,
}: DataFormControlProps< Item > ) {
	const { id, getValue, label } = field;
	const [ customValidity ] = useState< { type: 'invalid'; message: string } | undefined >( undefined );

	return (
		<CheckboxControl
			label={ label }
			checked={ !!getValue( { item: data } ) }
			onChange={ (v: boolean) => onChange( { [ id ]: v } ) }
		/>
	);
}
