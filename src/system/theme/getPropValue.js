/**
 * Internal dependencies
 */

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

export default theme => {
	const getPropValue = ( prop, variant = 'default' ) => {
		if ( ! theme[ prop ] ) {
			return '#000000';
		}

		return theme[ prop ][ variant ].value;
	};

	const resolvePath = ( object, path, defaultValue ) => {
		return path.split( '.' ).reduce( ( acc, property ) => {
			return acc ? acc[ property ] : defaultValue;
		}, object );
	};

	const getVariants = color => {
		const property = resolvePath( theme, color, {} );

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

	return {
		ValetTheme: traverse( theme ),
		getPropValue,
		getVariants,
		traverse,
		resolvePath,
	};
};
