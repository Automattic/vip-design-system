/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

/**
 * Internal dependencies
 */

const NewTabs = React.forwardRef(
	( { defaultValue = null, className = null, sx, ...props }, ref ) => {
		return (
			<TabsPrimitive.Root
				ref={ ref }
				defaultValue={ defaultValue }
				className={ classNames( 'vip-tabs-component', className ) }
				{ ...props }
			/>
		);
	}
);

NewTabs.propTypes = {
	className: PropTypes.any,
	sx: PropTypes.object,
	defaultValue: PropTypes.string,
};

NewTabs.displayName = 'NewTabs';

export { NewTabs };
