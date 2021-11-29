/**
 * Internal dependencies
 */
import { Link } from '..';

export default {
	title: 'Link',
	component: Link,
};

export const Default = () => (
	<Link as="a" href="#!">
		Hello
	</Link>
);
