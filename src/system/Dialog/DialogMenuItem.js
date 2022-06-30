/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

/**
 * Internal dependencies
 */
import { Box, Spinner } from '../';

const DialogMenuItem = ( { loading = false, children, ...props } ) => {
	const itemRef = useRef( null );

	const triggerClick = e => {
		if (
			itemRef.current === window.document.activeElement &&
			( e.key === 13 || e.key === 'Enter' )
		) {
			props.onClick();
		}
	};

	useEffect( () => {
		if ( props.onClick ) {
			window.document.addEventListener( 'keydown', triggerClick, true );
		}

		return () => {
			window.document.removeEventListener( 'keydown', triggerClick, true );
		};
	}, [] );

	return (
		<li role="none">
			<Box
				ref={ itemRef }
				role="menuitem"
				tabIndex="0"
				sx={ {
					listStyleType: 'none',
					display: 'flex',
					alignItems: 'center',
					textAlign: 'left',
					m: 0,
					color: 'heading',
					px: 2,
					py: 1,
					cursor: 'pointer',
					textDecoration: 'none',
					'&:hover, &:focus': {
						backgroundColor: 'hover',
						outline: 'none',
					},
				} }
				{ ...props }
			>
				<Box sx={ { flex: '1 1 auto' } }>{ children }</Box>
				{ loading && <Spinner sx={ { width: 12 } } /> }
			</Box>
		</li>
	);
};

DialogMenuItem.propTypes = {
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	children: PropTypes.node,
};

export { DialogMenuItem };
