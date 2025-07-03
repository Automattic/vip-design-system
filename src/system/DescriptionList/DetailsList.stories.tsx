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
