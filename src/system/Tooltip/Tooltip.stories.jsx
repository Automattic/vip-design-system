/**
 * Internal dependencies
 */
import { Flex, Heading, Tooltip, Text, Link } from '..';

export default {
	title: 'Tooltip',
	component: Tooltip,
};

export const Default = () => (
	<Flex sx={ { alignItems: 'center' } }>
		<Heading sx={ { mb: 0, mr: 2 } }>My Section Heading</Heading>
		<Tooltip>
			<Text sx={ { fontSize: 1, color: 'text' } }>
				This is a tooltip that can be used to describe various pieces of functionality.
				<br />
				<Link>Find out more &rarr;</Link>
			</Text>
		</Tooltip>
	</Flex>
);
