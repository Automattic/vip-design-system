/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access -- the token export is untyped JSON; typed tokens are part of the token-pipeline work */
/**
 * Internal dependencies
 */

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

/** The parsed token export: nested groups ending in `{ value, type }` leaves. */
export type TokenTree = Record< string, any >;

/** A token tree with every leaf replaced by its value. */
export type ValetTheme = Record< string, any >;

export default ( theme: TokenTree ) => {
	const getPropValue = ( prop: string, variant = 'default' ): any => {
		if ( ! theme[ prop ] ) {
			return '#000000';
		}

		return theme[ prop ][ variant ].value;
	};

	const resolvePath = ( object: any, path: string, defaultValue: unknown ): any => {
		return path.split( '.' ).reduce( ( acc: any, property ) => {
			return acc ? acc[ property ] : defaultValue;
		}, object );
	};

	const getVariants = ( color: string ): Record< string, any > => {
		const property = resolvePath( theme, color, {} );

		return Object.keys( property ).reduce(
			( variants: Record< string, any >, variant ) => ( {
				...variants,
				[ variant ]: property[ variant ].value,
			} ),
			{}
		);
	};

	const traverse = ( root: any ): any => {
		if ( root.hasOwnProperty( 'value' ) && root.hasOwnProperty( 'type' ) ) {
			return root.value;
		}

		return Object.entries( root ).reduce(
			( acc: Record< string, any >, [ key, value ] ) => ( {
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
		const headingStyles: Record< string, any > = {};

		Object.keys( variantValues ).forEach( variant => {
			if ( variant === 'caps' ) {
				headingStyles.caps = {
					...variantValues[ variant ],
				};
			}

			if ( parseInt( variant, 10 ) > 0 ) {
				headingStyles[ `h${ variant }` ] = {
					...variantValues[ variant ],
					fontFamily: 'default',
				};
			}
		} );

		return headingStyles;
	};

	return {
		ValetTheme: traverse( theme ) as ValetTheme,
		getPropValue,
		getVariants,
		traverse,
		resolvePath,
		getHeadingStyles,
	};
};
