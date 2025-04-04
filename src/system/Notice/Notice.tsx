/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as Collapsible from '@radix-ui/react-collapsible';
import classNames from 'classnames';
import React, { useState, useId } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { MdError, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box, Flex, Heading, Card, Button } from '../';

type ColorVariants = 'warning' | 'error' | 'alert' | 'success' | 'info';

type CollapsibleProps = {
	collapsible?: boolean;
	defaultOpen?: boolean;
	ariaContentId?: string;
};

export type NoticeProps = React.HTMLAttributes< HTMLDivElement > & {
	children: React.ReactNode;
	inline?: boolean;
	sx?: ThemeUIStyleObject;
	title?: React.ReactNode;
	variant?: ColorVariants;
	headingVariant?: React.ElementType;
	className?: string;
} & CollapsibleProps;

const NoticeIcon = ( { color, variant }: { color: string; variant: ColorVariants } ) => {
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
			collapsible = false,
			defaultOpen = false,
			...props
		},
		forwardRef
	) => {
		const [ isExpanded, setIsExpanded ] = useState( defaultOpen );
		const handleExpand = ( openValue: boolean ) => setIsExpanded( openValue );
		const ChevronIcon = isExpanded ? BiChevronUp : BiChevronDown;
		const contentId = useId();

		const iconColor = `notice.icon.${ variant }`;
		const textColor = `notice.text.${ variant }`;

		const baseCardSx: ThemeUIStyleObject = {
			boxShadow: 'none',
			borderRadius: 2,
			bg: inline || collapsible ? 'transparent' : `notice.background.${ variant }`,
			color: textColor,
			fontSize: 2,
			p: {
				color: textColor,
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
		};

		if ( collapsible ) {
			const renderHeader = () => (
				<Collapsible.Trigger asChild aria-expanded={ isExpanded } aria-controls={ contentId }>
					<Button
						variant="text"
						sx={ {
							border: 'none',
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							cursor: 'pointer',
							bg: `notice.background.${ variant }`,
							'&:hover, &:focus': {
								bg: `notice.background.${ variant }`,
								boxShadow: 'none',
								transform: 'none',
								border: 'none',
							},
							px: 3,
							py: 2,
						} }
					>
						<Flex sx={ { alignItems: 'center', gap: 2 } }>
							<NoticeIcon color={ iconColor } variant={ variant } />
							<Heading
								as={ headingVariant }
								id={ `${ contentId }-heading` }
								sx={ {
									color: textColor,
									fontSize: 2,
									fontWeight: 'bold',
									my: 2,
									mx: 3,
								} }
							>
								{ title }
							</Heading>
						</Flex>
						<ChevronIcon
							size={ 20 }
							sx={ {
								color: 'icon.primary',
							} }
							data-arrow-indicator
							aria-hidden="true"
						/>
					</Button>
				</Collapsible.Trigger>
			);

			return (
				<Collapsible.Root
					defaultOpen={ defaultOpen }
					onOpenChange={ handleExpand }
					data-active={ defaultOpen || undefined }
				>
					<Card
						variant="notice"
						hideBody={ ! isExpanded }
						renderHeader={ renderHeader }
						bodyStyles={ {
							border: '1px solid',
							borderColor: `notice.background.${ variant }`,
							borderTop: 'none',
							borderBottomLeftRadius: 2,
							borderBottomRightRadius: 2,
							px: 3,
							py: 3,
						} }
						sx={ {
							...baseCardSx,
							border: 'none',
							overflow: 'hidden',
						} }
						className={ classNames( 'vip-notice-component', className ) }
						{ ...props }
						ref={ forwardRef }
					>
						<Collapsible.Content
							id={ contentId }
							aria-labelledby={ `${ contentId }-heading` }
							sx={ {
								mx: 2,
								my: 2,
							} }
						>
							{ children }
						</Collapsible.Content>
					</Card>
				</Collapsible.Root>
			);
		}

		return (
			<Card
				variant="notice"
				sx={ baseCardSx }
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
						/>
						<NoticeIcon color={ iconColor } variant={ variant } />
					</Flex>
				</Box>
				<Box>
					{ title && (
						<Heading
							as={ headingVariant }
							sx={ {
								color: textColor,
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
