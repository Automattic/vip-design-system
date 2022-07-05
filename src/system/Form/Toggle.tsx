/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as Switch from '@radix-ui/react-switch';

export const Toggle = ( { name = 'toggle', className = null, ...rest } ) => (
	<Switch.Root
		className={ classNames( 'vip-toggle-component', className ) }
		sx={ {
			all: 'unset',
			width: 42,
			height: 24,
			backgroundColor: 'muted',
			borderRadius: '15px',
			position: 'relative',
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
			'&[data-state="checked"]': { backgroundColor: 'success' },
		} }
		{ ...rest }
	>
		<Switch.Thumb
			sx={ {
				display: 'block',
				width: 18,
				height: 18,
				backgroundColor: 'white',
				borderRadius: '50%',
				boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 5px, rgb(0 0 0 / 15%) 0px 1px 1px',
				transition: 'transform 100ms',
				transform: 'translateX(3px)',
				willChange: 'transform',
				'&[data-state="checked"]': { transform: 'translateX(21px)' },
			} }
		/>
	</Switch.Root>
);

Toggle.PropTypes = {
	name: PropTypes.string,
	classNames: PropTypes.any,
};
