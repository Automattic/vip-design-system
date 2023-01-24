/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ThemeButton } from 'theme-ui';
import { variants } from './index';

const Button = React.forwardRef( ( { disabled, variant, onClick, sx, ...props }, forwardRef ) => {
	const handleOnClick = useCallback(
		event => {
			if ( disabled ) {
				return event.preventDefault();
			}

			if ( onClick ) {
				return onClick( event );
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
			{ ...props }
			aria-disabled={ disabled }
			onClick={ handleOnClick }
			className={ classNames( 'vip-button-component', props.className ) }
			variant={ variant }
			ref={ forwardRef }
		/>
	);
} );

Button.displayName = 'Button';

Button.propTypes = {
	variant: PropTypes.oneOf( variants ),
	className: PropTypes.any,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	sx: PropTypes.object,
};

export { Button };
