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
	variant: ColorVariants;
	hasTitle: boolean;
}

export interface NoticeProps {
	children: React.ReactNode;
	inline?: boolean;
	sx?: ThemeUIStyleObject;
	title?: React.ReactNode;
	variant?: ColorVariants;
	headingVariant?: React.ElementType;
	className?: string;
}
type ColorVariants = 'warning' | 'error' | 'alert' | 'success' | 'info';

const NoticeIcon = ( { color, variant }: NoticeIconProps ) => {
	const sx = { color, flex: '0 0 auto', mt: 0 };
	const size = 20;

	switch ( variant ) {
		case 'info':
			return <MdInfo sx={ sx } size={ size } aria-hidden="true" />;
		case 'error':
			return <MdError sx={ sx } size={ size } aria-hidden="true" />;
		case 'success':
			return <MdCheckCircle sx={ sx } size={ size } aria-hidden="true" />;
	}

	// alert and warning will get the Warning icon
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
		return (
			<Card
				sx={ {
					boxShadow: 'none',
					borderRadius: 2,
					bg: inline ? 'transparent' : `notice.background.${ variant }`,
					padding: inline ? 0 : 3,
					color: `notice.text.${ variant }`,
					p: {
						color: `notice.text.${ variant }`,
					},
					a: {
						color: `notice.link.${ variant }.default`,
						'&:visited': {
							color: `notice.link.${ variant }.visited`,
						},
						'&:active': {
							color: `notice.link.${ variant }.active`,
						},
						'&:hover, &:focus': {
							color: `notice.link.${ variant }.hover`,
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
					<Flex
						sx={ {
							mr: 3,
							mt: 0,
							flexShrink: 0,
							alignSelf: 'center',
						} }
					>
						<NoticeIcon
							hasTitle={ !! title }
							color={ `notice.icon.${ variant }` }
							variant={ variant }
						/>
					</Flex>

					<Box>
						{ title && (
							<Heading
								as={ headingVariant }
								sx={ {
									color: `notice.text.${ variant }`,
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
