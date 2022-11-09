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
			'&[data-state="active"]': {
				color: 'heading',
				fontWeight: 'body',
				boxShadow: theme =>
					`inset 0 -1px 0 0 ${ theme.colors.link }, 0 1px 0 0 ${ theme.colors.link }`,
			},
			'&:disabled': {
				color: 'grey.70',
			},
			':hover': { fontWeight: 'body', color: 'heading' },
			'&:focus': theme => theme.outline,
			'&:focus-visible': theme => theme.outline,
		} }
		{ ...props }
	/>
);

const TabsTrigger = ( { value, disabled = false, sx, ...props } ) => (
	<StyledTabsTrigger
		className={ classNames( 'vip-tabs-trigger', `vip-tabs-trigger-${ value }` ) }
		value={ value }
		disabled={ disabled }
		{ ...props }
	/>
);

TabsTrigger.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
	disabled: PropTypes.bool,
};

export { TabsTrigger };
