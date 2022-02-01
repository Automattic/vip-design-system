/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

/**
* Internal dependencies
*/
import { DialogContent, DialogTrigger } from '.';

const Dialog = ( { trigger, position = 'left', startOpen = false, content, disabled = false, ...props } ) => {
	const [ isOpen, setIsOpen ] = useState( startOpen );
	const dialogRef = useRef( null );

	const closeDialog = e => {
		if ( props.variant !== 'modal' ) {
			setIsOpen( false );
		}

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

	const handleOpen = ( event = null ) => {
		const open = ! isOpen;

		if ( disabled ) {
			return;
		}

		if ( event?.key && event?.key !== 13 && event?.key !== 'Enter' ) {
			return;
		}

		setIsOpen( open );
	};

	return (
		<div onClick={ e => e.stopPropagation() } sx={ { position: 'relative' } } ref={ dialogRef }>
			<DialogTrigger
				tabIndex="0"
				sx={ { display: 'inline' } }
				onKeyPress={ handleOpen }
				onClick={ handleOpen }
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
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	position: PropTypes.string,
	startOpen: PropTypes.bool,
	content: PropTypes.oneOfType( [
		PropTypes.node,
		PropTypes.func,
	] ),
};

export { Dialog };
