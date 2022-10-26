/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronRight } from 'react-icons/md';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes } from '@emotion/react';

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
			borderColor: theme => theme.colors.gray[ '7' ],

			'&:first-of-type': {
				borderTopWidth: '1px',
				borderTopLeftRadius: 4,
				borderTopRightRadius: 4,
			},
			'&:last-child': {
				borderBottomLeftRadius: 4,
				borderBottomRightRadius: 4,
			},
			'&:focus-within': {
				zIndex: 1,
				outline: 'auto',
			},
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
					cursor: 'pointer',
					all: 'unset',
					fontFamily: 'inherit',
					px: 3,
					height: 45,
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: 12,
					fontWeight: 600,
					lineHeight: '14px',
					textTransform: 'uppercase',
					color: theme => theme.colors.black,

					'&[data-state="closed"]': { backgroundColor: 'transparent' },
					'&[data-state="open"]': {
						backgroundColor: theme => theme.colors.gold[ '7' ],
						borderBottom: theme => `1px solid ${ theme.colors.gray[ '7' ] }`,
					},
					'&:hover': { backgroundColor: theme => theme.colors?.gold[ '7' ] },
				} }
				{ ...props }
				ref={ forwardedRef }
			>
				{ children }
				<MdChevronRight
					sx={ {
						fontSize: 22,
						color: theme => theme.colors.grey[ '70' ],
						transform: 'rotate(90deg)',
						transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
						'[data-state=open] &': { transform: 'rotate(270deg)' },
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
		<span sx={ { color: theme => theme.colors.grey[ '70' ], fontSize: 20 } }>{ icon }</span>
		<div sx={ { flexGrow: 1, textAlign: 'left', ml: 3 } }>{ children }</div>
	</Trigger>
) );

TriggerWithIcon.displayName = 'Accordion.TriggerWithIcon';

TriggerWithIcon.propTypes = {
	children: PropTypes.node.isRequired,
	icon: PropTypes.node.isRequired,
};

export const Content = React.forwardRef( ( { children, ...props }, forwardedRef ) => {
	return (
		<AccordionPrimitive.Content
			sx={ {
				backgroundColor: 'white',
				color: theme => theme.colors.text,
				fontSize: 15,
				overflow: 'hidden',

				'&[data-state="open"]': {
					animation: `${ slideDown } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
				},
				'&[data-state="closed"]': {
					animation: `${ slideUp } 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
				},
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
};

const Root = React.forwardRef(
	( { sx = {}, defaultValue, type, children, className }, forwardRef ) => (
		<AccordionPrimitive.Root
			className={ className }
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
