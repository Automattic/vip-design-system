/**
 * Internal dependencies
 */
import { Badge, Link } from '..';

export default {
	title: 'Badge',
	component: Badge,
};

const Template = props => <Badge { ...props } sx={ { m: 2 } } />;
const TemplateLink = props => (
	<Template { ...props } sx={ { m: 2 } }>
		<Link href="http://google.com">Google.com</Link>
	</Template>
);

export const Default = () => (
	<>
		<Template>Badge</Template>
		<Template variant="red">Badge</Template>
		<Template variant="yellow">Badge</Template>
		<Template variant="green">Badge</Template>
		<Template variant="gray">Badge</Template>
		<Template variant="orange">Badge</Template>
		<Template variant="gold">Badge</Template>
		<Template variant="pink">Badge</Template>
		<Template variant="salmon">Badge</Template>
	</>
);
export const WithLinks = () => (
	<>
		<TemplateLink />
		<TemplateLink variant="red" />
		<TemplateLink variant="yellow" />
		<TemplateLink variant="green" />
		<TemplateLink variant="gray" />
		<TemplateLink variant="orange" />
		<TemplateLink variant="gold" />
		<TemplateLink variant="pink" />
		<TemplateLink variant="salmon" />
	</>
);
