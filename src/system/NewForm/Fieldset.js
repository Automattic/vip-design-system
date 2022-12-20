/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { baseControlBorderStyle, inputBaseBackground, inputBaseText } from '../Form/Input';

const Fieldset = React.forwardRef( ( { children, className, sx = {}, ...props }, forwardRef ) => (
	<fieldset
		ref={ forwardRef }
		className={ classNames( 'vip-form-fieldset-component', className ) }
		sx={ {
			all: 'unset',
			...baseControlBorderStyle,
			backgroundColor: inputBaseBackground,
			color: inputBaseText,
			borderRadius: 1,
			display: 'block',
			pt: 1,
			pb: 2,
			px: 3,
			mb: 3,
			...sx,
		} }
		{ ...props }
	>
		{ children }
	</fieldset>
) );

Fieldset.propTypes = {
	children: PropTypes.any,
	sx: PropTypes.any,
	className: PropTypes.any,
};

Fieldset.displayName = 'Fieldset';

export { Fieldset };
