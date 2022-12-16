/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ThemeButton } from 'theme-ui';

const Button = React.forwardRef( ( { disabled, sx, ...props }, forwardRef ) => {
	const onClick = useCallback(
		event => {
			if ( disabled ) {
				event.preventDefault();
			}
		},
		[ disabled ]
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
				'&[aria-disabled]': {
					opacity: 0.7,
					cursor: 'not-allowed',
					pointerEvents: 'all',
				},
				...sx,
			} }
			className={ classNames( 'vip-button-component', props.className ) }
			aria-disabled={ disabled }
			onClick={ onClick }
			{ ...props }
			ref={ forwardRef }
		/>
	);
} );

Button.displayName = 'Button';

Button.propTypes = {
	disabled: PropTypes.bool,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Button };
