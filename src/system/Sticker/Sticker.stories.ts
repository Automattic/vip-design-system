/**
 * External dependencies
 */
import { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Sticker, Link } from '..';

const meta: Meta<typeof Sticker> = {
    title: 'Sticker',
    component: Sticker,
    argTypes: {
      variant: {
        options: ['red', 'yellow', 'green', 'gray', 'orange', 'gold', 'pink', 'salmon'],
        control: { type: 'select' },
      },
      className: {
        control: 'text',
      },
    },
  };


const Template = props => <Sticker { ...props } sx={ { m: 2 } } />;
const TemplateLink = props => (
	<Template { ...props } sx={ { m: 2 } }>
		<Link href="http://google.com">Google.com</Link>
	</Template>
);

export const Default = () => (
	<>
		<Template>Sticker</Template>
		{/* <Template variant="red">Sticker</Template>
		<Template variant="yellow">Sticker</Template>
		<Template variant="green">Sticker</Template>
		<Template variant="gray">Sticker</Template>
		<Template variant="orange">Sticker</Template>
		<Template variant="gold">Sticker</Template>
		<Template variant="pink">Sticker</Template>
		<Template variant="salmon">Sticker</Template> */}
	</>
);
export const WithLinks = () => (
	<>
		<TemplateLink />
		{/* <TemplateLink variant="red" />
		<TemplateLink variant="yellow" />
		<TemplateLink variant="green" />
		<TemplateLink variant="gray" />
		<TemplateLink variant="orange" />
		<TemplateLink variant="gold" />
		<TemplateLink variant="pink" />
		<TemplateLink variant="salmon" /> */}
	</>
);

export default meta; 
type Story = StoryObj<typeof Sticker>;
export const Primary: Story = {
    render: () => <Sticker { ...props } sx={ { m: 2 } } />
  };