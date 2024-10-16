/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

import * as Switch from '@radix-ui/react-switch';
import classNames, { Argument } from 'classnames';
import { Theme } from 'theme-ui';

// Documentation for Radix Switch component
// https://www.radix-ui.com/docs/primitives/components/switch

interface ThemeProps extends Theme {
	outline?: Record< string, string >;
}

export type ToggleProps = Switch.SwitchProps & {
	name?: string;
	className?: Argument;
	onChange?: () => void;
	variant?: string;
};

export const Toggle = ( {
	name = 'toggle',
	onChange,
	className,
	variant = 'primary',
	...rest
}: ToggleProps ) => (
	<Switch.Root
		className={ classNames( 'vip-toggle-component', className ) }
		sx={ {
			all: 'unset',
			cursor: 'pointer',
			position: 'relative',
			width: 40,
			height: 20,
			borderRadius: 5,
			backgroundColor: 'muted',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right 2px top 2px',
			backgroundImage: `url(
            'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.53846 3L3 4.53846L6.46156 8.00001L3.00003 11.4615L4.53848 13L8.00001 9.53847L11.4615 13L13 11.4615L9.53847 8.00001L13 4.53849L11.4615 3.00003L8.00001 6.46156L4.53846 3Z" fill="white"/></svg>')`,
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

			'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
			'&[disabled]': {
				opacity: 0.7,
			},
			'&[data-state="checked"]': {
				backgroundColor: variant,
				backgroundPosition: 'left 2px top 2px',
				backgroundImage: `url(
                'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4999 4.9995L5.7254 12.4008L2.5 9.33023L3.83307 7.92994L5.7254 9.73144L12.1668 3.59921L13.4999 4.9995Z" fill="white"/></svg>')`,
			},
		} }
		name={ name }
		onCheckedChange={ onChange }
		{ ...rest }
	>
		<Switch.Thumb
			sx={ {
				display: 'block',
				width: 16,
				height: 16,
				backgroundColor: 'white',
				borderRadius: '100%',
				boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 5px, rgb(0 0 0 / 15%) 0px 1px 1px',
				transition: 'transform 100ms',
				transform: 'translateX(2px)',
				willChange: 'transform',
				'&[data-state="checked"]': { transform: 'translateX(22px)' },
			} }
		/>
	</Switch.Root>
);

Toggle.displayName = 'Toggle';
