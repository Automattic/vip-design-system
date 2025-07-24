/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Screenshot } from './Screenshot';
import { Flex } from '../Flex';
import { Button } from '../Button';

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
		loading: {
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
The Screenshot component displays a website screenshot using WordPress.com's mshots service, with automatic loading states and placeholder states when the screenshot is not available or permission is denied.

## Guidance

### When to use the Screenshot component

- **Website previews**. Use to show visual previews of websites or web pages.
- **Content thumbnails**. Display thumbnails for websites, blogs, or other web content.
- **Permission states**. Show appropriate placeholders when screenshots are not available.
- **Loading states**. Automatically shows a spinner while screenshots are being generated.

### When to consider something else

- **High-resolution images**. For detailed image viewing, use a dedicated image component.
- **User-uploaded content**. For user-generated images, use an image upload component.

## Using the component

- **Provide meaningful alt text**. Always include descriptive alt text for accessibility.
- **Loading states**. The component automatically shows a loading spinner while the mshots service generates screenshots. You can also manually control the loading state with the \`loading\` prop.
- **Use appropriate dimensions**. Choose width and height that work with your layout.
- **Handle placeholder states**. Use \`showEmpty\` for general empty states and \`showNoPermission\` when access is restricted.
- **Responsive icons**. Icons automatically scale based on container size (20% of the smaller dimension, min 12px, max 32px).

## Component Properties
`,
			},
		},
	},
} as ComponentMeta< typeof Screenshot >;

const Template: ComponentStory< typeof Screenshot > = ( args ) => <Screenshot { ...args } />;

export const Large = Template.bind( {} );
Large.args = {
	url: 'wordpress.com',
	width: 108,
	height: 78,
	alt: 'WordPress.com homepage screenshot',
};

export const Small = Template.bind( {} );
Small.args = {
	url: 'github.com',
	width: 48,
	height: 48,
	alt: 'GitHub homepage screenshot',
};

export const Medium = Template.bind( {} );
Medium.args = {
	url: 'automattic.com',
	width: 64,
	height: 64,
	alt: 'Automattic homepage screenshot',
};

export const XLarge = Template.bind( {} );
XLarge.args = {
	url: 'jetpack.com',
	width: 480,
	height: 360,
	alt: 'Jetpack homepage screenshot',
};

export const NoPermission = Template.bind( {} );
NoPermission.args = {
	showNoPermission: true,
	width: 108,
	height: 78,
};

export const Empty = Template.bind( {} );
Empty.args = {
	showEmpty: true,
	width: 108,
	height: 78,
};

export const Loading = Template.bind( {} );
Loading.args = {
	url: 'wordpress.com',
	loading: true,
	width: 108,
	height: 78,
};

export const Gallery = () => (
	<Flex sx={ { flexWrap: 'wrap', gap: 3 } }>
		<Screenshot url="wordpress.com" width={ 150 } height={ 100 } alt="WordPress.com" />
		<Screenshot url="github.com" width={ 150 } height={ 100 } alt="GitHub" />
		<Screenshot url="automattic.com" width={ 150 } height={ 100 } alt="Automattic" />
		<Screenshot showNoPermission width={ 150 } height={ 100 } />
		<Screenshot showEmpty width={ 150 } height={ 100 } />
		<Screenshot loading width={ 150 } height={ 100 } />
	</Flex>
);

export const ResponsiveIcons = () => (
	<Flex sx={ { flexWrap: 'wrap', gap: 3, alignItems: 'flex-end' } }>
		<div>
			<p style={ { margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' } }>Small (48×48)</p>
			<Screenshot showEmpty width={ 48 } height={ 48 } />
		</div>
		<div>
			<p style={ { margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' } }>Medium (108×78)</p>
			<Screenshot showEmpty width={ 108 } height={ 78 } />
		</div>
		<div>
			<p style={ { margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' } }>Large (200×150)</p>
			<Screenshot showEmpty width={ 200 } height={ 150 } />
		</div>
		<div>
			<p style={ { margin: '0 0 8px 0', fontSize: '12px', textAlign: 'center' } }>XL (300×200)</p>
			<Screenshot showEmpty width={ 300 } height={ 200 } />
		</div>
	</Flex>
);
Gallery.parameters = {
	docs: {
		description: {
			story: 'Multiple screenshots displayed in a gallery layout, showing different states including loading, empty, and no permission states.',
		},
	},
};

Loading.parameters = {
	docs: {
		description: {
			story: 'Manual loading state with spinner. This shows how to control the loading state externally.',
		},
	},
};

export const LoadingDemo = () => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ url, setUrl ] = useState( '' );

	const simulateLoading = () => {
		setIsLoading( true );
		setUrl( 'automattic.com' );
		
		// Simulate external loading process
		setTimeout( () => {
			setIsLoading( false );
		}, 3000 );
	};

	return (
		<Flex sx={ { flexDirection: 'column', gap: 3, alignItems: 'flex-start' } }>
			<Button onClick={ simulateLoading } disabled={ isLoading }>
				{ isLoading ? 'Generating Screenshot...' : 'Generate Screenshot' }
			</Button>
			<Screenshot 
				url={ url }
				loading={ isLoading }
				width={ 200 } 
				height={ 150 }
				alt="Demo screenshot"
			/>
		</Flex>
	);
};

LoadingDemo.parameters = {
	docs: {
		description: {
			story: 'Interactive demo showing how loading state works. Click the button to simulate screenshot generation with external loading control.',
		},
	},
};

ResponsiveIcons.parameters = {
	docs: {
		description: {
			story: 'Demonstrates how icons scale responsively based on container size. Icons are sized at 20% of the smaller dimension (width or height) with minimum 12px and maximum 32px.',
		},
	},
}; 