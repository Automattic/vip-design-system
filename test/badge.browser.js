// Baseline measured independently from upstream 09c404a0, before reconciliation.
const baseline = await fetch('./badge-baseline.json').then((response) => response.json());
const fixture = document.querySelector('#fixture');
const results = [];
const mount = (html) => {
	fixture.innerHTML = html;
};
const style = (id) => getComputedStyle(document.getElementById(id));
const expect = (actual, expected) => {
	if (actual !== expected) throw new Error(`Expected ${expected}, received ${actual}`);
};
const test = (name, run) => {
	try {
		run();
		results.push({ name, passed: true });
	} catch (error) {
		results.push({ name, passed: false, error: error.message });
	}
};
const badgeClass = 'badge type-support-label-xs';
const colorProperties = { background: 'backgroundColor', color: 'color', border: 'borderTopColor' };
const fixedProperties = {
	height: 'height',
	gap: 'gap',
	paddingBlock: 'paddingBlockStart',
	paddingInline: 'paddingInlineStart',
	borderWidth: 'borderTopWidth',
	radius: 'borderRadius',
	fontWeight: 'fontWeight',
	fontSize: 'fontSize',
	lineHeight: 'lineHeight',
	letterSpacing: 'letterSpacing',
};
const expectDefaults = (id) => {
	for (const [key, property] of Object.entries(fixedProperties))
		expect(style(id)[property], baseline.defaults[key]);
};
for (const theme of ['light', 'dark']) {
	document.documentElement.className = `theme-${theme}`;
	for (const color of Object.keys(baseline[theme])) {
		test(`${theme}: ${color} retains its colors and fixed dimensions`, () => {
			mount(`<span id="badge" class="${badgeClass}" data-badge-variant="${color}">Label</span>`);
			for (const [key, property] of Object.entries(colorProperties))
				expect(style('badge')[property], baseline[theme][color][key]);
			expectDefaults('badge');
		});
	}
	for (const [alias, color] of Object.entries({
		system: 'gray',
		info: 'blue',
		success: 'green',
		error: 'red',
		brand: 'gold',
		warning: 'yellow',
	})) {
		test(`${theme}: ${alias} matches ${color}`, () => {
			mount(`<span id="badge" class="${badgeClass}" data-badge-variant="${alias}">Label</span>`);
			for (const [key, property] of Object.entries(colorProperties))
				expect(style('badge')[property], baseline[theme][color][key]);
			expectDefaults('badge');
		});
	}
	test(`${theme}: nested badges own their default colors`, () => {
		mount(
			`<span class="${badgeClass}" data-badge-variant="error"><span id="inner" class="${badgeClass}">Inner</span></span>`
		);
		for (const [key, property] of Object.entries(colorProperties))
			expect(style('inner')[property], baseline[theme].gray[key]);
		expectDefaults('inner');
	});
	test(`${theme}: retired attributes cannot override the selected variant or fixed styles`, () => {
		mount(
			`<span id="badge" class="${badgeClass}" data-color="red" data-badge-variant="blue" data-badge-background="red" data-badge-color="green" data-badge-border-color="yellow" data-badge-icon-color="gold" data-badge-gap="9" data-badge-padding-block="0" data-badge-padding-inline="8" data-badge-border-width="0" data-badge-radius="none" data-badge-font-family="monospace" data-badge-font-size="default" data-badge-font-weight="bold" data-badge-line-height="relaxed" data-badge-letter-spacing="none" style="--badge-gap: 90px; --badge-font-size: 90px">Label</span>`
		);
		for (const [key, property] of Object.entries(colorProperties))
			expect(style('badge')[property], baseline[theme].blue[key]);
		expectDefaults('badge');
	});
	test(`${theme}: legacy data-color and removed or unknown variants use gray`, () => {
		for (const attributes of [
			'data-color="blue"',
			'data-badge-variant="orange"',
			'data-badge-variant="salmon"',
			'data-badge-variant="pink"',
			'data-badge-variant="unknown"',
			'',
		]) {
			mount(`<span id="badge" class="${badgeClass}" ${attributes}>Label</span>`);
			for (const [key, property] of Object.entries(colorProperties))
				expect(style('badge')[property], baseline[theme].gray[key]);
		}
	});
}
for (const theme of ['light', 'dark']) {
	document.documentElement.className = `theme-${theme === 'dark' ? 'light' : 'dark'}`;
	test(`A local ${theme} color scheme selects the component and semantic themes together`, () => {
		for (const variant of Object.keys(baseline[theme])) {
			mount(
				`<div style="color-scheme: ${theme}"><span id="badge" class="${badgeClass}" data-badge-variant="${variant}">Label</span></div>`
			);
			for (const [key, property] of Object.entries(colorProperties))
				expect(style('badge')[property], baseline[theme][variant][key]);
		}
	});
}
document.documentElement.className = 'theme-light';
test('Badge typography uses the existing composite utility', () => {
	mount(
		`<span id="badge" class="${badgeClass}">Label</span><span id="reference" class="type-support-label-xs">Label</span>`
	);
	for (const property of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'])
		expect(style('badge')[property], style('reference')[property]);
});
fixture.replaceChildren();
document.documentElement.className = '';
window.badgeResults = results;
document.querySelector('#results').textContent = JSON.stringify(results, null, 2);
document.title = `${results.filter((r) => r.passed).length}/${results.length} badge tests passed`;
