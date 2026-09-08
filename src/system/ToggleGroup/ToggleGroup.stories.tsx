/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { useState } from 'react';
import { MdBlock, MdCancel, MdCheckCircle } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { ToggleGroup } from './ToggleGroup';
import { Text } from '../Text/Text';

import type { ToggleGroupOption } from './ToggleGroup';
import type { Meta, StoryObj } from '@storybook/react-vite';

const upperCaseOptions: ToggleGroupOption[] = [
	{ value: 'enabled', label: 'ENABLED', variant: 'green' },
	{ value: 'disabled', label: 'DISABLED', variant: 'gray' },
	{ value: 'blocked', label: 'BLOCKED', variant: 'red' },
];

const sentenceCaseOptions: ToggleGroupOption[] = [
	{ value: 'enabled', label: 'Enabled', variant: 'green' },
	{ value: 'disabled', label: 'Disabled', variant: 'gray' },
	{ value: 'blocked', label: 'Blocked', variant: 'red' },
];

const icons = {
	enabled: <MdCheckCircle />,
	disabled: <MdCancel />,
	blocked: <MdBlock />,
};

const iconOnlyOptions: ToggleGroupOption[] = sentenceCaseOptions.map( option => ( {
	...option,
	icon: icons[ option.value as keyof typeof icons ],
	hideLabel: true,
} ) );

const iconWithLabelOptions: ToggleGroupOption[] = sentenceCaseOptions.map( option => ( {
	...option,
	icon: icons[ option.value as keyof typeof icons ],
} ) );

const Stack = ( { children }: { children: React.ReactNode } ) => (
	<div sx={ { display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' } }>
		{ children }
	</div>
);

const meta: Meta< typeof ToggleGroup > = {
	title: 'ToggleGroup',
	component: ToggleGroup,
	tags: [ 'new' ],
	args: {
		'aria-label': 'Site status',
		options: upperCaseOptions,
	},
	parameters: {
		docs: {
			description: {
				component: `
A set of mutually exclusive options rendered as a single segmented control. Each option carries its
own color while selected, so the control doubles as a status indicator.

Give every option a \`variant\` drawn from the tag palette to match its meaning: \`green\` for a
healthy state, \`red\` for a blocking one, \`gray\` for neutral.

Every option needs a \`label\`, and that label is always its accessible name. Labels render exactly
as authored, so pass the casing you want. An option can also take an \`icon\`; set \`hideLabel\` to
show the icon alone and the label stays available to screen readers. \`hideLabel\` does not type
check without an \`icon\`, so an option can never end up unnamed.

The group starts empty unless you pass \`defaultValue\`. Once an option is selected the group always
keeps exactly one active: clicking the active option again is a no-op rather than a way to clear it.
				`,
			},
		},
	},
};

export default meta;

type Story = StoryObj< typeof ToggleGroup >;

export const Default: Story = {
	args: {
		defaultValue: 'enabled',
	},
};

export const SentenceCase: Story = {
	args: {
		defaultValue: 'enabled',
		options: sentenceCaseOptions,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Labels are rendered as authored. Nothing in the component forces uppercase, so sentence case works as-is.',
			},
		},
	},
};

export const MixedLabelLengths: Story = {
	args: {
		defaultValue: 'needs-review',
		options: [
			{ value: 'ok', label: 'OK', variant: 'green' },
			{ value: 'needs-review', label: 'Needs review', variant: 'yellow' },
			{ value: 'quarantined', label: 'Quarantined by policy', variant: 'red' },
		],
	},
	parameters: {
		docs: {
			description: {
				story:
					'Options size to their own label rather than sharing an equal width, so uneven labels stay readable.',
			},
		},
	},
};

export const NoSelection: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Without a `defaultValue` the group renders with nothing selected. It stays keyboard reachable: Tab moves into the group without selecting, and the arrow keys then pick an option.',
			},
		},
	},
};

export const Variants: Story = {
	render: args => (
		<Stack>
			{ upperCaseOptions.map( option => (
				<ToggleGroup key={ option.value } { ...args } defaultValue={ option.value } />
			) ) }
		</Stack>
	),
	parameters: {
		docs: {
			description: {
				story:
					'The selected option determines the color, so the same group reads differently per status.',
			},
		},
	},
};

export const IconOnly: Story = {
	args: {
		defaultValue: 'enabled',
		options: iconOnlyOptions,
	},
	parameters: {
		docs: {
			description: {
				story: `
With \`hideLabel\`, the option shows only its icon and renders the \`label\` inside a visually hidden
span. The accessible name therefore comes from real text in the accessibility tree rather than an
\`aria-label\`, which keeps it available to browser translation and to assistive technology that
falls back to content.

Tab into the group and each option still announces "Enabled, radio button, 1 of 3".
				`,
			},
		},
	},
};

export const IconWithLabel: Story = {
	args: {
		defaultValue: 'blocked',
		options: iconWithLabelOptions,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Leave `hideLabel` off to show the icon and the label together. Icons inherit the option color, so they take the variant color once selected.',
			},
		},
	},
};

export const DisabledOption: Story = {
	args: {
		defaultValue: 'enabled',
		options: [
			...sentenceCaseOptions.slice( 0, 2 ),
			{ ...sentenceCaseOptions[ 2 ], disabled: true },
		],
	},
};

export const DisabledGroup: Story = {
	args: {
		defaultValue: 'disabled',
		disabled: true,
	},
};

const ControlledExample = () => {
	const [ status, setStatus ] = useState( 'enabled' );

	return (
		<Stack>
			<ToggleGroup
				aria-label="Site status"
				options={ sentenceCaseOptions }
				value={ status }
				onValueChange={ setStatus }
			/>
			<Text>Current status: { status }</Text>
		</Stack>
	);
};

export const Controlled: Story = {
	render: () => <ControlledExample />,
	parameters: {
		docs: {
			description: {
				story: 'Pass `value` together with `onValueChange` to own the selection.',
			},
		},
	},
};
