/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const TabsContent = ( { value, sx, children } ) => (
	<TabsPrimitive.Content
		className={ classNames( 'vip-tabs-content', `vip-tabs-content-${ value }` ) }
		value={ value }
		sx={ {
			mt: 4,
			...sx,
		} }
	>
		{ children }
	</TabsPrimitive.Content>
);

TabsContent.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export { TabsContent };
