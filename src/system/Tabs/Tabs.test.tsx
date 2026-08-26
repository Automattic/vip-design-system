/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.';
import { theme } from '../';

import type { Theme } from 'theme-ui';

// Theme UI emits theme values as CSS custom properties by default, which jsdom
// cannot resolve. Turning them off makes the theme emit literal values so
// `toHaveStyle` can see them.
const testTheme = {
	...theme,
	config: { ...theme.config, useCustomProperties: false },
} as unknown as Theme;

const renderWithTheme = ( children: React.ReactNode ) =>
	render( <ThemeUIProvider theme={ testTheme }>{ children }</ThemeUIProvider> );

const space = theme.space as unknown as Record< string, number >;

const scrollIntoView = jest.fn();

beforeAll( () => {
	if ( ! global.ResizeObserver ) {
		global.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as typeof ResizeObserver;
	}

	// jsdom does not implement scrollIntoView.
	Element.prototype.scrollIntoView = scrollIntoView;
} );

beforeEach( () => {
	jest.clearAllMocks();
} );

const renderTabs = ( { defaultValue = 'all' } = {} ) =>
	renderWithTheme(
		<Tabs defaultValue={ defaultValue }>
			<TabsList title="See all the content">
				<TabsTrigger value="all">All (5)</TabsTrigger>
				<TabsTrigger value="live">Live (2)</TabsTrigger>
				<TabsTrigger value="dev">In Development (3)</TabsTrigger>
			</TabsList>
			<TabsContent value="all">All content</TabsContent>
			<TabsContent value="live">Live content</TabsContent>
			<TabsContent value="dev">In Development content</TabsContent>
		</Tabs>
	);

const getScroller = ( container: HTMLElement ) =>
	container.querySelector< HTMLElement >( '.vip-tabs-list-scroller' ) as HTMLElement;

/** Fakes the layout metrics jsdom never computes, then fires a scroll event. */
const setScrollMetrics = (
	node: HTMLElement,
	{ scrollLeft, clientWidth, scrollWidth }: Record< string, number >
) => {
	Object.defineProperty( node, 'clientWidth', { value: clientWidth, configurable: true } );
	Object.defineProperty( node, 'scrollWidth', { value: scrollWidth, configurable: true } );
	Object.defineProperty( node, 'scrollLeft', { value: scrollLeft, configurable: true } );

	fireEvent.scroll( node );
};

describe( '<Tabs />', () => {
	it( 'has no accessibility violations', async () => {
		const { container } = renderTabs();

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'labels the tab list and keeps the triggers inside it', () => {
		renderTabs();

		const tablist = screen.getByRole( 'tablist', { name: 'See all the content' } );

		expect( tablist ).toBeInTheDocument();
		expect( screen.getAllByRole( 'tab' ) ).toHaveLength( 3 );
		screen.getAllByRole( 'tab' ).forEach( tab => expect( tab.parentElement ).toBe( tablist ) );
	} );

	it( 'does not make the scroll container focusable', () => {
		const { container } = renderTabs();

		// The triggers carry a roving tabindex, so a focusable scroller would only add
		// a redundant tab stop ahead of the tabs.
		expect( getScroller( container ) ).not.toHaveAttribute( 'tabindex' );
	} );

	it( 'moves between tabs with the arrow keys', async () => {
		const user = userEvent.setup();

		renderTabs();

		await user.tab();
		expect( screen.getByRole( 'tab', { name: 'All (5)' } ) ).toHaveFocus();

		await user.keyboard( '{ArrowRight}' );

		const live = screen.getByRole( 'tab', { name: 'Live (2)' } );

		expect( live ).toHaveFocus();
		expect( live ).toHaveAttribute( 'aria-selected', 'true' );
		expect( screen.getByText( 'Live content' ) ).toBeInTheDocument();
	} );

	it( 'flags the scrollable edges as the list is scrolled', () => {
		const { container } = renderTabs();
		const scroller = getScroller( container );

		// Not scrolled yet: only the trailing edge has more tabs beyond it.
		setScrollMetrics( scroller, { scrollLeft: 0, clientWidth: 200, scrollWidth: 600 } );
		expect( scroller ).not.toHaveAttribute( 'data-scroll-start' );
		expect( scroller ).toHaveAttribute( 'data-scroll-end' );

		// Mid-scroll: tabs beyond both edges.
		setScrollMetrics( scroller, { scrollLeft: 150, clientWidth: 200, scrollWidth: 600 } );
		expect( scroller ).toHaveAttribute( 'data-scroll-start' );
		expect( scroller ).toHaveAttribute( 'data-scroll-end' );

		// Scrolled to the end.
		setScrollMetrics( scroller, { scrollLeft: 400, clientWidth: 200, scrollWidth: 600 } );
		expect( scroller ).toHaveAttribute( 'data-scroll-start' );
		expect( scroller ).not.toHaveAttribute( 'data-scroll-end' );
	} );

	it( 'flags no edges when every tab fits', () => {
		const { container } = renderTabs();
		const scroller = getScroller( container );

		setScrollMetrics( scroller, { scrollLeft: 0, clientWidth: 600, scrollWidth: 600 } );

		expect( scroller ).not.toHaveAttribute( 'data-scroll-start' );
		expect( scroller ).not.toHaveAttribute( 'data-scroll-end' );
	} );

	it( 'scrolls the active tab into view on mount', () => {
		renderTabs( { defaultValue: 'dev' } );

		expect( scrollIntoView ).toHaveBeenCalled();
		expect( screen.getByRole( 'tab', { name: 'In Development (3)' } ) ).toHaveAttribute(
			'aria-selected',
			'true'
		);
	} );

	it( 'scrolls a newly active tab into view when the value is controlled', async () => {
		const user = userEvent.setup();

		const Controlled = () => {
			const [ value, setValue ] = React.useState( 'all' );

			return (
				<>
					<button type="button" onClick={ () => setValue( 'dev' ) }>
						Go to dev
					</button>
					<Tabs value={ value } onValueChange={ setValue }>
						<TabsList title="See all the content">
							<TabsTrigger value="all">All (5)</TabsTrigger>
							<TabsTrigger value="dev">In Development (3)</TabsTrigger>
						</TabsList>
						<TabsContent value="all">All content</TabsContent>
						<TabsContent value="dev">In Development content</TabsContent>
					</Tabs>
				</>
			);
		};

		renderWithTheme( <Controlled /> );
		// Ignore the scroll-into-view that every mount performs.
		scrollIntoView.mockClear();

		await user.click( screen.getByRole( 'button', { name: 'Go to dev' } ) );

		expect( scrollIntoView ).toHaveBeenCalled();
	} );

	it( 'merges a consumer sx and className into the tab list', () => {
		renderWithTheme(
			<Tabs defaultValue="all">
				<TabsList title="See all the content" className="custom-list" sx={ { pt: 4 } }>
					<TabsTrigger value="all">All (5)</TabsTrigger>
				</TabsList>
				<TabsContent value="all">All content</TabsContent>
			</Tabs>
		);

		const tablist = screen.getByRole( 'tablist', { name: 'See all the content' } );

		expect( tablist ).toHaveClass( 'vip-tabs-list', 'custom-list' );
		// The consumer override resolves against the token scale, and the component's
		// own display style survives it.
		expect( tablist ).toHaveStyle( {
			display: 'flex',
			paddingTop: `${ space[ '4' ] }px`,
		} );
	} );
} );
