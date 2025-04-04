/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as Collapsible from '@radix-ui/react-collapsible';
import classNames from 'classnames';
import React, { useState, useId } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { MdWarning, MdCheckCircle, MdInfo, MdError } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Flex, Heading, Card } from '../';

interface CollapsibleNoticeIconProps {
	color: string;
	variant: ColorVariants;
}

export type NoticeProps = React.HTMLAttributes< HTMLDivElement > & {
	children: React.ReactNode;
	title: React.ReactNode;
	sx?: ThemeUIStyleObject;
	variant?: ColorVariants;
	headingVariant?: React.ElementType;
	className?: string;
	defaultOpen?: boolean;
	ariaContentId?: string;
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
			sx = {},
			title,
			variant = 'warning',
			defaultOpen = false,
			ariaContentId = null,
			...props
		},
		forwardRef
	) => {
		const [ isExpanded, setIsExpanded ] = useState( defaultOpen );
		const handleExpand = ( openValue: boolean ) => setIsExpanded( openValue );
		const generatedId = useId();
		const contentId = ariaContentId || generatedId;

		const renderHeader = () => (
			<Collapsible.Trigger asChild aria-expanded={ isExpanded } aria-controls={ contentId }>
				<button
					type="button"
					sx={ {
						border: 'none',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						cursor: 'pointer',
						bg: `notice.background.${ variant }`,
						px: 3,
						py: 2,
					} }
				>
					<Flex sx={ { alignItems: 'center', gap: 2 } }>
						<CollapsibleNoticeIcon color={ `notice.icon.${ variant }` } variant={ variant } />
						<Heading
							as={ headingVariant }
							id={ `${ contentId }-heading` }
							sx={ {
								color: `notice.text.${ variant }`,
								fontSize: 2,
								fontWeight: 'bold',
								my: 2,
								mx: 3,
							} }
						>
							{ title }
						</Heading>
					</Flex>
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
				</button>
			</Collapsible.Trigger>
		);

		return (
			<Collapsible.Root
				defaultOpen={ isExpanded }
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
						border: 'none',
						borderRadius: 2,
						boxShadow: 'none',
						overflow: 'hidden',
						p: {
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
					className={ classNames( 'vip-collapsible-notice-component', className ) }
					{ ...props }
					ref={ forwardRef }
				>
					<Collapsible.Content id={ contentId } aria-labelledby={ `${ contentId }-heading` }>
						{ children }
					</Collapsible.Content>
				</Card>
			</Collapsible.Root>
		);
	}
);

CollapsibleNotice.displayName = 'CollapsibleNotice';
