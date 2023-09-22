/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { TextProps as ThemeTextProps } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Text } from '..';

export interface BadgeProps extends ThemeTextProps {
	variant?: 'blue' | 'gold' | 'gray' | 'green' | 'orange' | 'red' | 'salmon' | 'yellow';
}

export const Badge = forwardRef< HTMLDivElement, BadgeProps >(
	( { variant = 'blue', sx, className, ...props }: BadgeProps, ref: Ref< HTMLDivElement > ) => (
		<Text
			as="span"
			sx={ {
				fontSize: 0,
				padding: 0,
				bg: `tag.${ variant }.background`,
				color: `tag.${ variant }.text`,
				py: 1,
				verticalAlign: 'middle',
				px: 2,
				display: 'inline-block',
				borderRadius: 1,
				fontWeight: 'heading',
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
	)
);

Badge.displayName = 'Badge';
