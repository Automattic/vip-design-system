/**
 * Internal dependencies
 */
import { StoryObj } from '@storybook/react';

import { Footer } from '../Footer/Footer';

export default {
	title: 'Navigation/Footer',
	component: Footer,
	argTypes: {
		hasTrailingSeparator: { control: { type: 'boolean' } },
		links: { control: { type: 'array' } },
		customLogo: { control: { type: null } },
		maxWidth: { control: { type: 'text' } },
	},
};

type Story = StoryObj< typeof Footer >;

export const Default: Story = {
	render: () => (
		<Footer
			links={ [
				{
					children: 'About',
					href: 'https://wpvip.com/',
					screenReaderText: 'WordPress VIP. Learn more about us',
					showExternalIcon: false,
				},
				{
					children: 'Docs',
					href: 'https://docs.wpvip.com/',
					screenReaderText: 'our public documentation on our platform and tools',
				},
				{
					children: 'Status',
					href: 'https://wpvipstatus.com',
					screenReaderText:
						". See real-time availability and performance monitoring for WordPress VIP's services",
					newTab: true,
				},
			] }
		/>
	),
};
