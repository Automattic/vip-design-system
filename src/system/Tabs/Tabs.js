/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex } from '..';

const Tabs = ( { className = null, sx, ...props } ) => (
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
		{ ...props }
	/>
);

Tabs.propTypes = {
	className: PropTypes.any,
	sx: PropTypes.object,
	variant: PropTypes.string,
};

export { Tabs };
