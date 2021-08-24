/**
 * External dependencies
 */
 import PropTypes from 'prop-types';
 import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';
 
 /**
  * Internal dependencies
  */
 import { Box, Flex, Heading, Card } from '../';
 
 const Notice = ( { variant = 'warning', inline = false, children, title, ...props } ) => {
	 let color = 'yellow';
	 let Icon = MdWarning;
 
	 switch ( variant ) {
		 case 'info':
			 color = 'blue';
			 Icon = MdInfo;
			 break;
		 case 'alert':
			 color = 'red';
			 Icon = MdError;
			 break;
		 case 'success':
			 color = 'green';
			 Icon = MdCheckCircle;
			 break;
	 }
 
	 return (
		 <Card
			 sx={ {
				 boxShadow: 'none',
				 borderRadius: 2,
				 bg: inline ? 'transparent' : `${ color }.0`,
				 p: inline ? 0 : 3,
				 a: {
					 textDecoration: 'underline',
					 border: 'none',
				 },
			 } }
			 { ...props }
		 >
			 <Box>
				 <Flex>
					 <Icon sx={ { marginRight: 2, color: `${ color }.70`, mt: 1, flex: '0 0 auto' } }/>
					 <Heading variant="h4" as="p" sx={ { color: `${ color }.70`, mb: 0 } }>{ title }</Heading>
				 </Flex>
				 { children &&
					 <Box sx={ { mt: 1, ml: 23 } }>
						 { children }
					 </Box>
				 }
			 </Box>
 
		 </Card>
	 );
 };
 
 Notice.propTypes = {
	 variant: PropTypes.string,
	 title: PropTypes.string,
	 inline: PropTypes.inline,
	 children: PropTypes.array,
 };
 
 export { Notice };
