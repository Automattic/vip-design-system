/**
 * Internal dependencies
 */
import { NewTabs, TabsTrigger, TabsList, TabsContent, Text } from '..';

export default {
	title: 'NewTabs',
	component: NewTabs,
};

export const Default = () => (
	<NewTabs defaultValue="all">
		<TabsList title="See all the content">
			<TabsTrigger value="all">All (5)</TabsTrigger>
			<TabsTrigger value="live">Live (2)</TabsTrigger>
			<TabsTrigger value="dev">In Development (3)</TabsTrigger>
			<TabsTrigger value="protect" disabled={ true }>
				Not accessible
			</TabsTrigger>
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
