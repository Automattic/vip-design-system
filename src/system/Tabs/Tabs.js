/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex } from '..';

const Tabs = React.forwardRef( ( { className = null, sx, ...props }, forwardRef ) => (
	<Flex
		className={ classNames( 'vip-tabs-component', className ) }
		sx={ {
			borderBottom: '1px solid',
			borderColor: 'border',
			listStyleType: 'none',
			margin: 0,
			padding: 0,
			...sx,
		} }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
	className: PropTypes.any,
	sx: PropTypes.object,
	variant: PropTypes.string,
};

export { Tabs };
