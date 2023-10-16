/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box, Flex, Heading, Card } from '../';
import { ThemeUIStyleObject } from 'theme-ui';

interface NoticeIconProps {
	color: string;
	variant: keyof COLOR_VARIANTS;
}

export interface NoticeProps {
	children: React.ReactNode;
	inline?: boolean;
	sx?: ThemeUIStyleObject;
	title?: React.ReactNode;
	variant?: keyof COLOR_VARIANTS;
	headingVariant?: React.ElementType;
	className?: string;
}
type COLOR_VARIANTS = {
	warning: string;
	error: string;
	alert: string;
	success: string;
	info: string;
};
const COLOR_VARIANTS_MAPPING: COLOR_VARIANTS = {
	warning: 'warning',
	error: 'error',
	alert: 'error',
	success: 'success',
	info: 'info',
};
const colorSystemVariant = ( color: keyof COLOR_VARIANTS ) => COLOR_VARIANTS_MAPPING[ color ];

const NoticeIcon = ( { color, variant }: NoticeIconProps ) => {
	const sx = { color, flex: '0 0 auto' };
	const size = 21;

	switch ( variant ) {
		case 'info':
			return <MdInfo sx={ sx } size={ size } aria-hidden="true" />;
		case 'error':
			return <MdError sx={ sx } size={ size } aria-hidden="true" />;
		case 'success':
			return <MdCheckCircle sx={ sx } size={ size } aria-hidden="true" />;
	}

	return <MdWarning sx={ sx } size={ size } aria-hidden="true" />;
};

export const Notice = React.forwardRef< HTMLDivElement, NoticeProps >(
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
						alignItems: 'start',
					} }
				>
					<Box
						sx={ {
							mr: 3,
							mt: title ? 2 : 0,
							flexShrink: 0,
						} }
					>
						<NoticeIcon color={ `notice.icon.${ systemVariant }` } variant={ variant } />
					</Box>

					<Box>
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
