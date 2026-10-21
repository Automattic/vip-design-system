export const descriptions = {
	box: 'A padded surface with a border and coordinated foreground/background colors. Prefer the surface preset; individual color controls are available when needed. Box does not arrange its children: combine it with Stack or Cluster. Each instance establishes its own defaults.',
	cluster:
		'A wrapping row with consistent gaps. Inline alignment distributes items along the row; block alignment aligns them across it. Useful for actions, tags, and short groups that should wrap naturally.',
	cover:
		'A vertical layout with a minimum height. With three direct children, the first and last sit at the edges and the middle is centered in the available space. A single child is centered. The default minimum height is the viewport; this example uses 20rem.',
	frame:
		'An aspect-ratio container that clips overflow. A direct img or video fills the frame using object-fit: cover. Change the ratio to see cropping; keep meaningful alternative text on the image.',
	grid: 'A responsive CSS grid. Auto-fill reserves available tracks; auto-fit collapses empty tracks. Numeric columns select a fixed track count. The minimum item size still applies, so an overly large minimum or column count can overflow a narrow container.',
	reel: 'A horizontal strip of direct children that scrolls when it overflows. Item inline size controls each child; block size controls the strip. Keep the scrollbar visible for discoverability. A focusable, named region lets keyboard users scroll it. Hiding the scrollbar does not disable scrolling.',
	repel:
		'A wrapping row that pushes its children toward opposite inline edges. The nowrap behavior prevents wrapping; use it only when the contents can fit or safely shrink.',
	sidebar:
		'Two direct children: a sidebar and flexible content. The content minimum determines when they stack. Position end makes the last child the sidebar; reorder the markup accordingly. Order reverse changes only visual order, so prefer meaningful source order. Sticky applies to the sidebar child and must be disabled by consumer CSS at the layout’s wrap breakpoint when necessary.',
	stack:
		'A vertical flex layout with consistent gaps between direct children. Inline alignment controls cross-axis alignment; block alignment distributes items vertically when space is available. Nested stacks have independent defaults. Use Flow for document content that should stay in normal flow.',
	switcher:
		'Direct children share a row above the container-width threshold and stack below it. This responds to available container space, not a viewport media query. Five or more children always stack. Resize the examples to compare the transition.',
	'with-icon':
		'An inline flex group that aligns an icon and text on their baseline. Gap options use em units and follow the surrounding font size. Pair it with the Icon utility; mark decorative SVGs aria-hidden. It does not add button behavior.',
	wrapper:
		'A centered content boundary with a maximum inline size and inline padding. It does not arrange its children. Place it inside a Region for a full-width section background with constrained content. Its maximum width includes padding under the system’s border-box reset.',
	flow: 'Adds block-start margin between direct siblings in normal document flow. It creates no flex or grid layout. Nested Flow instances establish their own defaults. The data attribute belongs on the container; custom CSS assigns --flow-space on its direct children.',
	region:
		'Adds equal block padding to a section. Combine it with Flow on the same element for spacing between contents, or put a Wrapper inside it to constrain content while the section background spans the full width. Padding utilities can override it.',
} as const;
