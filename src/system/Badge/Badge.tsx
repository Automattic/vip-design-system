/**
 * External dependencies
 */
import classNames from 'classnames';
import { Ref } from 'react';
import { TextProps as ThemeTextProps } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Text } from '../Text/Text';

export interface BadgeProps extends ThemeTextProps {
	/** The color variant of the badge.
	 * @default 'blue'
	 */
	variant?: 'blue' | 'gold' | 'gray' | 'green' | 'orange' | 'red' | 'salmon' | 'yellow';
	/** Forwarded ref to the underlying element. */
	ref?: Ref< HTMLSpanElement >;
}

/**
 * A small label used to highlight status, category, or metadata.
 * Supports multiple color variants for different semantic meanings.
 */
export const Badge = ( { variant = 'blue', sx, className, ref, ...props }: BadgeProps ) => (
	<Text
		as="span"
		sx={ {
			fontSize: 0,
			letterSpacing: '0.01em',
			padding: 0, // do we need padding declared twice here?
			bg: `tag.${ variant }.background`,
			color: `tag.${ variant }.text`,
			py: 1,
			verticalAlign: 'middle',
			px: 2,
			display: 'inline-block',
			borderRadius: 1,
			fontWeight: 'medium',
			a: {
				color: `tag.${ variant }.text`,
				'&:hover, &:focus, &:active': {
					textDecoration: 'none',
				},
				'&:active, &:visited': {
					color: `tag.${ variant }.text`,
				},
			},
			...sx,
		} }
		className={ classNames( 'vip-badge-component', className ) }
		ref={ ref }
		{ ...props }
	/>
);

Badge.displayName = 'Badge';
