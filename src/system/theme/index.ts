/**
 * Internal dependencies
 */
import { Theme as ThemeUITheme, ThemeUIStyleObject } from 'theme-ui';

import { Breakpoints, generateBreakpoints } from './breakpoints';
import ColorBuilder, { ColorBuilderInput, ColorBuilderOutput } from './colors';
import ValetDark from './generated/valet-theme-dark.json';
import Valet from './generated/valet-theme-light.json';
import ThemeBuilder, { ThemeBuilderResult, ProcessedTheme } from './getPropValue';
import { RawThemeTokens } from './raw-tokens';
import { linkUnderlineProperties } from '../Link/Link';

// Define the structure of the final theme object
interface AppTheme extends ThemeUITheme {
	outline?: ThemeUIStyleObject;
	space?: number[] | Record< string, number | string >;
	fonts?: Record< string, string >;
	fontSizes?: number[] | Record< string, number >;
	breakpoints?: string[];
	fontWeights?: Record< string, string | number >;
	lineHeights?: Record< string, string | number >;
	sizes?: Record< string, number | string >;
	radii?: number[] | Record< string, number >;
	config?: { useColorSchemeMediaQuery: boolean };
	initialColorModeName?: string;
	shadows?: Record< string, string >;
	tag?: Record< string, any >;
	skeleton?: Record< string, any >;
	cards?: Record<
		string,
		ThemeUIStyleObject & { header?: ThemeUIStyleObject; children?: ThemeUIStyleObject }
	>;
	buttons?: Record< string, ThemeUIStyleObject >;
	links?: Record< string, ThemeUIStyleObject >;
	text?: Record< string, ThemeUIStyleObject >;
	dialog?: Record< string, ThemeUIStyleObject >;
	drawer?: Record< string, ThemeUIStyleObject & { styles?: ThemeUIStyleObject } >;
	styles?: ThemeUITheme[ 'styles' ] & { root?: ThemeUIStyleObject };
	colors?: {
		[ key: string ]: any;
		texts?: Record< string, string >;
		button?: Record< string, any >;
		tag?: Record< string, any >;
		notice?: Record< string, Record< string, string > >;
		skeleton?: Record< string, string >;
		snackbar?: Record< string, any >;
		layer?: Record< string, string >;
		icon?: Record< string, string >;
		input?: Record< string, any >;
		toolbar?: Record< string, any >;
		backgrounds?: Record< string, string >;
		logs?: Record< string, any >;
		wizard?: Record< string, Record< string, Record< string, string > > >;
		accordion?: Record< string, Record< string, string > >;
		optionRow?: Record< string, string >;
		table?: Record< string, string >;
		text?: string;
		heading?: string;
		background?: string;
		backgroundSecondary?: string;
		secondary?: string;
		muted?: string;
		border?: string;
		borders?: Record< string, string >;
		hover?: string;
		darken?: string;
		placeholder?: string;
		midnight?: string;
		dialog?: string;
		backgroundMuted?: string;
		primary?: string;
		success?: string;
		brand?: string;
		error?: string;
		warning?: string;
		info?: string;
		disabled?: string;
		card?: string;
		link?: string;
		links?: Record< string, string >;
		modes?: {
			dark: {
				[ key: string ]: any;
			};
		};
	};
}

// Typed JSON imports
const typedLightJson = Valet as RawThemeTokens;
const typedDarkJson = ValetDark as RawThemeTokens;

// Light
const { getPropValue, getVariants, ValetTheme, getHeadingStyles }: ThemeBuilderResult =
	ThemeBuilder( typedLightJson );
const light: ColorBuilderOutput = ColorBuilder( ValetTheme as ColorBuilderInput );

// Dark
const {
	getPropValue: getPropValueDark,
	getVariants: getVariantsDark,
	ValetTheme: ValetThemeDark,
}: ThemeBuilderResult = ThemeBuilder( typedDarkJson );

const dark: ColorBuilderOutput = ColorBuilder( ValetThemeDark as ColorBuilderInput );

// Define types for the helper functions passed into getComponentColors
type GetPropValueFn = ThemeBuilderResult[ 'getPropValue' ];
type GetVariantsFn = ThemeBuilderResult[ 'getVariants' ];

// Define the return type for getComponentColors more accurately
// This uses utility types to pick keys from the AppTheme colors definition
type ComponentColors = Pick<
	NonNullable< AppTheme[ 'colors' ] >,
	| 'texts'
	| 'button'
	| 'tag'
	| 'notice'
	| 'skeleton'
	| 'snackbar'
	| 'layer'
	| 'icon'
	| 'input'
	| 'toolbar'
	| 'backgrounds'
	| 'logs'
	| 'wizard'
	| 'accordion'
	| 'optionRow'
	| 'table'
	| 'text'
	| 'heading'
	| 'background'
	| 'backgroundSecondary'
	| 'secondary'
	| 'muted'
	| 'border'
	| 'borders'
	| 'hover'
	| 'darken'
	| 'placeholder'
	| 'midnight'
	| 'dialog'
	| 'backgroundMuted'
	| 'primary'
	| 'success'
	| 'brand'
	| 'error'
	| 'warning'
	| 'info'
	| 'disabled'
	| 'card'
	| 'link'
	| 'links'
>;

const outline: AppTheme[ 'outline' ] = {
	outlineStyle: 'solid',
	outlineColor: getPropValue( 'focus', 'inset' ) as string,
	outlineWidth: '1px',
	boxShadow: `0 0 0 1px ${ getPropValue( 'focus', 'inset' ) }, 0 0 0 3px ${ getPropValue(
		'focus'
	) }`,
};

const fonts: AppTheme[ 'fonts' ] = {
	body: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
	heading: 'inherit',
	monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
	serif: 'recoletaregular, Georgia, serif',
};

const getComponentColors = (
	theme: ProcessedTheme,
	gColor: GetPropValueFn,
	gVariants: GetVariantsFn
): ComponentColors => ( {
	texts: {
		...( theme.text as Record< string, string > ),
	},
	button: {
		...( theme.button as Record< string, any > ),
	},
	tag: {
		...( theme.tag as Record< string, any > ),
	},
	notice: {
		background: {
			alert: ( theme.support as any )?.background?.error,
			...( theme.support as any )?.background,
		},
		link: {
			alert: ( theme.support as any )?.link?.error,
			...( theme.support as any )?.link,
		},
		accent: {
			alert: ( theme.support as any )?.accent?.error,
			...( theme.support as any )?.accent,
		},
		icon: {
			alert: ( theme.support as any )?.icon?.error,
			...( theme.support as any )?.icon,
		},
		text: {
			alert: ( theme.support as any )?.text?.error,
			...( theme.support as any )?.text,
		},
	},
	skeleton: {
		background: ( theme.layer as any )?.inverse,
	},
	snackbar: {
		icon: {
			loading: ( theme.text as any )?.inverse,
			...( theme.support as any )?.icon,
		},
		link: ( theme.text as any )?.inverse,
		text: ( theme.text as any )?.inverse,
		background: ( theme.layer as any )?.inverse,
	},
	layer: {
		...( theme.layer as Record< string, string > ),
	},
	icon: {
		...( theme.icon as Record< string, string > ),
	},
	input: {
		...( theme.input as Record< string, any > ),
	},
	toolbar: {
		...( theme.toolbar as Record< string, any > ),
	},
	backgrounds: {
		...( theme.background as Record< string, string > ),
	},
	logs: {
		...( theme.logs as Record< string, any > ),
	},
	wizard: {
		step: {
			number: {
				color: ( theme.text as any )?.helper,
			},
			heading: {
				complete: ( theme.text as any )?.success,
				active: theme.heading,
				inactive: ( theme.text as any )?.helper,
				skipped: ( theme.text as any )?.helper,
			},
			icon: {
				complete: ( theme.support as any )?.icon?.success,
				active: ( theme.link as any )?.default,
				inactive: ( theme.input as any )?.border?.disabled,
				skipped: ( theme.input as any )?.border?.disabled,
			},
			border: {
				default: ( theme.border as any )?.[ '2' ],
				complete: ( theme.support as any )?.accent?.success,
				active: ( theme.border as any )?.accent,
				inactive: ( theme.input as any )?.border?.disabled,
				skipped: ( theme.input as any )?.border?.disabled,
			},
		},
	},
	accordion: {
		content: {
			background: gColor( 'layer', '2' ) as string,
			text: gColor( 'text', 'secondary' ) as string,
		},
		trigger: {
			text: gColor( 'text', 'primary' ) as string,
		},
		background: {
			open: gColor( 'layer', '3' ) as string,
			closed: 'transparent',
			hover: gColor( 'layer', '3' ) as string,
		},
	},
	optionRow: {
		...( theme[ 'option-row' ] as Record< string, any > ),
		hover: 'rgba(0,0,0,.02)',
		border: gColor( 'border', '2' ) as string,
		text: gColor( 'text', 'secondary' ) as string,
		textAccent: gColor( 'link', 'default' ) as string,
		icon: gColor( 'icon', 'inverse' ) as string,
		iconBackground: gColor( 'layer', 'accent' ) as string,
	},
	table: {
		border: gColor( 'border', '2' ) as string,
		heading: gColor( 'text', 'primary' ) as string,
		text: gColor( 'text', 'secondary' ) as string,
	},
	text: gColor( 'text', 'secondary' ) as string,
	heading: gColor( 'text', 'primary' ) as string,
	background: gColor( 'layer', '2' ) as string,
	backgroundSecondary: gColor( 'layer', '1' ) as string,
	secondary: ( light as any ).gray?.[ '70' ],
	muted: gColor( 'text', 'helper' ) as string,
	border: gColor( 'border', '1' ) as string,
	borders: gVariants( 'border' ) as Record< string, string >,
	hover: 'rgba(0,0,0,.02)',
	darken: 'rgba(0,0,0,.05)',
	placeholder: ( gVariants( 'input.text' ) as any ).placeholder,
	midnight: ( gVariants( 'input.background' ) as any ).primary,
	dialog: ( light as any ).gray?.[ '0' ],
	backgroundMuted: gColor( 'layer', '1' ) as string,
	primary: ( gVariants( 'input.background' ) as any ).primary,
	success: ( theme.support as any )?.link?.success?.default,
	brand: gColor( 'link', 'default' ) as string,
	error: ( theme.support as any )?.link?.error?.default,
	warning: ( theme.support as any )?.link?.warning?.default,
	info: ( theme.support as any )?.link?.info?.default,
	disabled: ( theme.input as any )?.background?.disabled,
	card: '#fff',
	link: gColor( 'link', 'default' ) as string,
	links: gVariants( 'link' ) as Record< string, string >,
} );

// Apply the AppTheme type to the final export
const finalTheme: AppTheme = {
	outline,
	space: getVariants( 'space' ) as AppTheme[ 'space' ],
	fonts,
	fontSizes: getVariants( 'fontSize.static' ) as AppTheme[ 'fontSizes' ],
	breakpoints: generateBreakpoints( getVariants( 'breakpoint' ) as Breakpoints ),
	fontWeights: {
		body: getPropValue( 'fontWeight', 'body' ) as string,
		heading: getPropValue( 'fontWeight', 'heading' ) as string,
		regular: getPropValue( 'fontWeight', 'regular' ) as string,
		bold: getPropValue( 'fontWeight', 'bold' ) as string,
		medium: getPropValue( 'fontWeight', 'medium' ) as string,
		light: getPropValue( 'fontWeight', 'light' ) as string,
	} as AppTheme[ 'fontWeights' ],
	lineHeights: getVariants( 'lineHeight' ) as AppTheme[ 'lineHeights' ],
	sizes: {
		sidebar: 260,
	} as AppTheme[ 'sizes' ],
	radii: getVariants( 'borderRadius.static' ) as AppTheme[ 'radii' ],
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
	} as AppTheme[ 'colors' ],

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
	} as AppTheme[ 'tag' ],

	skeleton: {
		background: 'layer.2',
	} as AppTheme[ 'skeleton' ],

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
	} as AppTheme[ 'cards' ],

	buttons: {
		primary: {
			fontFamily: 'body',
			color: 'button.primary.label.default',
			bg: 'button.primary.background.default',
			border: '1px solid transparent',
			py: 0,
			px: 5,
			minHeight: '38px',
			display: 'inline-flex',
			cursor: 'pointer',
			fontWeight: 'medium',
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
		},
		secondary: {
			variant: 'buttons.primary',
			color: 'button.secondary.label.default',
			bg: 'button.secondary.background.default',
			'&:hover': {
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
			'&:hover': {
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
			'&:hover': {
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
			'&:hover': {
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
	} as AppTheme[ 'buttons' ],

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
	} as AppTheme[ 'links' ],

	text: getHeadingStyles() as AppTheme[ 'text' ],

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
	} as AppTheme[ 'dialog' ],

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
	} as AppTheme[ 'drawer' ],

	styles: {
		root: {
			fontFamily: 'body',
			lineHeight: 'body',
			fontWeight: 'body',
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
				fontFamily: 'body',
			},
			p: {
				color: 'text',
			},
			...getHeadingStyles(),
		},
	},
};

export default finalTheme;
