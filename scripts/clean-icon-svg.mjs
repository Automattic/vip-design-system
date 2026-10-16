/**
 * Normalises a raw Figma SVG export into something the sprite can use.
 *
 * Figma exports carry three things that break icons in this system:
 *
 *   1. A background <rect> the size of the frame. Figma includes the artboard
 *      fill, which would paint an opaque square behind every icon.
 *   2. Hardcoded fill attributes. The sprite relies on fill: currentColor so
 *      icons inherit text colour and theme for free; a literal fill defeats it.
 *   3. preserveAspectRatio="none" on instance exports. Left in, the glyph
 *      stretches to any non-square box instead of keeping its proportions.
 *
 * Also strips the id attributes Figma generates from layer names, which would
 * otherwise collide across symbols once they are concatenated into one sprite.
 */

/** @returns {{ viewBox: string, inner: string }} */
export function cleanIconSvg(raw, name) {
	const svg = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
	if (!svg) {
		throw new Error(`${name}: no <svg> element in the export`);
	}

	const viewBoxMatch = raw.match(/viewBox="([^"]+)"/);
	if (!viewBoxMatch) {
		throw new Error(`${name}: export has no viewBox`);
	}

	let inner = svg[1];

	// 1. Drop the frame background. Figma emits it as the first child, a rect
	//    covering the whole viewBox with a solid fill and no geometry of its own.
	inner = inner.replace(/<rect\b[^>]*\/>\s*/g, (rect) => {
		const isFullBleed = /\bx="0"|\bwidth="\d+"/.test(rect) && !/rx=/.test(rect);
		return isFullBleed ? '' : rect;
	});

	// 2. Hardcoded colour — the sprite paints with currentColor.
	inner = inner.replace(/\s(?:fill|stroke)="(?!none")[^"]*"/g, '');

	// 3. Layer-name ids, which are not unique once symbols share a document.
	inner = inner.replace(/\sid="[^"]*"/g, '');

	inner = inner.replace(/^\s*[\r\n]/gm, '').trim();

	if (!/<(path|circle|rect|polygon|polyline|ellipse|line|g)\b/.test(inner)) {
		throw new Error(`${name}: nothing drawable left after cleaning`);
	}

	return { viewBox: viewBoxMatch[1], inner };
}
