/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Hr } from './Hr';
import theme from '../theme';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () => renderWithTheme( <Hr /> );

describe( '<Hr />', () => {
	it( 'renders the Hr component', async () => {
		const { container } = renderComponent();

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
