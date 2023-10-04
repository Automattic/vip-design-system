/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as Switch from '@radix-ui/react-switch';

// Documentation for Radix Switch component
// https://www.radix-ui.com/docs/primitives/components/switch

export const ToggleText = React.forwardRef(
	(
		{
			name = 'toggleText',
			onChange,
			className = null,
			variant = '#e3e0df',
			toggleOnLabel = 'On',
			toggleOffLabel = 'Off',
			...rest
		},
		forwardRef
	) => (
		<Switch.Root
			className={ classNames( 'vip-toggle-component', className ) }
			sx={ {
				all: 'unset',
				cursor: 'pointer',
				position: 'relative',
				width: 100,
				height: 20,
				padding: '0.5px 0.5px 0.5px 0.5px',
				borderRadius: '2.5px',
				backgroundColor: variant,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right -5px top 2px',
				backgroundImage: `url(\n\t\t\t\t'data:image/svg+xml;utf8,<svg width="60" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="1" y="14" fill="black">${ toggleOnLabel }</text></svg>')`,
				WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
				'&:focus': theme => theme.outline,
				'&:focus-visible': theme => theme.outline,
				'&[disabled]': {
					opacity: 0.7,
				},
				'&[data-state="checked"]': {
					backgroundColor: variant,
					backgroundPosition: 'right 50px top 2px',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `url(\n\t\t\t\t\t'data:image/svg+xml;utf8,<svg width="60" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="1" y="14" fill="black">${ toggleOffLabel }</text></svg>')`,
				},
			} }
			name={ name }
			onCheckedChange={ onChange || undefined }
			ref={ forwardRef }
			{ ...rest }
		>
			<Switch.Thumb
				sx={ {
					display: 'block',
					width: 50,
					height: 16,
					padding: '0.5px 0.5px 0.5px 0.5px',
					backgroundColor: 'white',
					borderRadius: '2.5px',
					boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 5px, rgb(0 0 0 / 15%) 0px 1px 1px',
					transition: 'transform 100ms',
					transform: 'translateX(2px)',
					willChange: 'transform',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `url(\n\t\t\t\t\t'data:image/svg+xml;utf8,<svg width="40" height="20" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="1" y="12" fill="black">${ toggleOffLabel }</text></svg>')`,
					'&[data-state="checked"]': {
						transform: 'translateX(48px)',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'left 0.25px top 0.5px',
						backgroundImage: `url(\n\t\t\t\t\t'data:image/svg+xml;utf8,<svg width="40" height="20" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="1" y="12" fill="black">${ toggleOnLabel }</text></svg>')`,
					},
				} }
			/>
		</Switch.Root>
	)
);

ToggleText.displayName = 'ToggleText';

ToggleText.propTypes = {
	name: PropTypes.string,
	className: PropTypes.any,
	onChange: PropTypes.func,
	variant: PropTypes.string,
};
