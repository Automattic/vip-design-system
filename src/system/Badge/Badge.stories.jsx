/**
 * Internal dependencies
 */
import { Badge } from '..';

export default {
	title: 'Badge',
	component: Badge,
};

const BBadge = props => <Badge { ...props } sx={ { m: 2 } } />;
const BBadgeLink = props => (
	<BBadge { ...props } sx={ { m: 2 } }>
		<a href="http://google.com">Google.com</a>
	</BBadge>
);

export const Default = () => (
	<>
		<BBadge>Badge</BBadge>
		<BBadge variant="red">Badge</BBadge>
		<BBadge variant="yellow">Badge</BBadge>
		<BBadge variant="green">Badge</BBadge>
		<BBadge variant="gray">Badge</BBadge>
		<BBadge variant="orange">Badge</BBadge>
		<BBadge variant="gold">Badge</BBadge>
		<BBadge variant="pink">Badge</BBadge>
		<BBadge variant="salmon">Badge</BBadge>
	</>
);
export const WithLinks = () => (
	<>
		<BBadgeLink />
		<BBadgeLink variant="red" />
		<BBadgeLink variant="yellow" />
		<BBadgeLink variant="green" />
		<BBadgeLink variant="gray" />
		<BBadgeLink variant="orange" />
		<BBadgeLink variant="gold" />
		<BBadgeLink variant="pink" />
		<BBadgeLink variant="salmon" />
	</>
);
