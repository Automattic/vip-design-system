/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { BoxProps, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '..';

export enum CardVariant {
	'primary',
	'secondary',
	'notice',
	'indent',
}

export interface CardProps {
	variant?: keyof typeof CardVariant;
	title?: string;
	children?: React.ReactNode;
	renderHeader?: ( title?: string ) => React.ReactNode;
	bodyStyles?: ThemeUIStyleObject;
	headerStyles?: ThemeUIStyleObject;
}

type CardBoxProps = CardProps & BoxProps;

export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{
			variant = 'primary',
			title,
			renderHeader,
			bodyStyles,
			headerStyles,
			children,
			...rest
		}: CardProps,
		ref: Ref< HTMLElement >
	) => {
		return (
			<Box
				ref={ ref }
				sx={ {
					variant: `cards.${ variant }`,
				} }
				className="vip-card-component"
				{ ...rest }
			>
				{ renderHeader ? renderHeader( title ) : '' }
				{ title && ! renderHeader && (
					<Box
						className="vip-card-header-component"
						sx={ {
							variant: `cards.${ variant }.header`,
							...headerStyles,
						} }
					>
						{ title }
					</Box>
				) }

				<Box
					className="vip-card-body-component"
					sx={ {
						variant: `cards.${ variant }.children`,
						...bodyStyles,
					} }
				>
					{ children }
				</Box>
			</Box>
		);
	}
);

Card.displayName = 'Card';
