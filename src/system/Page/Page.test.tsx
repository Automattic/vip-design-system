/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Page } from './Page';
import theme from '../theme';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () => renderWithTheme( <Page /> );

describe( '<Page />', () => {
	it( 'renders the Page component', async () => {
		const { container } = renderComponent();

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
