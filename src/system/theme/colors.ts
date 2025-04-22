/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

// Define a basic type for the input theme object expected by this function
// This assumes the input 'theme' has a 'color' property which itself has 'gray'
// Adjust this type if the actual structure passed is different
export interface ColorBuilderInput {
	color?: {
		gray?: any; // Use 'any' for now, or define gray scale structure if known
		[key: string]: any;
	};
}

// Define the return type - likely a flat object of color strings
export type ColorBuilderOutput = Record<string, any>; // Use Record<string, string> if all values are strings

export default ( theme: ColorBuilderInput ): ColorBuilderOutput => ( {
	...( theme.color ?? {} ),
	grey: theme.color?.gray,
} );
