/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as Switch from '@radix-ui/react-switch';

// Documentation for Radix Switch component
// https://www.radix-ui.com/docs/primitives/components/switch

export const Toggle = ( {
	name = 'toggle',
	onChange,
	className = null,
	variant = 'success',
	...rest
} ) => (
	<Switch.Root
		className={ classNames( 'vip-toggle-component', className ) }
		sx={ {
			all: 'unset',
			position: 'relative',
			width: 40,
			height: 20,
			borderRadius: '32px',
			backgroundColor: 'muted',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right 6px top 5px',
			backgroundImage: `url(
				'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7.7782" y="0.403809" width="2" height="11" transform="rotate(45 7.7782 0.403809)" fill="white"/><rect y="1.81799" width="2" height="11" transform="rotate(-45 0 1.81799)" fill="white"/></svg>')`,
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

			'&[data-state="checked"]': {
				backgroundColor: variant,
				backgroundPosition: 'left 6px top 4px',
				backgroundImage: `url(
					'data:image/svg+xml;utf8,<svg width="11" height="10" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.98L3.64706 8.5L11 1.5" stroke="white" stroke-width="2"/></svg>')`,
			},
		} }
		name={ name }
		onCheckedChange={ onChange || undefined }
		{ ...rest }
	>
		<Switch.Thumb
			sx={ {
				display: 'block',
				width: 16,
				height: 16,
				backgroundColor: 'white',
				borderRadius: '50%',
				boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 5px, rgb(0 0 0 / 15%) 0px 1px 1px',
				transition: 'transform 100ms',
				transform: 'translateX(2px)',
				willChange: 'transform',
				'&[data-state="checked"]': { transform: 'translateX(22px)' },
			} }
		/>
	</Switch.Root>
);

Toggle.propTypes = {
	name: PropTypes.string,
	className: PropTypes.any,
	onChange: PropTypes.func,
	variant: PropTypes.string,
};
