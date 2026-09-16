/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { MdError, MdWarning, MdInfo, MdCheckCircle, MdLock } from 'react-icons/md';
import { Grid, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { Spinner } from '../Spinner/Spinner';

interface SnackbarIconProps {
	color: string;
	variant: ColorVariants | 'loading';
	loading?: boolean;
}

export type SnackbarProps = React.HTMLAttributes< HTMLDivElement > & {
	/** Content rendered inside the snackbar body. */
	children?: React.ReactNode;
	/** Theme UI style overrides applied to the root element. */
	sx?: ThemeUIStyleObject;
	/** Bold heading displayed above the body content. */
	title?: React.ReactNode;
	/** Color variant that determines the icon and visual style. @default 'warning' */
	variant?: ColorVariants;
	/** When true, replaces the status icon with a loading spinner. @default false */
	loading?: boolean;
	/** When true, reserves space for a dismiss action. @default false */
	isDismissable?: boolean;
	/** Additional CSS class name(s) appended to the root element. */
	className?: string;
	/** Click handler for the call-to-action link. */
	ctaOnClick?: () => void;
	/** Label text for the call-to-action link. */
	ctaText?: string;
	/** URL for the call-to-action link. */
	ctaHref?: string;
	/** Ref forwarded to the root element. */
	ref?: React.Ref< HTMLDivElement >;
};

type ColorVariants = 'error' | 'info' | 'success' | 'system' | 'warning';

const SnackbarIcon = ( { color, variant, loading }: SnackbarIconProps ) => {
	const sx = { color, flex: '0 0 auto' };
	const size = 24;

	if ( loading ) {
		return <Spinner strokeWidth={ 3 } sx={ sx } size={ size } variant="loading" />;
	}

	const elements = {
		default: MdWarning,
		error: MdError,
		info: MdInfo,
		success: MdCheckCircle,
		system: MdLock,
		warning: MdWarning,
	};

	const Element = elements[ variant ] || elements.default;

	return <Element sx={ sx } size={ size } aria-hidden="true" />;
};

/** A brief, non-intrusive notification bar for surfacing status messages and alerts. */
export const Snackbar = ( {
	children,
	className = '',
	sx = {},
	title,
	variant = 'warning',
	loading = false,
	isDismissable = false,
	ctaOnClick,
	ctaText,
	ctaHref = undefined,
	ref,
	...props
}: SnackbarProps ) => {
	const columns = [ '24px', 'auto' ];
	const hasCta = ctaText && ( ctaOnClick || ctaHref );
	if ( hasCta ) {
		columns.push( 'auto' );
	}
	if ( isDismissable ) {
		columns.push( '24px' );
	}

	return (
		<Grid
			columns={ columns.join( ' ' ) }
			variant="notice"
			sx={ {
				p: 4,
				boxShadow: 'low',
				bg: 'snackbar.background',
				borderRadius: 1,
				color: 'snackbar.text',
				fontSize: 2,
				a: {
					color: 'snackbar.link',
				},
				ul: {
					pl: 5,
				},
				...sx,
			} }
			className={ classNames( 'vip-snackbar-component', className ) }
			ref={ ref }
			{ ...props }
		>
			<Box>
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
					<SnackbarIcon
						loading={ loading }
						color={ `snackbar.icon.${ loading ? 'loading' : variant }` }
						variant={ variant }
					/>
				</Flex>
			</Box>
			<Box>
				<Grid columns={ [ 'auto auto' ] } sx={ { justifyItems: 'flex-start flex-end' } }>
					<Box sx={ { justifyContent: 'flex-start' } }>
						{ title && (
							<Heading
								as="p"
								sx={ {
									color: 'texts.inverse',
									mb: 0,
									fontSize: 1,
									fontWeight: '700',
								} }
							>
								{ title }
							</Heading>
						) }
						{ children && <span sx={ { fontSize: 1, color: 'texts.inverse' } }>{ children }</span> }
					</Box>
				</Grid>
			</Box>
			{ ctaText && ( ctaOnClick || ctaHref ) && (
				<Box sx={ { textAlign: 'right', fontSize: 1, px: 2 } }>
					<a href={ ctaHref } sx={ { cursor: 'pointer' } } onClick={ ctaOnClick }>
						{ ctaText }
					</a>
				</Box>
			) }
			{ isDismissable && <Box></Box> }
		</Grid>
	);
};

Snackbar.displayName = 'Snackbar';
