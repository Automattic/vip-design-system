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

TabsContent.propTypes = {
	/** Additional CSS class name(s) to apply to the content panel. */
	className: PropTypes.string,
	/** Unique identifier that associates this content panel with a TabsTrigger. */
	value: PropTypes.string,
	/** The content to display when this tab is active. */
	children: PropTypes.node.isRequired,
};

export { TabsContent };
