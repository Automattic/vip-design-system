/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Wizard } from './Wizard';
import { theme } from '../';

jest.mock( '@theme-ui/match-media' );

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const steps = [
	{ title: 'Salesforce Domain', children: <div>Domain content</div> },
	{ title: 'Install Packages' },
	{ title: 'Connect to Salesforce' },
];

describe( '<Wizard /> error state', () => {
	it( 'marks an errored step with the error status class', () => {
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ steps } errored={ [ 0 ] } />
		);

		expect( container.querySelector( '.wizard-step-error' ) ).toBeInTheDocument();
	} );

	it( 'still renders the active step content when it is in an error state', () => {
		renderWithTheme( <Wizard activeStep={ 0 } steps={ steps } errored={ [ 0 ] } /> );

		expect( screen.getByText( 'Domain content' ) ).toBeInTheDocument();
	} );

	it( 'announces the error status to screen readers', () => {
		renderWithTheme( <Wizard activeStep={ 0 } steps={ steps } errored={ [ 0 ] } /> );

		expect( screen.getByText( /Step has an error/i ) ).toBeInTheDocument();
	} );

	it( 'does not apply the error status to steps that are not errored', () => {
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ steps } errored={ [ 0 ] } />
		);

		// Only one step should carry the error status.
		expect( container.querySelectorAll( '.wizard-step-error' ) ).toHaveLength( 1 );
	} );

	it( 'has no accessibility violations in the error state', async () => {
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ steps } errored={ [ 0 ] } />
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'hides the subtitle of an errored step, showing only its error content', () => {
		const errorSteps = [
			{ title: 'Step One', subTitle: 'Step instructions', children: <div>Error body</div> },
		];
		renderWithTheme( <Wizard activeStep={ 0 } steps={ errorSteps } errored={ [ 0 ] } /> );

		expect( screen.queryByText( 'Step instructions' ) ).not.toBeInTheDocument();
		expect( screen.getByText( 'Error body' ) ).toBeInTheDocument();
	} );

	it( 'shows the subtitle of an active step that is not errored', () => {
		const okSteps = [
			{ title: 'Step One', subTitle: 'Step instructions', children: <div>Body</div> },
		];
		renderWithTheme( <Wizard activeStep={ 0 } steps={ okSteps } /> );

		expect( screen.getByText( 'Step instructions' ) ).toBeInTheDocument();
	} );
} );

describe( '<Wizard /> title element and style', () => {
	it( 'renders step titles as h3 elements by default', () => {
		const { container } = renderWithTheme( <Wizard activeStep={ 0 } steps={ steps } /> );

		expect( container.querySelectorAll( 'h3' ) ).toHaveLength( steps.length );
	} );

	it( 'applies a Wizard-level titleAs element to every step', () => {
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ steps } titleAs="h2" />
		);

		expect( container.querySelectorAll( 'h2' ) ).toHaveLength( steps.length );
		expect( container.querySelectorAll( 'h3' ) ).toHaveLength( 0 );
	} );

	it( 'lets a step override the Wizard-level titleAs', () => {
		const overrideSteps = [ { title: 'Step One' }, { title: 'Step Two', titleAs: 'h4' as const } ];
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ overrideSteps } titleAs="h2" />
		);

		// One inherits the Wizard default (h2), the other overrides to h4.
		expect( container.querySelectorAll( 'h2' ) ).toHaveLength( 1 );
		expect( container.querySelectorAll( 'h4' ) ).toHaveLength( 1 );
	} );

	it( 'keeps titleVariant styling while titleAs changes the element', () => {
		const { container } = renderWithTheme(
			<Wizard
				activeStep={ 0 }
				steps={ [ { title: 'Only Step' } ] }
				titleVariant="h3"
				titleAs="h2"
			/>
		);

		// The rendered element is an h2 that still carries the shared heading class
		// (typographic variant is driven by titleVariant, not the element).
		const heading = container.querySelector( 'h2.vip-heading-component' );
		expect( heading ).toBeInTheDocument();
	} );

	it( 'has no accessibility violations when using a custom title element', async () => {
		const { container } = renderWithTheme(
			<Wizard activeStep={ 0 } steps={ steps } titleAs="h2" />
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
