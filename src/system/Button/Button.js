/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Button as ThemeButton } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ( { sx, ...props } ) => (
	<ThemeButton
		sx={ {
			verticalAlign: 'middle',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '36px',
			py: 0,
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
	/>
);

Button.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Button };
