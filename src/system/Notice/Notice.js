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

const colorSystemVariant = color =>
	( { warning: 'warning', error: 'error', alert: 'error', success: 'success', info: 'info' }[
		color
	] );

const NoticeIcon = ( { color, variant } ) => {
	let Icon = MdWarning;

	switch ( variant ) {
		case 'info':
			Icon = MdInfo;
			break;
		case 'error':
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

		return (
			<Card
				sx={ {
					boxShadow: 'none',
					borderRadius: 2,
					bg: inline ? 'transparent' : `notice.background.${ systemVariant }`,
					padding: inline ? 0 : 3,
					color: `notice.text.${ systemVariant }`,
					p: {
						color: `notice.text.${ systemVariant }`,
					},
					a: {
						color: `notice.link.${ systemVariant }.default`,
						'&:visited': {
							color: `notice.link.${ systemVariant }.visited`,
						},
						'&:active': {
							color: `notice.link.${ systemVariant }.active`,
						},
						'&:hover, &:focus': {
							color: `notice.link.${ systemVariant }.hover`,
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
						<NoticeIcon color={ `notice.icon.${ systemVariant }` } variant={ variant } />
					</Flex>

					<Box sx={ { ml: 3 } }>
						{ title && (
							<Heading
								as={ headingVariant }
								sx={ {
									color: `notice.text.${ systemVariant }`,
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
