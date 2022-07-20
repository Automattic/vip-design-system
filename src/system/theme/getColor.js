/**
 * Internal dependencies
 */

import Valet from '../../../tokens/valet-color.json';

const ThemeColors = Valet[ 'productive-color-wpvip' ];
const CoreColors = Valet[ 'valet-core' ];

export const getColor = ( color, variant = 'default' ) => {
	if ( ! ThemeColors[ color ] ) {
		return '#000000';
	}

	const colorValue = ThemeColors[ color ][ variant ].value;

	if ( colorValue.startsWith( '{' ) ) {
		const [ name, number ] = colorValue.replace( /[{}]/g, '' ).split( '.' );

		// Some colors are flat, there is no sub values.
		if ( CoreColors[ name ][ number ] ) {
			return CoreColors[ name ][ number ].value;
		}

		return CoreColors[ name ].value;
	}

	return colorValue;
};
