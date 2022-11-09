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
	(
		{ children, onValueChange = undefined, defaultValue = undefined, className = null, sx = {} },
		ref
	) => {
		return (
			<TabsPrimitive.Root
				ref={ ref }
				defaultValue={ defaultValue }
				onValueChange={ onValueChange }
				className={ classNames( 'vip-tabs-component', className ) }
				sx={ { ...sx } }
			>
				{ children }
			</TabsPrimitive.Root>
		);
	}
);

NewTabs.propTypes = {
	className: PropTypes.any,
	sx: PropTypes.object,
	defaultValue: PropTypes.node,
	onValueChange: PropTypes.func,
	children: PropTypes.node.isRequired,
};

NewTabs.displayName = 'NewTabs';

export { NewTabs };
