/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames, { Argument } from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { useScrollableTabs } from '../hooks/useScrollableTabs';

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

/**
 * TabsList — Container for TabsTrigger elements. Renders as a horizontal list with a
 * bottom border that scrolls sideways when the triggers no longer fit, fading the
 * edge that has more tabs beyond it.
 *
 * The scroll container deliberately has no `tabIndex`: Radix gives the triggers a
 * roving tabindex, so the list always holds a focusable button and arrow keys already
 * reach every tab. Making the container focusable would only add a redundant tab stop.
 *
 * When placing this inside a flex row, the wrapper needs `minWidth: 0` and must not
 * set `flexShrink: 0`, or the tab strip will size to its content instead of scrolling.
 */
const TabsList = ( { children, title, className, sx, ref, ...props }: TabsListProps ) => {
	const {
		ref: scrollerRef,
		edges,
		fadeStyles,
	} = useScrollableTabs( {
		activeSelector: '[role="tab"][data-state="active"]',
		attributeFilter: [ 'data-state' ],
	} );

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
				...fadeStyles,
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
