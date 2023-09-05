/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Text as ThemeText } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Text = React.forwardRef( ( { sx, className = null, ...props }, forwardRef ) => (
	<ThemeText
		as="p"
		sx={ {
			lineHeight: 1.5,
			marginBottom: 2,
			color: 'text',
			...sx,
		} }
		className={ classNames( 'vip-text-component', className ) }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Text.displayName = 'Text';

Text.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Text };
