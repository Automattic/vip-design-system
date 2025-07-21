/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

import { DescriptionList } from './DescriptionList';

/**
 * Internal dependencies
 */

export default {
	title: 'DescriptionList',
	component: DescriptionList,
};

export const Default = () => (
	<DescriptionList
		title="Summary of the list"
		list={ [
			{
				label: 'Short Label',
				value:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			{
				label: 'Long label to test label width',
				value: 'Value',
			},
		] }
	/>
);

export const WithEmptySummary = () => <DescriptionList title="Summary of the list" list={ [] } />;

export const Table = () => (
	<DescriptionList
		as="table"
		title="Summary of the list"
		list={ [
			{
				label: 'Short Label',
				value: 'Value',
			},
		] }
	/>
);
