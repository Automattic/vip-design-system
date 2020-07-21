/**
 * External dependencies
 */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
/** @jsx jsx */
import { jsx } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Card } from '..';

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
						backgroundColor: 'grey.50',
						opacity: 0.7,
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
			backgroundColor: 'card',
			boxShadow: 'low',
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
				backgroundColor: 'card',
				boxShadow: 'low',
				position: 'absolute',
				top: '100%',
				zIndex: 100,
				left: position === 'left' ? 0 : 'auto',
				right: position === 'left' ? 'auto' : 0,
				padding: 0,
				display: 'inline-block',
				variant: `dialog.${ variant }`,
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
