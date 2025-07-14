/**
 * Style Dictionary build configuration and token processing.
 *
 * Configures and runs Style Dictionary to transform design tokens from
 * source files into various output formats including JSON, CSS, and
 * custom flat JSON structure. Handles token expansion, filtering,
 * and multi-platform output generation.
 *
 * @since 1.0.0
 */

import StyleDictionary from 'style-dictionary';
import { valueUnitConcat } from './transforms/value-unit-concat.js';
import { resolveColor } from './transforms/color-to-css.js';
import { themeUiFormat } from './formatters/theme-ui-format.js';
import {
    logVerbosityLevels
  } from 'style-dictionary/enums';

// Register custom transforms
StyleDictionary.registerTransform(valueUnitConcat);
StyleDictionary.registerTransform(resolveColor);

// Register custom formatter
StyleDictionary.registerFormat({
    name: 'theme-ui',
    format: themeUiFormat
});

const themes = ['light', 'dark'];
const platforms = {
	'theme-ui': {
		transforms: [
			'name/kebab',
			'color/resolve',
			'color/hex',
			'value/unit-concat',
			'size/pxToRem',
		],
		buildPath: 'src/system/theme/generated/',
	},
	json: {
		transforms: [
			'name/kebab',
			'color/resolve',
			'color/hex',
			'value/unit-concat',
			'size/pxToRem',
		],
		buildPath: 'src/system/theme/generated/',
	},
};

// Clean all platforms first
const cleanSd = new StyleDictionary({
	platforms: {
		'theme-ui': {
			buildPath: 'src/system/theme/generated/',
		},
		json: {
			buildPath: 'src/system/theme/generated/',
		},
	},
});
await cleanSd.cleanAllPlatforms();

/**
 * Initialize and configure Style Dictionary instance.
 *
 * Processes design tokens from source files and generates
 * platform-specific outputs with appropriate transformations.
 *
 * @since 1.0.0
 */
for (const theme of themes) {
	const sd = new StyleDictionary({
        log: {
            verbosity: logVerbosityLevels.default
        },
		usesDtcg: true,
		include: ['./tokens/core_valet-core.json'],
		source: [`./tokens/wpvip-product_${theme}.json`],
        hooks: {
            filters: {
                'no-base': (token) => {
                    if (typeof token.filePath === 'string') {
                        return !token.filePath.endsWith('core_valet-core.json');
                    }
                    return false;
                },
            }
        },
		platforms: {
			'theme-ui': {
				...platforms['theme-ui'],
				files: [
					{
						destination: `sd-theme-ui-${theme}.json`,
						format: 'theme-ui',
                        filter: 'no-base'
					},
				],
			},
			json: {
				...platforms.json,
				files: [
					{
						destination: `sd-json-${theme}.json`,
						format: 'json/nested',
                        filter: 'no-base'
					},
				],
			},
		},
	});

	await sd.buildAllPlatforms();
}
