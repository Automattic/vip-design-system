/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

/**
 * TabsContent — Panel that displays when its associated tab trigger is active.
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

export { TabsContent };
