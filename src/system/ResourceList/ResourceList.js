/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 
 /**
  * Internal dependencies
  */
 import { Box, Heading } from '..';

var formatterOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 const formatDate = ( date ) => {
	const today = new Date();
    if ( date.getFullYear() !== today.getFullYear() ) {
        return date.toLocaleDateString( formatterOptions );
    }
    else if ( date.getMonth() !== today.getMonth() ) {
        return date.toLocaleDateString( formatterOptions );
    }
    else if ( date.getDate() < today.getDate() - 1 ) {
        return date.toLocaleDateString( formatterOptions );
    }
    else if ( date.getDate() === today.getDate() - 1 ) {
        return 'Yesterday';
    }
    else {
        return 'Today';
    }
};

const StyledListItem = props => (
    <Box as="li" 
        sx={ {
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'border',
            listStyleType: 'none',
            margin: 0,
            px: 0,
        } }
        { ...props }
    />
); 
 
 const ResourceList = ({
     groupedByDay = false,
     items,
     renderItem,
     dateKey
 }) => {
    let groupedItems = {};
    if ( groupedByDay ) {
        groupedItems = items?.reduce( ( itemGroups, item ) => {
            const formattedDate = formatDate( item[ dateKey ] );
            const itemsAtDate = itemGroups[ formattedDate ];
    
            return {
                ...itemGroups,
                [ formattedDate ]: itemsAtDate ? [ ...itemsAtDate, item ] : [ item ],
            };
        }, {} );
    }
    
    const renderItemList = ( items ) => items.map( item => (
        <StyledListItem>
            { renderItem( item ) }
        </StyledListItem>
    ) );
     
    return (
        <Box as="ul" sx={ { listStyleType: 'none', m: 0, p: 0 } }>
            { groupedByDay ?
                Object.keys( groupedItems ).map( groupName => (
                    <Box sx={ { mb: 4 } }>
                        <Heading variant="h4" as="h4" sx={ { mb: 3 } }>{ groupName }</Heading>
                        <Box as="ul" sx={ { listStyleType: 'none', m: 0, p: 0, borderTop: '1px solid', borderColor: 'border' } }>
                            { renderItemList( groupedItems[ groupName ] ) }
                        </Box>
                    </Box>
            ) ) : renderItemList( items ) }
        </Box>
    )
 };
 
 ResourceList.propTypes = {
    groupedByDay: PropTypes.bool,
    items: PropTypes.array,
    renderItem: PropTypes.func,
    relativeTime: PropTypes.bool,
    dateKey: PropTypes.string
 };
 
 export { ResourceList };
 