/**
 * External dependencies
 */
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
/** @jsx jsx */
import { jsx } from 'theme-ui';

/**
 * Internal dependencies
 */
import { DialogContent, DialogTrigger } from '.';

const Dialog = ( { trigger, position = 'left', startOpen = false, content, ...props } ) => {
	const [ isOpen, setIsOpen ] = useState( startOpen );
	const dialogRef = useRef( null );

	const closeDialog = e => {
		if ( ! dialogRef.current.contains( e.target ) ) {
			setIsOpen( false );
		}
	};

	useEffect( () => {
		window.document.addEventListener( 'click', closeDialog, true );

		return () => window.document.removeEventListener( 'click', closeDialog, true );
	}, [] );

	// if content is a function, pass in onClose
	const isFunction = typeof content === 'function';

	return (
		<div sx={ { position: 'relative' } } ref={ dialogRef }>
			<DialogTrigger
				tabIndex="0"
				onKeyPress={ e => {
					if ( e.key === 13 || e.key === 'Enter' ) {
						setIsOpen( ! isOpen );
					}
				} }
				onClick={ () => setIsOpen( ! isOpen ) }
				aria-haspopup="true"
				aria-expanded={ isOpen }
			>
				{ trigger }
			</DialogTrigger>
			<AnimatePresence>
				{ isOpen && (
					<DialogContent { ...props } position={ position } onClose={ () => setIsOpen( false ) }>
						{ isFunction ? content( { onClose: () => setIsOpen( false ) } ) : content }
					</DialogContent>
				) }
			</AnimatePresence>
		</div>
	);
};

Dialog.propTypes = {
	trigger: PropTypes.node,
	position: PropTypes.string,
	startOpen: PropTypes.bool,
	content: PropTypes.node,
};

export { Dialog };
