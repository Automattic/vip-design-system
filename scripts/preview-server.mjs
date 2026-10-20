/**
 * Static file server for the docs previews.
 *
 * The previews in docs/ are plain static files that link at ../src/css/index.css
 * and ../dist/sprite.svg, so they need the repo root served — opening them over
 * file:// does not resolve those. Vite is not used here deliberately: it would
 * transform the CSS, and these previews exist to show what the browser does with
 * the stylesheet as authored.
 *
 * Run `npm run preview`, then open:
 *   http://localhost:8420/docs/component-preview-v2.html
 *
 * Icons need `npm run build:icons` first — dist/sprite.svg is gitignored.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, extname, normalize, dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT ?? process.argv[2] ?? 8420);

const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
};

createServer(async (req, res) => {
	try {
		const url = decodeURIComponent(req.url.split('?')[0]);
		const path = join(root, normalize(url).replace(/^(\.\.[/\\])+/, ''));
		if (!path.startsWith(root)) {
			res.writeHead(403).end('forbidden');
			return;
		}
		const body = await readFile(path);
		res
			.writeHead(200, {
				'content-type': types[extname(path)] ?? 'application/octet-stream',
			})
			.end(body);
	} catch {
		res.writeHead(404).end('not found');
	}
}).listen(port, () => {
	console.log(`Serving ${root}`);
	console.log(`→ http://localhost:${port}/docs/component-preview-v2.html`);
});
