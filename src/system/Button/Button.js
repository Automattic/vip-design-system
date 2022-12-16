/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ThemeButton } from 'theme-ui';

const Button = React.forwardRef( ( { disabled, onClick, sx, ...props }, forwardRef ) => {
	const handleOnClick = useCallback(
		event => {
			if ( disabled ) {
				event.preventDefault();
			} else if ( onClick ) {
				onClick( event );
			}
		},
		[ disabled, onClick ]
	);
	return (
		<ThemeButton
			sx={ {
				verticalAlign: 'middle',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '36px',
				py: 0,
				textDecoration: 'none',
				'&:hover': {
					textDecoration: 'none',
				},
				'&:focus': theme => theme.outline,
				'&:focus-visible': theme => theme.outline,
				'&[aria-disabled="true"]': {
					opacity: 0.7,
					cursor: 'not-allowed',
					pointerEvents: 'all',
				},
				...sx,
			} }
			aria-disabled={ disabled }
			className={ classNames( 'vip-button-component', props.className ) }
			onClick={ handleOnClick }
			{ ...props }
			ref={ forwardRef }
		/>
	);
} );

Button.displayName = 'Button';

Button.propTypes = {
	className: PropTypes.any,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	sx: PropTypes.object,
};

export { Button };
