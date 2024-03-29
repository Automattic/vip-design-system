/**
 * Internal dependencies
 */
import { Box, Heading } from '..';

export default {
	title: 'Heading',
	component: Heading,
};

export const Default = () => (
	<Box>
		<Heading variant="h1">Your Applications</Heading>
		<Heading variant="h2">Heading Two</Heading>
		<Heading variant="h3">Heading Three</Heading>
		<Heading variant="h4">Heading Four</Heading>
		<Heading variant="h5">Heading Five</Heading>
		<Heading variant="h6">Heading Six</Heading>
	</Box>
);
