/**
 * Custom Style Dictionary formatter for Theme UI.
 *
 * Creates a Theme UI compatible theme file from Style Dictionary tokens.
 *
 * @see https://theme-ui.com/theme-spec
 */

import { fileHeader } from 'style-dictionary/utils';

const set = (obj, path, value) => {
	let current = obj;
	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i];
		if (current[key] === undefined || typeof current[key] !== 'object') {
			current[key] = {};
		}
		current = current[key];
	}
	current[path[path.length - 1]] = value;
};

export async function themeUiFormat(dictionary, file, options) {
	const theme = {
		borders: {},
		borderStyles: {},
		borderWidths: {},
		colors: {},
		fonts: {},
		fontSizes: {},
		fontWeights: {},
		letterSpacings: {},
		lineHeights: {},
		opacities: {},
		radii: {},
		shadows: {},
		sizes: {},
		space: {},
		styles: {},
		transitions: {},
		zIndices: {},
	};

	const header = await fileHeader({ file });

	dictionary.allTokens.forEach(token => {
		const value = token.$value;
		const path = token.path;
		const type = token.$type;

		const category = path[1];
		const key = token.key;

		switch (type) {
			case 'color':
				if (token.filePath.endsWith('core.json')) {
					set(theme.colors, path.slice(2), value);
				} else {
					set(theme.colors, path.slice(2), value);
				}
				break;
			case 'fontWeight':
				set(theme.fontWeights, path.slice(1), value);
				break;
			case 'fontFamily':
				set(theme.fonts, path.slice(1), value);
				break;
			case 'duration':
				set(theme.colors, path.slice(1), value);
				break;
			case 'shadow':
				set(theme.shadows, path.slice(1), value);
				break;
			case 'dimension':
				switch (category) {
					case 'fontSize':
						set(theme.fontSizes, path.slice(1), value);
						break;
					case 'borderRadius':
						set(theme.radii, path.slice(1), value);
						break;
					case 'space':
						set(theme.space, path.slice(1), value);
						break;
					case 'letterSpacing':
						set(theme.letterSpacings, path.slice(1), value);
						break;
					case 'borderWidth':
						set(theme.borderWidths, path.slice(1), value);
						break;
					case 'borderStyle':
						set(theme.borderStyles, path.slice(1), value);
						break;
					case 'borderColor':
					default:
						set(theme.sizes, path.slice(1), value);
						break;
				}
				break;
			case 'number':
				switch (category) {
					case 'lineHeight':
						set(theme.lineHeights, path.slice(1), value);
						break;
					default:
						set(theme.sizes, path.slice(1), value);
						break;
				}
				break;
			case 'strokeStyle':
				set(theme.borderStyles, path.slice(1), value);
				break;
		}
	});

	return [header, JSON.stringify(theme, null, 2)].join('\n');
};
