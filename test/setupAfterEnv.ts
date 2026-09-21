/**
 * External dependencies
 */
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

// jsdom implements neither; Radix poppers and useScrollableTabs call both.
window.ResizeObserver ??= class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
};

if ( typeof Element.prototype.scrollIntoView !== 'function' ) {
	Element.prototype.scrollIntoView = () => {};
}
