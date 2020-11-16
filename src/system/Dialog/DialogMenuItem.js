/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../';

const DialogMenuItem = props => {
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
					display: 'block',
					m: 0,
					px: 3,
					py: 2,
					cursor: 'pointer',
					'&:hover, &:focus': {
						backgroundColor: 'hover',
						outline: 'none',
					},
				} }
				{ ...props }
			/>
		</li>
	);
};

DialogMenuItem.propTypes = {
	onClick: PropTypes.func,
};

export { DialogMenuItem };
