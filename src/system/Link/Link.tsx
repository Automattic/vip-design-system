/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import {
	Link as ThemeLink,
	LinkProps as ThemeLinkProps,
	Theme,
	ThemeUIStyleObject,
} from 'theme-ui';

// Temporary interface until we add types to the theme definition.
interface LinkTheme extends Theme {
	outline?: Record< string, string >;
}

export enum LinkVariant {
	'primary',
	'button-primary',
	'button-secondary',
	'button-tertiary',
	'button-ghost',
	'button-display',
	'button-danger',
}

export interface LinkProps extends ThemeLinkProps {
	variant?: keyof typeof LinkVariant;
}

export const linkUnderlineProperties: ThemeUIStyleObject = {
	textDecorationLine: 'underline',
	textDecorationThickness: '0.07rem',
	textUnderlineOffset: '0.250rem',
};

export const defaultLinkComponentStyle: ThemeUIStyleObject = {
	'&:focus-visible': ( theme: LinkTheme ) => theme.outline,
};

export const Link = forwardRef< HTMLAnchorElement, LinkProps >(
	( { variant = 'primary', sx, ...props }: LinkProps, ref: Ref< HTMLAnchorElement > ) => (
		<ThemeLink
			variant={ variant }
			sx={ {
				...defaultLinkComponentStyle,
				...sx,
			} }
			ref={ ref }
			{ ...props }
		/>
	)
);

Link.displayName = 'Link';
