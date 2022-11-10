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
			<Text>
				All content <a href="https://google.com">https://google.com</a>
			</Text>
		</TabsContent>
		<TabsContent value="live">Live content</TabsContent>
		<TabsContent value="dev">
			<Text>
				In Development content <button type="button">Hey I am a button</button>{ ' ' }
			</Text>
		</TabsContent>
	</NewTabs>
);
