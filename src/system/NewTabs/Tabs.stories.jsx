/**
 * Internal dependencies
 */
import { NewTabs, TabsTrigger, TabsList, TabsContent, Text } from '..';

export default {
	title: 'New Tabs',
	component: NewTabs,
};

export const Default = () => (
	<NewTabs defaultValue="all">
		<TabsList aria-label="See all the content">
			<TabsTrigger value="all">All (5)</TabsTrigger>
			<TabsTrigger value="live">Live (2)</TabsTrigger>
			<TabsTrigger value="dev">In Development (3)</TabsTrigger>
		</TabsList>
		<TabsContent value="all">
			<Text>All content</Text>
		</TabsContent>
		<TabsContent value="live">
			<Text>Live content</Text>
		</TabsContent>
		<TabsContent value="dev">
			<Text>In Development content</Text>
		</TabsContent>
	</NewTabs>
);
