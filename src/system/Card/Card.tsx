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
	'notice',
}

export interface CardProps {
	variant?: keyof typeof CardVariant;
	sx?: BoxProps[ 'sx' ];
	className?: Argument;
	title?: string;
	children?: React.ReactNode;
	renderHeader?: ( title?: string ) => React.ReactNode;
}

type CardBoxProps = CardProps & BoxProps;

export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{ variant = 'primary', title, renderHeader, sx = {}, className, children, ...props }: CardProps,
		ref: Ref< HTMLElement >
	) => {
		return (
			<Box
				ref={ ref }
				sx={ {
					variant: `cards.${ variant }`,
				} }
				className={ classNames( 'vip-card-component', className ) }
				{ ...props }
			>
				{ renderHeader ? renderHeader( title ) : '' }
				{ title && ! renderHeader && (
					<Box
						className={ classNames( 'vip-card-header-component', className ) }
						sx={ {
							variant: `cards.${ variant }.header`,
						} }
					>
						{ title }
					</Box>
				) }

				<Box
					className={ classNames( 'vip-card-body-component', className ) }
					sx={ {
						variant: `cards.${ variant }.children`,
						...sx,
					} }
				>
					{ children }
				</Box>
			</Box>
		);
	}
);

Card.displayName = 'Card';
