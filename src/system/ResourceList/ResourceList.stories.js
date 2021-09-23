/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
 import React from 'react';
 import { BiData, BiGlobe, BiTime, BiCheckCircle, BiRevision } from "react-icons/bi";
 
 /**
  * Internal dependencies
  */
 import { Avatar, Badge, Box, Card, Flex, Button, ResourceList, ResourceItem, Text, Heading } from '..';
 
 export default {
     title: 'ResourceList',
     component: ResourceList,
 };

 const logs = [
     {
         actor: 'Saxon Fletcher',
         action: 'switched primary domain to',
         object: 'mydomain.com',
         date: new Date()
     },
     {
        actor: 'Saxon Fletcher',
        action: 'switched primary domain to',
        object: 'mydomain.com',
        date: new Date(new Date().setHours(11))
    },
     {
        actor: 'Simon Wheatley',
        action: 'deployed to',
        object: 'Production',
        showObject: true,
        date: new Date(new Date().setDate(15))
    },
    {
        actor: 'Saxon Fletcher',
        action: 'created a backup on',
        object: 'Production',
        date: new Date(new Date().setDate(13))
    },
 ]
 
 // eslint-disable-next-line max-len
 const image1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='79' height='79' viewBox='0 0 79 79' fill='none' %3E%3Cpath d='M71.4 15.3L54.2 4.2C54 4 53.7 4 53.4 4H26.4C26.1 4 25.8 4.1 25.6 4.2L8.29997 15.3C7.89997 15.6 7.59998 16 7.59998 16.5V32.1V63C7.59998 63.5 7.89997 64 8.29997 64.2L25.5 75.3C25.5 75.3 25.6 75.3 25.6 75.4C25.6 75.4 25.7 75.4 25.7 75.5C25.9 75.6 26 75.6 26.2 75.6H53.2C53.4 75.6 53.5 75.6 53.7 75.5C53.8 75.5 53.8 75.5 53.8 75.4C53.8 75.4 53.9 75.4 53.9 75.3L71.4 64.2C71.5 64.1 71.7 64 71.8 63.8C71.8 63.8 71.8 63.7 71.9 63.7C72 63.6 72.1 63.4 72.1 63.2V63.1C72.1 63 72.1 62.9 72.1 62.8V32.1V16.5C72.1 16 71.8 15.6 71.4 15.3ZM24.9 71.4L10.6 62.2V34.8L24.9 44V71.4ZM51.9 72.6H27.8V44.7H51.9V72.6ZM69.1 31.3L52.9 41.7H26.8L10.6 31.3V17.3L26.8 6.9H52.9L69.1 17.3V31.3Z' fill='%23BD9D70' /%3E%3C/svg%3E";
 // eslint-disable-next-line max-len
 const image2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='79' height='79' viewBox='0 0 79 79' fill='none'%3E%3Cpath d='M66.3001 15.9C66.3001 15.9 66.3 15.8 66.2 15.8C66.1 15.7 66 15.5 65.9001 15.4C65.9001 15.4 65.9001 15.4 65.9001 15.3L44.4001 0.2C44.3001 0.0999998 44.2 0.0999994 44.1 0.0999994C44 0.0999994 44.0001 0 43.9001 0H43.3C43.2 0 43.1 0.0999994 43.1 0.0999994C43 0.0999994 42.9 0.2 42.8 0.2L28.2001 10.3C28.1 10.4 28.0001 10.5 27.9001 10.6C27.9001 10.6 27.9001 10.6 27.9001 10.7C27.8001 10.8 27.7001 11 27.7001 11.2C27.7001 11.2 27.7001 11.2 27.7001 11.3V31.1L13.9 40.8L13.7001 41C13.6001 41.1 13.6 41.1 13.6 41.2L13.5 41.3C13.5 41.4 13.4 41.5 13.4 41.5V41.6C13.4 41.7 13.3 41.8 13.3 42V62.2C13.3 62.4 13.3 62.6 13.4 62.7V62.8C13.5 62.9 13.6001 63.1 13.7001 63.2C13.7001 63.2 13.7 63.2 13.8 63.3L13.9 63.4L35.3 78.6H35.4001C35.4001 78.6 35.5 78.6 35.5 78.7H35.6C35.8 78.8 36 78.8 36.2001 78.8C36.3001 78.8 36.5 78.8 36.6 78.7H36.7001C36.8001 78.7 36.8001 78.7 36.9001 78.6C36.9001 78.6 37 78.6 37 78.5H37.1L66 58.3C66.1 58.2 66.2001 58.1 66.3001 58V15.9ZM34.6 74.5L16.1 61.3V44.7L34.6 57.8V74.5ZM36 55.3L17.2001 41.9L29 33.5L47.9001 46.9L36 55.3ZM49 44.1L30.5 31V14.4L49 27.5V44.1ZM50.5 24.9L31.6 11.5L43.5 3.2L62.4001 16.6L50.5 24.9Z' fill='%23BD9D70'/%3E%3C/svg%3E";
 
 export const AuditLog = () => (
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
                    dateKey={"date"}
                    relativeTime={ true }
                    timeOnly={ true }
                >
                    <Flex sx={ { alignItems: 'center', gap: 3 } }>
                        <Avatar name={ item.actor } src="https://uifaces.co/our-content/donated/1H_7AxP0.jpg" size={ 16 } />
                        <Heading variant="h4" as="p" sx={ { mb: 0, fontWeight: 'normal' } }>
                            { item.actor }
                            { ' ' }
                            <Text as="span" sx={ { color: 'muted', mb: 0 } }>
                                { item.action }
                            </Text>
                            { ' ' }
                            { item.object }
                        </Heading>
                    </Flex>
                    { item.showObject && 
                        <Box variant="indent" sx={ { mt: 2, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' } }>
                            <Heading variant="h5" as="div" sx={ { mb: 0 } }>Merge pull request <Text as="span" sx={ { color: 'muted' } }>#443</Text></Heading>
                            <Text sx={ { mb: 0, fontSize: 1, display: 'flex', alignItems: 'center', gap: 1 } }>
                                <Avatar name={ item.actor } src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" size={ 16 } />
                                { item.actor }
                            </Text>
                            <Text sx={ { mb: 0, fontSize: 1, display: 'flex', alignItems: 'center', gap: 1 } }>
                                <BiCheckCircle size={ 16 } />
                                Deployed in 31s
                            </Text>
                        </Box>
                    }
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
        date: new Date(new Date().setHours(11)),
        status: 'running'
    },
    {
        title: 'Update homepage',
        id: '#772',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(9))
    },
    {
        title: 'Improve overall performance',
        id: '#771',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(8))
    },
    {
        title: 'Merge pull request',
        id: '#770',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(5)),
        status: 'failed'
    },
    {
        title: 'Merge pull request',
        id: '#773',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(11))
    },
    {
        title: 'Update homepage',
        id: '#772',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(9))
    },
    {
        title: 'Improve overall performance',
        id: '#771',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(8))
    },
    {
        title: 'Merge pull request',
        id: '#770',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(5))
    },
    {
        title: 'Merge pull request',
        id: '#773',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(11))
    },
    {
        title: 'Update homepage',
        id: '#772',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(9))
    },
    {
        title: 'Improve overall performance',
        id: '#771',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(8))
    },
    {
        title: 'Merge pull request',
        id: '#770',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(5))
    },
    {
        title: 'Merge pull request',
        id: '#773',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(11))
    },
    {
        title: 'Update homepage',
        id: '#772',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(9))
    },
    {
        title: 'Improve overall performance',
        id: '#771',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(8))
    },
    {
        title: 'Merge pull request',
        id: '#770',
        author: 'Saxon Fletcher',
        date: new Date(new Date().setHours(5))
    },
    
]
 
 export const Deploys = () => (
    <Box sx={ { p: 5, pt: 2 } }>
        <Heading sx={ { mb: 2 } }>Deploys</Heading>
        <Text sx={ { mb: 4 } }>View and manage application deployments.</Text>
        <Card variant="indent" sx={ { mb: 4, display: 'flex', flexDirection: 'row-reverse', gap: 1 } }>
            { deploys.map( deploy => (
                <Box sx={ { flex: '1 1 auto', width: 10, height: 4, backgroundColor: deploy.status === 'running' ? 'blue.50' : 'green.50', borderRadius: 1 } }></Box>
            ) ) }
        </Card>
        <ResourceList
           items={ deploys }
           dateKey="date"
           groupedByDay={ false }
           renderItem={ item => (
                <ResourceItem 
                    item={ item }
                    dateKey={"date"}
                    relativeTime={ true }
                    timeOnly={ true }
                    renderActions={ item => (
                        <Flex sx={ { alignItems: 'center' } }>
                            <Button variant="secondary" sx={ { fontSize: 1 } }>Rollback</Button>
                        </Flex>
                    ) }
                >
                    <Flex sx={ { alignItems: 'center', gap: 4 } }>
                        <Flex sx={ { alignItems: 'center', gap: 3, minWidth: 300 } }>
                            <Heading variant="h4" as="p" sx={ { mb: 0, fontWeight: 'normal' } }>
                                { item.title }
                                { ' ' }
                                <Text as="span" sx={ { color: 'muted', mb: 0 } }>
                                    { item.id }
                                </Text>
                            </Heading>
                            { item.status === 'running' &&
                                <Badge sx={ { mb: 0 } }>Running</Badge>
                            }
                        </Flex>
                            <Text sx={ { mb: 0, color: 'muted', display: 'flex', alignItems: 'center', gap: 2 } }>
                                <Avatar name={ item.author } size={ 16 } src="https://randomuser.me/api/portraits/men/46.jpg" />
                                { item.author }
                            </Text>
                            <Text sx={ { mb: 0, color: item.status === 'running' ? 'blue.60' : 'muted', display: 'flex', alignItems: 'center', gap: 1 } }>
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