/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

/**
 * Internal dependencies
 */

const DialogContent = ( { position = 'left', variant = 'dropdown', onClose, ...props } ) => {
	const closeDialog = e => {
		if ( e.key === 27 || e.key === 'Escape' ) {
			onClose();
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

const SidebarMotion = props => (
	<motion.div
		{ ...props }
		initial={ {
			x: -20,
			opacity: 0,
		} }
		animate={ {
			x: 0,
			opacity: 1,
		} }
		exit={ { x: -20, opacity: 0 } }
		transition={ { duration: 0.15 } }
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

const DialogMotion = ( { variant, position, ...props } ) => {
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
				scale: 0.9,
				x: variant === 'dropdown' ? 0 : '-50%',
				opacity: 0,
			} }
			animate={ {
				scale: 1,
				x: variant === 'dropdown' ? 0 : '-50%',
				opacity: 1,
			} }
			exit={ { scale: 0.9, opacity: 0 } }
			transition={ { duration: 0.15 } }
			sx={ {
				marginTop: 2,
				transformOrigin: transformOrigin,
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

DialogMotion.propTypes = {
	variant: PropTypes.string,
	position: PropTypes.string,
};

DialogContent.propTypes = {
	position: PropTypes.string,
	variant: PropTypes.string,
	onClose: PropTypes.func,
};

export { DialogContent };
