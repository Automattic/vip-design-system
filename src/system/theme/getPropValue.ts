/**
 * Internal dependencies
 */

import Valet from './generated/valet-theme-light.json';
import ValetDark from './generated/valet-theme-dark.json';
import { VariantList, HeadingValueEntry, ThemeMainEntry, ValueEntry, HeadingEntry } from './types';

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

// interface ThemeProp extends Record< string, string > {
// 	default: string;
// }

const objectKeys = < T extends object >( obj: T ) => {
	return Object.keys( obj ) as Array< keyof T >;
};

const defaultReturnProp = 'noop';

type JSONTheme = Record<
	ThemeMainEntry,
	ValueEntry | Record< string, ValueEntry | Record< string, ValueEntry > >
>;

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

	const resolvePath = ( object: JSONTheme, path = '' ) =>
		path.split( '.' ).reduce( ( acc, property ) => acc[ property ] as JSONTheme, object );

	const getVariants = ( path: string ) => {
		const property = resolvePath( theme, path );

		return Object.keys( property ).reduce(
			( acc, variant ) => ( {
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
	type HeadingVariant = '1' | '2' | '3' | '4' | '5' | '6' | 'caps';
	type HeadingParsedVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'hcaps' | 'caps';
	type HeadingValues = {
		[ key in HeadingVariant ]: HeadingValueEntry;
	};

	type HeadingParsedValues = {
		[ key in HeadingParsedVariant ]: HeadingEntry;
	};

	const getHeadingStyles = () => {
		const variantValues = getVariants( 'heading' ) as HeadingValues;
		const headings = {} as HeadingParsedValues;

		objectKeys( variantValues ).forEach( variantName => {
			headings[ `h${ variantName }` as HeadingVariant ] = {
				...variantValues[ variantName ],
				color: 'heading',
			};
		} );

		headings.caps = headings.hcaps;

		return headings;
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
