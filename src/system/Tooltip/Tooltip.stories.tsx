/**
 * Internal dependencies
 */
import { Tooltip, Button, Heading, Text } from '..';

export default {
	title: 'Tooltip',
	component: Tooltip,
	parameters: {
		docs: {
			description: {
				component: `
A tooltip is a short descriptive message that appears when a user hovers or focuses on an
element. Our tooltip aims to be 100% CSS-only. It uses a global css approach to inject the
tooltip styles.

## Kwown issues

The current implementation of this component is <strong>NOT</strong> protected from viewport
clipping (collision). For now, you can pick another <code>vip-tooltip-position</code> if
possible.

## Guidance

### When to use the tooltip component

- <strong>Helpful, non-critical information.</strong> Use tooltips to strengthen an existing
message.
- <strong>Enhance confidence.</strong> Use tooltips to increase certainty about an
interaction.
- <strong>Brief descriptions.</strong> Tooltips perform best with succinct helper text.
- <strong>Lack of space.</strong> Tooltips are useful as a last resort for space-constrained
UI. Explore other options for keeping content visible without a tooltip.

### When to consider something else

- <strong>Critical information.</strong> Don&apos;t hide information necessary for completing
a task behind an tooltip interaction.
- <strong>Lengthy descriptions.</strong> Tooltips are microcopy, and should be brief.
Don&apos;t use a tooltip if you need a lot of text.
- <strong>Redundant content.</strong> Don&apos;t use a tooltip when its content is repetitive
or if usability is obvious.
- <strong>Sufficient space.</strong> If content can fit outside a tooltip, don&apos;t use a
tooltip.

### Usability guidance

- <strong>Use affordances.</strong> A hidden tooltip is unusable. Use tooltips only on
elements that appear interactive, like buttons or links.
- <strong>Avoid collisions.</strong> Be careful not introduce conflicting hover or focus
events.
- <strong>Use consistently.</strong> If using tooltips in one context, use in all similar
contexts.
- <strong>Don&apos;t block content.</strong> Use the <code>data-position</code> attribute to
prevent the tooltip from covering other page elements.

-------

This documentation is heavily inspired by the [U.S Web Design System (USWDS)](https://designsystem.digital.gov/components/tooltip/#package). We use USWDS as trusted source of truth for accessibility and usability best practices.

## Component Properties
`,
			},
		},
	},
};

export const Basic = () => (
	<>
		<Heading variant="h2">Basic Usage</Heading>
		<Text>
			Pass a trigger and title, the trigger component will be cloned and injected with a{ ' ' }
			<code>[vip-tooltip]</code> HTML attribute.
		</Text>

		<Button sx={ { mr: 3 } }>Button with top tooltip</Button>

		<Tooltip
			trigger={ <Button sx={ { mr: 3 } }>Button with top tooltip</Button> }
			title="At the top"
			position="top"
		/>

		<Tooltip
			trigger={ <Button>Button with bottom tooltip</Button> }
			title="At the bottom"
			position="bottom"
		/>
	</>
);

export const Container = () => (
	<>
		<Tooltip>
			<button data-vip-tooltip="Test test">This is another way</button>
			<a href="http://google.com" data-vip-tooltip="Hello moto">
				Use with links too
			</a>
		</Tooltip>
	</>
);
