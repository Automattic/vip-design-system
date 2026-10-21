import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { StoryContext } from '@storybook/react';

/** Show the HTML API on CSS pages, including markup produced by story helpers. */
export function htmlSource(source: string, context: StoryContext) {
	if (!/^(Block|Composition|Utility) Styles\//.test(context.title)) return source;
	const html = renderToStaticMarkup(
		createElement(() => context.originalStoryFn(context.args, context))
	);
	return html.replace(/></g, '>\n<');
}
