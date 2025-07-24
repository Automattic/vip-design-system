/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { ComponentStory, ComponentMeta } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Screenshot } from './Screenshot';
import { Flex } from '../Flex';

export default {
	title: 'Screenshot',
	component: Screenshot,
	argTypes: {
		height: {
			control: { type: 'number' },
		},
		width: {
			control: { type: 'number' },
		},
		url: {
			control: { type: 'text' },
		},
		showEmpty: {
			control: { type: 'boolean' },
		},
		showNoPermission: {
			control: { type: 'boolean' },
		},
		alt: {
			control: { type: 'text' },
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The Screenshot component displays a website screenshot using WordPress.com's mshots service, or a placeholder state when the screenshot is not available or permission is denied.

## Guidance

### When to use the Screenshot component

- **Website previews**. Use to show visual previews of websites or web pages.
- **Content thumbnails**. Display thumbnails for websites, blogs, or other web content.
- **Permission states**. Show appropriate placeholders when screenshots are not available.

### When to consider something else

- **High-resolution images**. For detailed image viewing, use a dedicated image component.
- **User-uploaded content**. For user-generated images, use an image upload component.

## Using the component

- **Provide meaningful alt text**. Always include descriptive alt text for accessibility.
- **Handle loading states**. The mshots service may take time to generate screenshots.
- **Use appropriate dimensions**. Choose width and height that work with your layout.

## Component Properties
`,
			},
		},
	},
} as ComponentMeta< typeof Screenshot >;

const Template: ComponentStory< typeof Screenshot > = ( args ) => <Screenshot { ...args } />;

export const Default = Template.bind( {} );
Default.args = {
	url: 'wordpress.com',
	width: 200,
	height: 150,
	alt: 'WordPress.com homepage screenshot',
};

export const Small = Template.bind( {} );
Small.args = {
	url: 'github.com',
	width: 108,
	height: 78,
	alt: 'GitHub homepage screenshot',
};

export const Large = Template.bind( {} );
Large.args = {
	url: 'automattic.com',
	width: 300,
	height: 200,
	alt: 'Automattic homepage screenshot',
};

export const NoPermission = Template.bind( {} );
NoPermission.args = {
	showNoPermission: true,
	width: 200,
	height: 150,
};

export const Empty = Template.bind( {} );
Empty.args = {
	showEmpty: true,
	width: 200,
	height: 150,
};

export const Gallery = () => (
	<Flex sx={ { flexWrap: 'wrap', gap: 3 } }>
		<Screenshot url="wordpress.com" width={ 150 } height={ 100 } alt="WordPress.com" />
		<Screenshot url="github.com" width={ 150 } height={ 100 } alt="GitHub" />
		<Screenshot url="automattic.com" width={ 150 } height={ 100 } alt="Automattic" />
		<Screenshot showNoPermission width={ 150 } height={ 100 } />
		<Screenshot showEmpty width={ 150 } height={ 100 } />
	</Flex>
);
Gallery.parameters = {
	docs: {
		description: {
			story: 'Multiple screenshots displayed in a gallery layout.',
		},
	},
}; 