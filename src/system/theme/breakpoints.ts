/**
 * @file This file provides a utility function for processing theme breakpoints.
 * It converts a map of named breakpoints into an array of pixel-based media query strings,
 * which is the format expected by Theme UI.
 */

/**
 * Defines the type for a breakpoints object, which maps breakpoint names to numeric pixel values.
 * e.g., `{ mobile: 320, tablet: 768 }`
 */
type Breakpoints = {
	[ key: string ]: number;
};

/**
 * Converts a breakpoints object into an array of pixel-based strings for use in media queries.
 * The function ensures that the first breakpoint is always `0px`.
 *
 * @param {Breakpoints} breakpoints - An object where keys are breakpoint names and values are numbers.
 * @returns {string[]} An array of breakpoint strings, e.g., `['0px', '768px', '1024px']`.
 */
export const generateBreakpoints = ( breakpoints: Breakpoints ) => {
	const values = Object.values( breakpoints );

	return values.map( ( bp, index ) => {
		if ( index === 0 ) {
			return `0px`;
		}

		return `${ bp }px`;
	} );
};
