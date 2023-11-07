/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

const TabsContent = ( { value, children, className = null } ) => (
	<TabsPrimitive.Content
		className={ classNames( 'vip-tabs-content', `vip-tabs-content-${ value }`, className ) }
		value={ value }
		sx={ {
			mt: 4,
		} }
	>
		{ children }
	</TabsPrimitive.Content>
);

TabsContent.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export { TabsContent };
