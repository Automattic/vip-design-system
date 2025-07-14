/**
 * Custom Style Dictionary formatter for Theme UI.
 *
 * Creates a Theme UI compatible theme file from Style Dictionary tokens.
 *
 * @see https://theme-ui.com/theme-spec
 */

import { fileHeader } from 'style-dictionary/utils';

export async function themeUiFormat(dictionary, file, options) {
	const theme = {
		colors: {},
		space: {},
		fonts: {},
		fontSizes: {},
		fontWeights: {},
		lineHeights: {},
		letterSpacings: {},
		sizes: {},
		borders: {},
		borderWidths: {},
		borderStyles: {},
		radii: {},
		shadows: {},
		zIndices: {},
		styles: {},
	};

    const header = await fileHeader({ file });

	dictionary.allTokens.forEach(token => {
		const value = token.value;
		const path = token.path;
        const type = token.$type;

		// Example logic to map tokens to theme scales.
		// You will likely need to adjust this based on your token structure.
		const category = path[0];
		const key = path.slice(1).join('-');

        switch (type) {
            case 'color':
                theme.colors[key] = value;
                break;
        }

		switch (category) {
			case 'colors':
				theme.colors[key] = value;
				break;
			case 'space':
				theme.space[key] = value;
				break;
			case 'fonts':
				theme.fonts[key] = value;
				break;
			case 'fontSizes':
				theme.fontSizes[key] = value;
				break;
			case 'fontWeights':
				theme.fontWeights[key] = value;
				break;
			case 'lineHeights':
				theme.lineHeights[key] = value;
				break;
			// Add other cases for your token categories.
			default:
				// You might want to handle uncategorized tokens here.
				break;
		}
	});

	return [header, JSON.stringify(theme, null, 2)].join('\n');
};
