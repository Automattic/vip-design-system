/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { useState } from 'react';
import { MdWarning, MdCheckCircle, MdInfo, MdError } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { ThemeUIStyleObject } from 'theme-ui';
import * as Collapsible from '@radix-ui/react-collapsible';

/**
 * Internal dependencies
 */
import { Box, Flex, Heading, Card } from '../';

interface CollapsibleNoticeIconProps {
	color: string;
	variant: ColorVariants;
}

export type NoticeProps = React.HTMLAttributes< HTMLDivElement > & {
	children: React.ReactNode;
	title: React.ReactNode;
	inline?: boolean;
	sx?: ThemeUIStyleObject;
	variant?: ColorVariants;
	headingVariant?: React.ElementType;
	className?: string;
	defaultOpen?: boolean;
};
type ColorVariants = 'warning' | 'error' | 'alert' | 'success' | 'info';

const CollapsibleNoticeIcon = ( { color, variant }: CollapsibleNoticeIconProps ) => {
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

export const CollapsibleNotice = React.forwardRef< HTMLDivElement, NoticeProps >(
	(
		{
			children,
			className = null,
			headingVariant = 'p',
			inline = false,
			sx = {},
			title,
			variant = 'warning',
			defaultOpen = false,
			...props
		},
		forwardRef
	) => {
		const [ isExpanded, setIsExpanded ] = useState( defaultOpen );
		const handleExpand = ( openValue: boolean ) => setIsExpanded( openValue );

		return (
			<Collapsible.Root
				defaultOpen={ defaultOpen }
				onOpenChange={ handleExpand }
				data-active={ defaultOpen || undefined }
			>
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
							<CollapsibleNoticeIcon color={ `notice.icon.${ variant }` } variant={ variant } />
						</Flex>
					</Box>
					<Box sx={ { width: '100%' } }>
						<Collapsible.Trigger asChild aria-expanded={ isExpanded }>
							<Flex
								role="button"
								tabIndex={ 0 }
								sx={ {
									width: '100%',
									alignItems: 'center',
									justifyContent: 'space-between',
									cursor: 'pointer',
									px: 3,
									py: 2,
								} }
							>
								<Heading
									as={ headingVariant }
									sx={ {
										all: 'unset',
										color: `notice.text.${ variant }`,
										fontSize: 2,
										fontWeight: 'bold',
									} }
								>
									{ title }
								</Heading>

								<BiChevronDown
									size={ 20 }
									sx={ {
										color: 'icon.primary',
										transition: 'transform 300ms ease',
										transform: 'rotate(0deg)',
										'[data-state="open"] &': {
											transform: 'rotate(180deg)',
										},
									} }
								/>
							</Flex>
						</Collapsible.Trigger>
						<Collapsible.Content>
							<Box sx={ { px: 3, pb: 3 } }>{ children }</Box>
						</Collapsible.Content>
					</Box>
				</Card>
			</Collapsible.Root>
		);
	}
);

CollapsibleNotice.displayName = 'CollapsibleNotice';
