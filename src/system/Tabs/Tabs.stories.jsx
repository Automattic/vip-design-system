/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Tabs, TabsTrigger, TabsList, TabsContent, Text, Link, Button } from '..';

export default {
	title: 'Navigation/Tabs',
	component: Tabs,
};

export const Default = () => (
	<Tabs defaultValue="all">
		<TabsList title="See all the content">
			<TabsTrigger value="all">All (5)</TabsTrigger>
			<TabsTrigger value="live">Live (2)</TabsTrigger>
			<TabsTrigger value="dev">In Development (3)</TabsTrigger>
			<TabsTrigger value="protect" disabled>
				Not accessible
			</TabsTrigger>
		</TabsList>
		<TabsContent value="all">
			<Text>
				All content <Link href="https://google.com">https://google.com</Link>
			</Text>
		</TabsContent>
		<TabsContent value="live">Live content</TabsContent>
		<TabsContent value="dev">
			<Text>
				In Development content <Button variant="secondary">Hey I am a button</Button>{ ' ' }
			</Text>
		</TabsContent>
	</Tabs>
);

export const SetActiveTab = () => {
	const [ activeTab, setActiveTab ] = React.useState( 'all' );

	return (
		<Tabs value={ activeTab } onValueChange={ val => setActiveTab( val ) }>
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
					<button type="button" onClick={ () => setActiveTab( 'live' ) }>
						Switch to live tab
					</button>
				</Text>
			</TabsContent>
			<TabsContent value="live">Live content</TabsContent>
			<TabsContent value="dev">
				<Text>
					In Development content <button type="button">Hey I am a button</button>{ ' ' }
				</Text>
			</TabsContent>
		</Tabs>
	);
};
