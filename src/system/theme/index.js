/**
 * Internal dependencies
 */
import { light, dark } from './colors';
import { getColor } from './getColor';

const textStyles = {
	h1: {
		fontSize: 5,
		marginBottom: 3,
		letterSpacing: '-.02em',
		fontWeight: 'body',
		fontFamily: 'serif',
		color: 'heading',
	},
	h2: {
		fontSize: 4,
		marginBottom: 2,
		letterSpacing: '-.005em',
		fontWeight: 400,
		color: 'heading',
	},
	h3: {
		fontSize: 3,
		marginBottom: 3,
		letterSpacing: '-.005em',
		lineHeight: 1.4,
		fontWeight: 'heading',
		color: 'heading',
	},
	h4: {
		fontSize: 2,
		marginBottom: 1,
		lineHeight: 1.5,
		fontWeight: 'heading',
		color: 'heading',
	},
	h5: {
		fontSize: 1,
		marginBottom: 1,
		lineHeight: 1.5,
		fontWeight: 'heading',
		color: 'heading',
	},
	caps: {
		fontSize: 1,
		marginBottom: 2,
		textTransform: 'uppercase',
		color: 'muted',
		fontWeight: 'bold',
		letterSpacing: '.05em',
	},
};

const outline = {
	outlineStyle: 'solid',
	outlineColor: '#f5f5f5',
	outlineWidth: '1px',
	boxShadow: `0 0 0 1px ${ getColor( 'focus', 'inset' ) }, 0 0 0 3px ${ getColor( 'focus' ) }`,
};

export default {
	outline,
	space: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ],
	fonts: {
		body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
		heading: 'inherit',
		monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
		serif: 'recoletaregular, Georgia, serif',
	},
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
	radii: [ 0, 5, 10 ],
	config: {
		useColorSchemeMediaQuery: false,
	},
	initialColorModeName: 'light',
	colors: {
		text: getColor( 'text', 'secondary' ),
		heading: getColor( 'text', 'primary' ),
		background: '#fdfdfd',
		backgroundSecondary: light.grey[ '10' ],
		primary: light.brand[ '70' ],
		secondary: '#30c',
		muted: light.grey[ '90' ],
		link: light.brand[ '90' ],
		card: '#fff',
		border: light.grey[ '20' ],
		hover: 'rgba(0,0,0,.02)',
		lightenBackground: 'rgba(255,255,255,.5)',
		darken: 'rgba(0,0,0,.05)',
		placeholder: light.grey[ '70' ],
		midnight: '#13191E',
		navigationStart: light.grey[ '5' ],
		navigationEnd: light.grey[ '5' ],
		success: light.green[ '90' ],
		error: light.red[ '90' ],
		warning: light.yellow[ '90' ],
		dialog: light.grey[ '0' ],
		backgroundMuted: light.grey[ '5' ],
		...light,
		modes: {
			dark: {
				text: dark.grey[ '90' ],
				heading: dark.grey[ '100' ],
				background: dark.grey[ '5' ],
				backgroundSecondary: dark.grey[ '10' ],
				primary: light.brand[ '70' ],
				secondary: '#30c',
				muted: dark.grey[ '90' ],
				link: dark.brand[ '90' ],
				card: dark.grey[ '20' ],
				placeholder: dark.grey[ '70' ],
				border: dark.grey[ '30' ],
				hover: 'rgba(255,255,255,.02)',
				midnight: dark.grey[ '90' ],
				navigationStart: dark.grey[ '5' ],
				navigationEnd: dark.grey[ '5' ],
				success: dark.green[ '90' ],
				error: dark.red[ '90' ],
				warning: dark.yellow[ '90' ],
				dialog: dark.grey[ '40' ],
				backgroundMuted: dark.grey[ '10' ],
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
	cards: {
		primary: {
			padding: 3,
			borderRadius: 2,
			backgroundColor: 'card',
			boxShadow: 'low',
		},
		secondary: {
			borderRadius: 2,
			p: 3,
			boxShadow: 'none',
			border: '1px solid',
			borderColor: 'border',
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
			color: 'grey.0',
			bg: 'grey.100',
			cursor: 'pointer',
			fontWeight: 'bold',
			boxShadow: 'none',
			borderRadius: 1,
			border: '1px solid transparent',
			'&:hover, &:focus': {
				backgroundColor: 'grey.90',
				color: 'grey.0',
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
		danger: {
			// you can reference other values defined in the theme
			variant: 'buttons.primary',
			bg: 'red.70',
			'&:hover, &:focus': {
				backgroundColor: 'red.80',
			},
		},
		secondary: {
			color: 'text',
			cursor: 'pointer',
			boxShadow: 'none',
			fontWeight: 'heading',
			borderRadius: 1,
			bg: 'grey.10',
			'&:hover, &:focus': {
				color: 'grey.100',
				bg: 'grey.20',
			},
		},
		text: {
			background: 'none',
			boxShadow: 'none',
			color: 'link',
			cursor: 'pointer',
			fontWeight: 'heading',
			'&:hover, &:focus': {
				color: 'heading',
				backgroundColor: 'hover',
			},
		},
		icon: {
			background: 'none',
			boxShadow: 'none',
			color: 'text',
			cursor: 'pointer',
			fontWeight: 'heading',
			padding: 1,
			'&:hover, &:focus': {
				backgroundColor: 'border',
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
			backgroundColor: 'background',
			'-webkit-font-smoothing': 'antialiased',
			'-moz-osx-font-smoothing': 'grayscale',
			svg: {
				fill: 'currentColor',
				display: 'block',
			},
			pre: {
				fontFamily: 'body',
			},
			...textStyles,
		},
	},
};
