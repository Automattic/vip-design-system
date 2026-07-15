/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useEffect, useRef } from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Spinner } from '../Spinner/Spinner';

export interface DialogMenuItemProps extends React.ComponentProps< typeof Box > {
	/**
	 * Whether to show a loading spinner at the end of the item.
	 * @default false
	 */
	loading?: boolean;
	/** The item label content. */
	children?: React.ReactNode;
}

const DialogMenuItem = ( { loading = false, children, ...props }: DialogMenuItemProps ) => {
	const itemRef = useRef< HTMLDivElement >( null );

	const triggerClick = ( e: KeyboardEvent ) => {
		if ( itemRef.current === window.document.activeElement && e.key === 'Enter' ) {
			props.onClick?.( e as unknown as React.MouseEvent< HTMLDivElement > );
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
				tabIndex={ 0 }
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

export { DialogMenuItem };
