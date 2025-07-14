/** @jsxImportSource theme-ui */

/**
 * @file This file exports a factory function that processes the color palette of a theme.
 * It primarily spreads the existing color definitions and adds a `grey` alias for the `gray` color scale.
 * This is useful for maintaining backward compatibility or providing alternative naming conventions.
 */

/**
 * Takes a theme object and returns a processed color object.
 *
 * @param {object} theme The theme object, which should contain a `color` property.
 * @returns {object} A new color object with all the original colors and an added `grey` alias.
 */
export default theme => ( {
	...theme.color,
	// Add `grey` as an alias for `gray` for convenience and backward compatibility.
	grey: theme.color.gray,
} );
