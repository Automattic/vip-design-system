// Real-browser regression tests: CSS layers, inheritance and layout aren't modeled by jsdom.
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

test('Container attributes isolate configured, default, and invalid nested stacks', () => {
	mount(`<div id="outer" class="stack" data-stack-gap="10">
		<div id="default" class="stack"><span>A</span><span>B</span></div>
		<div id="inner" class="stack" data-stack-gap="4"><span>A</span><span>B</span></div>
		<div id="invalid" class="stack" data-stack-gap="123rem"></div></div>`);
	expect(style('outer').gap, '56px');
	expect(style('default').gap, '16px');
	expect(style('inner').gap, '8px');
	expect(style('invalid').gap, '16px');
});

test('Shared elements configure compositions and utilities independently', () => {
	mount(
		'<div id="combined" class="box stack region" data-box-padding="4" data-stack-gap="7" data-region-space="8"></div>'
	);
	expect(style('combined').gap, '24px');
	expect(style('combined').paddingInlineStart, '8px');
	expect(style('combined').paddingBlockStart, '32px');
});

test('Gap and padding utilities still override attribute configuration', () => {
	mount(
		'<div id="utilities" class="box stack region gap-4 p-5" data-box-padding="9" data-stack-gap="10" data-region-space="11"></div>'
	);
	expect(style('utilities').gap, '8px');
	expect(style('utilities').padding, '12px');
	mount(
		'<div class="flow" data-flow-space="11"><div>A</div><div id="margin" class="m-bs-4">B</div></div>'
	);
	expect(style('margin').marginBlockStart, '8px');
});

test('Inline and unlayered CSS variables remain overrides', () => {
	mount(
		'<div id="inline" class="stack" data-stack-gap="10" style="--stack-gap: 21px"></div><div id="custom" class="stack custom-stack" data-stack-gap="10"></div>'
	);
	expect(style('inline').gap, '21px');
	expect(style('custom').gap, '19px');
	mount(
		'<div class="sidebar custom-sidebar" data-sidebar-width="10rem"><aside id="rail">A</aside><main>B</main></div>'
	);
	expect(style('rail').flexBasis, '288px');
});

test('Layout presets retain semantic token overrides', () => {
	mount(
		'<div class="sidebar" data-sidebar-width="20rem" style="--layout-size-20: 360px"><aside id="rail">A</aside><main>B</main></div>'
	);
	expect(style('rail').flexBasis, '360px');
});

test('Nested flows separate incoming margins from their children, including defaults', () => {
	mount(`<div class="flow" data-flow-space="10"><div>A</div>
		<div id="inner" class="flow" data-flow-space="4"><div>B</div><div id="leaf">C</div></div>
		<div id="default" class="flow"><div>D</div><div id="default-leaf">E</div></div></div>`);
	expect(style('inner').marginBlockStart, '56px');
	expect(style('leaf').marginBlockStart, '8px');
	expect(style('default').marginBlockStart, '56px');
	expect(style('default-leaf').marginBlockStart, '16px');
	mount('<div class="flow custom-flow"><div>A</div><div id="custom">B</div></div>');
	expect(style('custom').marginBlockStart, '23px');
});

test('Nested sidebars keep outer width, inner width and content minima independent', () => {
	mount(`<div class="sidebar" data-sidebar-width="24rem" data-sidebar-content-min="75%">
		<div id="inner" class="sidebar" data-sidebar-width="10rem" data-sidebar-content-min="25%">
			<aside id="inner-rail">A</aside><main id="inner-content">B</main></div>
		<div id="outer-content" class="sidebar"><aside id="default-rail">C</aside><main id="default-content">D</main></div></div>`);
	expect(style('inner').flexBasis, '384px');
	expect(style('inner-rail').flexBasis, '160px');
	expect(style('inner-content').minInlineSize, '25%');
	expect(style('outer-content').minInlineSize, '75%');
	expect(style('default-rail').flexBasis, '320px');
	expect(style('default-content').minInlineSize, '50%');
});

test('End-position sticky sidebar uses configured width, offset and automatic height', () => {
	mount(
		'<div class="sidebar" data-position="end" data-sticky data-sidebar-width="12rem" data-sidebar-sticky-offset="7" data-sidebar-sticky-block-size="auto"><main id="content">A</main><aside id="rail">B</aside></div>'
	);
	expect(style('rail').flexBasis, '192px');
	expect(style('rail').position, 'sticky');
	expect(style('rail').insetBlockStart, '24px');
	expect(style('content').minInlineSize, '50%');
	fixture.firstElementChild.removeAttribute('data-sidebar-sticky-block-size');
	expect(style('rail').blockSize, `${window.innerHeight - 24}px`);
});

test('Nested reels size outer and inner items independently', () => {
	mount(
		'<div class="reel" data-reel-item-inline-size="24rem"><div id="inner" class="reel" data-reel-item-inline-size="10rem"><div id="item">A</div></div><div class="reel"><div id="default">B</div></div></div>'
	);
	expect(style('inner').flexBasis, '384px');
	expect(style('item').flexBasis, '160px');
	expect(style('default').flexBasis, 'auto');
});

test('Nested switchers keep their own thresholds', () => {
	mount(
		'<div class="switcher" data-switcher-threshold="50rem"><div id="inner" class="switcher" data-switcher-threshold="20rem"><div id="item">A</div><div>B</div></div><div class="switcher"><div id="default">C</div></div></div>'
	);
	expect(style('inner').flexBasis, 'calc(-99900% + 799200px)');
	expect(style('item').flexBasis, 'calc(-99900% + 319680px)');
	expect(style('default').flexBasis, 'calc(-99900% + 639360px)');
});

test('Length, ratio, alignment and font-relative presets reach layout properties', () => {
	mount(`<div id="grid" class="grid" data-grid-columns="3" data-grid-min-item-size="12rem" data-grid-gap="none"></div>
		<div id="frame" class="frame" data-frame-ratio="4/3"></div>
		<div id="cover" class="cover" data-cover-min-height="12rem" data-cover-padding="none"></div>
		<div id="wrapper" class="wrapper" data-wrapper-max-inline-size="30rem" data-wrapper-padding-inline="4"></div>
		<div id="cluster" class="cluster" data-cluster-inline-alignment="end" data-cluster-block-alignment="baseline"></div>
		<div id="icon" class="with-icon" data-with-icon-gap="1em"></div>`);
	expect(style('grid').gridTemplateColumns.split(' ').length, 3);
	expect(style('grid').gap, '0px');
	expect(style('frame').aspectRatio, '4 / 3');
	expect(style('cover').minBlockSize, '192px');
	expect(style('cover').padding, '0px');
	expect(style('wrapper').maxInlineSize, '480px');
	expect(style('wrapper').paddingInlineStart, '8px');
	expect(style('cluster').justifyContent, 'flex-end');
	expect(style('cluster').alignItems, 'baseline');
	expect(style('icon').gap, style('icon').fontSize);
});

for (const theme of ['theme-light', 'theme-dark']) {
	test(`Box presets, individual overrides, aliases and nesting in ${theme}`, () => {
		document.documentElement.className = theme;
		mount(`<div id="default" class="box"></div>
			<div id="inverse" class="box" data-box-surface="inverse"><div id="nested" class="box"></div></div>
			<div id="legacy" class="box" data-variant="inverse"></div>
			<div id="explicit" class="box" data-variant="inverse" data-box-surface="default"></div>
			<div id="override" class="box" data-box-color="text-primary" data-box-surface="inverse" data-box-radius="expressive" data-box-border-width="1.5"></div>
			<div id="inverse-options" class="box" data-box-surface="inverse" data-box-color-inverse="text-primary" data-box-background-inverse="layer-3" data-box-border-color-inverse="border-control"></div>
			<div id="reference" class="box" data-box-color="text-primary" data-box-background="layer-3" data-box-border-color="border-control"></div>`);
		expect(style('inverse').color, style('default').backgroundColor);
		expect(style('inverse').backgroundColor, style('default').color);
		for (const property of ['color', 'backgroundColor', 'borderTopColor']) {
			expect(style('legacy')[property], style('inverse')[property]);
			expect(style('explicit')[property], style('default')[property]);
			expect(style('nested')[property], style('default')[property]);
			expect(style('inverse-options')[property], style('reference')[property]);
		}
		expect(style('override').color, style('default').color);
		expect(style('override').borderRadius, '16px');
		expect(style('override').getPropertyValue('--box-border-width').trim(), '1.5px');
	});
}

test('Zero-based spacing and radius scales support zero without changing semantic defaults', () => {
	mount(`<div id="zero" class="box stack p-0 gap-0" data-box-radius="none"></div>
 <div id="first" class="stack p-1 gap-1"></div>
 <div id="last" class="stack p-13 gap-13"></div>
 <div id="attributes" class="box stack" data-stack-gap="0" data-box-padding="0"></div>`);
	expect(style('zero').padding, '0px');
	expect(style('zero').gap, '0px');
	expect(style('zero').borderRadius, '0px');
	expect(style('first').padding, '2px');
	expect(style('first').gap, '2px');
	expect(style('last').padding, '160px');
	expect(style('last').gap, '160px');
	expect(style('attributes').padding, '0px');
	expect(style('attributes').gap, '0px');
});

fixture.replaceChildren();
document.documentElement.className = '';
window.cssConfigurationResults = results;
document.querySelector('#results').textContent = JSON.stringify(results, null, 2);
document.title = `${results.filter((r) => r.passed).length}/${results.length} CSS configuration tests passed`;
