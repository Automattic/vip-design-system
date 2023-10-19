/**
 * Internal dependencies
 */

import Valet from './generated/valet-theme-light.json';
import ValetDark from './generated/valet-theme-dark.json';
import { ThemeMainEntry, ValueEntry } from './types';
import { Value } from 'classnames';

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

// interface ThemeProp extends Record< string, string > {
// 	default: string;
// }

const defaultReturnProp = 'noop';

type JSONTheme = Record<
	ThemeMainEntry,
	ValueEntry | Record< string, ValueEntry | Record< string, ValueEntry > >
>;

type CommonParsedEntry = {
	[ key: string ]: string | number;
};

export default ( theme: JSONTheme ) => {
	const getPropValue = (
		prop: ThemeMainEntry,
		variant = 'default'
	): Pick< ValueEntry, 'value' > | string => {
		if ( ! ( prop in theme ) ) {
			return defaultReturnProp;
		}

		if ( ! ( variant in theme[ prop ] ) ) {
			return defaultReturnProp;
		}

		const value = theme[ prop ][ variant ] as ValueEntry;

		return value;
	};

	const resolvePath = ( object: JSONTheme, path = '', defaultValue ) =>
		path
			.split( '.' )
			.reduce( ( acc, property ) => ( property in acc ? acc[ property ] : defaultValue ), object );

	const getVariants = ( path: string ): CommonParsedEntry => {
		const property = resolvePath( theme, path, {} );

		return Object.keys( property ).reduce(
			( acc, variant ): CommonParsedEntry => ( {
				...acc,
				[ variant ]: ( property[ variant ] as ValueEntry ).value, // "static.1.value"
			} ),
			{}
		);
	};

	const traverse = ( root: JSONTheme ) => {
		if ( 'value' in root && 'type' in root ) {
			return root.value;
		}

		const reTraverse = ( acc, [ key, value ] ) => ( {
			...acc,
			[ key ]: traverse( value ),
		} );

		return Object.entries( root ).reduce( reTraverse, {} );
	};

	// We get the following format: '1', '2', '3', 'caps'.
	// We need to build h1: {}, h2: {}, h3: {}, caps: {}.
	type HeadingStyle = Record<
		string,
		{
			fontFamily: string;
			fontWeight: string | number;
			fontSize: string | number;
			letterSpacing: string | number;
			color: string;
		}
	>;

	const getHeadingStyles = () => {
		const variantValues = getVariants( 'heading' );

		const headingStyles: HeadingStyle = {};

		Object.keys( variantValues ).forEach( variant => {
			const baseStyles = {
				fontFamily: '',
				fontWeight: '',
				fontSize: '',
				letterSpacing: '',
				color: 'heading',
			};

			if ( variant === 'caps' ) {
				headingStyles.caps = {
					...baseStyles,
					...variantValues[ variant ],
					color: 'heading',
				};
			}

			if ( parseInt( variant, 10 ) > 0 ) {
				headingStyles[ `h${ variant }` ] = {
					...baseStyles,
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
