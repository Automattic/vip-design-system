/** @jsxImportSource theme-ui */

import { FilterDropdown } from './FilterDropdown';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'FilterDropdown',
	component: FilterDropdown,
	parameters: {
		docs: {
			description: {
				component: `

A Dropdown component that acts as a filter for a list of items.

## Guidance

### When to use the FilterDropdown component

- When you want a Dropdown option that sticks with the selected value on the trigger button;

### When to consider something else

- When you want to display a list of options that does not require to stick with the selected value on the trigger button;

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof FilterDropdown >;

const filterTypes = [ 'all', 'hasUpdate', 'isVulnerable' ] as const;
type FilterType = ( typeof filterTypes )[ number ];

const FILTER_OPTIONS: Record< FilterType, { value: FilterType; label: string } > = {
	all: { value: 'all', label: 'All' },
	hasUpdate: { value: 'hasUpdate', label: 'Update Available' },
	isVulnerable: { value: 'isVulnerable', label: 'Known Vulnerabilities' },
};

export const Default: Story = {
	render: () => (
		<>
			<FilterDropdown
				className="vip-plugins-filter-dropdown"
				label="Filter:"
				filters={ FILTER_OPTIONS }
				onSelect={ () => {} }
				defaultValue={ FILTER_OPTIONS.all.value }
			/>
		</>
	),
};
