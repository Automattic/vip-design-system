/**
 * Internal dependencies
 */
import { generateBreakpoints } from './breakpoints';
import ColorBuilder from './colors';
import ValetDark from './generated/valet-theme-dark.json';
import Valet from './generated/valet-theme-light.json';
import ThemeBuilder from './getPropValue';
import { linkUnderlineProperties } from '../Link/Link';

// Light
const { getPropValue, getVariants, ValetTheme, getHeadingStyles } = ThemeBuilder( Valet );
const light = ColorBuilder( ValetTheme );
const supportLabelDefaultTypography = getPropValue( 'support', 'label-default' ) as Record<
	string,
	unknown
>;

// Dark
const {
	getPropValue: getPropValueDark,
	getVariants: getVariantsDark,
	ValetTheme: ValetThemeDark,
} = ThemeBuilder( ValetDark );

const dark = ColorBuilder( ValetThemeDark );

const outline = {
	outlineStyle: 'solid',
	outlineColor: getPropValue( 'focus', 'inset' ),
	outlineWidth: '1px',
	boxShadow: `0 0 0 1px ${ getPropValue( 'focus', 'inset' ) }, 0 0 0 3px ${ getPropValue(
		'focus'
	) }`,
};

const getComponentColors = ( theme, gColor, gVariants ) => ( {
	// Valet Theme Colors

	// This has to be in the plural because we already have a flag: text
	texts: {
		...theme.text,
	},

	button: {
		...theme.button,
	},

	tag: {
		...theme.tag,
	},

	support: {
		...theme.support,
	},

	// Notice
	notice: {
		// extending the notice theme to support the alert variant
		background: {
			alert: theme.support.background.error,
			...theme.support.background,
		},
		link: {
			alert: theme.support.link.error,
			...theme.support.link,
		},
		accent: {
			alert: theme.support.accent.error,
			...theme.support.accent,
		},
		icon: {
			alert: theme.support.icon.error,
			...theme.support.icon,
		},
		text: {
			alert: theme.support.text.error,
			...theme.support.text,
		},
	},

	skeleton: {
		background: theme.layer.inverse,
	},

	// Snackbar
	snackbar: {
		icon: {
			loading: theme.text.inverse,
			...theme.support.icon,
		},
		link: theme.text.inverse,
		text: theme.text.inverse,
		background: theme.layer.inverse,
	},

	// layer
	layer: {
		...theme.layer,
	},

	// icon
	icon: {
		...theme.icon,
	},

	// Form Controls
	input: {
		...theme.input,
	},

	// Toolbar Controls
	toolbar: {
		...theme.toolbar,
	},

	// Toolbar Controls
	backgrounds: {
		...theme.background,
	},

	// Logs Controls
	logs: {
		...theme.logs,
	},

	// wizard
	wizard: {
		step: {
			number: {
				color: theme.text.helper,
			},
			heading: {
				complete: theme.text.success,
				active: theme.heading,
				inactive: theme.text.helper,
				skipped: theme.text.helper,
			},
			icon: {
				complete: theme.support.icon.success,
				active: theme.link.default,
				inactive: theme.input.border.disabled,
				skipped: theme.input.border.disabled,
			},
			border: {
				default: theme.border[ '2' ],
				complete: theme.support.accent.success,
				active: theme.border.accent,
				inactive: theme.input.border.disabled,
				skipped: theme.input.border.disabled,
			},
		},
	},
	// Accordion
	accordion: {
		content: {
			background: gColor( 'layer', '2' ),
			text: gColor( 'text', 'secondary' ),
		},
		trigger: {
			text: gColor( 'text', 'primary' ),
		},
		background: {
			open: gColor( 'layer', '3' ),
			closed: 'transparent',
			hover: gColor( 'layer', '3' ),
		},
	},

	optionRow: {
		...theme[ 'option-row' ],
		hover: 'rgba(0,0,0,.02)',
		border: gColor( 'border', '2' ),
		text: gColor( 'text', 'secondary' ),
		textAccent: gColor( 'link', 'default' ),
		icon: gColor( 'icon', 'inverse' ),
		iconBackground: gColor( 'layer', 'accent' ),
	},

	table: {
		border: gColor( 'border', '2' ),
		heading: gColor( 'text', 'primary' ),
		text: gColor( 'text', 'secondary' ),
	},

	// Common Tokens
	text: gColor( 'text', 'secondary' ),
	heading: gColor( 'text', 'primary' ),
	background: gColor( 'layer', '2' ),
	backgroundSecondary: gColor( 'layer', '1' ),
	secondary: light.gray[ '70' ],
	muted: gColor( 'text', 'helper' ),
	border: gColor( 'border', '1' ),
	borders: gVariants( 'border' ),
	hover: 'rgba(0,0,0,.02)',
	darken: 'rgba(0,0,0,.05)',
	placeholder: gVariants( 'input.text' ).placeholder,
	midnight: gVariants( 'input.background' ).primary,
	dialog: light.gray[ '0' ],
	backgroundMuted: gColor( 'layer', '1' ),

	// Variant colors
	primary: gVariants( 'input.background' ).primary,
	success: theme.support.link.success.default,
	brand: gColor( 'link', 'default' ),
	error: theme.support.link.error.default,
	warning: theme.support.link.warning.default,
	info: theme.support.link.info.default,
	disabled: theme.input.background.disabled,

	// Card
	card: '#fff',

	// Link
	link: gColor( 'link', 'default' ),
	links: gVariants( 'link' ),
} );

export default {
	outline,
	space: getVariants( 'space' ),
	fonts: {
		monospace: getPropValue( 'fontFamily', 'monospace' ),
		default: getPropValue( 'fontFamily', 'default' ),
	},
	fontSizes: getVariants( 'fontSize.static' ),
	breakpoints: generateBreakpoints( getVariants( 'breakpoint' ) ),
	fontWeights: {
		regular: getPropValue( 'fontWeight', 'regular' ),
		semibold: getPropValue( 'fontWeight', 'semibold' ),
		bold: getPropValue( 'fontWeight', 'bold' ),
		medium: getPropValue( 'fontWeight', 'medium' ),
		light: getPropValue( 'fontWeight', 'light' ),
	},
	lineHeights: getVariants( 'lineHeight' ),
	sizes: {
		sidebar: 260,
	},
	radii: getVariants( 'borderRadius.static' ),
	config: {
		useColorSchemeMediaQuery: false,
	},
	initialColorModeName: 'light',
	colors: {
		...getComponentColors( ValetTheme, getPropValue, getVariants ),
		...light,
		modes: {
			dark: {
				...getComponentColors( ValetThemeDark, getPropValueDark, getVariantsDark ),
				...dark,
			},
		},
	},

	shadows: {
		low: '0px 1px 5px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.15)',
		medium:
			// eslint-disable-next-line max-len
			'0px 15px 30px rgba(0, 0, 0, 0.07), 0px 1px 2px rgba(0, 0, 0, 0.03)',
		high:
			// eslint-disable-next-line max-len
			'0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 100px 80px rgba(0, 0, 0, 0.07)',
	},

	tag: {
		gold: getVariants( 'tag.gold' ),
	},

	skeleton: {
		background: 'layer.2',
	},

	cards: {
		primary: {
			backgroundColor: 'layer.2',
			borderRadius: 2,
			boxShadow: 'low',
			header: {
				backgroundColor: 'layer.1',
				borderTopLeftRadius: 2,
				borderTopRightRadius: 2,
				py: 3,
				px: 4,
				gap: 2,
				fontWeight: 'bold',
				display: 'flex',
				minHeight: 46,
			},
			children: {
				padding: 4,
				gap: 3,
			},
		},
		secondary: {
			variant: 'cards.primary',
			border: '1px solid',
			borderColor: 'borders.2',
			boxShadow: 'none',
			header: {
				variant: 'cards.primary.header',
			},
			children: {
				variant: 'cards.primary.children',
			},
		},
		notice: {
			boxShadow: 'none',
			borderRadius: 2,
			fontSize: 2,
			padding: 0,
			children: {
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				py: 3,
				px: 4,
				gap: 4,
			},
		},
		indent: {
			borderRadius: 2,
			boxShadow: 'none',
			backgroundColor: 'backgroundMuted',
			header: {
				display: 'flex',
				fontWeight: 'bold',
				p: 3,
			},
			children: {
				p: 3,
			},
		},
	},
	forms: {
		label: {
			...supportLabelDefaultTypography,
		},
	},

	buttons: {
		primary: {
			// Typography for all button variants (many inherit `buttons.primary`).
			// Pulled from the `support.label-default` design token.
			...supportLabelDefaultTypography,
			// Button label weight: theme `medium` (500).
			fontWeight: 'medium',
			color: 'button.primary.label.default',
			bg: 'button.primary.background.default',
			border: '1px solid transparent',
			py: 0,
			px: 5,
			minHeight: '38px',
			display: 'inline-flex',
			cursor: 'pointer',
			boxShadow: 'none',
			borderRadius: 1,
			'&:hover': {
				backgroundColor: 'button.primary.background.hover',
				color: 'button.primary.label.hover',
				textDecoration: 'none',
			},
			verticalAlign: 'middle',
			alignItems: 'center',
			justifyContent: 'center',
			textDecoration: 'none',
			svg: {
				fill: 'currentColor',
				'&:hover': {
					fill: 'inherit',
				},
			},
			'&[data-danger="true"]': {
				color: 'button.danger.primary.label.default',
				bg: 'button.danger.primary.background.default',
				border: '1px solid',
				borderColor: 'transparent',
			},

			'&:hover[data-danger="true"]': {
				backgroundColor: 'button.danger.primary.background.hover',
				color: 'button.danger.primary.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},

			'&[disabled], &[aria-disabled="true"]': {
				backgroundColor: 'button.primary.background.disabled',
				color: 'button.primary.label.disabled',
				opacity: 0.7,
			},

			'&[disabled][data-danger="true"], &[aria-disabled="true"][data-danger="true"]': {
				backgroundColor: 'button.secondary.background.disabled',
				color: 'button.secondary.label.default',
			},
		},

		secondary: {
			variant: 'buttons.primary',
			color: 'button.secondary.label.default',
			bg: 'button.secondary.background.default',

			'&:hover': {
				backgroundColor: 'button.secondary.background.hover',
				color: 'button.secondary.label.hover',
			},

			'&[data-danger="true"]': {
				color: 'button.danger.secondary.label.default',
				bg: 'button.danger.secondary.background.default',
				border: '1px solid',
				borderColor: 'button.danger.secondary.border.default',
			},

			'&:hover[data-danger="true"]': {
				backgroundColor: 'button.danger.secondary.background.hover',
				color: 'button.danger.secondary.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},

			'&[disabled], &[aria-disabled="true"]': {
				backgroundColor: 'button.secondary.background.disabled',
				color: 'button.secondary.label.disabled',
			},

			'&[disabled][data-danger="true"], &[aria-disabled="true"][data-danger="true"]': {
				backgroundColor: 'button.danger.secondary.background.default',
				color: 'button.secondary.label.disabled',
				border: '1px solid',
				borderColor: 'button.secondary.border.default',
			},
		},

		tertiary: {
			variant: 'buttons.primary',
			color: 'button.tertiary.label.default',
			bg: 'button.tertiary.background.default',
			border: '1px solid',
			borderColor: 'button.tertiary.border.default',

			'&:hover': {
				backgroundColor: 'button.tertiary.background.hover',
				color: 'button.tertiary.label.hover',
				border: '1px solid',
				borderColor: 'button.tertiary.border.hover',
			},

			'&[disabled], &[aria-disabled="true"]': {
				backgroundColor: 'button.tertiary.background.default',
				color: 'texts.disabled',
			},
		},

		display: {
			variant: 'buttons.primary',
			color: 'button.display.label.default',
			bg: 'button.display.background.default',
			border: '1px solid',
			borderColor: 'transparent',

			'&:hover': {
				backgroundColor: 'button.display.background.hover',
				color: 'button.display.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},

			'&[disabled], &[aria-disabled="true"]': {
				backgroundColor: 'button.display.background.disabled',
				color: 'button.display.label.disabled',
			},
		},

		ghost: {
			variant: 'buttons.primary',
			color: 'button.ghost.label.default',
			bg: 'button.ghost.background.default',
			border: '1px solid',
			borderColor: 'transparent',

			'&:hover': {
				backgroundColor: 'button.ghost.background.hover',
				color: 'button.ghost.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},

			'&[disabled], &[aria-disabled="true"]': {
				backgroundColor: 'button.ghost.background.default',
				color: 'texts.disabled',
			},

			'&[data-danger="true"]': {
				color: 'button.danger.ghost.label.default',
				bg: 'button.danger.ghost.background.default',
			},

			'&:hover[data-danger="true"]': {
				backgroundColor: 'button.danger.ghost.background.hover',
				color: 'button.danger.ghost.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},
		},

		danger: {
			variant: 'buttons.secondary',
			color: 'button.danger.primary.label.default',
			bg: 'button.danger.primary.background.default',
			border: '1px solid',
			borderColor: 'transparent',

			'&:hover': {
				backgroundColor: 'button.danger.primary.background.hover',
				color: 'button.danger.primary.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},
		},

		border: {
			background: 'none',
			border: '1px solid',
			borderColor: 'border',
			cursor: 'pointer',
			display: 'inline-flex',
			alignItems: 'center',
			color: 'text',
			'&:hover': {
				bg: 'hover',
			},
		},

		text: {
			variant: 'buttons.ghost',
			color: 'link',
		},

		icon: {
			variant: 'buttons.ghost',
			color: 'text',
			padding: 1,

			'&:hover': {
				backgroundColor: 'borders.2',
			},
		},
	},

	links: {
		primary: {
			...linkUnderlineProperties,

			color: 'link',
			'&:visited': {
				color: 'links.visited',
			},
			'&:hover': {
				color: 'links.hover',
				textDecorationThickness: '0.15rem',
			},
			'&:active': {
				color: 'links.active',
			},
		},
		'button-primary': {
			variant: 'buttons.primary',
		},
		'button-danger': {
			variant: 'buttons.danger',
		},
		'button-display': {
			variant: 'buttons.display',
		},
		'button-ghost': {
			variant: 'buttons.ghost',
		},
		'button-secondary': {
			variant: 'buttons.secondary',
		},
		'button-tertiary': {
			variant: 'buttons.tertiary',
		},
	},

	text: {
		...getHeadingStyles(),
		...getVariants( 'body' ),
		'support-helper-text': getPropValue( 'support', 'helper-text' ),
		'support-label-xs': getPropValue( 'support', 'label-xs' ),
		'support-label-small': getPropValue( 'support', 'label-small' ),
		'support-label-default': getPropValue( 'support', 'label-default' ),
		'support-label-default-quiet': getPropValue( 'support', 'label-default-quiet' ),
		'support-label-default-loud': getPropValue( 'support', 'label-default-loud' ),
	},

	dialog: {
		modal: {
			position: 'fixed',
			top: '10vh',
			left: '50%',
			maxWidth: '90%',
			backgroundColor: 'background',
			boxShadow: 'high',
		},
		sidebar: {
			position: 'fixed',
			top: '0',
			height: '100vh',
			left: '0',
			overflow: 'auto',
			margin: 0,
			borderRadius: 0,
			boxShadow: 'high',
			backgroundColor: 'background',
		},
		cover: {
			position: 'fixed',
			backgroundColor: 'background',
			width: '100%',
			left: 0,
			top: 0,
			height: '100vh',
			transform: 'none',
			borderRadius: 0,
			opacity: 0.97,
		},
	},

	drawer: {
		top: {
			transform: 'translate3d(0,-100%,0)',
			styles: {
				left: 0,
				width: '100%',
				height: 300,
				bottom: 'auto',
			},
		},
		right: {
			transform: 'translate3d(100%,0,0)',
			styles: {
				right: 0,
			},
		},
		'right-header': {
			transform: 'translate3d(100%,0,0)',
			styles: {
				right: 0,
			},
		},
		bottom: {
			transform: 'translate3d(0,100%,0)',
			styles: {
				width: '100%',
				height: 300,
				bottom: 0,
				top: 'auto',
				left: 0,
			},
		},
		left: {
			transform: 'translate3d(-100%,0,0)',
			styles: {
				left: 0,
			},
		},
		'left-header': {
			transform: 'translate3d(-100%,0,0)',
			styles: {
				left: 0,
			},
		},
	},

	styles: {
		root: {
			fontFamily: ( getPropValue( 'body', 'default' ) as Record< string, unknown > ).fontFamily,
			lineHeight: ( getPropValue( 'body', 'default' ) as Record< string, unknown > ).lineHeight,
			fontWeight: ( getPropValue( 'body', 'default' ) as Record< string, unknown > ).fontWeight,
			color: 'text',
			backgroundColor: 'backgrounds.primary',
			webkitFontSmoothing: 'antialiased',
			mozOsxFontmoothing: 'grayscale',
			a: {
				'&:hover': {
					textDecorationLine: 'underline',
					textDecorationThickness: '0.1rem',
					textUnderlineOffset: '0.250rem',
				},
			},
			svg: {
				fill: 'currentColor',
				display: 'block',
			},
			pre: {
				fontFamily: 'default',
			},
			p: {
				color: 'text',
			},
		},
	},
};
