/**
 * Internal dependencies
 */

import Valet from './generated/valet-theme-light.json';
import ValetDark from './generated/valet-theme-dark.json';

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

// interface ThemeProp extends Record< string, string > {
// 	default: string;
// }

const defaultReturnProp = 'noop';

type ValueEntry = {
	value: string | number;
	type: string;
	description?: string;
};

type JSONTheme = Record<
	string,
	ValueEntry | Record< string, ValueEntry | Record< string, ValueEntry > >
>;

export default ( theme: JSONTheme ) => {
	const getPropValue = ( prop = '', variant = 'default' ): Pick< ValueEntry, 'value' > | string => {
		if ( ! ( prop in theme ) ) {
			return defaultReturnProp;
		}

		if ( ! ( variant in theme[ prop ] ) ) {
			return defaultReturnProp;
		}

		return theme[ prop ][ variant ].value;
	};

	const resolvePath = ( object: JSONTheme, path = '', defaultValue ): JSONTheme =>
		path
			.split( '.' )
			.reduce( ( acc, property ) => ( property in acc ? acc[ property ] : defaultValue ), object );

	const getVariants = ( color: string ): JSONTheme => {
		const property = resolvePath( theme, color, {} );

		return Object.keys( property ).reduce(
			( variants, variant ) => ( { ...variants, [ variant ]: property[ variant ].value } ),
			{}
		);
	};

	const traverse = ( root: JSONTheme ) => {
		if ( 'value' in root && 'type' in root ) {
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
	interface HeadingStyle {
		[ key: string ]: {
			fontFamily: string;
			fontWeight: string | number;
			fontSize: string | number;
			letterSpacing: string | number;
		};
	}
	const getHeadingStyles = () => {
		const variantValues = getVariants( 'heading' );

		const headingStyles: HeadingStyle = {};

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
		parsedTheme: traverse( theme ),
		getPropValue,
		getVariants,
		traverse,
		resolvePath,
		getHeadingStyles,
	};
};
