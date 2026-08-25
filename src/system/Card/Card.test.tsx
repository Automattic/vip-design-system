/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createElement } from 'react';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Card } from './Card';
import { theme } from '../';

import type { Theme } from 'theme-ui';

const defaultProps = {};

// Theme UI emits colours as CSS custom properties by default, which jsdom cannot
// resolve, so `toHaveStyle` would see an empty background. Turning them off makes
// the theme emit literal values and keeps these assertions readable.
const testTheme = {
	...theme,
	config: { ...theme.config, useCustomProperties: false },
} as unknown as Theme;

const renderWithTheme = ( children: React.ReactNode ) =>
	render( <ThemeUIProvider theme={ testTheme }>{ children }</ThemeUIProvider> );

const layerTwo = ( theme.colors as unknown as Record< string, Record< string, string > > ).layer[
	'2'
];

describe( '<Card />', () => {
	it( 'renders the Card component', async () => {
		const { container } = render( <Card { ...defaultProps }>This is a Card</Card> );

		expect( screen.getByText( 'This is a Card' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Card component with a different variant', async () => {
		const { container } = render( <Card variant="primary">Card text</Card> );

		expect( screen.getByText( 'Card text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Card component with a title', async () => {
		const { container } = render( <Card title="Card Header">Card text</Card> );

		expect( screen.getByText( 'Card Header' ) ).toBeInTheDocument();

		expect( screen.getByText( 'Card text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'keeps the variant styles when the consumer passes an unrelated sx', () => {
		// `createElement` deliberately bypasses the theme-ui JSX pragma so that `sx`
		// reaches Card as a runtime prop, which is what a consumer that does not
		// compile with `importSource: 'theme-ui'` produces. Written as JSX, Babel
		// would compile `sx` away at the call site and never exercise this path.
		const { container } = renderWithTheme(
			createElement( Card, { sx: { marginTop: '8px' } }, 'Card text' )
		);

		const card = container.querySelector( '.vip-card-component' );

		// `cards.primary` supplies the surface; the consumer sx must add to it,
		// not replace it.
		expect( card ).toHaveStyle( { backgroundColor: layerTwo } );
		expect( card ).toHaveStyle( { marginTop: '8px' } );
	} );

	it( 'lets the consumer sx override a property the variant sets', () => {
		const { container } = renderWithTheme(
			createElement( Card, { sx: { backgroundColor: 'rgb(255, 0, 0)' } }, 'Card text' )
		);

		expect( container.querySelector( '.vip-card-component' ) ).toHaveStyle( {
			backgroundColor: 'rgb(255, 0, 0)',
		} );
	} );

	it( 'keeps its own class name when the consumer passes one', () => {
		const { container } = renderWithTheme( <Card className="custom-card">Card text</Card> );

		expect( container.querySelector( '.vip-card-component' ) ).toHaveClass( 'custom-card' );
	} );
} );
