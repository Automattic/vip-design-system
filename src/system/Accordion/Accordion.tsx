/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { keyframes } from '@emotion/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import classNames, { Argument } from 'classnames';
import React, { ReactNode } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Heading } from '../Heading';
import { HeadingProps } from '../Heading/Heading';

const slideDown = keyframes( {
	from: { height: 0 },
	to: { height: 'var(--radix-accordion-content-height)' },
} );

const slideUp = keyframes( {
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0 },
} );

// temporary solution while we converte the theme to TS
interface AccordionTheme extends Theme {
	outline?: Record< string, string >;
}
export interface AccordionItemProps {
	/** Content to render inside the accordion item. */
	children: ReactNode;
	/** Unique value that identifies this item within the accordion. */
	value: string;
}
export interface TriggerProps {
	/** Label content for the trigger button. */
	children: ReactNode;
	/** Heading level used to wrap the trigger. @default 'h3' */
	headingVariant?: HeadingProps[ 'variant' ];
	/** Theme UI style overrides for the trigger button. */
	sx?: ThemeUIStyleObject;
}
export interface TriggerWithIconProps {
	/** Label content displayed next to the icon. */
	children: ReactNode;
	/** Icon element rendered before the label. */
	icon: ReactNode;
}

export interface ContentProps {
	/** Content revealed when the accordion item is expanded. */
	children: ReactNode;
	/** Theme UI style overrides for the content area. */
	sx?: ThemeUIStyleObject;
}
export interface RootProps {
	/** Optional caption for the accordion. */
	caption?: string;
	/** Accordion items to render. */
	children?: ReactNode;
	/** Additional CSS class names. */
	className?: Argument;
	/** Theme UI style overrides for the root container. */
	sx?: ThemeUIStyleObject;
	/** Value of the item expanded by default. */
	defaultValue?: string;
	/** Controlled value of the currently expanded item. */
	value?: string;
	/** Callback fired when the expanded item changes. */
	onValueChange?: ( value: string ) => void;
}
/** A single collapsible section within the Accordion. */
export const Item = ( { children, ...props }: AccordionItemProps ) => (
	<AccordionPrimitive.Item
		{ ...props }
		sx={ {
			overflow: 'hidden',
			borderWidth: '0 1px 1px 1px',
			borderStyle: 'solid',
			borderColor: 'borders.2',

			'&:first-of-type': {
				borderTopWidth: '1px',
				borderTopLeftRadius: 1,
				borderTopRightRadius: 1,
			},
			'&:last-child': {
				borderBottomLeftRadius: 1,
				borderBottomRightRadius: 1,
			},
			'&:focus-within': ( theme: AccordionTheme ) => theme.outline,
		} }
	>
		{ children }
	</AccordionPrimitive.Item>
);

Item.displayName = 'Accordion.Item';

/** Button that toggles the visibility of the associated Accordion.Content. */
export const Trigger = React.forwardRef< HTMLButtonElement, TriggerProps >(
	( { children, headingVariant = 'h3', sx = {}, ...props }, forwardedRef ) => (
		<Heading
			sx={ {
				all: 'unset',
				display: 'flex',
			} }
			variant={ headingVariant }
		>
			<AccordionPrimitive.Trigger
				sx={ {
					color: 'heading',
					cursor: 'pointer',
					all: 'unset',
					fontFamily: 'inherit',
					px: 3,
					minHeight: 45,
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: 1,
					fontWeight: 'bold',

					'&[data-state="closed"]': {
						backgroundColor: 'accordion.background.closed',
					},
					'&[data-state="open"]': {
						backgroundColor: 'accordion.background.open',
						borderBottom: '1px solid',
						borderBottomColor: 'borders.2',
						'.vip-accordion-trigger-indicator': { transform: 'rotate(270deg)' },
					},
					'&:hover': { backgroundColor: 'accordion.background.hover' },
					...sx,
				} }
				{ ...props }
				ref={ forwardedRef }
			>
				{ children }
				<MdChevronRight
					className="vip-accordion-trigger-indicator"
					sx={ {
						fontSize: 3,
						color: 'icon.primary',
						transform: 'rotate(90deg)',
						transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
						minHeight: '20px',
						minWidth: '20px',
					} }
					aria-hidden
				/>
			</AccordionPrimitive.Trigger>
		</Heading>
	)
);

Trigger.displayName = 'Accordion.Trigger';

/** Trigger variant that renders an icon alongside the label. */
export const TriggerWithIcon = React.forwardRef< HTMLButtonElement, TriggerWithIconProps >(
	( { children, icon, ...props }, forwardedRef ) => (
		<Trigger { ...props } ref={ forwardedRef }>
			<span sx={ { color: 'icon.primary', fontSize: 3 } }>{ icon }</span>
			<div sx={ { color: 'accordion.trigger.text', flexGrow: 1, textAlign: 'left', ml: 3 } }>
				{ children }
			</div>
		</Trigger>
	)
);

TriggerWithIcon.displayName = 'Accordion.TriggerWithIcon';

/** Collapsible content area revealed when its parent Accordion.Item is expanded. */
export const Content = React.forwardRef< HTMLDivElement, ContentProps >(
	( { children, sx = {}, ...props }, forwardedRef ) => {
		return (
			<AccordionPrimitive.Content
				sx={ {
					backgroundColor: 'accordion.content.background',
					color: 'accordion.content.text',
					fontSize: 2,
					overflow: 'hidden',
					px: 3,
					py: 2,

					'&[data-state="open"]': {
						animation: `${ slideDown } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
					},
					'&[data-state="closed"]': {
						animation: `${ slideUp } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
					},
					...sx,
				} }
				{ ...props }
				ref={ forwardedRef }
			>
				{ children }
			</AccordionPrimitive.Content>
		);
	}
);

Content.displayName = 'Accordion.Content';

/** Root container for the Accordion. Wraps one or more Accordion.Item elements. */
export const Root = React.forwardRef< HTMLDivElement, RootProps >(
	( { sx = {}, children, className, ...props }, forwardRef ) => (
		<AccordionPrimitive.Root
			className={ classNames( 'vip-accordion-component', className ) }
			collapsible
			type="single"
			ref={ forwardRef }
			sx={ {
				borderRadius: 2,
				...sx,
			} }
			{ ...props }
		>
			{ children }
		</AccordionPrimitive.Root>
	)
);

Root.displayName = 'Accordion';
