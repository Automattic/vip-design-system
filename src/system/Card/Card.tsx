/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, Ref } from 'react';
import { BoxProps, useThemeUI, get } from 'theme-ui';

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
	header?: string;
	children?: React.ReactNode;
}

type CardBoxProps = CardProps & BoxProps;

export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{ variant = 'primary', header, sx = {}, className, children, ...props }: CardProps,
		ref: Ref< HTMLElement >
	) => {
		const { theme } = useThemeUI();
		const cardVariant = get( theme, `cards.${ variant }`, {} );
		const basePadding = cardVariant?.p || cardVariant?.padding || 3;
		return (
			<Box
				ref={ ref }
				sx={ {
					// pass variant prop to sx
					variant: `cards.${ variant }`,
					p: header ? 0 : basePadding, // Remove padding if there is a header so it sits flush
					...sx,
				} }
				className={ classNames( 'vip-card-component', className ) }
				{ ...props }
			>
				{ header && <header aria-label="Card header">{ header }</header> }
				<div
					sx={ {
						p: header ? basePadding : 0,
					} }
				>
					{ children }
				</div>
			</Box>
		);
	}
);

Card.displayName = 'Card';
