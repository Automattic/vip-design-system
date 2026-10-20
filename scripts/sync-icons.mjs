/**
 * Refresh src/icons/*.svg from the Figma icon library.
 *
 * Run deliberately — `npm run icons:sync` — not as part of the build. Icons are
 * committed so builds stay reproducible and offline, and so an icon change
 * shows up in a PR diff rather than arriving silently in a release. See
 * docs/decisions-log.csv (2026-10-16).
 *
 * Adding an icon:
 *   1. add its name to src/icons/manifest.json (the name as it appears in the
 *      Figma library, which is Boxicons v2)
 *   2. look up its node id in Figma and add it alongside
 *   3. npm run icons:sync
 *   4. commit the new .svg
 *
 * Requires a Figma personal access token in FIGMA_TOKEN. The initial ten icons
 * were fetched through the Figma MCP instead, which needs no token but cannot
 * be scripted; this path exists so anyone can refresh them without that.
 *
 * Fails on the first icon it cannot resolve rather than skipping it: a missing
 * symbol renders as an invisible box that measures correctly and draws nothing,
 * which is far harder to notice than a failed build.
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { cleanIconSvg } from './clean-icon-svg.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICON_DIR = join(__dirname, '../src/icons');

const token = process.env.FIGMA_TOKEN;
if (!token) {
	console.error(
		'sync-icons: FIGMA_TOKEN is not set.\n' +
			'Create a personal access token with read access to file content at\n' +
			'  Figma → Settings → Security → Personal access tokens\n' +
			'then export it, e.g.  export FIGMA_TOKEN="…"  in your shell profile.'
	);
	process.exit(1);
}

const manifest = JSON.parse(await readFile(join(ICON_DIR, 'manifest.json'), 'utf8'));
const { fileKey, name: libraryName } = manifest.library;
const entries = Object.entries(manifest.icons);

// One call returns a URL per node, so the whole set costs a single request.
const ids = entries.map(([, id]) => id).join(',');
const res = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${ids}&format=svg`, {
	headers: { 'X-Figma-Token': token },
});
if (!res.ok) {
	throw new Error(`Figma API ${res.status} ${res.statusText}`);
}
const { images, err } = await res.json();
if (err) {
	throw new Error(`Figma API error: ${err}`);
}

let written = 0;
for (const [name, nodeId] of entries) {
	const url = images[nodeId];
	if (!url) {
		throw new Error(
			`${name} (${nodeId}) returned no image. The node may have been moved, renamed or ` +
				`deleted in "${libraryName}" — check its id in Figma and update the manifest.`
		);
	}

	const svgRes = await fetch(url);
	if (!svgRes.ok) {
		throw new Error(`${name}: download failed, ${svgRes.status} ${svgRes.statusText}`);
	}

	const { viewBox, inner } = cleanIconSvg(await svgRes.text(), name);
	const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">\n\t${inner.replace(
		/\n/g,
		'\n\t'
	)}\n</svg>\n`;
	await writeFile(join(ICON_DIR, `${name}.svg`), out, 'utf8');
	console.log(`  ${name}`);
	written += 1;
}

console.log(`\nSynced ${written} icon(s) from "${libraryName}" → src/icons/`);
console.log('Review the diff, then run `npm run build:icons` and commit.');
