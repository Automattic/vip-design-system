/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { IoClose } from 'react-icons/io5';

/**
 * Internal dependencies
 */

export const DialogClose = React.forwardRef( ( { children, ...rest }, forwardedRef ) => (
	<DialogPrimitive.Close asChild { ...rest } ref={ forwardedRef }>
		{ children }
	</DialogPrimitive.Close>
) );

DialogClose.propTypes = {
	children: PropTypes.node,
};

DialogClose.displayName = 'DialogClose';

export const DialogCloseDefault = React.forwardRef( ( props, forwardedRef ) => (
	<DialogClose { ...props } ref={ forwardedRef }>
		<button
			aria-label="Close"
			sx={ {
				all: 'unset',
				fontFamily: 'inherit',
				borderRadius: '100%',
				height: 25,
				width: 25,
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'icon.primary',
				position: 'absolute',
				top: 4,
				right: 4,

				'&:hover': {
					backgroundColor: 'borders.2',
					outlineStyle: 'solid',
					outlineColor: 'border.accent',
					outlineWidth: '2px',
				},
				'&:focus': theme => theme.outline,
				'&:focus-visible': theme => theme.outline,
			} }
		>
			<IoClose aria-hidden="true" sx={ { fill: 'icon.primary' } } />
		</button>
	</DialogClose>
) );

DialogCloseDefault.displayName = 'DialogCloseDefault';
