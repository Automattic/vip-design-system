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
				component:
					'A tooltip is a short descriptive message that appears when a user hovers or focuses on an element.',
			},
		},
	},
};

export const Documentation = () => (
	<>
		<Text>
			A tooltip is a short descriptive message that appears when a user hovers or focuses on an
			element. Our tooltip aims to be 100% CSS-only. It uses a global css approach to inject the
			tooltip styles.
		</Text>

		<Heading variant="h5" sx={ { mt: 4, mb: 2 } }>
			Known issues
		</Heading>

		<Text sx={ { color: 'texts.helper', mb: 3 } }>
			The current implementation of this component is <strong>NOT</strong> protected from viewport
			clipping (collision). For now, you can pick another <code>vip-tooltip-position</code> if
			possible.
		</Text>

		<Heading variant="h5" sx={ { mt: 4, mb: 2 } }>
			Guidance
		</Heading>

		<Heading variant="h5" sx={ { mt: 4, mb: 2 } }>
			When to use the tooltip component
		</Heading>

		<ul>
			<li>
				<strong>Helpful, non-critical information.</strong> Use tooltips to strengthen an existing
				message.
			</li>
			<li>
				<strong>Enhance confidence.</strong> Use tooltips to increase certainty about an
				interaction.
			</li>
			<li>
				<strong>Brief descriptions.</strong> Tooltips perform best with succinct helper text.
			</li>
			<li>
				<strong>Lack of space.</strong> Tooltips are useful as a last resort for space-constrained
				UI. Explore other options for keeping content visible without a tooltip.
			</li>
		</ul>

		<Heading variant="h5" sx={ { mt: 4, mb: 2 } }>
			When to consider something else
		</Heading>

		<ul>
			<li>
				<strong>Critical information.</strong> Don&apos;t hide information necessary for completing
				a task behind an tooltip interaction.
			</li>
			<li>
				<strong>Lengthy descriptions.</strong> Tooltips are microcopy, and should be brief.
				Don&apos;t use a tooltip if you need a lot of text.
			</li>
			<li>
				<strong>Redundant content.</strong> Don&apos;t use a tooltip when its content is repetitive
				or if usability is obvious.
			</li>
			<li>
				<strong>Sufficient space.</strong> If content can fit outside a tooltip, don&apos;t use a
				tooltip.
			</li>
		</ul>

		<Heading variant="h5" sx={ { mt: 4, mb: 2 } }>
			Usability guidance
		</Heading>

		<ul>
			<li>
				<strong>Use affordances.</strong> A hidden tooltip is unusable. Use tooltips only on
				elements that appear interactive, like buttons or links.
			</li>
			<li>
				<strong>Avoid collisions.</strong> Be careful not introduce conflicting hover or focus
				events.
			</li>
			<li>
				<strong>Use consistently.</strong> If using tooltips in one context, use in all similar
				contexts.
			</li>
			<li>
				<strong>Don&apos;t block content.</strong> Use the <code>data-position</code> attribute to
				prevent the tooltip from covering other page elements.
			</li>
		</ul>

		<hr />

		<Text>
			This documentation is heavily inspired by the{ ' ' }
			<a href="https://designsystem.digital.gov/components/tooltip/#package">
				U.S Web Design System (USWDS).
			</a>
			We use USWDS as trusted source of truth for accessibility and usability best practices.
		</Text>
	</>
);

export const Basic = () => (
	<>
		<Heading variant="h2">Basic Usage</Heading>
		<Text>
			Pass a trigger and title, the trigger component will be cloned and injected with a{ ' ' }
			<code>[vip-tooltip]</code> HTML attribute.
		</Text>

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
			<button vip-tooltip="Test test">This is another way</button>
			<a href="http://google.com" vip-tooltip="Hello moto">
				Use with links too
			</a>
		</Tooltip>
	</>
);
