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

	it( 'matches the snapshot for both modes', () => {
		expect( theme.colors ).toMatchSnapshot();
	} );
} );
