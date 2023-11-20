/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Link as ThemeLink, LinkProps as ThemeLinkProps, Theme } from 'theme-ui';

// Temporary interface until we add types to the theme definition.
interface LinkTheme extends Theme {
	outline?: Record< string, string >;
}

export interface LinkProps extends ThemeLinkProps {
	active?: boolean;
}

export const defaultLinkVariantStyle = {
	color: 'link',
	textDecorationThickness: '0.1em',
	textUnderlineOffset: '0.1em',
	'&:visited': {
		color: 'links.visited',
	},
	'&:active': {
		color: 'links.active',
	},
	'&:hover, &:focus': {
		color: 'links.hover',
		textDecorationLine: 'underline',
		textDecorationThickness: '2px',
	},
	'&:focus-visible': ( theme: LinkTheme ) => theme.outline,
};

export const Link = forwardRef< HTMLAnchorElement, LinkProps >(
	( { active = false, sx, ...props }: LinkProps, ref: Ref< HTMLAnchorElement > ) => (
		<ThemeLink
			sx={ {
				...defaultLinkVariantStyle,
				color: active ? 'links.active' : 'link',
				...sx,
			} }
			ref={ ref }
			{ ...props }
		/>
	)
);

Link.displayName = 'Link';
