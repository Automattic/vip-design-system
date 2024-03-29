/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Drawer } from './Drawer';
import { Button, theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Drawer label="Dialog example" sx={ { width: 320 } } trigger={ <Button>Open Drawer</Button> }>
			<p sx={ { ml: 3 } }>Hello from default</p>
		</Drawer>
	);

describe( '<Drawer />', () => {
	beforeAll( () => {
		Object.defineProperty( window, 'matchMedia', {
			value: jest.fn( () => {
				return {
					matches: true,
					addListener: jest.fn(),
					removeListener: jest.fn(),
				};
			} ),
		} );
	} );

	it( 'renders the Drawer component', async () => {
		const { container } = renderComponent();

		const trigger = screen.getByRole( 'button', { name: 'Open Drawer' } );

		expect( trigger ).toBeInTheDocument();

		fireEvent.click( trigger );

		expect( screen.getByText( 'Hello from default' ) ).toBeInTheDocument();

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
