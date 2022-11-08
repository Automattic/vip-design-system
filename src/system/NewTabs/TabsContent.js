/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

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
	<StyledTabsContent value={ value } { ...props } />
);

TabsContent.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
};

export { TabsContent };
