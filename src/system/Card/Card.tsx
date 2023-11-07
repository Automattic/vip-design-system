/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, Ref } from 'react';
import { BoxProps } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '..';

export interface CardProps {
	variant?: string;
	sx?: BoxProps[ 'sx' ];
	className?: Argument;
}

type CardBoxProps = CardProps & BoxProps;

export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{ variant = 'primary', sx = {}, className, ...props }: CardBoxProps,
		ref: Ref< HTMLElement >
	) => (
		<Box
			ref={ ref }
			sx={ {
				// pass variant prop to sx
				variant: `cards.${ variant }`,
				overflow: 'hidden',
				...sx,
			} }
			className={ classNames( 'vip-card-component', className ) }
			{ ...props }
		/>
	)
);

Card.displayName = 'Card';
