export interface RawTokenValue {
	value: string | number | { [ key: string ]: string | number }; // Allow simple values or nested objects like font styles
	type: string;
	description?: string;
}

// Represents a group that can contain token values or further nested groups
export interface RawTokenGroup {
	[ key: string ]: RawTokenValue | RawTokenGroup;
}

// Define the top-level structure based on valet-theme-light.json
// Add more top-level keys as needed if they exist in the JSON
export interface RawThemeTokens {
	space: RawTokenGroup;
	borderRadius: RawTokenGroup;
	background: RawTokenGroup;
	layer: RawTokenGroup;
	input: RawTokenGroup;
	border: RawTokenGroup;
	text: RawTokenGroup;
	link: RawTokenGroup;
	heading: RawTokenGroup;
	support: RawTokenGroup;
	fontWeight: RawTokenGroup;
	lineHeight: RawTokenGroup;
	fontSize: RawTokenGroup;
	color: RawTokenGroup; // Contains 'gray' and potentially others
	logs: RawTokenGroup;
	button: RawTokenGroup;
	toolbar: RawTokenGroup;
	icon: RawTokenGroup;
	tag: RawTokenGroup;
	breakpoint: RawTokenGroup;
	'option-row': RawTokenGroup; // Handle kebab-case keys
	// Add other top-level keys observed in the JSON if necessary
}
