/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
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

	return <Icon sx={ { color, flex: '0 0 auto' } } size={ 21 } aria-hidden="true" />;
};

NoticeIcon.propTypes = {
	color: PropTypes.string,
	variant: PropTypes.string,
};

const Notice = React.forwardRef(
	(
		{
			variant = 'warning',
			inline = false,
			children,
			title,
			sx = {},
			className = null,
			headingVariant = 'p',
			...props
		},
		forwardRef
	) => {
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
						'&:visited': {
							color: `${ color }.90`,
						},
						'&:active': {
							color: `${ color }.90`,
						},
						'&:hover, &:focus': {
							color: `${ color }.90`,
							textDecoration: 'none',
						},
					},
					...sx,
				} }
				className={ classNames( 'vip-notice-component', className ) }
				ref={ forwardRef }
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
						<NoticeIcon color={ `${ color }.200` } variant={ variant } />
					</Flex>

					<Box sx={ { ml: 3 } }>
						{ title && (
							<Heading
								as={ headingVariant }
								sx={ { color: `${ color }.100`, mb: 0, fontSize: 2, fontWeight: 'bold' } }
							>
								{ title }
							</Heading>
						) }
						{ children }
					</Box>
				</Flex>
			</Card>
		);
	}
);

Notice.displayName = 'Notice';

Notice.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
	inline: PropTypes.bool,
	sx: PropTypes.object,
	title: PropTypes.node,
	variant: PropTypes.string,
	headingVariant: PropTypes.string,
	className: PropTypes.any,
};

export { Notice };
