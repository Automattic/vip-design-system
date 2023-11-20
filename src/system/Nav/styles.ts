import { ThemeUIStyleObject } from 'theme-ui';

import { NavProps, NavVariant } from './Nav';
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

import { defaultLinkVariantStyle } from '../Link/Link';

const baseVariantStyle = {
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
};

export const navItemGroupTriggerStyles = (): ThemeUIStyleObject => ( {
	mb: 2,
	'svg[data-arrow-indicator]': {
		position: 'absolute',
		right: 3,
		top: 2,
		transform: 'rotate(0deg)',
	},
	'&[data-open]': {
		'svg[data-arrow-indicator]': {
			transform: 'rotate(180deg)',
			transition: 'transform 200ms',
		},
	},
	'&[data-active]': {
		'&::after': {
			display: 'none',
		},
	},
	'&:focus:not(&[data-active]), &:hover:not(&[data-active])': {
		// This will make the trigger button look like a link
		cursor: 'pointer',
		textDecorationLine: 'underline',
		textDecorationThickness: '2px',
	},
} );

export const navItemGroupContentStyles = (): ThemeUIStyleObject => ( {
	m: 0,
	p: 0,
	pl: 3,
	listStyle: 'none',
} );

export const itemVariantStyle = ( variant: NavVariant ): ThemeUIStyleObject => {
	switch ( variant ) {
		case 'tabs': {
			return {
				...baseVariantStyle,
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
				...baseVariantStyle,
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

		case 'menu': {
			return {
				position: 'relative',
				alignItems: 'center',
				backgroundColor: 'layer.1',
				border: 'none',
				borderRadius: 1,
				color: 'text',
				display: 'inline-flex',
				fontWeight: 'body',
				gap: 3,
				height: 38,
				mx: 0,
				mb: 0,
				pl: 5,
				pr: 3,
				py: 2,
				textDecoration: 'none',
				width: '100%',
				'&:visited': {
					color: 'text',
				},
				'&[data-active]::after': {
					position: 'absolute',
					content: "''",
					overflow: 'hidden',
					width: 3,
					backgroundColor: 'borders.accent',
					borderRadius: '90px',
					height: 26,
					top: '6px',
					left: 3,
				},
				'&[data-active]': {
					color: 'heading',
					backgroundColor: 'layer.2',
					textDecoration: 'none',
					cursor: 'default',
					svg: {
						color: 'icon.primary',
						fill: 'icon.primary',
					},
				},
				'&:focus:not(&[data-active]), &:hover:not(&[data-active])': {
					color: 'heading',
					backgroundColor: 'layer.3',
					svg: {
						color: 'icon.primary',
					},
				},
				':not(&:hover)': {
					transition: 'background-color 200ms ease-out',
				},
				svg: {
					color: 'icon.secondary',
					fill: 'icon.secondary',
					display: 'block',
				},
			};
		}

		case 'breadcrumbs': {
			return {
				...defaultLinkVariantStyle,
				m: 0,
			};
		}

		// Primary and any Other
		case 'primary':
		default: {
			return {
				...baseVariantStyle,
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
		}
	}
};

export const navItemStyles = (
	orientation: NavProps[ 'orientation' ],
	variant?: NavVariant
): ThemeUIStyleObject => {
	const defaultStyle = {
		mr: 2,
		'&:last-of-type': {
			mr: orientation === 'horizontal' ? 0 : undefined,
		},
	};

	switch ( variant ) {
		case 'menu': {
			return {
				...defaultStyle,
				mr: 0,
				border: 'none',
				height: 38,
				width: '100%',
				mb: 2,
			};
		}

		case 'breadcrumbs': {
			return {
				'&::before': {
					display: 'inline-block',
					margin: '0 0.45em',
					transform: 'rotate(15deg)',
					borderRightColor: 'text',
					borderRightStyle: 'solid',
					borderRightWidth: '0.1em',
					height: '0.8em',
					content: '""',
				},

				'&:first-of-type::before': {
					display: 'none',
				},
			};
		}

		default: {
			return defaultStyle;
		}
	}
};

export const navItemGroupStyles = (
	orientation: NavProps[ 'orientation' ],
	variant?: NavVariant
): ThemeUIStyleObject => {
	const defaultStyle = {
		'&:last-of-type': {
			mr: orientation === 'horizontal' ? 0 : undefined,
		},
	};

	switch ( variant ) {
		case 'menu': {
			return {
				...defaultStyle,
				mr: 0,
				width: '100%',
			};
		}

		default: {
			return defaultStyle;
		}
	}
};

export const navItemLinkStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	const itemLinkVariantStyles = itemVariantStyle( variant );

	return {
		'&:focus': ( theme: NavItemTheme ) => theme.outline,
		'&:focus-visible': ( theme: NavItemTheme ) => theme.outline,
		...itemLinkVariantStyles,
	};
};

export const navItemLinkVariantStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
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
				display: [ 'none', 'none', 'flex' ],
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
	const defaultVariantStyles = navItemLinkVariantStyles( variant );

	return {
		'> div:first-of-type': { width: '100%' },
		position: 'relative',
		display: 'flex',
		pb: 0,
		borderBottom: '1px solid',
		...defaultVariantStyles,
	};
};

export const navMenuListStyles = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => {
	return {
		display: 'flex',
		listStyle: 'none',
		justifyContent: 'flex-start',
		m: 0,
		height: '100%',
		px: 0,
		flexDirection: orientation === 'horizontal' ? 'row' : 'column',
	};
};
