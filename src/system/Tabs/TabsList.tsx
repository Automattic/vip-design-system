/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames, { Argument } from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';

import type { ThemeUIStyleObject } from 'theme-ui';

export interface TabsListProps
	extends Omit< React.ComponentPropsWithoutRef< typeof TabsPrimitive.List >, 'className' > {
	/** Accessible label for the tab list, used as the `aria-label` attribute. */
	title: string;
	/** The TabsTrigger elements to render inside the list. */
	children: React.ReactNode;
	/** Additional CSS class name(s) applied to the tab list element. */
	className?: Argument;
	/** Theme UI style overrides applied to the tab list element. */
	sx?: ThemeUIStyleObject;
	/** Forwarded ref to the underlying tab list element. */
	ref?: React.Ref< HTMLDivElement >;
}

interface ScrollEdges {
	start: boolean;
	end: boolean;
}

/** Width of the gradient that fades out tabs running past a scrollable edge. */
const FADE_WIDTH = '2rem';

/**
 * Builds a mask that fades whichever edge has more tabs beyond it. A mask is used
 * instead of a gradient painted in a background colour so the fade works on any
 * surface, in both the light and dark themes, without knowing what sits behind it.
 */
const getFadeStyles = ( { start, end }: ScrollEdges ): ThemeUIStyleObject => {
	if ( ! start && ! end ) {
		return {};
	}

	const from = start ? `transparent 0, black ${ FADE_WIDTH }` : 'black 0';
	const to = end ? `black calc(100% - ${ FADE_WIDTH }), transparent 100%` : 'black 100%';
	const image = `linear-gradient(to right, ${ from }, ${ to })`;

	return { maskImage: image, WebkitMaskImage: image };
};

/**
 * TabsList — Container for TabsTrigger elements. Renders as a horizontal list with a
 * bottom border that scrolls sideways when the triggers no longer fit, fading the
 * edge that has more tabs beyond it.
 *
 * The scroll container deliberately has no `tabIndex`: Radix gives the triggers a
 * roving tabindex, so the list always holds a focusable button and arrow keys already
 * reach every tab. Making the container focusable would only add a redundant tab stop.
 */
const TabsList = ( { children, title, className, sx, ref, ...props }: TabsListProps ) => {
	const scrollerRef = useRef< HTMLDivElement >( null );
	const [ edges, setEdges ] = useState< ScrollEdges >( { start: false, end: false } );

	const updateEdges = useCallback( () => {
		const node = scrollerRef.current;

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
	}, [] );

	useEffect( () => {
		const node = scrollerRef.current;

		if ( ! node ) {
			return;
		}

		updateEdges();
		node.addEventListener( 'scroll', updateEdges, { passive: true } );

		let observer: ResizeObserver | undefined;

		if ( typeof ResizeObserver !== 'undefined' ) {
			observer = new ResizeObserver( updateEdges );
			observer.observe( node );

			// Watch the list too, so relabelled or added triggers update the fades.
			if ( node.firstElementChild ) {
				observer.observe( node.firstElementChild );
			}
		}

		return () => {
			node.removeEventListener( 'scroll', updateEdges );
			observer?.disconnect();
		};
	}, [ updateEdges ] );

	useEffect( () => {
		const node = scrollerRef.current;

		if ( ! node ) {
			return;
		}

		const reveal = ( behavior: ScrollBehavior ) => {
			const active = node.querySelector< HTMLElement >( '[role="tab"][data-state="active"]' );

			// `block: 'nearest'` keeps this from scrolling the page vertically.
			active?.scrollIntoView?.( { behavior, block: 'nearest', inline: 'nearest' } );
		};

		reveal( 'auto' );

		if ( typeof MutationObserver === 'undefined' ) {
			return;
		}

		// Radix does not scroll a newly active tab into view, which matters when the
		// active tab is set from outside (controlled `value`) rather than by a click.
		const observer = new MutationObserver( () => {
			const prefersReducedMotion = window.matchMedia?.(
				'(prefers-reduced-motion: reduce)'
			)?.matches;

			reveal( prefersReducedMotion ? 'auto' : 'smooth' );
		} );

		observer.observe( node, {
			subtree: true,
			attributes: true,
			attributeFilter: [ 'data-state' ],
		} );

		return () => observer.disconnect();
	}, [] );

	return (
		<Box
			ref={ scrollerRef }
			className="vip-tabs-list-scroller"
			data-scroll-start={ edges.start || undefined }
			data-scroll-end={ edges.end || undefined }
			sx={ {
				overflowX: 'auto',
				// Explicit, so the horizontal scroll does not coerce this to `auto` too.
				overflowY: 'hidden',
				// Room for the 3px focus halo on the triggers, which `overflow` would
				// otherwise clip. The negative margin cancels it, leaving layout untouched.
				py: '4px',
				my: '-4px',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
				'&::-webkit-scrollbar': { display: 'none' },
				...getFadeStyles( edges ),
				// Never fade a focused trigger's outline (WCAG 2.4.11 Focus Not Obscured).
				'&:focus-within': { maskImage: 'none', WebkitMaskImage: 'none' },
			} }
		>
			<TabsPrimitive.List
				ref={ ref }
				aria-label={ title }
				className={ classNames( 'vip-tabs-list', className ) }
				sx={ {
					display: 'flex',
					width: 'max-content',
					minWidth: '100%',
					borderBottom: '1px solid',
					borderColor: 'borders.2',
					...sx,
				} }
				{ ...props }
			>
				{ children }
			</TabsPrimitive.List>
		</Box>
	);
};

TabsList.displayName = 'TabsList';

export { TabsList };
