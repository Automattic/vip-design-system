/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';

/**
* Internal dependencies
*/
import { Box, Flex, Heading, Card } from '../';

const Notice = ( { variant = 'warning', inline = false, children, title, sx = {}, ...props } ) => {
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

	const NoticeIcon = ({ color }) => (
		<Icon sx={ { marginRight: 2, color: `${ color }.70`, flex: '0 0 auto' } }/>
	);

	return (
		<Card
			sx={ {
				boxShadow: 'none',
				borderRadius: 2,
				bg: inline ? 'transparent' : `${ color }.10`,
				p: inline ? 0 : 3,
				color: `${color}.90`,
				a: {
					color: `${ color }.90`,
					textDecoration: 'underline',
					border: 'none',
				},
				...sx,
			} }
			{ ...props }
		>
			<Flex sx={ {
				alignItems: 'center',
			} }>
				<Flex sx={ {
					alignItems: 'center',
				} }>
					<NoticeIcon color={color} />
				</Flex>

				<Box sx={ { ml: 23 } }>
					{ title && <Heading variant="h4" as="p" sx={ { color: `${ color }.100`, mb: 0 } }>{ title }</Heading> }
					{ children }
				</Box>
			</Flex>
		</Card>
	);
};

Notice.propTypes = {
	variant: PropTypes.string,
	title: PropTypes.string,
	inline: PropTypes.bool,
	children: PropTypes.node,
};

export { Notice };
