/**
 * Internal dependencies
 */
import colors from './colors';

export default {
	space: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ],
	fonts: {
		body:
			'"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
		heading: 'inherit',
		monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
	},
	fontSizes: [ 12, 14, 16, 20, 24, 32, 56, 64, 96 ],
	fontWeights: {
		body: 400,
		heading: 500,
		bold: 600,
	},
	lineHeights: {
		body: 1.6,
		heading: 1.125,
	},
	radii: [ 0, 3, 5 ],
	colors: {
		text: colors.grey[ '60' ],
		heading: colors.grey[ '90' ],
		background: colors.grey[ '10' ],
		primary: colors.brand[ '50' ],
		secondary: '#30c',
		muted: colors.grey[ '50' ],
		link: colors.brand[ '70' ],
		card: '#fefefe',
		border: 'rgba(0,0,0,.07)',
		hover: 'rgba(0,0,0,.03)',
		lightenBackground: 'rgba(255,255,255,.5)',
		placeholder: colors.grey[ '40' ],
		modes: {
			dark: {
				text: colors.grey[ '30' ],
				heading: colors.grey[ '10' ],
				background: colors.grey[ '90' ],
				lightenBackground: 'rgba(0,0,0,.1)',
				primary: colors.brand[ '50' ],
				muted: colors.grey[ '40' ],
				link: colors.brand[ '50' ],
				card: colors.grey[ '80' ],
				placeholder: colors.grey[ '70' ],
				border: 'rgba(255,255,255,.05)',
				hover: 'rgba(255,255,255,.02)',
			},
		},
		...colors,
	},
	shadows: {
		// eslint-disable-next-line max-len
		low:
			'0px 0.11069px 0.193708px rgba(0, 0, 0, 0.0196802), 0px 0.266004px 0.465507px rgba(0, 0, 0, 0.0282725), 0px 0.500862px 0.876509px rgba(0, 0, 0, 0.035), 0px 0.893452px 1.56354px rgba(0, 0, 0, 0.0417275), 0px 1.6711px 2.92443px rgba(0, 0, 0, 0.0503198), 0px 4px 7px rgba(0, 0, 0, 0.07)',
		// eslint-disable-next-line max-len
		medium:
			'0px 1.97961px 2.21381px rgba(0, 0, 0, 0.0196802), 0px 4.36146px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 7.34273px 10.0172px rgba(0, 0, 0, 0.035), 0px 11.2752px 17.869px rgba(0, 0, 0, 0.0417275), 0px 16.7372px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 24px 80px rgba(0, 0, 0, 0.07)',
		// eslint-disable-next-line max-len
		high:
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
			backgroundColor: 'transparent',
			border: '1px solid',
			borderColor: 'border',
		},
		indent: {
			borderRadius: 2,
			p: 3,
			boxShadow: 'none',
			backgroundColor: 'border',
		},
	},

	buttons: {
		primary: {
			// you can reference other values defined in the theme
			color: 'white',
			bg: colors.brand[ '70' ],
			cursor: 'pointer',
			fontWeight: 'heading',
			boxShadow: 'medium',
			borderRadius: 1,
			border: '1px solid transparent',
			svg: { position: 'relative', top: '0.125em' },
			'&:hover, &:focus': {
				backgroundColor: colors.brand[ '80' ],
				color: 'white',
			},
		},
		danger: {
			// you can reference other values defined in the theme
			variant: 'buttons.primary',
			bg: colors.red[ '70' ],
			'&:hover, &:focus': {
				backgroundColor: colors.red[ '80' ],
			},
		},
		secondary: {
			color: 'inherit',
			cursor: 'pointer',
			boxShadow: 'none',
			borderRadius: 1,
			background: 'none',
			border: '2px solid',
			borderColor: 'border',
			svg: { position: 'relative', top: '0.125em' },
			'&:hover, &:focus': {
				borderColor: 'muted',
			},
		},
		text: {
			background: 'none',
			boxShadow: 'none',
			color: 'link',
			cursor: 'pointer',
			fontWeight: 'heading',
			px: 2,
			py: 1,
			svg: { position: 'relative', top: '0.125em' },
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
			svg: {
				display: 'block',
			},
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
	text: {
		h1: {
			fontSize: 6,
			marginBottom: 3,
			letterSpacing: '-.005em',
			fontWeight: 300,
		},
		h2: {
			fontSize: 5,
			marginBottom: 2,
			letterSpacing: '-.005em',
			fontWeight: 400,
		},
		h3: {
			fontSize: 3,
			marginBottom: 3,
			letterSpacing: '-.005em',
			lineHeight: 1.25,
			fontWeight: 'heading',
		},
		h4: {
			fontSize: 2,
			marginBottom: 1,
			lineHeight: 1.5,
			fontWeight: 'heading',
		},
		h5: {
			fontSize: 1,
			marginBottom: 1,
			lineHeight: 1.5,
			fontWeight: 'heading',
		},
		caps: {
			fontSize: 0,
			marginBottom: 2,
			textTransform: 'uppercase',
			color: 'muted',
			fontWeight: 'bold',
			letterSpacing: '.05em',
		},
	},
	dialog: {
		modal: {
			position: 'fixed',
			top: '10vh',
			maxHeight: '80vh',
			left: '50%',
			maxWidth: '90%',
			overflow: 'auto',
		},
		sidebar: {
			position: 'fixed',
			top: '0',
			height: '100vh',
			left: '0',
			overflow: 'auto',
			margin: 0,
			borderRadius: 0,
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
	notice: {
		info: {
			borderLeftColor: 'primary',
		},
		alert: {
			borderLeftColor: 'red.50',
		},
		success: {
			borderLeftColor: 'green.50',
		},
	},
	styles: {
		root: {
			fontFamily: 'body',
			lineHeight: 'body',
			fontWeight: 'body',
			letterSpacing: '-.011em',
			fontSize: 2,
			color: 'text',
			backgroundColor: 'background',
			'-webkit-font-smoothing': 'antialiased',
			'-moz-osx-font-smoothing': 'grayscale',
			svg: {
				fill: 'currentColor',
			},
		},
	},
};
