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

const StyledTabsTrigger = props => (
	<TabsPrimitive.TabsTrigger
		sx={ {
			cursor: 'pointer',
			background: 'none',
			mr: 3,
			fontSize: 2,
			px: 0,
			pb: 3,
			border: 'none',
			color: 'muted',
			transform: 'translateY(1px)',
			'&[data-state="active"]': {
				color: 'heading',
				borderBottom: '1px solid',
				borderColor: 'link',
			},
			':hover': { fontWeight: 'body', color: 'heading' },
		} }
		{ ...props }
	/>
);

const TabsTrigger = ( { value, sx, ...props } ) => (
	<StyledTabsTrigger
		className={ classNames( 'vip-tabs-trigger', `vip-tabs-trigger-${ value }` ) }
		value={ value }
		{ ...props }
	/>
);

TabsTrigger.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
};

export { TabsTrigger };
