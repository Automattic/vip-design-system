/**
 * Build the Valet light + dark themes from DTCG token sources.
 *
 * Mirrors the legacy `token-transformer` invocations:
 *   light: valet-core + wpvip-product-core
 *   dark:  valet-core + wpvip-product-core + wpvip-product-dark (overrides)
 *
 * Outputs JSON in the legacy `{value, type, description}` shape so
 * src/system/theme/index.ts and downstream consumers stay unchanged.
 */

import StyleDictionary from 'style-dictionary';

import { legacyJsonFormat } from './format-legacy-json.mjs';
import {
	rgbaToHex8Transform,
	evalMathTransform,
	coerceNumberTransform,
	leadingZeroTransform,
} from './transforms.mjs';

StyleDictionary.registerTransform( rgbaToHex8Transform );
StyleDictionary.registerTransform( evalMathTransform );
StyleDictionary.registerTransform( coerceNumberTransform );
StyleDictionary.registerTransform( leadingZeroTransform );
StyleDictionary.registerFormat( legacyJsonFormat );

const sharedTransforms = [
	'valet/value/leading-zero',
	'valet/color/rgba-to-hex8',
	'valet/math/eval',
	'valet/value/coerce-number',
];

function makeConfig( sources, destination ) {
	return {
		log: { warnings: 'disabled', verbosity: 'silent' },
		source: sources,
		usesDtcg: true,
		platforms: {
			valet: {
				transforms: sharedTransforms,
				buildPath: 'src/system/theme/generated/',
				files: [
					{
						destination,
						format: 'valet/legacy-json',
					},
				],
			},
		},
	};
}

const builds = [
	{
		name: 'light',
		sources: [ 'tokens/primitives.tokens.json', 'tokens/semantic.tokens.json' ],
		destination: 'valet-theme-light.json',
	},
	{
		name: 'dark',
		sources: [
			'tokens/primitives.tokens.json',
			'tokens/semantic.tokens.json',
			'tokens/semantic.dark.tokens.json',
		],
		destination: 'valet-theme-dark.json',
	},
];

await Promise.all(
	builds.map( async build => {
		const sd = new StyleDictionary( makeConfig( build.sources, build.destination ) );
		await sd.buildAllPlatforms();
		console.log( `built ${ build.name }` );
	} )
);
