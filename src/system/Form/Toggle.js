/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as Switch from '@radix-ui/react-switch';

// Documentation for Radix Switch component
// https://www.radix-ui.com/docs/primitives/components/switch

export const Toggle = ( { name = 'toggle', onChange, className = null, ...rest } ) => (
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
			'::after': {
				fontFamily: 'system-ui, Helvetica, sans-serif',
				content: '"\\2715"',
				position: 'absolute',
				color: 'white',
				fontSize: '10px',
				fontWeight: 'bold',
				top: 1,
				right: '9px',
			},
			'&[data-state="checked"]': {
				backgroundColor: 'success',
				'::after': {
					content: '"\\2713"',
					top: 1,
					left: '8px',
				},
			},
		} }
		name={ name }
		onCheckedChange={ onChange || undefined }
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

Toggle.propTypes = {
	name: PropTypes.string,
	className: PropTypes.any,
	onChange: PropTypes.func,
};
