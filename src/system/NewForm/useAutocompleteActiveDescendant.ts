/**
 * External dependencies
 */
import { type RefObject, useEffect } from 'react';

const ATTRIBUTE = 'aria-activedescendant';
const INPUT_SELECTOR = 'input.autocomplete__input';

// `accessible-autocomplete` renders `aria-activedescendant="false"` whenever no option is
// highlighted. The attribute takes an element ID, so that value is invalid, as is an empty one.
const removeInvalidValue = ( input: Element ) => {
	const value = input.getAttribute( ATTRIBUTE );

	if ( value === 'false' || value === '' ) {
		input.removeAttribute( ATTRIBUTE );
	}
};

/**
 * Keeps `aria-activedescendant` off the autocomplete input inside `wrapperRef` unless it
 * holds an option ID. The vendor writes the invalid value again each time a highlight
 * ends, so the input is watched for as long as the component is mounted.
 *
 * @param wrapperRef Root element of one autocomplete instance.
 * @param rebindKey  Changes when the instance swaps its root element.
 */
export const useAutocompleteActiveDescendant = (
	wrapperRef: RefObject< HTMLDivElement | null >,
	rebindKey?: unknown
): void => {
	useEffect( () => {
		const wrapper = wrapperRef.current;

		if ( ! wrapper ) {
			return;
		}

		wrapper.querySelectorAll( INPUT_SELECTOR ).forEach( removeInvalidValue );

		if ( typeof MutationObserver === 'undefined' ) {
			return;
		}

		const observer = new MutationObserver( mutations => {
			mutations.forEach( ( { target } ) => {
				if ( target instanceof Element && target.matches( INPUT_SELECTOR ) ) {
					removeInvalidValue( target );
				}
			} );
		} );

		observer.observe( wrapper, {
			subtree: true,
			attributes: true,
			attributeFilter: [ ATTRIBUTE ],
		} );

		return () => observer.disconnect();
	}, [ wrapperRef, rebindKey ] );
};
