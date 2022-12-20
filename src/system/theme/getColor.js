/**
 * Internal dependencies
 */

import Valet from './generated/valet-theme.json';

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
