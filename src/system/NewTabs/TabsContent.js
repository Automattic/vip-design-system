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

const StyledTabsContent = props => (
	<TabsPrimitive.Content
		sx={ {
			mt: 4,
		} }
		{ ...props }
	/>
);
const TabsContent = ( { value, sx, ...props } ) => (
	<StyledTabsContent
		className={ classNames( 'vip-tabs-content', `vip-tabs-content-${ value }` ) }
		value={ value }
		{ ...props }
	/>
);

TabsContent.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
};

export { TabsContent };
