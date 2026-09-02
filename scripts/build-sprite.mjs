/**
 * Build SVG sprite from Boxicons core SVG files.
 * Reads basic/ and filled/ directories and outputs dist/sprite.svg.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const BASIC_DIR = join(ROOT, 'node_modules/@boxicons/core/svg/basic');
const FILLED_DIR = join(ROOT, 'node_modules/@boxicons/core/svg/filled');
const OUT_DIR = join(ROOT, 'dist');
const OUT_FILE = join(OUT_DIR, 'sprite.svg');

/**
 * Strip the outer <svg> tag from SVG content and return the inner markup.
 * Also strips hardcoded fill attributes from child elements.
 *
 * @param {string} svgContent - Raw SVG file content
 * @returns {string} Inner SVG markup with fill attributes removed
 */
function extractInnerSvg(svgContent) {
	// Remove the outer <svg ...> and </svg> tags, keeping inner content
	const inner = svgContent
		.replace(/^<svg[^>]*>/, '')
		.replace(/<\/svg>\s*$/, '')
		.trim();

	// Strip hardcoded fill attributes so icons inherit currentColor
	return inner.replace(/\s+fill="(?!none)[^"]*"/g, '');
}

/**
 * Build a <symbol> element from an SVG file.
 *
 * @param {string} id - Symbol id attribute value
 * @param {string} svgContent - Raw SVG file content
 * @returns {string} SVG symbol markup
 */
function buildSymbol(id, svgContent) {
	const inner = extractInnerSvg(svgContent);
	return `\t<symbol id="${id}" viewBox="0 0 24 24">\n\t\t${inner}\n\t</symbol>`;
}

/**
 * Process a directory of SVG files and return symbol strings.
 *
 * @param {string} dir - Directory path
 * @param {string} prefix - Prefix to use for symbol ids ('bx' for basic, 'bxf' for filled)
 * @returns {Promise<string[]>} Array of symbol markup strings
 */
async function processDirectory(dir, prefix) {
	const files = await readdir(dir);
	const svgFiles = files.filter((f) => extname(f) === '.svg');

	const symbols = await Promise.all(
		svgFiles.map(async (file) => {
			const name = basename(file, '.svg');
			// Filled icons files use 'bx-' prefix; rename to configured prefix
			const id = prefix === 'bxf' ? name.replace(/^bx-/, 'bxf-') : name;
			const content = await readFile(join(dir, file), 'utf8');
			return buildSymbol(id, content);
		})
	);

	return symbols;
}

async function main() {
	// Ensure dist/ exists
	await mkdir(OUT_DIR, { recursive: true });

	const [basicSymbols, filledSymbols] = await Promise.all([
		processDirectory(BASIC_DIR, 'bx'),
		processDirectory(FILLED_DIR, 'bxf'),
	]);

	const totalCount = basicSymbols.length + filledSymbols.length;

	const sprite = [
		'<svg xmlns="http://www.w3.org/2000/svg" style="display:none">',
		...basicSymbols,
		...filledSymbols,
		'</svg>',
	].join('\n');

	await writeFile(OUT_FILE, sprite, 'utf8');

	console.log(
		`Built sprite with ${totalCount} icons (${basicSymbols.length} basic, ${filledSymbols.length} filled) → dist/sprite.svg`
	);
}

main().catch((err) => {
	console.error('build-sprite failed:', err);
	process.exit(1);
});
