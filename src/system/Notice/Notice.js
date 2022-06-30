/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box, Flex, Heading, Card } from '../';

const NoticeIcon = ( { color, variant } ) => {
	let Icon = MdWarning;

	switch ( variant ) {
		case 'info':
			Icon = MdInfo;
			break;
		case 'alert':
			Icon = MdError;
			break;
		case 'success':
			Icon = MdCheckCircle;
			break;
	}

	return <Icon sx={ { marginRight: 2, color, flex: '0 0 auto' } } />;
};

NoticeIcon.propTypes = {
	color: PropTypes.string,
	variant: PropTypes.string,
};

const Notice = ( {
	variant = 'warning',
	inline = false,
	children,
	title,
	sx = {},
	className = null,
	...props
} ) => {
	let color = 'yellow';

	switch ( variant ) {
		case 'info':
			color = 'blue';
			break;
		case 'alert':
			color = 'red';
			break;
		case 'success':
			color = 'green';
			break;
	}

	return (
		<Card
			sx={ {
				boxShadow: 'none',
				borderRadius: 2,
				bg: inline ? 'transparent' : `${ color }.10`,
				p: inline ? 0 : 3,
				color: `${ color }.90`,
				a: {
					color: `${ color }.90`,
					textDecoration: 'underline',
					border: 'none',
				},
				...sx,
			} }
			className={ classNames( 'vip-notice-component', className ) }
			{ ...props }
		>
			<Flex
				sx={ {
					alignItems: 'center',
				} }
			>
				<Flex
					sx={ {
						alignItems: 'center',
					} }
				>
					<NoticeIcon color={ `${ color }.100` } variant={ variant } />
				</Flex>

				<Box sx={ { ml: 23 } }>
					{ title && (
						<Heading variant="h4" as="p" sx={ { color: `${ color }.100`, mb: 0 } }>
							{ title }
						</Heading>
					) }
					{ children }
				</Box>
			</Flex>
		</Card>
	);
};

Notice.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
	inline: PropTypes.bool,
	sx: PropTypes.object,
	title: PropTypes.node,
	variant: PropTypes.string,
	className: PropTypes.any,
};

export { Notice };
