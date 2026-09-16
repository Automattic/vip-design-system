/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Tabs, TabsTrigger, TabsList, TabsContent, Text, Link, Button, Box } from '..';

export default {
	title: 'Navigation/Tabs',
	component: Tabs,
	subcomponents: { TabsList, TabsTrigger, TabsContent },
};

export const Default = {
	args: {
		defaultValue: 'all',
	},
	render: args => (
		<Tabs { ...args }>
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
	),
};

export const SetActiveTab = {
	render: () => {
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
	},
};

/**
 * When the triggers no longer fit, the list scrolls sideways and fades whichever
 * edge still has tabs beyond it. The active tab is scrolled into view on mount,
 * which is why this story opens on a tab near the end.
 */
export const Scrollable = {
	render: () => (
		<Box sx={ { maxWidth: 380 } }>
			<Tabs defaultValue="cache">
				<TabsList title="Insights">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="requests">Requests (1.2M)</TabsTrigger>
					<TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
					<TabsTrigger value="cache">Cache Hit Ratio</TabsTrigger>
					<TabsTrigger value="errors">Errors (12)</TabsTrigger>
					<TabsTrigger value="edge">Edge Locations</TabsTrigger>
					<TabsTrigger value="firewall">Firewall</TabsTrigger>
					<TabsTrigger value="uptime" disabled>
						Uptime
					</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">Overview content</TabsContent>
				<TabsContent value="requests">Requests content</TabsContent>
				<TabsContent value="bandwidth">Bandwidth content</TabsContent>
				<TabsContent value="cache">Cache hit ratio content</TabsContent>
				<TabsContent value="errors">Errors content</TabsContent>
				<TabsContent value="edge">Edge locations content</TabsContent>
				<TabsContent value="firewall">Firewall content</TabsContent>
			</Tabs>
		</Box>
	),
};
