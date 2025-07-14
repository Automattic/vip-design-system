/**
 * @file This file provides a factory function to build theme-related utility functions.
 * These utilities help in accessing and transforming raw theme design tokens into a format
 * that can be easily consumed by components and the Theme UI provider.
 *
 * The raw theme tokens are expected to follow a specific structure, often exported from design tools
 * like Figma, where each token is an object with a `value` property.
 */

// Valet Theme Productive Theme
// https://www.figma.com/file/sILtW5Cs2tAnPWrSOEVyER/Productive-Color?node-id=1%3A17&t=4kHdpoprxntk5Ilw-0

/**
 * Creates a set of theme-aware utility functions. This is a factory that takes a theme
 * definition and returns an object with helper functions to access theme properties.
 *
 * @param {object} theme The raw theme object, typically from a JSON file.
 * @returns {{
 *  ValetTheme: object,
 *  getPropValue: (function(string, string=): *),
 *  getVariants: (function(string): {}),
 *  traverse: (function(object): object),
 *  resolvePath: (function(object, string, *): *),
 *  getHeadingStyles: (function(): {})
 * }} An object containing the theme utilities.
 */
export default theme => {
	/**
	 * Retrieves a specific value from the theme object.
	 *
	 * @param {string} prop The top-level property key (e.g., 'focus', 'button').
	 * @param {string} [variant='default'] The variant of the property to retrieve.
	 * @returns {string|*} The value of the theme property. Returns a default fallback if not found.
	 */
	const getPropValue = ( prop, variant = 'default' ) => {
		if ( ! theme[ prop ] ) {
			// Fallback for safety, though ideally all requested props should exist.
			return '#000000';
		}

		return theme[ prop ][ variant ].value;
	};

	/**
	 * Safely access a nested property in an object using a dot-separated string path.
	 *
	 * @param {object} object The object to query.
	 * @param {string} path The dot-separated path to the property.
	 * @param {*} [defaultValue] The value to return if the path is not found.
	 * @returns {*} The value at the specified path or the default value.
	 */
	const resolvePath = ( object, path, defaultValue ) => {
		return path.split( '.' ).reduce( ( acc, property ) => {
			return acc ? acc[ property ] : defaultValue;
		}, object );
	};

	/**
	 * Retrieves all variants of a specific theme property and returns them as a flat object.
	 * For example, `getVariants('border')` would return `{ '1': '#value', '2': '#value' }`.
	 *
	 * @param {string} color The theme property path (e.g., 'border', 'fontSize.static').
	 * @returns {object} An object where keys are variants and values are the corresponding theme values.
	 */
	const getVariants = color => {
		const property = resolvePath( theme, color, {} );

		return Object.keys( property ).reduce(
			( variants, variant ) => ( { ...variants, [ variant ]: property[ variant ].value } ),
			{}
		);
	};

	/**
	 * Recursively traverses a theme object and extracts the `value` from each token.
	 * This is used to clean up the raw theme object from Figma into a simpler key-value format.
	 *
	 * @param {object} root The node in the theme object to start traversing from.
	 * @returns {object|*} A clean object with direct key-value pairs.
	 */
	const traverse = root => {
		// Base case: if we find a `value` property, we've reached a token leaf.
		if ( root.hasOwnProperty( 'value' ) && root.hasOwnProperty( 'type' ) ) {
			return root.value;
		}

		// Recursive step: traverse deeper into the object.
		return Object.entries( root ).reduce(
			( acc, [ key, value ] ) => ( {
				...acc,
				[ key ]: traverse( value ),
			} ),
			{}
		);
	};

	/**
	 * Generates heading styles (h1, h2, etc.) from the theme's heading tokens.
	 * It applies base heading properties and specific overrides for certain heading levels.
	 *
	 * The theme provides heading tokens as `{ '1': {...}, '2': {...} }`, which this function
	 * maps to `{ h1: {...}, h2: {...} }`.
	 *
	 * @returns {object} A style object containing styles for `h1`, `h2`, `h3`, etc., and `caps`.
	 */
	// We get the following format: '1', '2', '3', 'caps'.
	// We need to build h1: {}, h2: {}, h3: {}, caps: {}.
	const getHeadingStyles = () => {
		const variantValues = getVariants( 'heading' );

		const headingStyles = {};
		const baseProps = {
			fontWeight: 'heading',
			color: 'heading',
		};

		Object.keys( variantValues ).forEach( variant => {
			if ( variant === 'caps' ) {
				headingStyles.caps = {
					...variantValues[ variant ],
					...baseProps,
				};
			}

			// Check if the variant key is a number (for h1, h2, etc.)
			if ( parseInt( variant, 10 ) > 0 ) {
				headingStyles[ `h${ variant }` ] = {
					...variantValues[ variant ],
					...baseProps,
					// h1 uses the serif font, others use the default body font.
					fontFamily: variant.toString() === '1' ? 'serif' : 'body',
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
