/**
 * External dependencies
 */
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

/**
 * Mock ResizeObserver for Radix UI components
 */
global.ResizeObserver = jest.fn().mockImplementation( () => ( {
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
} ) );

/**
 * Mock IntersectionObserver for Radix UI components
 */
global.IntersectionObserver = jest.fn().mockImplementation( () => ( {
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
} ) );

/**
 * Mock window.matchMedia for responsive tests
 */
Object.defineProperty( window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation( query => ( {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	} ) ),
} );
