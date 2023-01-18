/**
 * Internal dependencies
 */

import Valet from './generated/valet-theme-light.json';

export const getColor = ( color, variant = 'default' ) => {
	if ( ! Valet[ color ] ) {
		return '#000000';
	}

	return Valet[ color ][ variant ].value;
};

const resolvePath = ( object, path, defaultValue ) => {
	return path.split( '.' ).reduce( ( acc, property ) => {
		return acc ? acc[ property ] : defaultValue;
	}, object );
};

export const getVariants = color => {
	const property = resolvePath( Valet, color, {} );

	return Object.keys( property ).reduce(
		( variants, variant ) => ( { ...variants, [ variant ]: property[ variant ].value } ),
		{}
	);
};

const traverse = root => {
	if ( root.hasOwnProperty( 'value' ) && root.hasOwnProperty( 'type' ) ) {
		return root.value;
	}

	return Object.entries( root ).reduce(
		( acc, [ key, value ] ) => ( {
			...acc,
			[ key ]: traverse( value ),
		} ),
		{}
	);
};

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

export const ValetTheme = traverse( Valet );
