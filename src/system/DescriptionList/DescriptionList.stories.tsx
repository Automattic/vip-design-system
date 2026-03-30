/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

import { DescriptionList } from './DescriptionList';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	title: 'DescriptionList',
	component: DescriptionList,
};

type Story = StoryObj< typeof DescriptionList >;

export const Default: Story = {
	args: {
		title: 'Summary of the list',
		list: [
			{
				label: 'Short Label',
				value:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			{
				label: 'Long label to test label width',
				value: 'Value',
			},
		],
	},
};

export const WithEmptySummary: Story = {
	args: {
		title: 'Summary of the list',
		list: [],
	},
};

export const Table: Story = {
	args: {
		as: 'table',
		title: 'Summary of the list',
		list: [
			{
				label: 'Short Label',
				value: 'Value',
			},
		],
	},
};
