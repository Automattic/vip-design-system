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

	// We get the following format: '1', '2', '3', 'caps'.
	// We need to build h1: {}, h2: {}, h3: {}, caps: {}.
	const getHeadingStyles = () => {
		const variantValues = getVariants( 'heading' );

		const headingStyles = {};

		Object.keys( variantValues ).forEach( variant => {
			if ( variant === 'caps' ) {
				headingStyles.caps = {
					...variantValues[ variant ],
					color: 'heading',
				};
			}

			if ( parseInt( variant, 10 ) > 0 ) {
				headingStyles[ `h${ variant }` ] = {
					...variantValues[ variant ],
					color: 'heading',
				};
			}
		} );

		return headingStyles;
	};

	return {
		ValetTheme: traverse( theme ),
		getPropValue,
		getVariants,
		traverse,
		resolvePath,
		getHeadingStyles,
	};
};
