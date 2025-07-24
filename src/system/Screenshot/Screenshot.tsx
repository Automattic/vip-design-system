/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, Ref } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { MdLockOutline } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box, Card } from '..';

export interface ScreenshotProps {
	/** Height of the screenshot in pixels */
	height?: number;
	/** Width of the screenshot in pixels */
	width?: number;
	/** URL to take a screenshot of */
	url?: string;
	/** Show empty state placeholder */
	showEmpty?: boolean;
	/** Show no permission state with lock icon */
	showNoPermission?: boolean;
	/** Additional CSS classes */
	className?: Argument;
	/** Custom styles */
	sx?: ThemeUIStyleObject;
	/** Alt text for the screenshot image */
	alt?: string;
}

export const Screenshot = forwardRef< HTMLElement, ScreenshotProps >(
	(
		{
			height = 78,
			width = 108,
			url,
			showEmpty = false,
			showNoPermission = false,
			className,
			sx = {},
			alt = '',
			...rest
		}: ScreenshotProps,
		ref: Ref< HTMLElement >
	) => {
		const imageStyles: ThemeUIStyleObject = {
			borderRadius: 1,
			boxShadow: 'low',
			height: `${ height }px`,
			width: `${ width }px`,
			backgroundColor: showNoPermission ? 'layer.1' : undefined,
		};

		// Show placeholder state (empty or no permission)
		if ( showEmpty || showNoPermission ) {
			return (
				<Card
					ref={ ref }
					variant="primary"
					sx={ {
						...imageStyles,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						...sx,
					} }
					className={ classNames( 'vip-screenshot-component', 'vip-screenshot-placeholder', className ) }
					hideBody
					{ ...rest }
				>
					<MdLockOutline size={ 16 } color="currentColor" />
				</Card>
			);
		}

		// Show actual screenshot
		return (
			<Box
				ref={ ref }
				sx={ {
					...imageStyles,
					display: 'block',
					...sx,
				} }
				className={ classNames( 'vip-screenshot-component', 'vip-screenshot-image', className ) }
				{ ...rest }
			>
				<img
					src={ `//s0.wp.com/mshots/v1/${ url }?w=${ width }` }
					alt={ alt || `Screenshot of ${ url }` }
					style={ {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: 'inherit',
						display: 'block',
					} }
				/>
			</Box>
		);
	}
);

Screenshot.displayName = 'Screenshot'; 