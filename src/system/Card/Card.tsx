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
	/**
	 * The visual style variant of the card.
	 * @default 'primary'
	 */
	variant?: keyof typeof CardVariant;
	/** Title text displayed in the card header. */
	title?: string;
	/** The content rendered inside the card body. */
	children?: React.ReactNode;
	/** Custom render function for the card header, receives the title as an argument. */
	renderHeader?: ( title?: string ) => React.ReactNode;
	/** Additional Theme UI styles applied to the card body. */
	bodyStyles?: ThemeUIStyleObject;
	/** Additional Theme UI styles applied to the card header. */
	headerStyles?: ThemeUIStyleObject;
	/**
	 * Hides the card body when true.
	 * @default false
	 */
	hideBody?: boolean;
}

type CardBoxProps = CardProps & BoxProps;

/**
 * A container component with optional header and body sections, supporting multiple visual variants.
 */
export const Card = forwardRef< HTMLElement, CardBoxProps >(
	(
		{
			variant = 'primary',
			title,
			renderHeader,
			bodyStyles,
			headerStyles,
			children,
			hideBody = false,
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

				{ ! hideBody && (
					<Box
						className="vip-card-body-component"
						sx={ {
							variant: `cards.${ variant }.children`,
							...bodyStyles,
						} }
					>
						{ children }
					</Box>
				) }
			</Box>
		);
	}
);

Card.displayName = 'Card';
