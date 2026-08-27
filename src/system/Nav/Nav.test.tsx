/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Nav, VIP_NAV } from './Nav';
import { NavItem } from './NavItem';
import { Link, theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Nav.Primary variant="primary" label="Main">
			<NavItem.Primary as={ Link } href="#">
				PHP
			</NavItem.Primary>
			<NavItem.Primary as={ Link } href="https://wordpress.com">
				WordPress
			</NavItem.Primary>
			<NavItem.Primary as={ Link } active href="https://newrelic.com/">
				New Relic
			</NavItem.Primary>
			<NavItem.Primary as={ Link } disabled href="https://google.com/">
				Not accessible
			</NavItem.Primary>
		</Nav.Primary>
	);

describe( '<Nav />', () => {
	it( 'renders the Nav component with default value visible', async () => {
		const { container } = renderComponent();

		// Should find the nav label
		expect( screen.getByLabelText( 'Main' ) ).toBeInTheDocument();

		// Should find all links
		expect( screen.queryByText( 'PHP' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'WordPress' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'New Relic' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Not accessible' ) ).toHaveAttribute( 'aria-disabled', 'true' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );

const scrollIntoView = jest.fn();

beforeAll( () => {
	if ( ! global.ResizeObserver ) {
		global.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		};
	}

	// jsdom does not implement scrollIntoView.
	Element.prototype.scrollIntoView = scrollIntoView;
} );

beforeEach( () => {
	jest.clearAllMocks();
} );

const renderTabs = () =>
	renderWithTheme(
		<Nav.Tab label="Insights">
			<NavItem.Tab as={ Link } href="#overview">
				Overview
			</NavItem.Tab>
			<NavItem.Tab as={ Link } href="#requests">
				Requests
			</NavItem.Tab>
			<NavItem.Tab as={ Link } active href="#cache">
				Cache Hit Ratio
			</NavItem.Tab>
			<NavItem.Tab as={ Link } href="#errors">
				Errors
			</NavItem.Tab>
		</Nav.Tab>
	);

// Radix renders the scroll container between the <nav> and the <ul>, and it is not
// otherwise addressable from the component API.
const getScroller = ( container: HTMLElement ) =>
	container.querySelector( `.${ VIP_NAV }-list` ).parentElement;

/** Fakes the layout metrics jsdom never computes, then fires a scroll event. */
const setScrollMetrics = (
	node: HTMLElement,
	{
		scrollLeft,
		clientWidth,
		scrollWidth,
	}: { scrollLeft: number; clientWidth: number; scrollWidth: number }
) => {
	Object.defineProperty( node, 'clientWidth', { value: clientWidth, configurable: true } );
	Object.defineProperty( node, 'scrollWidth', { value: scrollWidth, configurable: true } );
	Object.defineProperty( node, 'scrollLeft', { value: scrollLeft, configurable: true } );

	fireEvent.scroll( node );
};

describe( '<Nav.Tab />', () => {
	it( 'has no accessibility violations', async () => {
		const { container } = renderTabs();

		expect( screen.getByLabelText( 'Insights' ) ).toBeInTheDocument();
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'flags the scrollable edges as the list is scrolled', () => {
		const { container } = renderTabs();
		const nav = screen.getByLabelText( 'Insights' );
		const scroller = getScroller( container );

		// Not scrolled yet: only the trailing edge has more items beyond it.
		setScrollMetrics( scroller, { scrollLeft: 0, clientWidth: 200, scrollWidth: 600 } );
		expect( nav ).not.toHaveAttribute( 'data-scroll-start' );
		expect( nav ).toHaveAttribute( 'data-scroll-end' );

		// Mid-scroll: items beyond both edges.
		setScrollMetrics( scroller, { scrollLeft: 150, clientWidth: 200, scrollWidth: 600 } );
		expect( nav ).toHaveAttribute( 'data-scroll-start' );
		expect( nav ).toHaveAttribute( 'data-scroll-end' );

		// Scrolled to the end.
		setScrollMetrics( scroller, { scrollLeft: 400, clientWidth: 200, scrollWidth: 600 } );
		expect( nav ).toHaveAttribute( 'data-scroll-start' );
		expect( nav ).not.toHaveAttribute( 'data-scroll-end' );
	} );

	it( 'flags no edges when every item fits', () => {
		const { container } = renderTabs();
		const nav = screen.getByLabelText( 'Insights' );

		setScrollMetrics( getScroller( container ), {
			scrollLeft: 0,
			clientWidth: 600,
			scrollWidth: 600,
		} );

		expect( nav ).not.toHaveAttribute( 'data-scroll-start' );
		expect( nav ).not.toHaveAttribute( 'data-scroll-end' );
	} );

	it( 'does not make the scroll container focusable', () => {
		const { container } = renderTabs();

		// The links are already in the tab order, so a focusable scroller would only
		// add a redundant tab stop ahead of them.
		expect( getScroller( container ) ).not.toHaveAttribute( 'tabindex' );
	} );

	it( 'scrolls the active item into view on mount', () => {
		renderTabs();

		expect( scrollIntoView ).toHaveBeenCalled();
	} );

	it( 'does not scroll the active item back into view while the user scrolls', () => {
		// Regression: `resolveScroller` is passed as a literal, so its identity changes
		// every render. When the hook's effects keyed on it they re-subscribed — and
		// re-ran the reveal below — each time the edge state flipped, snapping the strip
		// back to the active item mid-drag.
		const { container } = renderTabs();
		const scroller = getScroller( container );

		scrollIntoView.mockClear();

		setScrollMetrics( scroller, { scrollLeft: 0, clientWidth: 200, scrollWidth: 600 } );
		setScrollMetrics( scroller, { scrollLeft: 150, clientWidth: 200, scrollWidth: 600 } );
		setScrollMetrics( scroller, { scrollLeft: 400, clientWidth: 200, scrollWidth: 600 } );

		expect( scrollIntoView ).not.toHaveBeenCalled();
	} );

	it( 'leaves non-tab variants alone', () => {
		const { container } = renderComponent();

		expect( screen.getByLabelText( 'Main' ) ).not.toHaveAttribute( 'data-scroll-end' );
		expect( scrollIntoView ).not.toHaveBeenCalled();
		expect( getScroller( container ) ).not.toHaveAttribute( 'tabindex' );
	} );
} );
