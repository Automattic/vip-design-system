import { promises as fs } from 'fs';
import { themeJsonTemplate, ThemeJsonCustomColors } from './theme-json-template';
import { TokenColors, TokenColorValue } from './token-types';

async function ingestTokens() {
	const themeJson = themeJsonTemplate;

	themeJson.settings.custom.c = await getThemeCustomColorsFromFigmaTokens('../valet-color.json');

	await outputThemeJson(themeJson);
}

ingestTokens();

async function getThemeCustomColorsFromFigmaTokens(colorTokenJsonPath: string): Promise<ThemeJsonCustomColors> {
	const colorTokens = await getColorTokens(colorTokenJsonPath);
	const colorTokensColors: TokenColors = colorTokens['valet-color'];

	let themeJsonCustomColors: ThemeJsonCustomColors = {};

	for (const colorKey in colorTokensColors) {
		const colorProperties = colorTokensColors[colorKey];
		const colorName = colorKey.toLocaleLowerCase();

		if ("value" in colorProperties && typeof(colorProperties.value) === "string") {
			// This is a bare color (no variants)
			themeJsonCustomColors[colorName] = colorProperties.value;
		} else {
			// This is a color with variants
			themeJsonCustomColors[colorName] = {};

			for (const colorVariantName in colorProperties) {
				const colorVariantProperties: TokenColorValue = colorProperties[colorVariantName];
				themeJsonCustomColors[colorName][colorVariantName] = colorVariantProperties.value;
			}
		}
	}

	return themeJsonCustomColors;
}

async function getColorTokens(colorTokenJsonPath: string) {
	const colorTokenJson = await fs.readFile(colorTokenJsonPath, 'utf8');
	return JSON.parse(colorTokenJson);
}

async function outputThemeJson(themeJson: Object) {
	const themeJsonString = JSON.stringify(themeJson, /* replacer */ null, "\t");

	const outDirectoryStat = await fs.stat('./generated/').catch(e => false);

	if (outDirectoryStat === false) {
		await fs.mkdir('./generated');
	}

	await fs.writeFile('./generated/theme.json', themeJsonString);
}
