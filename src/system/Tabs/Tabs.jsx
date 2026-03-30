/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */

const Tabs = React.forwardRef(
	(
		{
			children,
			onValueChange = undefined,
			defaultValue = undefined,
			value = undefined,
			className = null,
		},
		ref
	) => {
		return (
			<TabsPrimitive.Root
				ref={ ref }
				value={ value }
				defaultValue={ defaultValue }
				onValueChange={ onValueChange }
				className={ classNames( 'vip-tabs-component', className ) }
			>
				{ children }
			</TabsPrimitive.Root>
		);
	}
);

Tabs.propTypes = {
	className: PropTypes.any,
	defaultValue: PropTypes.node,
	value: PropTypes.node,
	onValueChange: PropTypes.func,
	children: PropTypes.node.isRequired,
};

Tabs.displayName = 'Tabs';

export { Tabs };
