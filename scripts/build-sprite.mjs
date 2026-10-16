/**
 * Build the SVG sprite from the curated icons in src/icons/.
 *
 * Icons are sourced from the Figma icon library, not from @boxicons/core —
 * see docs/decisions-log.csv (2026-10-16). The short version: Figma's library
 * is Boxicons v2 and the npm package is a later generation, so names diverge
 * (v2's bx-right-arrow-alt is v3's bx-arrow-right) and a missing symbol fails
 * silently as an invisible box. The package artwork is also not optically
 * normalised — glyphs filled anywhere from 50% to 100% of their canvas, so one
 * fixed icon size rendered them between 8px and 16px.
 *
 * The Figma masters are drawn on a 24x24 canvas with their own padding, so
 * the viewBox is kept as exported. Do NOT crop these to "2 2 20 20" the way
 * the old package-based build did: that crop existed to recover the 20x20
 * design grid from Boxicons' 24x24 canvas, and applying it here would scale
 * every glyph up by 20% beyond what Figma shows.
 *
 * src/icons/*.svg are committed. Refresh them deliberately with the sync
 * described in src/icons/manifest.json rather than fetching at build time —
 * builds stay reproducible and offline, and icon changes show up in diffs.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const ICON_DIR = join(ROOT, 'src/icons');
const MANIFEST = join(ICON_DIR, 'manifest.json');
const OUT_DIR = join(ROOT, 'dist');
const OUT_FILE = join(OUT_DIR, 'sprite.svg');

/** Pull the viewBox and inner markup out of a cleaned icon file. */
function parseIcon(svg, name) {
	const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
	if (!viewBox) {
		throw new Error(`${name}: no viewBox`);
	}
	const inner = svg
		.replace(/^[\s\S]*?<svg[^>]*>/, '')
		.replace(/<\/svg>\s*$/, '')
		.trim();
	if (!inner) {
		throw new Error(`${name}: no drawable content`);
	}
	return { viewBox, inner };
}

async function main() {
	const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
	const sanctioned = Object.keys(manifest.icons);

	const files = (await readdir(ICON_DIR)).filter((f) => f.endsWith('.svg')).sort();
	const present = files.map((f) => basename(f, '.svg'));

	// The manifest is the contract. Fail loudly on either kind of mismatch: a
	// sanctioned icon with no file would otherwise ship as an invisible box,
	// and a stray file would ship an icon nobody approved.
	const missing = sanctioned.filter((n) => !present.includes(n));
	const unexpected = present.filter((n) => !sanctioned.includes(n));
	if (missing.length) {
		throw new Error(
			`Missing icon file(s) for manifest entries: ${missing.join(', ')}.\n` +
				`Run the icon sync, or remove them from src/icons/manifest.json.`
		);
	}
	if (unexpected.length) {
		throw new Error(
			`src/icons/ has file(s) not in the manifest: ${unexpected.join(', ')}.\n` +
				`Add them to src/icons/manifest.json, or delete them.`
		);
	}

	const symbols = [];
	for (const file of files) {
		const name = basename(file, '.svg');
		const { viewBox, inner } = parseIcon(await readFile(join(ICON_DIR, file), 'utf8'), name);
		symbols.push(`\t<symbol id="${name}" viewBox="${viewBox}">\n\t\t${inner}\n\t</symbol>`);
	}

	const sprite = [
		'<svg xmlns="http://www.w3.org/2000/svg" style="display: none">',
		...symbols,
		'</svg>',
		'',
	].join('\n');

	await mkdir(OUT_DIR, { recursive: true });
	await writeFile(OUT_FILE, sprite, 'utf8');

	const kb = (Buffer.byteLength(sprite) / 1024).toFixed(1);
	console.log(`Built sprite with ${symbols.length} icons (${kb} KB) → dist/sprite.svg`);
	console.log(`Source: ${manifest.library.name} (${manifest.library.source}), via src/icons/`);
}

main().catch((err) => {
	console.error('build-sprite failed:', err.message);
	process.exitCode = 1;
});
