/**
 * External dependencies
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ThemeUIStyleObject } from 'theme-ui';

/** Width of the gradient that fades out items running past a scrollable edge. */
const FADE_WIDTH = '2rem';

export interface ScrollEdges {
	/** Whether there are items scrolled off the leading edge. */
	start: boolean;
	/** Whether there are items still to come past the trailing edge. */
	end: boolean;
}

export interface UseScrollableTabsOptions {
	/** Selector matching the active item, relative to the scroll container. */
	activeSelector: string;
	/**
	 * Attributes whose changes mark a different item as active. Read once when the
	 * observer is attached, so it is not expected to vary over a component's life.
	 */
	attributeFilter: string[];
	/** Resolve the scroll container from the ref'd node. Defaults to identity. */
	resolveScroller?: ( node: HTMLElement ) => HTMLElement | null;
	/**
	 * Whether to track scrolling at all. Register nothing when false, so variants
	 * that never scroll pay no listener or observer cost.
	 * @default true
	 */
	enabled?: boolean;
}

const NO_EDGES: ScrollEdges = { start: false, end: false };

/**
 * Builds a mask that fades whichever edge has more items beyond it. A mask is used
 * instead of a gradient painted in a background colour so the fade works on any
 * surface, in both the light and dark themes, without knowing what sits behind it.
 */
export const getFadeStyles = ( { start, end }: ScrollEdges ): ThemeUIStyleObject => {
	if ( ! start && ! end ) {
		return {};
	}

	const from = start ? `transparent 0, black ${ FADE_WIDTH }` : 'black 0';
	const to = end ? `black calc(100% - ${ FADE_WIDTH }), transparent 100%` : 'black 100%';
	const image = `linear-gradient(to right, ${ from }, ${ to })`;

	return { maskImage: image, WebkitMaskImage: image };
};

/**
 * Tracks a horizontally scrolling strip of tabs: which edges still have items
 * beyond them, and keeping the active item in view when it changes.
 *
 * Shared by `TabsList` and `Nav`, whose scroll containers sit in different places —
 * `TabsList` owns its scroller, while Radix's NavigationMenu renders one that VDS
 * can only reach as the list's parent. `resolveScroller` bridges that difference.
 *
 * The returned `ref` goes on the element the consumer controls; the container it
 * resolves to is deliberately never made focusable, since both consumers already
 * keep their items in the tab order.
 */
export const useScrollableTabs = ( options: UseScrollableTabsOptions ) => {
	const { enabled = true } = options;
	const ref = useRef< HTMLElement | null >( null );
	const [ edges, setEdges ] = useState< ScrollEdges >( NO_EDGES );

	// Callers pass these as object literals, so their identities change every render.
	// Keeping the latest in a ref lets the effects below key on `enabled` alone. If they
	// keyed on the options themselves they would re-subscribe on every render — and
	// re-run the reveal effect, which scrolls the active item back into view and so
	// fights the user mid-drag every time the edge state flips.
	const optionsRef = useRef( options );

	useEffect( () => {
		optionsRef.current = options;
	} );

	const getScroller = useCallback( (): HTMLElement | null => {
		const node = ref.current;

		if ( ! node ) {
			return null;
		}

		const { resolveScroller } = optionsRef.current;

		return resolveScroller ? resolveScroller( node ) : node;
	}, [] );

	const updateEdges = useCallback( () => {
		const node = getScroller();

		if ( ! node ) {
			return;
		}

		// `Math.abs` keeps this working under RTL, where `scrollLeft` counts down from 0.
		// The fades themselves are still laid out left-to-right; RTL is not supported yet.
		const offset = Math.abs( node.scrollLeft );
		const maxScroll = node.scrollWidth - node.clientWidth;

		setEdges( previous => {
			const next = { start: offset > 1, end: offset < maxScroll - 1 };

			// Bail out when nothing moved, otherwise the ResizeObserver below can loop.
			return previous.start === next.start && previous.end === next.end ? previous : next;
		} );
	}, [ getScroller ] );

	useEffect( () => {
		const node = enabled ? getScroller() : null;

		if ( ! node ) {
			return;
		}

		updateEdges();
		node.addEventListener( 'scroll', updateEdges, { passive: true } );

		let observer: ResizeObserver | undefined;

		if ( typeof ResizeObserver !== 'undefined' ) {
			observer = new ResizeObserver( updateEdges );
			observer.observe( node );

			// Watch the list too, so relabelled or added items update the fades.
			if ( node.firstElementChild ) {
				observer.observe( node.firstElementChild );
			}
		}

		return () => {
			node.removeEventListener( 'scroll', updateEdges );
			observer?.disconnect();
		};
	}, [ enabled, getScroller, updateEdges ] );

	useEffect( () => {
		const node = enabled ? getScroller() : null;

		if ( ! node ) {
			return;
		}

		const reveal = ( behavior: ScrollBehavior ) => {
			const active = node.querySelector< HTMLElement >( optionsRef.current.activeSelector );

			// `block: 'nearest'` keeps this from scrolling the page vertically.
			active?.scrollIntoView?.( { behavior, block: 'nearest', inline: 'nearest' } );
		};

		reveal( 'auto' );

		if ( typeof MutationObserver === 'undefined' ) {
			return;
		}

		// Neither primitive scrolls a newly active item into view, which matters when
		// the active item is set from outside rather than by a click on the item.
		const observer = new MutationObserver( () => {
			const prefersReducedMotion = window.matchMedia?.(
				'(prefers-reduced-motion: reduce)'
			)?.matches;

			reveal( prefersReducedMotion ? 'auto' : 'smooth' );
		} );

		observer.observe( node, {
			subtree: true,
			attributes: true,
			attributeFilter: optionsRef.current.attributeFilter,
		} );

		return () => observer.disconnect();
	}, [ enabled, getScroller ] );

	return { ref, edges, fadeStyles: getFadeStyles( edges ) };
};
