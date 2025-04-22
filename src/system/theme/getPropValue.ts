/**
 * Internal dependencies
 */
import { ThemeUIStyleObject } from 'theme-ui';

import { RawThemeTokens, RawTokenGroup, RawTokenValue } from './raw-tokens';

// Type for the processed theme object (after traverse)
// Using Record<string, any> for simplicity, refine if needed
export type ProcessedTheme = Record< string, any >;

// Type for the object returned by ThemeBuilder
export interface ThemeBuilderResult {
	ValetTheme: ProcessedTheme;
	getPropValue: ( prop: string, variant?: string ) => string | number | undefined;
	getVariants: ( path: string ) => Record< string, string | number >;
	traverse: ( root: RawTokenGroup | RawTokenValue ) => any;
	resolvePath: ( object: any, path: string, defaultValue: any ) => any;
	getHeadingStyles: () => Record< string, ThemeUIStyleObject >;
}

// Type the main ThemeBuilder function
export default ( theme: RawThemeTokens ): ThemeBuilderResult => {
	// Type getPropValue function
	const getPropValue = ( prop: string, variant = 'default' ): string | number | undefined => {
		// Use type assertion or check existence more carefully
		const propGroup = theme[ prop as keyof RawThemeTokens ] as RawTokenGroup;
		if ( ! propGroup || ! propGroup[ variant ] ) {
			// Return undefined or handle error instead of hardcoded black
			console.warn( `Theme token not found: ${ prop }.${ variant }` );
			return undefined;
		}
		// Assert that the variant exists and is a RawTokenValue
		return ( propGroup[ variant ] as RawTokenValue ).value as string | number;
	};

	// Type resolvePath function (can keep basic types or refine)
	const resolvePath = ( object: any, path: string, defaultValue: any ): any => {
		return path.split( '.' ).reduce( ( acc, property ) => {
			return acc ? acc[ property ] : defaultValue;
		}, object );
	};

	// Type getVariants function
	const getVariants = ( path: string ): Record< string, string | number > => {
		const property = resolvePath( theme, path, {} ) as RawTokenGroup; // Assume it resolves to a group

		if ( ! property || typeof property !== 'object' ) {
			return {};
		}

		return Object.keys( property ).reduce(
			( variants: Record< string, string | number >, variant ) => {
				const token = property[ variant ];
				// Check if it's a token value before accessing .value
				if ( typeof token === 'object' && token !== null && 'value' in token ) {
					variants[ variant ] = ( token as RawTokenValue ).value as string | number;
				}
				return variants;
			},
			{}
		);
	};

	// Type traverse function (recursive, return type can be complex)
	const traverse = ( root: RawTokenGroup | RawTokenValue | RawThemeTokens ): any => {
		// Check if it's a RawTokenValue
		if ( typeof root === 'object' && root !== null && 'value' in root && 'type' in root ) {
			return root.value;
		}
		// Check if it's a RawTokenGroup or RawThemeTokens (an object)
		if ( typeof root === 'object' && root !== null ) {
			return Object.entries( root ).reduce(
				( acc: Record< string, any >, [ key, value ] ) => ( {
					...acc,
					[ key ]: traverse( value as RawTokenGroup | RawTokenValue ), // Recurse
				} ),
				{}
			);
		}
		// Handle potential unexpected cases
		return root;
	};

	// Type getHeadingStyles function
	const getHeadingStyles = (): Record< string, ThemeUIStyleObject > => {
		const variantValues = getVariants( 'heading' ); // This returns Record<string, string | number>

		const headingStyles: Record< string, ThemeUIStyleObject > = {};
		const baseProps: ThemeUIStyleObject = {
			fontWeight: 'heading',
			color: 'heading',
		};

		Object.keys( variantValues ).forEach( variant => {
			// variantValues[variant] holds the *processed* value (string/number) from traverse,
			// but the original structure from raw JSON was { value: { fontFamily: ..., fontSize: ... }, type: ... }
			// We need to adapt this logic or ideally have traverse preserve structure for typography tokens.
			// For now, assuming variantValues[variant] is the style object needed (which is likely incorrect based on traverse)
			// This part needs review based on actual output of traverse/getVariants for heading tokens
			const styleValue = variantValues[ variant ]; // Placeholder - likely needs rework

			if ( variant === 'caps' ) {
				headingStyles.caps = {
					// ...(styleValue as ThemeUIStyleObject), // This is likely wrong
					...baseProps,
					textTransform: 'uppercase', // Example property
				};
			}

			if ( parseInt( variant, 10 ) > 0 ) {
				headingStyles[ `h${ variant }` ] = {
					// ...(styleValue as ThemeUIStyleObject), // This is likely wrong
					...baseProps,
					fontFamily: variant.toString() === '1' ? 'serif' : 'body',
				};
			}
		} );

		return headingStyles;
	};

	// Process the theme using traverse
	const processedTheme = traverse( theme ) as ProcessedTheme;

	return {
		ValetTheme: processedTheme,
		getPropValue,
		getVariants,
		traverse,
		resolvePath,
		getHeadingStyles,
	};
};
