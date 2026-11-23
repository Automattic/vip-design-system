// Vite resolves these assets for both local development and subdirectory hosting.
export const landscape = new URL('../public/landscape.svg', import.meta.url).href;
export const sprite = new URL('../../dist/sprite.svg', import.meta.url).href;
