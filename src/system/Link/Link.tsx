/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Link as ThemeLink, LinkProps as ThemeLinkProps, Theme } from 'theme-ui';

// Temporary interface until we add types to the theme definition.
interface LinkTheme extends Theme {
	outline?: Record< string, string >;
}

interface LinkProps extends ThemeLinkProps {
	active?: boolean;
}

export const Link = forwardRef< HTMLAnchorElement, LinkProps >(
	( { active = false, sx, ...props }: LinkProps, ref: Ref< HTMLAnchorElement > ) => (
		<ThemeLink
			sx={ {
				textDdecorationThickness: '0.1em',
				textUnderlineOffset: '0.1em',
				color: active ? 'links.active' : 'link',
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
				...sx,
			} }
			ref={ ref }
			{ ...props }
		/>
	)
);

Link.displayName = 'Link';