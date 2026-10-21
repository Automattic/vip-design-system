import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../index';
import {
	badgeAliases,
	badgeControls,
	badgeVariants,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import type { BadgeOptions } from '../../index';

const meta = {
	title: 'React Components/Badge',
	component: Badge,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: {
				component: reactDescription(
					'badge',
					'A short status label. Badge applies both the badge class and its fixed typography utility. Only the variant is configurable; use semantic names such as info and success when they describe the status.'
				),
			},
		},
	},
	argTypes: { ...badgeControls, ...renderControls, children: { control: 'text' } },
	args: { variant: 'info', children: 'Ready to publish' },
	render: (args) => <Badge {...args} />,
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const SemanticAliases: Story = {
	render: () => (
		<div className="cluster" data-cluster-gap="4">
			{badgeAliases.map((variant) => (
				<Badge key={variant} variant={variant as BadgeOptions['variant']}>
					{variant}
				</Badge>
			))}
		</div>
	),
};
export const ColorVariants: Story = {
	render: () => (
		<div className="cluster" data-cluster-gap="4">
			{badgeVariants.map((variant) => (
				<Badge key={variant} variant={variant as BadgeOptions['variant']}>
					{variant}
				</Badge>
			))}
		</div>
	),
};
/** This canvas starts in Dark mode independently of the other examples. */
export const DarkMode: Story = { ...SemanticAliases, parameters: { colorMode: 'dark' } };
