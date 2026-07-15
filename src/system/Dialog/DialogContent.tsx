/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */

export type DialogVariant = 'dropdown' | 'modal' | 'sidebar';
export type DialogPosition = 'left' | 'right';

interface DialogMotionForwardedProps {
	/** Content rendered inside the animated dialog panel. */
	children?: React.ReactNode;
	/** Theme UI style overrides applied to the dialog panel. */
	sx?: ThemeUIStyleObject;
}

export interface DialogContentProps extends DialogMotionForwardedProps {
	/**
	 * The horizontal alignment of the dialog relative to its trigger.
	 * @default 'left'
	 */
	position?: DialogPosition;
	/**
	 * The visual style of the dialog.
	 * @default 'dropdown'
	 */
	variant?: DialogVariant;
	/** Callback invoked when the dialog requests to close. */
	onClose?: () => void;
}

const DialogContent = ( {
	position = 'left',
	variant = 'dropdown',
	onClose,
	...props
}: DialogContentProps ) => {
	const closeDialog = ( e: KeyboardEvent ) => {
		if ( e.key === 'Escape' ) {
			onClose?.();
		}
	};

	useEffect( () => {
		window.document.addEventListener( 'keydown', closeDialog, true );

		return () => {
			window.document.removeEventListener( 'keydown', closeDialog, true );
		};
	}, [] );

	return (
		<React.Fragment>
			{ [ 'modal', 'sidebar' ].includes( variant ) && (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- decorative backdrop; clicking closes the dialog as a mouse convenience, keyboard users close via the Escape handler above
				<div
					onClick={ onClose }
					sx={ {
						position: 'fixed',
						zIndex: 100,
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0.7,
						background: `linear-gradient(
							198.09deg,
							#E5F0F6 2.01%,
							rgba(235, 238, 242, 0) 43.18%,
							rgba(249, 234, 232, 0) 47.86%,
							#FFE9D1 94.31%
						),
						linear-gradient(
							98.65deg,
							#FFE8E6 0.58%,
							rgba(255, 233, 214, 0) 52.45%,
							rgba(255, 233, 219, 0) 53.76%,
							#FFE9D1 105.86%
						), #F5F2F1`,
					} }
				/>
			) }
			{ variant === 'sidebar' ? (
				<SidebarMotion { ...props } />
			) : (
				<DialogMotion position={ position } variant={ variant } { ...props } />
			) }
		</React.Fragment>
	);
};

const SidebarMotion = ( props: DialogMotionForwardedProps ) => {
	// Honor the OS "reduce motion" setting (WCAG 2.3.3): drop the sliding
	// transform and use an instant transition, keeping only a calm opacity fade.
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			{ ...props }
			initial={ shouldReduceMotion ? { opacity: 0 } : { x: -20, opacity: 0 } }
			animate={ shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 } }
			exit={ shouldReduceMotion ? { opacity: 0 } : { x: -20, opacity: 0 } }
			transition={ { duration: shouldReduceMotion ? 0 : 0.15 } }
			sx={ {
				marginTop: 2,
				borderRadius: 2,
				backgroundColor: 'dialog',
				boxShadow: 'medium',
				position: 'absolute',
				top: '100%',
				zIndex: 100,
				padding: 0,
				display: 'block',
				variant: 'dialog.sidebar',
			} }
		/>
	);
};

interface DialogMotionProps extends DialogMotionForwardedProps {
	variant?: DialogVariant;
	position?: DialogPosition;
}

const DialogMotion = ( { variant, position, ...props }: DialogMotionProps ) => {
	const shouldReduceMotion = useReducedMotion();
	let transformOrigin = 'center';

	if ( variant === 'dropdown' ) {
		if ( position === 'left' ) {
			transformOrigin = 'top left';
		} else {
			transformOrigin = 'top right';
		}
	}

	return (
		<motion.div
			{ ...props }
			initial={ {
				scale: shouldReduceMotion ? 1 : 0.9,
				x: variant === 'dropdown' ? 0 : '-50%',
				opacity: 0,
			} }
			animate={ {
				scale: 1,
				x: variant === 'dropdown' ? 0 : '-50%',
				opacity: 1,
			} }
			exit={ { scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 } }
			transition={ { duration: shouldReduceMotion ? 0 : 0.15 } }
			sx={ {
				marginTop: 2,
				transformOrigin,
				borderRadius: 2,
				backgroundColor: 'dialog',
				boxShadow: 'low',
				position: 'absolute',
				top: '100%',
				zIndex: 100,
				left: position === 'left' ? 0 : 'auto',
				right: position === 'left' ? 'auto' : 0,
				padding: 0,
				display: 'inline-block',
				variant: `dialog.${ variant }`,
				overflow: 'auto',
				maxHeight: variant === 'modal' ? '90%' : '',
			} }
		/>
	);
};

export { DialogContent };
