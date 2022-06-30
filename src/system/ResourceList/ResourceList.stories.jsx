/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { BiGlobe, BiCheckCircle, BiRevision } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import {
	Avatar,
	Badge,
	Box,
	Card,
	Flex,
	Button,
	ResourceList,
	ResourceItem,
	Text,
	Heading,
} from '..';

export default {
	title: 'ResourceList',
	component: ResourceList,
};

const logs = [
	{
		actor: 'Saxon Fletcher',
		action: 'switched primary domain to',
		object: 'mydomain.com',
		date: new Date(),
	},
	{
		actor: 'Saxon Fletcher',
		action: 'switched primary domain to',
		object: 'mydomain.com',
		date: new Date( new Date().setHours( 11 ) ),
	},
	{
		actor: 'Simon Wheatley',
		action: 'deployed to',
		object: 'Production',
		showObject: true,
		date: new Date( new Date().setDate( 15 ) ),
	},
	{
		actor: 'Saxon Fletcher',
		action: 'created a backup on',
		object: 'Production',
		date: new Date( new Date().setDate( 13 ) ),
	},
];

export const Grouped = () => (
	<Box sx={ { p: 5, pt: 2 } }>
		<Heading sx={ { mb: 2 } }>Audit Log</Heading>
		<Text sx={ { mb: 4 } }>A live trail of system and human events.</Text>
		<ResourceList
			items={ logs }
			dateKey="date"
			groupedByDay={ true }
			renderItem={ item => (
				<ResourceItem
					item={ item }
					icon={ <BiGlobe sx={ { color: 'red' } } /> }
					dateKey={ 'date' }
					relativeTime={ true }
					timeOnly={ true }
				>
					<Flex sx={ { alignItems: 'center', gap: 3 } }>
						<Avatar
							name={ item.actor }
							src="https://uifaces.co/our-content/donated/1H_7AxP0.jpg"
							size={ 16 }
						/>
						<Heading variant="h4" as="p" sx={ { mb: 0, fontWeight: 'normal' } }>
							{ item.actor }{ ' ' }
							<Text as="span" sx={ { color: 'muted', mb: 0 } }>
								{ item.action }
							</Text>{ ' ' }
							{ item.object }
						</Heading>
					</Flex>
					{ item.showObject && (
						<Box
							variant="indent"
							sx={ { mt: 2, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' } }
						>
							<Heading variant="h5" as="div" sx={ { mb: 0 } }>
								Merge pull request{ ' ' }
								<Text as="span" sx={ { color: 'muted' } }>
									#443
								</Text>
							</Heading>
							<Text
								as="div"
								sx={ { mb: 0, fontSize: 1, display: 'flex', alignItems: 'center', gap: 1 } }
							>
								<Avatar
									name={ item.actor }
									src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg"
									size={ 16 }
								/>
								{ item.actor }
							</Text>
							<Text sx={ { mb: 0, fontSize: 1, display: 'flex', alignItems: 'center', gap: 1 } }>
								<BiCheckCircle size={ 16 } />
								Deployed in 31s
							</Text>
						</Box>
					) }
				</ResourceItem>
			) }
		/>
	</Box>
);

const deploys = [
	{
		title: 'Merge pull request',
		id: '#773',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 11 ) ),
		status: 'running',
	},
	{
		title: 'Update homepage',
		id: '#772',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 9 ) ),
	},
	{
		title: 'Improve overall performance',
		id: '#771',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 8 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#770',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 5 ) ),
		status: 'failed',
	},
	{
		title: 'Merge pull request',
		id: '#773',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 11 ) ),
	},
	{
		title: 'Update homepage',
		id: '#772',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 9 ) ),
	},
	{
		title: 'Improve overall performance',
		id: '#771',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 8 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#770',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 5 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#773',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 11 ) ),
	},
	{
		title: 'Update homepage',
		id: '#772',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 9 ) ),
	},
	{
		title: 'Improve overall performance',
		id: '#771',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 8 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#770',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 5 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#773',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 11 ) ),
	},
	{
		title: 'Update homepage',
		id: '#772',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 9 ) ),
	},
	{
		title: 'Improve overall performance',
		id: '#771',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 8 ) ),
	},
	{
		title: 'Merge pull request',
		id: '#770',
		author: 'Saxon Fletcher',
		date: new Date( new Date().setHours( 5 ) ),
	},
];

export const Relative = () => (
	<Box sx={ { p: 5, pt: 2 } }>
		<Heading sx={ { mb: 2 } }>Deploys</Heading>
		<Text sx={ { mb: 4 } }>View and manage application deployments.</Text>
		<Card variant="indent" sx={ { mb: 4, display: 'flex', flexDirection: 'row-reverse', gap: 1 } }>
			{ deploys.map( ( deploy, index ) => (
				<Box
					key={ index }
					sx={ {
						flex: '1 1 auto',
						width: 10,
						height: 4,
						backgroundColor: deploy.status === 'running' ? 'blue.50' : 'green.50',
						borderRadius: 1,
					} }
				></Box>
			) ) }
		</Card>
		<ResourceList
			items={ deploys }
			dateKey="date"
			groupedByDay={ false }
			renderItem={ item => (
				<ResourceItem
					item={ item }
					dateKey={ 'date' }
					relativeTime={ true }
					timeOnly={ true }
					renderActions={ () => (
						<Flex sx={ { alignItems: 'center' } }>
							<Button variant="secondary" sx={ { fontSize: 1 } }>
								Rollback
							</Button>
						</Flex>
					) }
				>
					<Flex sx={ { alignItems: 'center', gap: 4 } }>
						<Flex sx={ { alignItems: 'center', gap: 3, minWidth: 300 } }>
							<Heading variant="h4" as="p" sx={ { mb: 0, fontWeight: 'normal' } }>
								{ item.title }{ ' ' }
								<Text as="span" sx={ { color: 'muted', mb: 0 } }>
									{ item.id }
								</Text>
							</Heading>
							{ item.status === 'running' && <Badge sx={ { mb: 0 } }>Running</Badge> }
						</Flex>
						<Text
							as="div"
							sx={ { mb: 0, color: 'muted', display: 'flex', alignItems: 'center', gap: 2 } }
						>
							<Avatar
								name={ item.author }
								size={ 16 }
								src="https://randomuser.me/api/portraits/men/46.jpg"
							/>
							{ item.author }
						</Text>
						<Text
							sx={ {
								mb: 0,
								color: item.status === 'running' ? 'blue.60' : 'muted',
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							} }
						>
							{ item.status === 'running' ? (
								<React.Fragment>
									<BiRevision size={ 16 } />
									Running for 31s
								</React.Fragment>
							) : (
								<React.Fragment>
									<BiCheckCircle size={ 16 } />
									Deployed in 31s
								</React.Fragment>
							) }
						</Text>
					</Flex>
				</ResourceItem>
			) }
		/>
	</Box>
);
