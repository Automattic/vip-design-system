/**
 * Internal dependencies
 */

import { ThemeMainEntry, ValueEntry, HeadingEntry } from './types';

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

// interface ThemeProp extends Record< string, string > {
// 	default: string;
// }

interface ValetTheme {
	[ key: string ]: ValetTheme | ValueEntry;
}

interface TraversedTheme {
	[ key: string ]: TraversedTheme | string | number;
}

interface ThemeLevel {
	[ key: string ]: string | number | HeadingEntry;
}

const defaultReturnProp = 'noop';

function isValueEntry( entry: unknown ): entry is ValueEntry {
	return (
		entry !== null &&
		typeof entry === 'object' &&
		'value' in entry &&
		[ 'string', 'number' ].includes( typeof entry.value )
	);
}

export default ( theme: ValetTheme ) => {
	const getPropValue = ( prop: ThemeMainEntry, variant = 'default' ): string | number => {
		if ( ! ( prop in theme ) ) {
			return defaultReturnProp;
		}

		if ( ! ( variant in theme[ prop ] ) ) {
			return defaultReturnProp;
		}

		const valueEntry = theme[ prop ][ variant ] as unknown;
		if ( ! isValueEntry( valueEntry ) ) {
			return defaultReturnProp;
		}

		return valueEntry.value;
	};

	const resolvePath = ( object: ValetTheme, path = '' ): ValetTheme =>
		path.split( '.' ).reduce< ValetTheme >( ( acc, property ) => {
			const prop = acc[ property ];
			// We descended too far and we don't want to return a value.
			if ( isValueEntry( prop ) ) {
				return acc;
			}

			return prop;
		}, object );

	// This returns the variants of a property, but not nested.
	const getVariants = ( path: string ): ThemeLevel => {
		const property = resolvePath( theme, path );

		return Object.keys( property ).reduce< ThemeLevel >( ( acc, key: string ) => {
			const value = property[ key ];

			// Only use a non-nested variant.
			if ( isValueEntry( value ) ) {
				return {
					...acc,
					[ key ]: value.value,
				};
			}

			// If there is a nested variant, ignore it.
			return acc;
		}, {} );
	};

	const traverse = ( root: ValetTheme ): TraversedTheme => {
		return Object.keys( root ).reduce< TraversedTheme >( ( acc, key: string ) => {
			const value = root[ key ];

			if ( isValueEntry( value ) ) {
				return {
					...acc,
					[ key ]: value.value,
				};
			}

			return {
				...acc,
				[ key ]: traverse( value ),
			};
		}, {} );
	};

	type HeadingParsedVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'caps' | 'color';
	type HeadingParsedValues = {
		[ key in HeadingParsedVariant ]?: HeadingEntry;
	};

	const getHeadingStyles = (): HeadingParsedValues => {
		const headings = getVariants( 'heading' );
		const headingKeys = Object.keys( headings );
		const headingsEntries: Record< string, HeadingEntry | string | number > = {};

		headingKeys.forEach( ( variantName: string ) => {
			const entry = headings[ variantName ];

			switch ( variantName ) {
				case 'caps':
					headingsEntries.caps = entry;
					break;

				default: {
					headingsEntries[ `h${ variantName }` ] = entry;
				}
			}
		} );

		return headingsEntries;
	};

	return {
		parsedTheme: traverse( theme ),
		getPropValue,
		getVariants,
		getHeadingStyles,
	};
};
