/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import { Spinner } from '../Spinner';
import classNames from 'classnames';
import { variants } from '.';

const DefaultSpinner = ( { size, color = 'link' } ) => (
	<Spinner size={ size } sx={ { ml: 2, color } } className="vip-button-submit-spinner" />
);

DefaultSpinner.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
};

DefaultSpinner.displayName = 'DefaultSpinner';

export const ButtonSubmit = React.forwardRef(
	(
		{
			show = true,
			variant = 'secondary',
			label,
			loading = false,
			disabled = false,
			loadingIcon = DefaultSpinner,
			loadingIconSize = 20,
			loadingIconColor = undefined,
			...rest
		},
		forwardRef
	) => {
		if ( ! show ) {
			return null;
		}

		if ( ! loadingIconColor && variant === 'display' ) {
			loadingIconColor = 'button.display.label.default';
		}

		return (
			<Button
				ref={ forwardRef }
				className={ classNames( 'vip-button-submit-component', `vip-button-submit-${ variant }` ) }
				disabled={ disabled || loading }
				variant={ variant }
				aria-busy={ loading }
				{ ...rest }
			>
				{ label }{ ' ' }
				{ !! loading && loadingIcon( { size: loadingIconSize, color: loadingIconColor } ) }
			</Button>
		);
	}
);

ButtonSubmit.displayName = 'ButtonSubmit';

ButtonSubmit.propTypes = {
	label: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	variant: PropTypes.oneOf( variants ),
	show: PropTypes.bool,
	loadingIcon: PropTypes.any,
	loadingIconSize: PropTypes.number,
	loadingIconColor: PropTypes.string,
};
