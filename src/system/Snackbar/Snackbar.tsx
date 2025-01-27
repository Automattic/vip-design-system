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
import { Box, Flex, Heading, Spinner } from '..';

interface SnackbarIconProps {
	color: string;
	variant: ColorVariants | 'loading';
	loading?: boolean;
}

export type SnackbarProps = React.HTMLAttributes< HTMLDivElement > & {
	children?: React.ReactNode;
	sx?: ThemeUIStyleObject;
	title?: React.ReactNode;
	variant?: ColorVariants;
	loading?: boolean;
	isDismissable?: boolean;
	className?: string;
	ctaOnClick?: () => void;
	ctaText?: string;
	ctaHref?: string;
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

export const Snackbar = React.forwardRef< HTMLDivElement, SnackbarProps >(
	(
		{
			children,
			className = null,
			sx = {},
			title,
			variant = 'warning',
			loading = false,
			isDismissable = false,
			ctaOnClick,
			ctaText,
			ctaHref = undefined,
			...props
		},
		forwardRef
	) => {
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
					boxShadow: 'none',
					bg: 'layer.inverse',
					border: '1px solid',
					borderRadius: 1,
					color: 'texts.inverse',
					fontSize: 2,
					a: {
						color: 'texts.inverse',
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
							{ children && (
								<span sx={ { fontSize: 1, color: 'texts.inverse' } }>{ children }</span>
							) }
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
	}
);

Snackbar.displayName = 'Snackbar';
