/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box, Flex, Heading, Card } from '../';

interface NoticeIconProps {
	color: string;
	variant: ColorVariants;
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
	const sx = { color, flex: '0 0 auto' };
	const size = 24;

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
				variant="notice"
				sx={ {
					boxShadow: 'none',
					borderRadius: 2,
					bg: inline ? 'transparent' : `notice.background.${ variant }`,
					color: `notice.text.${ variant }`,
					fontSize: 2,
					p: {
						color: `notice.text.${ variant }`,
						fontSize: 2,
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
					ul: {
						pl: 5,
					},
					...sx,
				} }
				className={ classNames( 'vip-notice-component', className ) }
				ref={ forwardRef }
				{ ...props }
			>
				<Box sx={ { minWidth: '24px' } }>
					<Flex
						sx={ {
							flexDirection: 'column', // the trick here is to have a flex column with the icon at the bottom and an empty div that fills the space
							minHeight: '24px',
							maxHeight: '32px', // we're forcing the max height so that the icon is, at max, aligned between the first and the second line of text
							alignItems: 'flex-end', // we want the icon to be aligned to the bottom
							height: '100%', // specifying the height will allow the box to match the height of the content.
						} }
					>
						<Box
							sx={ {
								flex: '1 100%', // we need this empty div to make the icon align to the bottom
							} }
						></Box>
						<NoticeIcon color={ `notice.icon.${ variant }` } variant={ variant } />
					</Flex>
				</Box>
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
			</Card>
		);
	}
);

Notice.displayName = 'Notice';
