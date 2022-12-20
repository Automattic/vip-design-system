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
import { getVariants } from '../theme/getColor';

const colorSystemVariant = color =>
	( { warning: 'warning', alert: 'error', success: 'success', info: 'info' }[ color ] );

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
			children,
			className = null,
			headingVariant = 'p',
			inline = false,
			sx = {},
			title,
			variant = 'warning',
			...props
		},
		forwardRef
	) => {
		const systemVariant = colorSystemVariant( variant );
		const linkVariant = getVariants( `support.link.${ systemVariant }` );
		const textVariant = getVariants( 'support.text' )[ systemVariant ];
		const iconVariant = getVariants( 'support.icon' )[ systemVariant ];

		return (
			<Card
				sx={ {
					boxShadow: 'none',
					borderRadius: 2,
					bg: inline ? 'transparent' : getVariants( 'support.background' )[ systemVariant ],
					p: inline ? 0 : 3,
					color: textVariant,
					a: {
						color: linkVariant.default,
						'&:visited': {
							color: linkVariant.visited,
						},
						'&:active': {
							color: linkVariant.active,
						},
						'&:hover, &:focus': {
							color: linkVariant.hover,
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
						<NoticeIcon color={ iconVariant } variant={ variant } />
					</Flex>

					<Box sx={ { ml: 3 } }>
						{ title && (
							<Heading
								as={ headingVariant }
								sx={ {
									color: textVariant,
									mb: 0,
									fontSize: 2,
									fontWeight: 'bold',
								} }
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
	inline: PropTypes.bool,
	sx: PropTypes.object,
	title: PropTypes.node,
	variant: PropTypes.string,
	headingVariant: PropTypes.string,
	className: PropTypes.any,
};

export { Notice };
