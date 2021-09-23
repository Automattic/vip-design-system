/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 
 /**
  * Internal dependencies
  */
 import { Badge, Box, Card, Flex, Grid, Heading, Text, Time } from '..';
 
 const ResourceItem = ({
     children,
     item,
     renderActions,
     relativeTime = false,
     timeOnly = false,
     dateKey,
     icon = null
 }) => {
     
    return (
        <Flex 
            sx={ {
                alignItems: 'center',
                gap: 3
            } }
        >
            { icon }
            <Box sx={ { flex: '1 1 auto' } }>
                { children }
            </Box>
            <Flex 
                sx={ {
                    flex: '0 0 auto',
                    alignItems: 'center',
                    gap: 3,
                    
                } }
            >
                <Time className="time" relativeTime={ relativeTime } timeOnly={ timeOnly } time={ item[dateKey] } sx={ { color: 'muted', mb: 0, textAlign: 'right', flex: '0 0 auto' } } />
                { renderActions &&
                    <Flex className="actions" sx={ { alignItems: 'center', gap: 3 } }>
                        <Box sx={ { width: 4, height: 4, borderRadius: 4, bg: 'border' } } />
                        { renderActions( item ) }
                    </Flex>
                }
            </Flex>
        </Flex>
    )
 };
 
 ResourceItem.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
    relativeTime: PropTypes.bool,
    timeOnly: PropTypes.bool,
    dateKey: PropTypes.string,
    renderActions: PropTypes.func
 };
 
 export { ResourceItem };
 