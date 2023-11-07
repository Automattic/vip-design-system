import { ThemeUIStyleObject } from 'theme-ui';

import { NavVariant } from './Nav';
import { NavItemTheme } from './NavItem';

export const defaultToolbarLinkStyle = {
	color: 'toolbar.text.default',
	textDecoration: 'none',
	borderBottom: 'none',
	display: 'inline-flex',
	alignItems: 'center',
	fontWeight: 500,
	'&:hover': {
		color: 'toolbar.text.hover',
	},
};

export const itemVariantStyle = ( variant: NavVariant ): ThemeUIStyleObject => {
	const defaultStyles = {
		variant: `buttons.tertiary`,
		borderRadius: 1,
		'&[data-active]': {
			variant: `buttons.${ variant }`,
		},
		'&[aria-disabled="true"]': {
			opacity: 0.7,
			color: 'texts.secondary',
			cursor: 'not-allowed',
		},
		':hover': {
			backgroundColor: `button.${ variant }.background.hover`,
			textDecoration: 'none',
		},
	};

	switch ( variant ) {
		case 'tabs': {
			return {
				px: 0,
				mr: 2,
				color: 'heading',
				'&[data-active]': {
					color: 'link',
					fontWeight: 'normal',
					boxShadow: 'inset 0 -1px 0 0, 0 1px 0 0',
				},
				'&[aria-disabled="true"]': {
					color: 'muted',
				},
				':hover': { fontWeight: 'regular', color: 'heading' },
			};
		}

		case 'toolbar': {
			return {
				position: 'relative',
				ml: 3,
				mr: 3,
				height: '100%',
				...defaultToolbarLinkStyle,

				'&[data-active], &[aria-current="page"]': {
					color: 'toolbar.text.default',
				},
				'&[data-active]:before, &[aria-current="page"]:before': {
					display: 'block',
					content: '""',
					width: '100%',
					height: 3,
					overflow: 'hidden',
					backgroundColor: 'borders.accent',
					position: 'absolute',
					top: 0,
				},
			};
		}

		default: {
			return defaultStyles;
		}
	}
};

export const navItemStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	const defaultVariantStyles = itemVariantStyle( variant );

	return {
		alignItems: 'center',
		display: 'inline-flex',
		fontSize: 2,
		justifyContent: 'center',
		lineHeight: 'inherit',
		minHeight: '36px',
		px: 3,
		py: 0,
		textDecoration: 'none',
		verticalAlign: 'middle',
		...defaultVariantStyles,
		'&:focus': ( theme: NavItemTheme ) => theme.outline,
		'&:focus-visible': ( theme: NavItemTheme ) => theme.outline,
	};
};

export const navVariantStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	const defaultStyles = {
		width: 'max-content',
		borderColor: 'transparent',
	};

	switch ( variant ) {
		case 'tabs': {
			return {
				width: '100%',
				borderColor: 'borders.2',
			};
		}

		case 'toolbar': {
			return {
				...defaultStyles,
				display: [ 'flex', 'none' ],
				height: '100%',
				ml: 0,
			};
		}

		default: {
			return defaultStyles;
		}
	}
};

export const navStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	const defaultVariantStyles = navVariantStyles( variant );

	return {
		position: 'relative',
		display: 'flex',
		pb: 0,
		borderBottom: '1px solid',
		...defaultVariantStyles,
	};
};
