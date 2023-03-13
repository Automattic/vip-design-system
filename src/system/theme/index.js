/**
 * Internal dependencies
 */
import ThemeBuilder from './getColor';

import Valet from './generated/valet-theme-light.json';
import ValetDark from './generated/valet-theme-dark.json';
import ColorBuilder from './colors';
import { textStyles } from './textStyles';

// Light
const { getColor, getVariants, ValetTheme } = ThemeBuilder( Valet );
const light = ColorBuilder( ValetTheme );

// Dark
const {
	getColor: getColorDark,
	getVariants: getVariantsDark,
	ValetTheme: ValetThemeDark,
} = ThemeBuilder( ValetDark );

const dark = ColorBuilder( ValetThemeDark );

const outline = {
	outlineStyle: 'solid',
	outlineColor: getColor( 'focus', 'inset' ),
	outlineWidth: '1px',
	boxShadow: `0 0 0 1px ${ getColor( 'focus', 'inset' ) }, 0 0 0 3px ${ getColor( 'focus' ) }`,
};

const fonts = {
	body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
	heading: 'inherit',
	monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
	serif: 'recoletaregular, Georgia, serif',
};

const getComponentColors = ( theme, gColor, gVariants ) => ( {
	// Valet Theme Colors

	// This has to be in the plural because we already have a flag: text
	texts: {
		...theme.text,
		disabled: '#716e6e',
	},

	button: {
		...theme.button,
	},

	tag: {
		...theme.tag,
	},

	// Notice
	notice: {
		...theme.support,
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
	primary: gColor( 'link', 'default' ),
	secondary: light.gray[ '70' ],
	muted: gColor( 'text', 'helper' ),
	border: gColor( 'border', '1' ),
	borders: {
		1: gColor( 'border', '1' ),
		2: gColor( 'border', '2' ),
		3: gColor( 'border', '3' ),
		4: gColor( 'border', '4' ),
		inverse: gColor( 'border', 'inverse' ),
		accent: gColor( 'border', 'accent' ),
	},
	hover: 'rgba(0,0,0,.02)',
	darken: 'rgba(0,0,0,.05)',
	placeholder: gVariants( 'input.text' ).placeholder,
	midnight: '#13191E',
	dialog: light.gray[ '0' ],
	backgroundMuted: gColor( 'layer', '1' ),

	// Variant colors
	success: theme.support.link.success.default,
	error: theme.support.link.error.default,
	warning: theme.support.link.warning.default,
	info: theme.support.link.info.default,

	// Card
	card: '#fff',

	// Link
	link: gColor( 'link', 'default' ),
	links: {
		default: gColor( 'link', 'default' ),
		hover: gColor( 'link', 'hover' ),
		active: gColor( 'link', 'active' ),
		visited: gColor( 'link', 'visited' ),
	},
} );

export default {
	outline,
	space: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ],
	fonts,
	fontSizes: [ 10, 12, 14, 19, 32, 40, 56, 64, 96 ],
	fontWeights: {
		body: 400,
		heading: 500,
		bold: 600,
	},
	lineHeights: {
		body: 1.6,
		heading: 1.125,
	},
	sizes: {
		sidebar: 260,
	},
	radii: [ 0, 4, 8 ],
	config: {
		useColorSchemeMediaQuery: false,
	},
	initialColorModeName: 'light',
	colors: {
		...getComponentColors( ValetTheme, getColor, getVariants ),
		...light,
		modes: {
			dark: {
				...getComponentColors( ValetThemeDark, getColorDark, getVariantsDark ),
				// text: dark.grey[ '90' ],
				// heading: dark.grey[ '100' ],
				// background: dark.grey[ '5' ],
				// backgroundSecondary: dark.grey[ '10' ],
				// primary: light.brand[ '70' ],
				// secondary: '#30c',
				// muted: dark.grey[ '90' ],
				// link: dark.brand[ '90' ],
				// card: dark.grey[ '20' ],
				// placeholder: dark.grey[ '70' ],
				// border: dark.grey[ '30' ],
				// hover: 'rgba(255,255,255,.02)',
				// midnight: dark.grey[ '90' ],
				// success: dark.green[ '90' ],
				// error: dark.red[ '90' ],
				// warning: dark.yellow[ '90' ],
				// dialog: dark.grey[ '40' ],
				// backgroundMuted: dark.grey[ '10' ],
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

	cards: {
		primary: {
			padding: 3,
			borderRadius: 2,
			backgroundColor: 'layer.2',
			boxShadow: 'low',
		},
		secondary: {
			borderRadius: 2,
			p: 3,
			boxShadow: 'none',
			border: '1px solid',
			borderColor: 'borders.2',
		},
		indent: {
			borderRadius: 2,
			p: 3,
			boxShadow: 'none',
			backgroundColor: 'backgroundMuted',
		},
	},

	buttons: {
		primary: {
			// you can reference other values defined in the theme
			fontFamily: 'body',
			color: 'button.primary.label.default',
			bg: 'button.primary.background.default',
			border: '1px solid transparent',
			cursor: 'pointer',
			fontWeight: '500',
			boxShadow: 'none',
			borderRadius: 1,
			'&:hover, &:focus': {
				backgroundColor: 'button.primary.background.hover',
				color: 'button.primary.label.hover',
			},
		},

		secondary: {
			variant: 'buttons.primary',
			color: 'button.secondary.label.default',
			bg: 'button.secondary.background.default',

			'&:hover, &:focus': {
				backgroundColor: 'button.secondary.background.hover',
				color: 'button.secondary.label.hover',
			},
		},

		tertiary: {
			variant: 'buttons.primary',
			color: 'button.tertiary.label.default',
			bg: 'button.tertiary.background.default',
			border: '1px solid',
			borderColor: 'button.tertiary.border.default',

			'&:hover, &:focus': {
				backgroundColor: 'button.tertiary.background.hover',
				color: 'button.tertiary.label.hover',
				border: '1px solid',
				borderColor: 'button.tertiary.border.hover',
			},
		},

		display: {
			variant: 'buttons.primary',
			color: 'button.display.label.default',
			bg: 'button.display.background.default',
			border: '1px solid',
			borderColor: 'transparent',

			'&:hover, &:focus': {
				backgroundColor: 'button.display.background.hover',
				color: 'button.display.label.hover',
				border: '1px solid',
				borderColor: 'transparent',
			},
		},

		ghost: {
			variant: 'buttons.primary',
			color: 'button.ghost.label.default',
			bg: 'button.ghost.background.default',
			border: '1px solid',
			borderColor: 'transparent',

			'&:hover, &:focus': {
				backgroundColor: 'button.ghost.background.hover',
				color: 'button.ghost.label.hover',
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

			'&:hover, &:focus': {
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

			'&:hover, &:focus': {
				backgroundColor: 'borders.2',
			},
		},
	},

	links: {
		dark: {
			color: 'modes.dark.muted',
			'&:hover': { color: 'modes.dark.heading' },
		},

		hover: {
			display: 'block',
			color: 'inherit',
			py: 1,
			px: 2,
			my: -1,
			mx: -2,
			borderRadius: 2,
			'&:hover': {
				backgroundColor: 'hover',
			},
		},
	},

	text: textStyles,

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

	styles: {
		root: {
			fontFamily: 'body',
			lineHeight: 'body',
			fontWeight: 'body',
			fontSize: 2,
			color: 'text',
			backgroundColor: 'backgrounds.primary',
			'-webkit-font-smoothing': 'antialiased',
			'-moz-osx-font-smoothing': 'grayscale',
			a: {
				'&:hover': {
					textDecorationLine: 'underline',
					textDecorationThickness: '2px',
				},
			},
			svg: {
				fill: 'currentColor',
				display: 'block',
			},
			pre: {
				fontFamily: 'body',
			},
			p: {
				color: 'text',
			},
			...textStyles,
		},
	},
};
