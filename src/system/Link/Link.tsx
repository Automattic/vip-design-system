/**
 * External dependencies
 */
import { Ref } from 'react';
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
	/**
	 * The visual style variant of the link. Button variants render the link styled as a button.
	 * @default 'primary'
	 */
	variant?: keyof typeof LinkVariant;
	/** Forwarded ref to the underlying anchor element. */
	ref?: Ref< HTMLAnchorElement >;
}

export const linkUnderlineProperties: ThemeUIStyleObject = {
	textDecorationLine: 'underline',
	textDecorationThickness: '0.07rem',
	textUnderlineOffset: '0.250rem',
};

export const defaultLinkComponentStyle: ThemeUIStyleObject = {
	'&:focus-visible': ( theme: LinkTheme ) => theme.outline,
};

/**
 * A themed anchor element that supports text and button-style variants with focus-visible styling.
 */
export const Link = ( { variant = 'primary', sx, ref, ...props }: LinkProps ) => (
	<ThemeLink
		variant={ variant }
		sx={ {
			...defaultLinkComponentStyle,
			...sx,
		} }
		ref={ ref }
		{ ...props }
	/>
);

Link.displayName = 'Link';
