/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { ReactNode } from 'react';
import { MdChevronRight } from '@react-icons/all-files/md/MdChevronRight';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes } from '@emotion/react';
import classNames, { Argument } from 'classnames';

/**
 * Internal dependencies
 */
import { Heading } from '../Heading';
import { Theme, ThemeUIStyleObject } from 'theme-ui';
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
interface AccordionItemProps {
	children: ReactNode;
	value: string;
}
interface TriggerProps {
	children: ReactNode;
	headingVariant?: HeadingProps[ 'variant' ];
	sx?: ThemeUIStyleObject;
}
interface TriggerWithIconProps {
	children: ReactNode;
	icon: ReactNode;
}

interface ContentProps {
	children: ReactNode;
	sx?: ThemeUIStyleObject;
}
interface RootProps {
	caption?: string;
	children?: ReactNode;
	className?: Argument;
	sx?: ThemeUIStyleObject;
	defaultValue?: string;
}
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
