/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronRight } from 'react-icons/md';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes } from '@emotion/react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Heading } from '../Heading';

const slideDown = keyframes( {
	from: { height: 0 },
	to: { height: 'var(--radix-accordion-content-height)' },
} );

const slideUp = keyframes( {
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0 },
} );

export const Item = ( { children, ...props } ) => (
	<AccordionPrimitive.Item
		{ ...props }
		sx={ {
			overflow: 'hidden',
			borderWidth: '0 1px 1px 1px',
			borderStyle: 'solid',
			borderColor: 'border',

			'&:first-of-type': {
				borderTopWidth: '1px',
				borderTopLeftRadius: 4,
				borderTopRightRadius: 4,
			},
			'&:last-child': {
				borderBottomLeftRadius: 4,
				borderBottomRightRadius: 4,
			},
			'&:focus-within': theme => theme.outline,
		} }
	>
		{ children }
	</AccordionPrimitive.Item>
);

Item.displayName = 'Accordion.Item';

Item.propTypes = {
	children: PropTypes.node.isRequired,
};

export const Trigger = React.forwardRef(
	( { children, headingVariant = 'h3', ...props }, forwardedRef ) => (
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
					height: 45,
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: 1,
					fontWeight: 600,
					textTransform: 'uppercase',

					'&[data-state="closed"]': { backgroundColor: 'transparent' },
					'&[data-state="open"]': {
						backgroundColor: 'backgroundSecondary',
						borderBottom: theme => `1px solid ${ theme.colors.border }`,
						'.vip-accordion-trigger-indicator': { transform: 'rotate(270deg)' },
					},
					'&:hover': { backgroundColor: 'backgroundSecondary' },
				} }
				{ ...props }
				ref={ forwardedRef }
			>
				{ children }
				<MdChevronRight
					className="vip-accordion-trigger-indicator"
					sx={ {
						fontSize: 3,
						color: 'text',
						transform: 'rotate(90deg)',
						transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
					} }
					aria-hidden
				/>
			</AccordionPrimitive.Trigger>
		</Heading>
	)
);

Trigger.displayName = 'Accordion.Trigger';

Trigger.propTypes = {
	children: PropTypes.node.isRequired,
	headingVariant: PropTypes.string,
};

export const TriggerWithIcon = React.forwardRef( ( { children, icon, ...props }, forwardedRef ) => (
	<Trigger { ...props } ref={ forwardedRef }>
		<span sx={ { color: 'text', fontSize: 3 } }>{ icon }</span>
		<div sx={ { color: 'heading', flexGrow: 1, textAlign: 'left', ml: 3 } }>{ children }</div>
	</Trigger>
) );

TriggerWithIcon.displayName = 'Accordion.TriggerWithIcon';

TriggerWithIcon.propTypes = {
	children: PropTypes.node.isRequired,
	icon: PropTypes.node.isRequired,
};

export const Content = React.forwardRef( ( { children, sx = {}, ...props }, forwardedRef ) => {
	return (
		<AccordionPrimitive.Content
			sx={ {
				backgroundColor: 'transparent',
				color: 'text',
				fontSize: 2,
				overflow: 'hidden',

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
			<div
				sx={ {
					px: 3,
					py: 2,
				} }
			>
				{ children }
			</div>
		</AccordionPrimitive.Content>
	);
} );

Content.displayName = 'Accordion.Content';

Content.propTypes = {
	children: PropTypes.node.isRequired,
	sx: PropTypes.object,
};

const Root = React.forwardRef(
	( { sx = {}, defaultValue, type, children, className }, forwardRef ) => (
		<AccordionPrimitive.Root
			className={ classNames( 'vip-accordion-component', className ) }
			collapsible
			defaultValue={ defaultValue }
			ref={ forwardRef }
			sx={ {
				borderRadius: 6,
				...sx,
			} }
			type={ type }
		>
			{ children }
		</AccordionPrimitive.Root>
	)
);

Root.displayName = 'Accordion';

Root.propTypes = {
	children: PropTypes.node,
	className: PropTypes.any,
	defaultValue: PropTypes.any,
	sx: PropTypes.object,
	type: PropTypes.oneOf( [ 'single', 'multiple' ] ),
};

export { Root };
