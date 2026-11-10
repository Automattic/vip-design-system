/**
 * Internal dependencies
 */
import theme from '.';
import ValetDark from './generated/valet-theme-dark.json';
import Valet from './generated/valet-theme-light.json';
import ThemeBuilder from './getPropValue';

const { getPropValue: lightToken } = ThemeBuilder( Valet );
const { getPropValue: darkToken } = ThemeBuilder( ValetDark );

const light = theme.colors;
const dark = theme.colors.modes.dark;

// The top-level string entries are the aliases components reference directly;
// the nested token groups underneath them are generated and change with every
// token update, so they are left out of the snapshot.
const aliases = ( colors: Record< string, unknown > ) =>
	Object.fromEntries(
		Object.entries( colors ).filter( ( [ , value ] ) => typeof value === 'string' )
	);

describe( 'theme colors', () => {
	it.each( [
		[ 'secondary', 'text', 'secondary' ],
		[ 'dialog', 'background', 'primary' ],
		[ 'card', 'layer', '2' ],
	] )( 'resolves "%s" from the %s.%s token in both modes', ( alias, group, variant ) => {
		expect( light[ alias ] ).toBe( lightToken( group, variant ) );
		expect( dark[ alias ] ).toBe( darkToken( group, variant ) );
	} );

	it.each( [
		[ 'hover', light.hover, dark.hover ],
		[ 'darken', light.darken, dark.darken ],
		[ 'optionRow.hover', light.optionRow.hover, dark.optionRow.hover ],
	] )(
		'uses a dark overlay for "%s" in light mode and a light one in dark mode',
		( _, onLight, onDark ) => {
			expect( onLight ).toMatch( /^rgba\(0, ?0, ?0,/ );
			expect( onDark ).toMatch( /^rgba\(255, ?255, ?255,/ );
		}
	);

	it( 'keeps the colour aliases of both modes stable', () => {
		expect( {
			light: aliases( light as Record< string, unknown > ),
			dark: aliases( dark as Record< string, unknown > ),
		} ).toMatchInlineSnapshot( `
		{
		  "dark": {
		    "background": "#282625",
		    "backgroundMuted": "#1b1918",
		    "backgroundSecondary": "#1b1918",
		    "black": "#13191e",
		    "border": "#4c4948",
		    "brand": "#c5832a",
		    "card": "#282625",
		    "darken": "rgba(255,255,255,.08)",
		    "dialog": "#141110",
		    "disabled": "#383635",
		    "error": "#ffb0a1",
		    "focus": "#0F62FE",
		    "heading": "#e3e0df",
		    "hover": "rgba(255,255,255,.04)",
		    "info": "#94d4de",
		    "link": "#c5832a",
		    "midnight": "#514e4d",
		    "muted": "#9b9796",
		    "placeholder": "#8f8c8b",
		    "primary": "#514e4d",
		    "pure-black": "#000000",
		    "pure-white": "#ffffff",
		    "secondary": "#a7a4a3",
		    "success": "#89daa0",
		    "text": "#a7a4a3",
		    "warning": "#ffb84a",
		  },
		  "light": {
		    "background": "#ffffff",
		    "backgroundMuted": "#f4f3f2",
		    "backgroundSecondary": "#f4f3f2",
		    "black": "#13191e",
		    "border": "#bfbcbb",
		    "brand": "#9a6014",
		    "card": "#ffffff",
		    "darken": "rgba(0,0,0,.05)",
		    "dialog": "#fbfbfb",
		    "disabled": "#cbc7c6",
		    "error": "#bf2a23",
		    "focus": "#0F62FE",
		    "heading": "#13191e",
		    "hover": "rgba(0,0,0,.02)",
		    "info": "#006979",
		    "link": "#9a6014",
		    "midnight": "#13191e",
		    "muted": "#6a6766",
		    "placeholder": "#767372",
		    "primary": "#13191e",
		    "pure-black": "#000000",
		    "pure-white": "#ffffff",
		    "secondary": "#514e4d",
		    "success": "#007934",
		    "text": "#514e4d",
		    "warning": "#985600",
		  },
		}
	` );
	} );
} );
