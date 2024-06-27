/** @jsxImportSource theme-ui */

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

export enum CardVariant {
	'primary',
	'secondary',
	'indent',
}

export interface CardProps {
	variant?: keyof typeof CardVariant;
	sx?: BoxProps[ 'sx' ];
	className?: Argument;
	header?: React.ReactNode;
	children?: React.ReactNode;
}

type CardBoxProps = CardProps & BoxProps;

export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{ variant = 'primary', header, sx = {}, className, children, ...props }: CardProps,
		ref: Ref< HTMLElement >
	) => {
		return (
			<Box
				ref={ ref }
				sx={ {
					// pass variant prop to sx
					variant: `cards.${ variant }`,
					...sx,
				} }
				className={ classNames( 'vip-card-component', className ) }
				{ ...props }
			>
				{ header && (
					<div
						sx={ {
							variant: `cards.${ variant }.header`,
						} }
					>
						{ header }
					</div>
				) }
				<div
					sx={ {
						variant: `cards.${ variant }.children`,
					} }
				>
					{ children }
				</div>
			</Box>
		);
	}
);

Card.displayName = 'Card';
