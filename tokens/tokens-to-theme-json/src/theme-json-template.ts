const themeJsonTemplate = {
	"$schema": "https://schemas.wp.org/trunk/theme.json",
	"version": 2,
	"settings": {
		"color": {
			/* Disallow choosing default gradients */
			"defaultGradients": false,

			/* Disallow choosing colors from the default palette */
			"defaultPalette": false,

			/* Disallow choosing custom colors from the color picker */
			"custom": false,

			/* INSERT: Gradient presets for the gradient picker */
			"gradients": [],

			/* Allow users to set link colors */
			"link": true,

			/* INSERT: Color palette presets for the color picker */
			"palette": []
		},
		"spacing": {
			/* Allow users to set a custom padding */
			"padding": true
		},
		"typography": {
			/* Disallow custom font sizes */
			"customFontSize": false,

			/* Disallow drop cap (large first letter in a paragraph) */
			"dropCap": false,

			/* HARDCODED: Font family presets for the font family selector */
			"fontFamilies": [
				{
					"fontFamily": "var(--wp--custom--ff--aktiv-grotesk)",
					"slug": "sans-serif",
					"name": "Sans-serif"
				},
				{
					"fontFamily": "var(--wp--custom--ff--aktiv-grotesk-ex)",
					"slug": "accent",
					"name": "accent"
				},
				{
					"fontFamily": "var(--wp--custom--ff--recoleta)",
					"slug": "brand",
					"name": "Brand"
				},
				{
					"fontFamily": "var(--wp--custom--ff--ivar)",
					"slug": "serif",
					"name": "Serif"
				}
			],

			/* HARDCODED: Font size presets for the font size selector */
			"fontSizes": [
				{
					"slug": "neg4",
					"size": "var(--wp--custom--fs--neg-4)",
					"name": "neg4"
				},
				{
					"slug": "neg3",
					"size": "var(--wp--custom--fs--neg-3)",
					"name": "neg3"
				},
				{
					"slug": "neg2",
					"size": "var(--wp--custom--fs--neg-2)",
					"name": "neg2"
				},
				{
					"slug": "body-1",
					"size": ".875rem",
					"name": "Body 1"
				},
				{
					"slug": "body-2",
					"size": "1rem",
					"name": "Body 2"
				},
				{
					"slug": "body-3",
					"size": "1.125rem",
					"name": "Body 3"
				},
				{
					"slug": "body-4",
					"size": "1.25rem",
					"name": "Body 4"
				},
				{
					"slug": "heading-02",
					"size": "var(--wp--custom--fs--4)",
					"name": "Heading 2"
				},
				{
					"slug": "heading-03",
					"size": "var(--wp--custom--fs--5)",
					"name": "Heading 3"
				},
				{
					"slug": "heading-04",
					"size": "var(--wp--custom--fs--6)",
					"name": "Heading 4"
				},
				{
					"slug": "heading-05",
					"size": "var(--wp--custom--fs--7)",
					"name": "Heading 5"
				},
				{
					"slug": "heading-06",
					"size": "var(--wp--custom--fs--8)",
					"name": "Heading 6"
				},
				{
					"slug": "heading-07",
					"size": "var(--wp--custom--fs--9)",
					"name": "Heading 7"
				},
				{
					"slug": "display",
					"size": "var(--wp--custom--fs--10)",
					"name": "Display"
				}
			],

			/* Disallow setting custom font sizes */
			"fontStyle": false,

			/* Disallow setting custom font weights */
			"fontWeight": false,

			/* Disallow setting custom letter spacing */
			"letterSpacing": false,

			/* Disallow setting custom line heights */
			"lineHeight": false,

			/* Disallow setting custom text decorations (strikethrough/underline on some block types) */
			"textDecoration": false,

			/* Disallow setting text-transform (lower/upper/capitalize) */
			"textTransform": false
		},

		"layout": {
			/* HARDCODED: max-width of content */
			"contentSize": "576px",

			/* HARDCODED: max-width of wide (`.alignwide`) content */
			"wideSize": "1100px"
		},
		"custom": {
			/* HARDCODED: Font-family CSS classes */
			"ff": {
				"aktiv-grotesk": "Aktiv Grotesk",
				"recoleta": "Recoleta",
				"ivar": "Ivar",
				"aktiv-grotesk-ex": "Aktiv Grotesk Ex"
			},

			/* HARDCODED: Font size CSS classes */
			"fs": {
				"neg4": "clamp(0.51rem, calc(0.83rem + -0.31vw), 0.77rem)",
				"neg3": "clamp(0.62rem, calc(0.87rem + -0.25vw), 0.82rem)",
				"neg2": "clamp(0.74rem, calc(0.91rem + -0.17vw), 0.88rem)",
				"neg1": "clamp(0.89rem, calc(0.95rem + -0.06vw), 0.94rem)",
				"0": "clamp(1.00rem, calc(0.98rem + 0.08vw), 1.06rem)",
				"1": "clamp(1.07rem, calc(1.02rem + 0.25vw), 1.28rem)",
				"2": "clamp(1.14rem, calc(1.04rem + 0.47vw), 1.53rem)",
				"3": "clamp(1.22rem, calc(1.07rem + 0.75vw), 1.84rem)",
				"4": "clamp(1.30rem, calc(1.08rem + 1.09vw), 2.20rem)",
				"5": "clamp(1.38rem, calc(1.08rem + 1.52vw), 2.64rem)",
				"6": "clamp(1.48rem, calc(1.07rem + 2.04vw), 3.17rem)",
				"7": "clamp(1.57rem, calc(1.04rem + 2.69vw), 3.81rem)",
				"8": "clamp(1.68rem, calc(0.98rem + 3.48vw), 4.57rem)",
				"9": "clamp(1.79rem, calc(0.90rem + 4.45vw), 5.48rem)",
				"10": "clamp(1.91rem, calc(0.79rem + 5.62vw), 6.58rem)"
			},

			/* HARDCODED: Line height CSS classes */
			"lh": {
				"0": "calc(1em+2px)",
				"1": 1.1,
				"2": 1.2,
				"3": 1.3,
				"4": 1.4,
				"5": 1.5,
				"6": 1.6
			},

			/* HARDCODED: Border radius CSS classes */
			"br": {
				"neg1": ".75rem",
				"0": "1rem",
				"1": "1.75rem",
				"2": "2rem",
				"3": "2.5rem",
				"4": "3.5rem"
			},

			/* INSERT: Color CSS classes */
			"c": {},

			/* HARDCODED: Non-responsive spacing CSS classes */
			"sp": {
				"3xs": ".25rem",
				"2xs": ".5rem",
				"xs": ".75rem",
				"s": "1rem",
				"m": "1.5rem",
				"l": "2.25rem",
				"xl": "3.38rem",
				"2xl": "5rem",
				"3xl": "7.63rem",
				"4xl": "11.38rem",
				"5xl": "17rem"
			},

			/* HARDCODED: Responsive spacing CSS classes */
			"rsp": {
				"3xs": "clamp(0.25rem, calc(-0.05rem + 1.51vw), 1.50rem)",
				"2xs": "clamp(0.50rem, calc(0.08rem + 2.11vw), 2.25rem)",
				"xs": "clamp(0.75rem, calc(0.12rem + 3.17vw), 3.38rem)",
				"s": "clamp(1.00rem, calc(0.04rem + 4.82vw), 5.00rem)",
				"m": "clamp(1.50rem, calc(0.02rem + 7.39vw), 7.63rem)",
				"l": "clamp(2.25rem, calc(0.05rem + 11.00vw), 11.38rem)",
				"xl": "clamp(3.38rem, calc(0.09rem + 16.43vw), 17.00rem)",
				"3xs-s": "clamp(0.25rem, calc(0.07rem + 0.90vw), 1.00rem)",
				"2xs-m": "clamp(0.50rem, calc(0.26rem + 1.21vw), 1.50rem)",
				"xs-l": "clamp(0.75rem, calc(0.39rem + 1.81vw), 2.25rem)",
				"s-xl": "clamp(1.00rem, calc(0.43rem + 2.86vw), 3.38rem)",
				"m-2xl": "clamp(1.50rem, calc(0.66rem + 4.22vw), 5.00rem)",
				"l-3xl": "clamp(2.25rem, calc(0.95rem + 6.48vw), 7.63rem)",
				"xl-4xl": "clamp(3.38rem, calc(1.45rem + 9.65vw), 11.38rem)",
				"2xl-5xl": "clamp(5.00rem, calc(2.11rem + 14.47vw), 17.00rem)",
				"3xs-2xs": "clamp(0.25rem, calc(0.19rem + 0.30vw), 0.50rem)",
				"2xs-xs": "clamp(0.50rem, calc(0.44rem + 0.30vw), 0.75rem)",
				"xs-s": "clamp(0.75rem, calc(0.69rem + 0.30vw), 1.00rem)",
				"s-m": "clamp(1.00rem, calc(0.88rem + 0.60vw), 1.50rem)",
				"m-l": "clamp(1.50rem, calc(1.32rem + 0.90vw), 2.25rem)",
				"l-xl": "clamp(2.25rem, calc(1.98rem + 1.36vw), 3.38rem)",
				"xl-2xl": "clamp(3.38rem, calc(2.98rem + 1.96vw), 5.00rem)",
				"2xl-3xl": "clamp(5.00rem, calc(4.37rem + 3.17vw), 7.63rem)",
				"3xl-4xl": "clamp(7.63rem, calc(6.72rem + 4.52vw), 11.38rem)",
				"4xl-5xl": "clamp(11.38rem, calc(10.02rem + 6.78vw), 17.00rem)"
			},

			/* HARDCODED: max-inline-size default CSS class */
			"measure": "60ch"
		},
		"blocks": {
			/* Disable all customization for paragraph blocks */
			"core/paragraph": {
				"typography": {
					"fontSizes": [],
					"fontFamilies": []
				},
				"color": {
					"link": false,
					"text": false,
					"background": false
				}
			},

			/* Disable all customization for heading blocks */
			"core/heading": {
				"typography": {
					"fontSizes": []
				},
				"color": {
					"link": false,
					"text": false,
					"background": false
				}
			},

			/* Disable all customization for pullquote blocks */
			"core/pullquote": {
				"typography": {
					"customFontSize": false,
					"dropCap": false,
					"fontFamilies": [],
					"fontSizes": [],
					"fontStyle": false,
					"fontWeight": false,
					"letterSpacing": false,
					"lineHeight": false,
					"textDecoration": false,
					"textTransform": false
				},
				"color": {
					"background": false,
					"custom": false,
					"customDuotone": false,
					"customGradient": false,
					"defaultGradients": false,
					"defaultPalette": false,
					"duotone": [],
					"gradients": [],
					"link": false,
					"palette": [],
					"text": false
				},
				"border": {
					"color": false,
					"radius": false,
					"style": false,
					"width": false
				}
			}
		}
	},
	"templateParts": [
		{
			"name": "header",
			"area": "header"
		},
		{
			"name": "footer",
			"area": "footer"
		}
	],
};

export { themeJsonTemplate };

interface ColorWithStyles {
	[style: string]: string,
}

export interface ThemeJsonCustomColors {
	[colorName: string] : string | ColorWithStyles;
}
