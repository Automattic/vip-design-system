/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ThemeButton } from 'theme-ui';

const Button = React.forwardRef( ( { sx, ...props }, forwardRef ) => (
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
			'&:disabled': {
				opacity: 0.7,
				cursor: 'not-allowed',
				pointerEvents: 'all',
			},
			...sx,
		} }
		className={ classNames( 'vip-button-component', props.className ) }
		{ ...props }
		ref={ forwardRef }
	/>
) );

Button.displayName = 'Button';

Button.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Button };
