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
import { valueUnitConcat } from './transforms/add-units.js';
import { resolveColors } from './transforms/resolve-colors.js';
import { themeUiFormat } from './formatters/theme-ui-format.js';
import {
    logVerbosityLevels
} from 'style-dictionary/enums';
import { noBase } from './filters/no-base.js';
import { noFigma } from './filters/no-figma.js';
import { base } from './filters/base.js';
import { byMode } from './filters/by-mode.js';

// Register custom transforms
StyleDictionary.registerTransform(valueUnitConcat);
StyleDictionary.registerTransform(resolveColors);

// Register custom filters
StyleDictionary.registerFilter(noBase);
StyleDictionary.registerFilter(noFigma);
StyleDictionary.registerFilter(base);
StyleDictionary.registerFilter(byMode);

// Register custom transform group
StyleDictionary.registerTransformGroup({
    name: 'dtcg',
    transforms: [
        'resolve-colors',
        'add-units',
    ]
});

// Register custom formatter
StyleDictionary.registerFormat({
    name: 'theme-ui',
    format: themeUiFormat
});

const platforms = {
    'theme-ui': {
        transformGroup: 'dtcg',
        transforms: [
            'size/pxToRem',
            'name/kebab',
            'color/hex',
            'shadow/css/shorthand'
        ],
        buildPath: 'src/system/theme/generated/',
    },
    json: {
        transformGroup: 'dtcg',
        transforms: [
            'size/pxToRem',
            'name/kebab',
            'color/hex',
            'shadow/css/shorthand'
        ],
        buildPath: 'src/system/theme/generated/',
    },
    raw: {
        transformGroup: 'dtcg',
        transforms: [
            'name/kebab',
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
        raw: {
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

const themes = ['light', 'dark'];

const themeUiSd = new StyleDictionary({
    log: {
        verbosity: logVerbosityLevels.verbose
    },
    usesDtcg: true,
    include: ['./tokens/core.json'],
    source: ['./tokens/wpvip-product.json'],
    hooks: {
        filters: {
            'no-base': noBase.filter,
        }
    },
    platforms: {
        'theme-ui': {
            ...platforms['theme-ui'],
            files: [
                {
                    destination: `sd-theme-ui.json`,
                    format: 'theme-ui',
                },
            ],
        },
    },
});

await themeUiSd.buildAllPlatforms();


for (const theme of themes) {
	const sd = new StyleDictionary({
		log: {
			verbosity: logVerbosityLevels.default
		},
		usesDtcg: true,
		include: ['./tokens/core.json'],
		source: [`./tokens/wpvip-product.json`],
		platforms: {
			json: {
				...platforms.json,
				mode: theme,
				files: [
					{
						destination: `sd-json-${theme}.json`,
						format: 'json/nested',
						filter: 'byMode',
					},
				],
			},
			'raw': {
				...platforms.raw,
				mode: theme,
				files: [
					{
						destination: `sd-raw-${theme}.json`,
						format: 'json',
						filter: 'byMode',
					}
				],
			},
		},
	});

	await sd.buildAllPlatforms();
}

// const baseSd = new StyleDictionary({
// 	log: {
// 		verbosity: logVerbosityLevels.default
// 	},
// 	usesDtcg: true,
// 	source: [`./tokens/core.json`],
// 	hooks: {
// 		filters: {
// 			'no-figma': noFigma.filter,
// 		}
// 	},
// 	platforms: {
// 		json: {
// 			...platforms.json,
// 			files: [
// 				{
// 					destination: `sd-json-base.json`,
// 					format: 'json/nested',
// 				}
// 			],
// 		},
// 		'raw': {
// 			...platforms.raw,
// 			files: [
// 				{
// 					destination: `sd-raw-base.json`,
// 					format: 'json',
// 				}
// 			],
// 		},
// 	},
// });

// await baseSd.buildAllPlatforms();
