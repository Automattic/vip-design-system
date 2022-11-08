/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
 */

const NewTabs = ( { defaultValue = null, className = null, sx, ...props } ) => (
	<TabsPrimitive.Root
		defaultValue={ defaultValue }
		className={ classNames( 'vip-tabs-component', className ) }
		{ ...props }
	/>
);

NewTabs.propTypes = {
	className: PropTypes.any,
	sx: PropTypes.object,
	variant: PropTypes.string,
	defaultValue: PropTypes.string,
};

export { NewTabs };
